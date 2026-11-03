import test from "node:test";
import assert from "node:assert/strict";
import { getFeaturedProduct } from "../data/featuredProduct.js";
import { searchProductsByName, splitSearchHighlight } from "./productSearch.js";

const products = [
  { id: "arabian-nights", name: "Arabian Nights", description: "oud" },
  { id: "lataffa-khamrah", name: "Lattafa Khamrah", description: "amber" },
  { id: "blue-oud", name: "Blue Oud", description: "fresh" },
];

test("search waits for two characters and searches product names only", () => {
  assert.deepEqual(searchProductsByName(products, "k"), []);
  assert.deepEqual(searchProductsByName(products, "kh").map(({ id }) => [id]), [["lataffa-khamrah"]]);
  assert.deepEqual(searchProductsByName(products, "oud").map(({ id }) => id), ["blue-oud"]);
});

test("search highlighting marks case-insensitive matches without treating input as regex", () => {
  assert.deepEqual(splitSearchHighlight("Lattaffa Khamrah", "KH"), [
    { text: "Lattaffa ", highlighted: false },
    { text: "Kh", highlighted: true },
    { text: "amrah", highlighted: false },
  ]);
  assert.deepEqual(splitSearchHighlight("A.B. perfume", ".b"), [
    { text: "A", highlighted: false },
    { text: ".B", highlighted: true },
    { text: ". perfume", highlighted: false },
  ]);
});

test("the home and about featured product is Lattafa Khamrah", () => {
  assert.equal(getFeaturedProduct(products).id, "lataffa-khamrah");
});
