const rateEndpoint = "https://open.er-api.com/v6/latest/USD";
const rateProvider = "open.er-api.com";
const maximumFallbackAgeMs = 36 * 60 * 60 * 1000;

export async function getUsdPkrRate(database, fetcher = fetch) {
  const rates = database.collection("exchangeRates");
  const cached = await rates.findOne({ provider: rateProvider }, { sort: { providerUpdatedAt: -1 } });
  const now = new Date();
  if (cached && cached.nextUpdateAt > now) return cached;

  let snapshot;
  try {
    const response = await fetcher(rateEndpoint, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Exchange-rate provider returned HTTP ${response.status}.`);
    const payload = await response.json();
    const rate = payload?.rates?.PKR;
    const updatedAt = Number(payload?.time_last_update_unix) * 1000;
    const nextUpdateAt = Number(payload?.time_next_update_unix) * 1000;
    if (payload?.result !== "success" || payload?.base_code !== "USD" ||
        !Number.isFinite(rate) || rate <= 0 ||
        !Number.isFinite(updatedAt) || !Number.isFinite(nextUpdateAt)) {
      throw new Error("Exchange-rate provider returned invalid USD/PKR data.");
    }

    snapshot = {
      provider: rateProvider,
      baseCurrency: "USD",
      quoteCurrency: "PKR",
      pkrPerUsd: rate,
      providerUpdatedAt: new Date(updatedAt),
      nextUpdateAt: new Date(nextUpdateAt),
      fetchedAt: now,
    };
  } catch (error) {
    if (cached && now.getTime() - cached.fetchedAt.getTime() <= maximumFallbackAgeMs) {
      console.warn("Using the most recent saved USD/PKR rate after provider failure:", error.message);
      return cached;
    }
    const unavailable = new Error("The currency rate is temporarily unavailable. Please try placing the order again.");
    unavailable.status = 503;
    throw unavailable;
  }

  await rates.updateOne(
    { provider: rateProvider, providerUpdatedAt: snapshot.providerUpdatedAt },
    { $set: snapshot },
    { upsert: true },
  );
  return snapshot;
}

export function toRateSnapshot(rate) {
  return {
    baseCurrency: rate.baseCurrency,
    quoteCurrency: rate.quoteCurrency,
    pkrPerUsd: rate.pkrPerUsd,
    rateDate: rate.providerUpdatedAt.toISOString().slice(0, 10),
    source: rate.provider,
    fetchedAt: rate.fetchedAt,
  };
}
