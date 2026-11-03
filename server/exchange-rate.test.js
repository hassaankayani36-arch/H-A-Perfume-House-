import test from "node:test";
import assert from "node:assert/strict";
import { getUsdPkrRate, toRateSnapshot } from "./exchange-rate.js";

function createDatabase(cachedRate = null) {
  const saved = [];
  return {
    saved,
    collection(name) {
      assert.equal(name, "exchangeRates");
      return {
        async findOne() {
          return cachedRate;
        },
        async updateOne(filter, update) {
          saved.push({ filter, snapshot: update.$set });
        },
      };
    },
  };
}

test("USD/PKR provider results are saved and exposed as an order snapshot", async () => {
  const database = createDatabase();
  const updatedAt = Math.floor(Date.now() / 1000);
  const rate = await getUsdPkrRate(database, async () => ({
    ok: true,
    async json() {
      return {
        result: "success",
        base_code: "USD",
        time_last_update_unix: updatedAt,
        time_next_update_unix: updatedAt + 3600,
        rates: { PKR: 278.25 },
      };
    },
  }));

  assert.equal(rate.pkrPerUsd, 278.25);
  assert.equal(database.saved.length, 1);
  assert.equal(toRateSnapshot(rate).quoteCurrency, "PKR");
  assert.equal(toRateSnapshot(rate).rateDate, new Date(updatedAt * 1000).toISOString().slice(0, 10));
});

test("a current saved rate avoids an unnecessary provider request", async () => {
  const cached = {
    provider: "open.er-api.com",
    baseCurrency: "USD",
    quoteCurrency: "PKR",
    pkrPerUsd: 275,
    providerUpdatedAt: new Date(),
    nextUpdateAt: new Date(Date.now() + 60_000),
    fetchedAt: new Date(),
  };
  const database = createDatabase(cached);
  const rate = await getUsdPkrRate(database, () => {
    throw new Error("The provider should not be called.");
  });

  assert.equal(rate, cached);
  assert.equal(database.saved.length, 0);
});

test("provider failures use a recent saved rate but reject a stale one", async () => {
  const recent = {
    pkrPerUsd: 276,
    fetchedAt: new Date(Date.now() - 60 * 60 * 1000),
    nextUpdateAt: new Date(Date.now() - 60 * 60 * 1000),
  };
  const fallback = await getUsdPkrRate(createDatabase(recent), async () => {
    throw new Error("offline");
  });
  assert.equal(fallback, recent);

  await assert.rejects(
    getUsdPkrRate(createDatabase({
      ...recent,
      fetchedAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
    }), async () => {
      throw new Error("offline");
    }),
    { status: 503, message: /currency rate is temporarily unavailable/ },
  );
});
