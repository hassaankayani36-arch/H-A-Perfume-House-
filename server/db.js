import { MongoClient } from "mongodb";

let client;
let database;
let connectionPromise;

export async function connectToDatabase() {
  if (database) return database;
  if (!connectionPromise) {
    connectionPromise = (async () => {
      const uri = process.env.MONGODB_URI;
      if (!uri) throw new Error("MONGODB_URI is required.");

      const nextClient = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
      try {
        await nextClient.connect();
        const nextDatabase = nextClient.db(process.env.MONGODB_DB || "ha_perfume_house");
        await Promise.all([
          nextDatabase.collection("products").createIndex({ id: 1 }, { unique: true }),
          nextDatabase.collection("products").createIndex({ isActive: 1, name: 1 }),
          nextDatabase.collection("orders").createIndex({ orderNumber: 1 }, { unique: true }),
          nextDatabase.collection("orders").createIndex({ idempotencyKey: 1 }, { unique: true, sparse: true }),
          nextDatabase.collection("orders").createIndex({ createdAt: -1 }),
          nextDatabase.collection("orders").createIndex({ customerId: 1, createdAt: -1 }),
          nextDatabase.collection("customers").createIndex({ email: 1 }),
          nextDatabase.collection("exchangeRates").createIndex({ provider: 1, providerUpdatedAt: -1 }),
        ]);
        client = nextClient;
        database = nextDatabase;
        return nextDatabase;
      } catch (error) {
        await nextClient.close();
        throw error;
      }
    })().catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }
  return connectionPromise;
}

export async function closeDatabase() {
  const activeClient = client;
  client = undefined;
  database = undefined;
  connectionPromise = undefined;
  await activeClient?.close();
}
