import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db.js";
import { toProductId, validateProductUpdate } from "./catalog.js";
import { calculateOrderTotals } from "./orders.js";
import { requireGoogleCustomer } from "./customer-auth.js";
import { getUsdPkrRate, toRateSnapshot } from "./exchange-rate.js";
import { dashboardOrderStatuses, toDashboardOrder } from "./order-contract.js";

const app = express();
const sessionCookie = "ha_admin_session";
const sessionDurationSeconds = 8 * 60 * 60;
const loginAttempts = new Map();
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function requireConfiguration() {
  const required = ["MONGODB_URI", "ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_SESSION_SECRET"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
  if (Buffer.byteLength(process.env.ADMIN_SESSION_SECRET) < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 bytes.");
  }
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionToken() {
  const payload = Buffer.from(JSON.stringify({
    email: process.env.ADMIN_EMAIL.toLowerCase(),
    expiresAt: Math.floor(Date.now() / 1000) + sessionDurationSeconds,
    nonce: crypto.randomBytes(16).toString("hex"),
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function readSessionToken(token) {
  if (!token || typeof token !== "string") return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  const expected = crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(payload).digest("base64url");
  if (!safeEqual(signature, expected)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (session.email !== process.env.ADMIN_EMAIL.toLowerCase() || session.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

function getCookie(request, name) {
  const cookies = request.headers.cookie?.split(";") ?? [];
  const entry = cookies.map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(`${name}=`));
  if (!entry) return "";
  try {
    return decodeURIComponent(entry.slice(name.length + 1));
  } catch {
    return "";
  }
}

function setSessionCookie(response, token) {
  const crossOrigin = isCrossOriginDashboardRequest(response.req);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const sameSite = crossOrigin ? "None" : "Strict";
  response.setHeader("Set-Cookie", `${sessionCookie}=${encodeURIComponent(token)}; HttpOnly; SameSite=${sameSite}; Path=/; Max-Age=${sessionDurationSeconds}${secure}`);
}

function clearSessionCookie(response) {
  const crossOrigin = isCrossOriginDashboardRequest(response.req);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const sameSite = crossOrigin ? "None" : "Strict";
  response.setHeader("Set-Cookie", `${sessionCookie}=; HttpOnly; SameSite=${sameSite}; Path=/; Max-Age=0${secure}`);
}

function allowedDashboardOrigins() {
  return (process.env.ADMIN_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isCrossOriginDashboardRequest(request) {
  const origin = request?.get("origin");
  if (!origin) return false;
  const requestHost = request.get("x-forwarded-host") || request.get("host");
  return new URL(origin).host !== requestHost && allowedDashboardOrigins().includes(origin);
}

function requireAdmin(request, response, next) {
  const session = readSessionToken(getCookie(request, sessionCookie));
  if (!session) return response.status(401).json({ error: "Admin sign-in is required." });
  request.admin = session;
  next();
}

function sameOrigin(request, response, next) {
  const origin = request.get("origin");
  if (origin) {
    try {
      const requestHost = request.get("x-forwarded-host") || request.get("host");
      if (new URL(origin).host !== requestHost && !allowedDashboardOrigins().includes(origin)) {
        return response.status(403).json({ error: "Cross-origin requests are not allowed." });
      }
    } catch {
      return response.status(403).json({ error: "Invalid request origin." });
    }
  }
  next();
}

function corsForDashboard(request, response, next) {
  const origin = request.get("origin");
  if (origin && allowedDashboardOrigins().includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    response.vary("Origin");
  }
  if (request.method === "OPTIONS") return response.status(204).end();
  next();
}

function sanitizeProduct(product) {
  const { _id, ...publicProduct } = product;
  return publicProduct;
}

function validateProductRequest(body) {
  const validationError = validateProductUpdate(body);
  if (validationError) return validationError;

  for (const image of body.images) {
    if (!image.startsWith("imgs/")) continue;
    const imagePath = path.resolve(projectRoot, "Data", image);
    if (!fs.existsSync(imagePath) || !fs.statSync(imagePath).isFile()) {
      return `Local product image "${image}" was not found in Data/imgs.`;
    }
  }
  return null;
}

const publicProductFields = {
  _id: 0,
  id: 1,
  name: 1,
  price: 1,
  stock: 1,
  category: 1,
  sizes: 1,
  topNotes: 1,
  heartNotes: 1,
  baseNotes: 1,
  longevity: 1,
  projection: 1,
  tags: 1,
  description: 1,
  images: 1,
  family: 1,
  sortOrder: 1,
  bestSeller: 1,
  isSignature: 1,
  isActive: 1,
  variants: 1,
};

function validateCustomerProfile(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "Customer profile details are required.";
  for (const field of ["phone", "address", "city"]) {
    if (typeof body[field] !== "string" || !body[field].trim() || body[field].trim().length > 200) {
      return `${field} is required and must be 200 characters or fewer.`;
    }
  }
  for (const field of ["apartment", "postalCode"]) {
    if (body[field] !== undefined && (typeof body[field] !== "string" || body[field].trim().length > 200)) {
      return `${field} must be 200 characters or fewer.`;
    }
  }
  return null;
}

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((request, response, next) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "DENY");
  next();
});
app.use(express.json({ limit: "100kb", strict: true }));
app.use("/api", corsForDashboard);
app.use("/api", sameOrigin);
app.use("/api/admin", (_request, response, next) => {
  response.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/api/health", (_request, response) => response.json({ status: "ok" }));

app.get("/api/products", async (_request, response, next) => {
  try {
    const database = await connectToDatabase();
    const products = await database.collection("products")
      .find({ isActive: true })
      .project(publicProductFields)
      .sort({ sortOrder: 1, name: 1 })
      .toArray();
    response.set("Cache-Control", "no-store").json(products);
  } catch (error) {
    next(error);
  }
});

app.get("/api/customer/profile", requireGoogleCustomer, async (request, response, next) => {
  try {
    const database = await connectToDatabase();
    const now = new Date();
    const customer = await database.collection("customers").findOneAndUpdate(
      { _id: request.customerIdentity.uid },
      {
        $set: {
          customerId: request.customerIdentity.uid,
          name: request.customerIdentity.name,
          email: request.customerIdentity.email,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true, returnDocument: "after" },
    );
    response.set("Cache-Control", "no-store").json(customer);
  } catch (error) {
    next(error);
  }
});

app.put("/api/customer/profile", requireGoogleCustomer, async (request, response, next) => {
  try {
    const validationError = validateCustomerProfile(request.body);
    if (validationError) return response.status(400).json({ error: validationError });
    const database = await connectToDatabase();
    const now = new Date();
    const customer = await database.collection("customers").findOneAndUpdate(
      { _id: request.customerIdentity.uid },
      {
        $set: {
          customerId: request.customerIdentity.uid,
          name: request.customerIdentity.name,
          email: request.customerIdentity.email,
          phone: request.body.phone.trim(),
          address: request.body.address.trim(),
          apartment: request.body.apartment?.trim() || "",
          city: request.body.city.trim(),
          postalCode: request.body.postalCode?.trim() || "",
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true, returnDocument: "after" },
    );
    response.set("Cache-Control", "no-store").json(customer);
  } catch (error) {
    next(error);
  }
});

app.post("/api/orders", requireGoogleCustomer, async (request, response, next) => {
  const identity = request.customerIdentity;
  const requestId = request.body?.idempotencyKey;
  const idempotencyKey = typeof requestId === "string" ? `${identity.uid}:${requestId}` : "";
  try {
    const { items, paymentMethod, promoCode, giftNote, idempotencyKey: clientRequestId, orderNotes } = request.body ?? {};
    if (!Array.isArray(items) || items.length === 0 || items.length > 30) return response.status(400).json({ error: "Your order must contain between 1 and 30 items." });
    if (paymentMethod !== undefined && paymentMethod !== "cod") return response.status(400).json({ error: "Only Cash on Delivery is available." });
    if (typeof clientRequestId !== "string" || !/^[a-f0-9-]{36}$/i.test(clientRequestId)) return response.status(400).json({ error: "A valid order request ID is required." });
    if (giftNote !== undefined && (typeof giftNote !== "string" || giftNote.length > 1000)) return response.status(400).json({ error: "Gift notes must be 1,000 characters or fewer." });
    if (orderNotes !== undefined && (typeof orderNotes !== "string" || orderNotes.length > 500)) return response.status(400).json({ error: "Delivery instructions must be 500 characters or fewer." });

    const database = await connectToDatabase();
    const customerProfile = await database.collection("customers").findOne({ _id: identity.uid });
    if (!customerProfile || !customerProfile.phone || !customerProfile.address || !customerProfile.city) {
      return response.status(400).json({ error: "Complete your phone number and delivery address before placing the order." });
    }

    const orders = database.collection("orders");
    const previousOrder = await orders.findOne({ idempotencyKey });
    if (previousOrder) {
      return response.status(200).json({
        orderNumber: previousOrder.orderNumber,
        status: previousOrder.status,
        total: previousOrder.total,
        currency: previousOrder.currency,
      });
    }

    const normalizedItems = [];
    for (const item of items) {
      if (!item || typeof item.productId !== "string" || typeof item.size !== "string" ||
          !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
        return response.status(400).json({ error: "Each item needs a product, size, and quantity from 1 to 20." });
      }

      const product = await database.collection("products").findOne({ id: item.productId, isActive: true });
      const variant = product?.variants?.find((entry) => entry.size === item.size);
      if (!product || !variant) return response.status(400).json({ error: "A selected perfume or size is no longer available. Review your bag." });
      if (!variant.inStock) return response.status(409).json({ error: `${product.name} (${variant.size}) is out of stock.` });

      normalizedItems.push({
        productId: product.id,
        name: product.name,
        size: variant.size,
        quantity: item.quantity,
        unitPrice: variant.price,
        compareAtPrice: variant.compareAtPrice,
      });
    }

    const code = typeof promoCode === "string" ? promoCode.trim().toUpperCase() : "";
    let totals;
    try {
      totals = calculateOrderTotals(normalizedItems, code);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
    const exchangeRate = toRateSnapshot(await getUsdPkrRate(database));
    const now = new Date();
    const orderNumber = `HA-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const order = {
      orderNumber,
      idempotencyKey,
      customerId: identity.uid,
      customer: {
        name: identity.name,
        email: identity.email,
        phone: customerProfile.phone,
        address: customerProfile.address,
        apartment: customerProfile.apartment || "",
        city: customerProfile.city,
        postalCode: customerProfile.postalCode || "",
        orderNotes: orderNotes?.trim() || "",
      },
      items: normalizedItems,
      ...totals,
      giftNote: giftNote?.trim() || "",
      currency: "PKR",
      exchangeRate,
      status: "New",
      createdAt: now,
      updatedAt: now,
    };

    await orders.insertOne(order);
    response.status(201).json({ orderNumber, status: order.status, currency: order.currency, ...totals });
  } catch (error) {
    if (error?.code === 11000 && idempotencyKey) {
      const database = await connectToDatabase();
      const existing = await database.collection("orders").findOne({ idempotencyKey });
      if (existing) return response.status(200).json({ orderNumber: existing.orderNumber, status: existing.status, total: existing.total, currency: existing.currency });
    }
    next(error);
  }
});

app.post("/api/admin/session", (request, response) => {
  const ip = request.ip;
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  if (attempts && attempts.resetAt > now && attempts.count >= 10) {
    return response.status(429).json({ error: "Too many sign-in attempts. Try again in 15 minutes." });
  }

  const { email, password } = request.body ?? {};
  const valid = typeof email === "string" && typeof password === "string" &&
    safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL.trim().toLowerCase()) &&
    safeEqual(password, process.env.ADMIN_PASSWORD);
  if (!valid) {
    const current = attempts?.resetAt > now ? attempts : { count: 0, resetAt: now + 15 * 60 * 1000 };
    current.count += 1;
    loginAttempts.set(ip, current);
    return response.status(401).json({ error: "Email or password is incorrect." });
  }

  loginAttempts.delete(ip);
  setSessionCookie(response, createSessionToken());
  response.json({ email: process.env.ADMIN_EMAIL });
});

app.get("/api/admin/session", requireAdmin, (request, response) => response.json({ email: request.admin.email }));
app.delete("/api/admin/session", requireAdmin, (_request, response) => {
  clearSessionCookie(response);
  response.status(204).end();
});

app.get("/api/admin/products", requireAdmin, async (_request, response, next) => {
  try {
    const database = await connectToDatabase();
    const products = await database.collection("products").find().sort({ name: 1 }).toArray();
    response.json(products.map(sanitizeProduct));
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/products", requireAdmin, async (request, response, next) => {
  try {
    const errorMessage = validateProductRequest(request.body);
    if (errorMessage) return response.status(400).json({ error: errorMessage });
    const id = toProductId(request.body.name.trim());
    if (!id) return response.status(400).json({ error: "Product name must include a letter or number." });
    const database = await connectToDatabase();
    const products = database.collection("products");
    if (await products.findOne({ id })) return response.status(409).json({ error: "A product with this name already exists. Choose a different name." });

    const now = new Date();
    const variants = request.body.variants.map((variant) => ({ ...variant, size: variant.size.trim().toUpperCase() }));
    const product = {
      id,
      name: request.body.name.trim(),
      description: request.body.description.trim(),
      family: request.body.family,
      category: request.body.category.trim(),
      tags: request.body.tags.map((tag) => tag.trim()).filter(Boolean),
      topNotes: request.body.topNotes.map((note) => note.trim()).filter(Boolean),
      heartNotes: request.body.heartNotes.map((note) => note.trim()).filter(Boolean),
      baseNotes: request.body.baseNotes.map((note) => note.trim()).filter(Boolean),
      images: request.body.images.map((image) => image.trim()),
      longevity: request.body.longevity.trim(),
      projection: request.body.projection.trim(),
      variants,
      sizes: variants.map((variant) => variant.size),
      price: variants[0].compareAtPrice,
      stock: variants.some((variant) => variant.inStock) ? "In Stock" : "Out of Stock",
      isActive: request.body.isActive,
      bestSeller: request.body.bestSeller,
      isSignature: request.body.isSignature,
      sortOrder: ((await products.find().sort({ sortOrder: -1 }).limit(1).next())?.sortOrder ?? -1) + 1,
      createdAt: now,
      updatedAt: now,
    };

    await products.insertOne(product);
    response.status(201).json(sanitizeProduct(product));
  } catch (error) {
    if (error?.code === 11000) return response.status(409).json({ error: "A product with this name already exists. Choose a different name." });
    next(error);
  }
});

app.patch("/api/admin/products/:id", requireAdmin, async (request, response, next) => {
  try {
    const errorMessage = validateProductRequest(request.body);
    if (errorMessage) return response.status(400).json({ error: errorMessage });
    const database = await connectToDatabase();
    const variants = request.body.variants.map((variant) => ({ ...variant, size: variant.size.trim().toUpperCase() }));
    const result = await database.collection("products").findOneAndUpdate(
      { id: request.params.id },
      {
        $set: {
          name: request.body.name.trim(),
          description: request.body.description.trim(),
          family: request.body.family,
          category: request.body.category.trim(),
          tags: request.body.tags.map((tag) => tag.trim()).filter(Boolean),
          topNotes: request.body.topNotes.map((note) => note.trim()).filter(Boolean),
          heartNotes: request.body.heartNotes.map((note) => note.trim()).filter(Boolean),
          baseNotes: request.body.baseNotes.map((note) => note.trim()).filter(Boolean),
          images: request.body.images.map((image) => image.trim()),
          longevity: request.body.longevity.trim(),
          projection: request.body.projection.trim(),
          variants,
          sizes: variants.map((variant) => variant.size),
          price: variants[0].compareAtPrice,
          stock: variants.some((variant) => variant.inStock) ? "In Stock" : "Out of Stock",
          isActive: request.body.isActive,
          bestSeller: request.body.bestSeller,
          isSignature: request.body.isSignature,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );
    if (!result) return response.status(404).json({ error: "Product not found." });
    response.json(sanitizeProduct(result));
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/orders", requireAdmin, async (_request, response, next) => {
  try {
    const database = await connectToDatabase();
    const orders = await database.collection("orders").find().sort({ createdAt: -1 }).limit(200).toArray();
    response.json(orders.map(toDashboardOrder));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/orders/:id", requireAdmin, async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: "Invalid order ID." });
    const database = await connectToDatabase();
    const result = await database.collection("orders").deleteOne({ _id: new ObjectId(request.params.id) });
    if (result.deletedCount !== 1) return response.status(404).json({ error: "Order not found." });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/orders/:id/status", requireAdmin, async (request, response, next) => {
  try {
    const { status, paymentStatus } = request.body ?? {};
    if (!dashboardOrderStatuses.includes(status)) return response.status(400).json({ error: "Choose a valid order status." });
    if (paymentStatus !== undefined) return response.status(400).json({ error: "Payment status is not part of the COD order model." });
    if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: "Invalid order ID." });

    const database = await connectToDatabase();
    const updatedOrder = await database.collection("orders").findOneAndUpdate(
      { _id: new ObjectId(request.params.id) },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: "after" },
    );
    if (!updatedOrder) return response.status(404).json({ error: "Order not found." });
    response.json(toDashboardOrder(updatedOrder));
  } catch (error) {
    next(error);
  }
});

app.use("/api", (_request, response) => response.status(404).json({ error: "API route not found." }));

const buildDirectory = path.join(projectRoot, "public");
if (fs.existsSync(buildDirectory)) {
  app.use(express.static(buildDirectory));
  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/api/")) return next();
    response.sendFile(path.join(buildDirectory, "index.html"));
  });
}

app.use((error, _request, response, _next) => {
  console.error("API request failed:", error.name, error.code ?? "no-code");
  if (response.headersSent) return;
  if (error instanceof SyntaxError && "body" in error) return response.status(400).json({ error: "Request body must be valid JSON." });
  response.status(error.status || 500).json({ error: error.status ? error.message : "The request could not be completed. Please try again." });
});

requireConfiguration();

export default app;
