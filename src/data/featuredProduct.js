export function getFeaturedProduct(products) {
  return products.find((product) => product.id === "lataffa-khamrah") ?? products[0];
}
