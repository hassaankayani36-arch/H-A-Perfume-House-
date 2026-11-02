const promoRates = new Map([
  ["HA10", 10],
  ["PRESENCE", 10],
  ["HA15", 15],
  ["ROYAL", 15],
]);

export function calculateOrderTotals(items, promoCode = "") {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const normalizedCode = promoCode.trim().toUpperCase();
  const discountPercent = normalizedCode ? promoRates.get(normalizedCode) : 0;
  if (normalizedCode && discountPercent === undefined) {
    throw new Error("The applied promotion is no longer valid.");
  }
  const discount = Math.round(subtotal * discountPercent / 100);
  const shipping = subtotal === 0 || subtotal >= 2500 ? 0 : 350;

  return {
    subtotal,
    discount,
    discountPercent,
    shipping,
    total: subtotal - discount + shipping,
    promoCode: discountPercent ? normalizedCode : null,
  };
}
