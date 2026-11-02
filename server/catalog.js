export function inferFamily(tags = [], name = "") {
  const labels = `${tags.join(" ")} ${name}`.toLowerCase();
  if (/fresh|citrus|aquatic|sport|blue/.test(labels)) return "Fresh";
  if (/oud|woody|wood|leather/.test(labels)) return "Woody";
  if (/oriental|amber|spicy|floral|gourmand/.test(labels)) return "Oriental";
  return "Intense";
}

export function toProductId(name) {
  return name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function toSeedProduct(product, index) {
  const price = Number(product.price);
  const inStock = String(product.stock).toLowerCase() === "in stock";
  const family = inferFamily(product.tags, product.name);
  const article = family === "Oriental" || family === "Intense" ? "An" : "A";
  const notes = {
    top: product.topNotes ?? [],
    heart: product.heartNotes ?? [],
    base: product.baseNotes ?? [],
  };

  return {
    ...product,
    family,
    sortOrder: index,
    description: `${article} ${family.toLowerCase()} perfume with a distinctive opening of ${notes.top.join(", ")}, a heart of ${notes.heart.join(", ")}, and a base of ${notes.base.join(", ")}. Its ${String(product.longevity)} longevity and ${String(product.projection).toLowerCase()} projection create a memorable presence. Available in ${product.sizes.join(" and ")}.`,
    bestSeller: index < 8,
    isSignature: index < 4,
    isActive: true,
    variants: product.sizes.map((size) => ({
      size: String(size).toUpperCase(),
      price: Math.max(0, price - 100),
      compareAtPrice: price,
      inStock,
    })),
  };
}

export function validateProductUpdate(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "A product object is required.";
  }

  const { name, description, family, category, tags, topNotes, heartNotes, baseNotes, images, longevity, projection, variants, isActive, bestSeller, isSignature } = body;
  if (typeof name !== "string" || !name.trim() || name.trim().length > 120) return "Name must be between 1 and 120 characters.";
  if (typeof description !== "string" || description.length > 10000) return "Description must be 10,000 characters or fewer.";
  if (!["Fresh", "Woody", "Oriental", "Intense"].includes(family)) return "Choose a valid product family.";
  if (typeof category !== "string" || !category.trim() || category.trim().length > 80) return "Category must be between 1 and 80 characters.";
  if (!Array.isArray(images) || images.length === 0 || images.length > 8) return "Add between 1 and 8 product images.";
  for (const image of images) {
    if (typeof image !== "string" || !image.trim() || image.length > 2048) return "Every product image needs a valid URL or local image path.";
    const value = image.trim();
    if (value.startsWith("imgs/")) {
      const pathParts = value.split("/");
      if (pathParts.some((part, index) => index > 0 && (!part || part === "." || part === "..")) ||
          !/\.(?:avif|gif|jpe?g|png|webp)$/i.test(value)) {
        return "Local images must use a supported image file under imgs/.";
      }
    } else {
      try {
        const url = new URL(value);
        if (url.protocol !== "https:" || !url.hostname || url.username || url.password) return "Product image URLs must use HTTPS.";
      } catch {
        return "Every product image needs a valid HTTPS URL or local image path.";
      }
    }
  }
  if (typeof longevity !== "string" || !longevity.trim() || longevity.length > 80) return "Longevity must be between 1 and 80 characters.";
  if (typeof projection !== "string" || !projection.trim() || projection.length > 80) return "Projection must be between 1 and 80 characters.";
  for (const [label, values] of [["tags", tags], ["top notes", topNotes], ["heart notes", heartNotes], ["base notes", baseNotes]]) {
    if (!Array.isArray(values) || values.length > 30 || values.some((value) => typeof value !== "string" || value.trim().length > 80)) {
      return `Product ${label} must be a list of up to 30 short text values.`;
    }
  }
  if (!Array.isArray(variants) || variants.length === 0 || variants.length > 10) return "Add between 1 and 10 product sizes.";

  const variantSizes = new Set();
  for (const variant of variants) {
    if (!variant || typeof variant.size !== "string" || !variant.size.trim() || variant.size.length > 24) return "Every variant needs a valid size.";
    const normalizedSize = variant.size.trim().toUpperCase();
    if (variantSizes.has(normalizedSize)) return "Variant sizes must be unique.";
    variantSizes.add(normalizedSize);
    if (!Number.isSafeInteger(variant.price) || variant.price < 0 || variant.price > 10000000) return "Variant prices must be whole PKR amounts.";
    if (!Number.isSafeInteger(variant.compareAtPrice) || variant.compareAtPrice < variant.price || variant.compareAtPrice > 10000000) {
      return "Compare-at prices must be whole PKR amounts and at least the selling price.";
    }
    if (typeof variant.inStock !== "boolean") return "Choose an availability for every size.";
  }
  if (typeof isActive !== "boolean" || typeof bestSeller !== "boolean" || typeof isSignature !== "boolean") {
    return "Product visibility and merchandising flags must be boolean values.";
  }

  return null;
}
