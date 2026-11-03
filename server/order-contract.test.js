import test from "node:test";
import assert from "node:assert/strict";
import { toDashboardOrder } from "./order-contract.js";

test("dashboard orders expose PKR and snapshot-derived USD without changing order IDs", () => {
  const order = toDashboardOrder({
    _id: { toString: () => "database-id" },
    orderNumber: "HA-20261103-A1B2C3",
    customerId: "firebase-uid",
    customer: { name: "Customer Name", email: "customer@example.com", phone: "03001234567", city: "Lahore" },
    items: [{ productId: "scent", name: "Sample Scent", size: "50ML", quantity: 2 }],
    total: 5000,
    exchangeRate: { pkrPerUsd: 250, rateDate: "2026-11-03" },
    status: "New",
    createdAt: new Date("2026-11-03T10:00:00Z"),
  });

  assert.equal(order.id, "HA-20261103-A1B2C3");
  assert.equal(order.recordId, "database-id");
  assert.equal(order.customerId, "firebase-uid");
  assert.equal(order.amountPkr, 5000);
  assert.equal(order.amountUsd, 20);
  assert.equal(order.status, "New");
  assert.equal(order.items, "Sample Scent (50ML) × 2");
});

test("legacy orders map to dashboard statuses and never invent a historical USD rate", () => {
  const order = toDashboardOrder({
    _id: { toString: () => "legacy-id" },
    customer: { firstName: "Legacy", lastName: "Customer" },
    items: [],
    total: 3000,
    status: "delivered",
  });

  assert.equal(order.status, "Completed");
  assert.equal(order.name, "Legacy Customer");
  assert.equal(order.amountPkr, 3000);
  assert.equal(order.amountUsd, null);
  assert.equal(order.customerId, "Legacy");
});
