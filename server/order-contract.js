export const dashboardOrderStatuses = ["New", "Pending", "Completed", "Failed"];

const legacyStatusMap = {
  pending: "New",
  confirmed: "Pending",
  preparing: "Pending",
  shipped: "Pending",
  delivered: "Completed",
  cancelled: "Failed",
};

export function toDashboardOrder(order) {
  const customer = order.customer ?? {};
  const amountPkr = Number(order.total ?? order.amount ?? 0);
  const rate = order.exchangeRate?.pkrPerUsd;
  const legacyName = [customer.firstName, customer.lastName].filter(Boolean).join(" ");
  const lineItems = Array.isArray(order.items) ? order.items : [];
  const status = dashboardOrderStatuses.includes(order.status)
    ? order.status
    : legacyStatusMap[order.status] || "New";

  return {
    id: order.orderNumber || order._id.toString(),
    recordId: order._id.toString(),
    orderNumber: order.orderNumber || order._id.toString(),
    createdAt: order.createdAt,
    amount: amountPkr,
    amountPkr,
    amountUsd: Number.isFinite(rate) && rate > 0 ? amountPkr / rate : null,
    currency: "PKR",
    exchangeRate: order.exchangeRate || null,
    status,
    customerId: order.customerId || "Legacy",
    name: customer.name || legacyName || "—",
    email: customer.email || "—",
    phone: customer.phone || "—",
    address: [customer.address, customer.apartment, customer.city, customer.postalCode].filter(Boolean).join(", "),
    city: customer.city || "—",
    items: lineItems.map((item) => `${item.name}${item.size ? ` (${item.size})` : ""} × ${item.quantity}`).join(", ") || "—",
    lineItems,
    total: amountPkr,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    giftNote: order.giftNote || "",
    orderNotes: customer.orderNotes || "",
  };
}
