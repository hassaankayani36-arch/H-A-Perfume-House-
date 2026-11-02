import "dotenv/config";
import { products as sourceProducts } from "../Data/data.js";
import { connectToDatabase, closeDatabase } from "./db.js";
import { toSeedProduct } from "./catalog.js";

try {
  const database = await connectToDatabase();
  const products = database.collection("products");
  const operations = sourceProducts.map((product, index) => {
    const { sortOrder, ...insertDocument } = toSeedProduct(product, index);
    return {
      updateOne: {
        filter: { id: product.id },
        update: {
          $set: { sortOrder },
          $setOnInsert: insertDocument,
        },
        upsert: true,
      },
    };
  });
  const result = await products.bulkWrite(operations, { ordered: false });
  console.log(`Catalog seed finished: ${result.upsertedCount} added, ${result.matchedCount} already present.`);
} finally {
  await closeDatabase();
}
