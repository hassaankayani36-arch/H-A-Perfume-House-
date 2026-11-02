import { products as catalogProducts } from "../../Data/data.js";

const productImageAssets = import.meta.glob("../../Data/imgs/*", {
  eager: true,
  query: "?url",
  import: "default",
});
const normalizedProductImageAssets = import.meta.glob("../assets/product-images/*.{svg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const originalProductImages = new Map(catalogProducts.map((product) => [product.id, product.images?.[0]]));
const fallbackProductImage = productImageAssets["../../Data/imgs/arabian-nights-1.jpg"];

const formatPrice = (price) => `PKR ${price.toLocaleString("en-PK")}`;

function resolveProductImage(imagePath, productName, productId) {
  const normalizedImage = normalizedProductImageAssets[`../assets/product-images/${productId}.webp`] ??
    normalizedProductImageAssets[`../assets/product-images/${productId}.svg`];
  if (normalizedImage && imagePath === originalProductImages.get(productId)) return normalizedImage;

  if (!imagePath.startsWith("imgs/")) return imagePath;
  const assetPath = `../../Data/${imagePath}`;
  const image = productImageAssets[assetPath];
  if (!image) {
    console.error(`Missing product image "${imagePath}" for ${productName}; showing a fallback image.`);
    return fallbackProductImage;
  }
  return image;
}

function getFamily(tags, name) {
  const labels = `${tags.join(" ")} ${name}`.toLowerCase();
  if (/fresh|citrus|aquatic|sport|blue/.test(labels)) return "Fresh";
  if (/oud|woody|wood|leather/.test(labels)) return "Woody";
  if (/oriental|amber|spicy|floral|gourmand/.test(labels)) return "Oriental";
  return "Intense";
}

function getLongevityPercent(longevity) {
  const hours = Number(longevity.match(/\d+/)?.[0]);
  return Number.isFinite(hours) ? Math.min(100, Math.max(30, hours * 8)) : 70;
}

function getProjectionPercent(projection) {
  const level = projection.toLowerCase();
  if (level.includes("strong") || level.includes("beast")) return 85;
  if (level.includes("moderate") || level.includes("medium")) return 60;
  if (level.includes("soft") || level.includes("light")) return 35;
  return 65;
}

export function normalizeProducts(sourceProducts) {
  return sourceProducts.map((sourceProduct, index) => {
    const name = sourceProduct.name.trim();
    const basePrice = Number(sourceProduct.price);
    const tags = (sourceProduct.tags ?? []).map((tag) => String(tag).toUpperCase());
    const family = sourceProduct.family || getFamily(tags, name);
    const descriptionArticle = family === "Oriental" || family === "Intense" ? "An" : "A";
    const gallery = (sourceProduct.images ?? []).map((imagePath) => resolveProductImage(String(imagePath), name, String(sourceProduct.id)));
    const notes = {
      top: (sourceProduct.topNotes ?? []).map(String),
      heart: (sourceProduct.heartNotes ?? []).map(String),
      base: (sourceProduct.baseNotes ?? []).map(String),
    };
    const sizes = (sourceProduct.variants?.length
      ? sourceProduct.variants
      : (sourceProduct.sizes ?? []).map((size) => ({
          size,
          price: Math.max(0, basePrice - 100),
          compareAtPrice: basePrice,
          inStock: String(sourceProduct.stock).toLowerCase() === "in stock",
        })))
      .map((variant) => {
        const price = Number(variant.price);
        const compareAtPrice = Number(variant.compareAtPrice ?? basePrice);
        return {
          size: String(variant.size).toUpperCase(),
          price: formatPrice(price),
          rawPrice: compareAtPrice,
          discountedPrice: price,
          compareAtPrice: formatPrice(compareAtPrice),
          compareAtRawPrice: compareAtPrice,
          stock: variant.inStock === true,
        };
      });
    const discountedPrice = sizes[0]?.discountedPrice ?? Math.max(0, basePrice - 100);
    const rawPrice = sizes[0]?.rawPrice ?? basePrice;
    const firstNote = notes.top[0] ?? "aromatic notes";
    const heartNote = notes.heart[0] ?? "a balanced heart";
    const baseNote = notes.base[0] ?? "a warm base";
    const longevity = String(sourceProduct.longevity ?? "");
    const projection = String(sourceProduct.projection ?? "");

    return {
      id: String(sourceProduct.id),
      name,
      tagline: `${family} notes, thoughtfully composed.`,
      family,
      concentration: "Perfume",
      price: formatPrice(discountedPrice),
      rawPrice,
      discountedPrice,
      sizes,
      notes,
      description: sourceProduct.description?.trim() || `${descriptionArticle} ${family.toLowerCase()} perfume with a distinctive opening of ${notes.top.join(", ")}, a heart of ${notes.heart.join(", ")}, and a base of ${notes.base.join(", ")}. Its ${longevity} longevity and ${projection.toLowerCase()} projection create a memorable presence. Available in ${sizes.map((size) => size.size).join(" and ")}.`,
      story: `A ${family.toLowerCase()} perfume presented by H&A, with a composition shaped by ${firstNote}, ${heartNote}, and ${baseNote}.`,
      sillage: projection,
      longevity,
      occasion: tags.join(", "),
      howToWear: "Apply to pulse points and allow the perfume to settle naturally on skin.",
      image: gallery[0] ?? "",
      gallery,
      bestSeller: sourceProduct.bestSeller ?? index < 8,
      isSignature: sourceProduct.isSignature ?? index < 4,
      discounted: sizes.some((size) => size.discountedPrice < size.rawPrice),
      discountPercent: rawPrice ? Math.round(((rawPrice - discountedPrice) / rawPrice) * 100) : 0,
      volume: sizes.map((size) => size.size).join(" / "),
      tags,
      stock: sizes.some((size) => size.stock),
      longevityPercent: getLongevityPercent(longevity),
      projection,
      projectionPercent: getProjectionPercent(projection),
    };
  });
}
