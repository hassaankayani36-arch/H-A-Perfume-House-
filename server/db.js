import { MongoClient } from "mongodb";

let client;
let database;

export async function connectToDatabase() {
  if (!database) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is required.");
    }

    client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    await client.connect();
    database = client.db(process.env.MONGODB_DB || "ha_perfume_house");
    await Promise.all([
      database.collection("products").createIndex({ id: 1 }, { unique: true }),
      database.collection("products").createIndex({ isActive: 1, name: 1 }),
      database.collection("orders").createIndex({ orderNumber: 1 }, { unique: true }),
      database.collection("orders").createIndex({ idempotencyKey: 1 }, { unique: true, sparse: true }),
      database.collection("orders").createIndex({ createdAt: -1 }),
    ]);
  }

  return database;
}

export async function closeDatabase() {
  await client?.close();
  client = undefined;
  database = undefined;
}
