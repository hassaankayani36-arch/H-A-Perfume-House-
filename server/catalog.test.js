import test from "node:test";
import assert from "node:assert/strict";
import {
  inferFamily,
  toProductId,
  toSeedProduct,
  validateProductUpdate,
} from "./catalog.js";
import { calculateOrderTotals } from "./orders.js";

const sourceProduct = {
  id: "sample-scent",
  name: "Sample Scent",
  price: 2500,
  stock: "In Stock",
  sizes: ["50ML", "100ML"],
  tags: ["ORIENTAL"],
  topNotes: ["Citrus"],
  heartNotes: ["Rose"],
  baseNotes: ["Oud"],
  longevity: "8h+",
  projection: "Moderate",
};

function validProductUpdate() {
  return {
    name: "Sample Scent",
    description: "An edited scent description.",
    family: "Oriental",
    category: "Fragrances",
    tags: ["ORIENTAL"],
    topNotes: ["Citrus"],
    heartNotes: ["Rose"],
    baseNotes: ["Oud"],
    images: ["https://example.com/sample-scent.jpg"],
    longevity: "8h+",
    projection: "Moderate",
    variants: [
      { size: "50ML", price: 2400, compareAtPrice: 2500, inStock: true },
      { size: "100ML", price: 2400, compareAtPrice: 2500, inStock: false },
    ],
    isActive: true,
    bestSeller: false,
    isSignature: false,
  };
}

test("catalog seed preserves existing display prices and size availability", () => {
  const product = toSeedProduct(sourceProduct, 0);
  assert.equal(product.family, "Oriental");
  assert.equal(product.bestSeller, true);
  assert.equal(product.isSignature, true);
  assert.equal(product.variants.length, 2);
  assert.deepEqual(
    product.variants.map(({ price, compareAtPrice, inStock }) => ({
      price,
      compareAtPrice,
      inStock,
    })),
    [
      { price: 2400, compareAtPrice: 2500, inStock: true },
      { price: 2400, compareAtPrice: 2500, inStock: true },
    ],
  );
  assert.match(product.description, /Available in 50ML and 100ML/);
});

test("family inference prioritizes fresh and woody scent tags", () => {
  assert.equal(inferFamily(["FRESH", "OUD"]), "Fresh");
  assert.equal(inferFamily(["WOODY"]), "Woody");
  assert.equal(inferFamily(["GOURMAND"]), "Oriental");
});

test("product IDs use normalized URL-safe slugs", () => {
  assert.equal(toProductId("Étoile No. 5"), "etoile-no-5");
  assert.equal(toProductId("🔥"), "");
});

test("product updates accept valid edited variants", () => {
  assert.equal(validateProductUpdate(validProductUpdate()), null);
});

test("product updates accept HTTPS and local images and reject unsafe image URLs", () => {
  const localImage = validProductUpdate();
  localImage.images = ["imgs/new-perfume.webp"];
  assert.equal(validateProductUpdate(localImage), null);

  const insecureImage = validProductUpdate();
  insecureImage.images = ["http://example.com/perfume.jpg"];
  assert.match(validateProductUpdate(insecureImage), /HTTPS/);

  const traversalImage = validProductUpdate();
  traversalImage.images = ["imgs/../private.png"];
  assert.match(validateProductUpdate(traversalImage), /under imgs/);

  const malformedLocalImage = validProductUpdate();
  malformedLocalImage.images = ["imgs//perfume.jpg"];
  assert.match(validateProductUpdate(malformedLocalImage), /under imgs/);
});

test("product updates reject invalid prices and case-insensitive duplicate sizes", () => {
  const invalidPrice = validProductUpdate();
  invalidPrice.variants[0].compareAtPrice = 2300;
  assert.match(validateProductUpdate(invalidPrice), /Compare-at prices/);

  const duplicateSizes = validProductUpdate();
  duplicateSizes.variants[1].size = "50ml";
  assert.match(validateProductUpdate(duplicateSizes), /sizes must be unique/);
});

test("order totals apply free shipping threshold and verified promo rates", () => {
  assert.deepEqual(
    calculateOrderTotals([{ unitPrice: 2400, quantity: 1 }], "ha10"),
    {
      subtotal: 2400,
      discount: 240,
      discountPercent: 10,
      shipping: 350,
      total: 2510,
      promoCode: "HA10",
    },
  );
  assert.deepEqual(calculateOrderTotals([{ unitPrice: 2500, quantity: 1 }]), {
    subtotal: 2500,
    discount: 0,
    discountPercent: 0,
    shipping: 0,
    total: 2500,
    promoCode: null,
  });
});

test("order totals reject promotions not configured by the server", () => {
  assert.throws(
    () => calculateOrderTotals([{ unitPrice: 500, quantity: 1 }], "HACK"),
    /promotion is no longer valid/,
  );
});
