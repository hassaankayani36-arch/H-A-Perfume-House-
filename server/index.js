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

const app = express();
const port = Number(process.env.PORT || 3001);
const sessionCookie = "ha_admin_session";
const sessionDurationSeconds = 8 * 60 * 60;
const loginAttempts = new Map();
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validStatuses = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"];

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
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${sessionCookie}=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${sessionDurationSeconds}${secure}`);
}

function clearSessionCookie(response) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${sessionCookie}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure}`);
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
      if (new URL(origin).host !== requestHost) {
        return response.status(403).json({ error: "Cross-origin requests are not allowed." });
      }
    } catch {
      return response.status(403).json({ error: "Invalid request origin." });
    }
  }
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

function validateCustomer(customer) {
  if (!customer || typeof customer !== "object" || Array.isArray(customer)) return "Customer details are required.";
  const fields = ["firstName", "lastName", "email", "phone", "address", "city"];
  for (const field of fields) {
    if (typeof customer[field] !== "string" || !customer[field].trim() || customer[field].trim().length > 200) {
      return `${field} is required and must be 200 characters or fewer.`;
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return "Enter a valid email address.";
  for (const field of ["apartment", "postalCode", "orderNotes"]) {
    if (customer[field] !== undefined && (typeof customer[field] !== "string" || customer[field].length > 500)) {
      return `${field} must be 500 characters or fewer.`;
    }
  }
  return null;
}

app.disable("x-powered-by");
app.use((request, response, next) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "DENY");
  next();
});
app.use(express.json({ limit: "100kb", strict: true }));
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

app.post("/api/orders", async (request, response, next) => {
  try {
    const { customer, items, paymentMethod, promoCode, giftNote, idempotencyKey } = request.body ?? {};
    const customerError = validateCustomer(customer);
    if (customerError) return response.status(400).json({ error: customerError });
    if (!Array.isArray(items) || items.length === 0 || items.length > 30) return response.status(400).json({ error: "Your order must contain between 1 and 30 items." });
    if (!["cod", "bank", "card"].includes(paymentMethod)) return response.status(400).json({ error: "Choose a valid payment method." });
    if (typeof idempotencyKey !== "string" || !/^[a-f0-9-]{36}$/i.test(idempotencyKey)) return response.status(400).json({ error: "A valid order request ID is required." });
    if (giftNote !== undefined && (typeof giftNote !== "string" || giftNote.length > 1000)) return response.status(400).json({ error: "Gift notes must be 1,000 characters or fewer." });

    const database = await connectToDatabase();
    const orders = database.collection("orders");
    const previousOrder = await orders.findOne({ idempotencyKey });
    if (previousOrder) {
      return response.status(200).json({
        orderNumber: previousOrder.orderNumber,
        status: previousOrder.status,
        total: previousOrder.total,
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
    const now = new Date();
    const orderNumber = `HA-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const order = {
      orderNumber,
      idempotencyKey,
      customer: Object.fromEntries(
        ["firstName", "lastName", "email", "phone", "address", "apartment", "city", "postalCode", "orderNotes"]
          .filter((key) => typeof customer[key] === "string")
          .map((key) => [key, customer[key].trim()]),
      ),
      items: normalizedItems,
      ...totals,
      giftNote: giftNote?.trim() || "",
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "due_on_delivery" : "awaiting_manual_confirmation",
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    await orders.insertOne(order);
    response.status(201).json({ orderNumber, status: order.status, ...totals });
  } catch (error) {
    if (error?.code === 11000 && request.body?.idempotencyKey) {
      try {
        const database = await connectToDatabase();
        const existing = await database.collection("orders").findOne({ idempotencyKey: request.body.idempotencyKey });
        if (existing) return response.status(200).json({ orderNumber: existing.orderNumber, status: existing.status, total: existing.total });
      } catch {
        return next(error);
      }
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
    response.json(orders.map((order) => {
      const { idempotencyKey, ...adminOrder } = order;
      return { ...adminOrder, id: adminOrder._id.toString() };
    }));
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
    if (!validStatuses.includes(status)) return response.status(400).json({ error: "Choose a valid order status." });
    if (paymentStatus !== undefined && !["due_on_delivery", "awaiting_manual_confirmation", "paid", "refunded", "failed"].includes(paymentStatus)) {
      return response.status(400).json({ error: "Choose a valid payment status." });
    }
    if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: "Invalid order ID." });

    const updates = { status, updatedAt: new Date() };
    if (paymentStatus !== undefined) updates.paymentStatus = paymentStatus;
    const database = await connectToDatabase();
    const updatedOrder = await database.collection("orders").findOneAndUpdate(
      { _id: new ObjectId(request.params.id) },
      { $set: updates },
      { returnDocument: "after" },
    );
    if (!updatedOrder) return response.status(404).json({ error: "Order not found." });
    const { idempotencyKey, ...adminOrder } = updatedOrder;
    response.json({ ...adminOrder, id: adminOrder._id.toString() });
  } catch (error) {
    next(error);
  }
});

const buildDirectory = path.join(projectRoot, "dist");
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
  response.status(500).json({ error: "The request could not be completed. Please try again." });
});

requireConfiguration();
await connectToDatabase();
app.listen(port, () => console.log(`H&A API listening on port ${port}.`));

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await import("./db.js").then(({ closeDatabase }) => closeDatabase());
    process.exit(0);
  });
}
