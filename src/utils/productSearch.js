export function searchProductsByName(products, query) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (normalizedQuery.length < 2) return [];

  return products.filter((product) => product.name.toLocaleLowerCase().includes(normalizedQuery));
}

export function splitSearchHighlight(text, query) {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2) return [{ text, highlighted: false }];

  const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
  return parts.filter(Boolean).map((part) => ({
    text: part,
    highlighted: part.toLocaleLowerCase() === normalizedQuery.toLocaleLowerCase(),
  }));
}
