import app from "./app.js";
import { closeDatabase, connectToDatabase } from "./db.js";

const port = Number(process.env.PORT || 3001);

await connectToDatabase();
const server = app.listen(port, () => console.log(`H&A API listening on port ${port}.`));

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    server.close();
    await closeDatabase();
    process.exit(0);
  });
}
