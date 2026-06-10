import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { dbClient?: ReturnType<typeof postgres> };

// prepare: false — required for Neon's pooled (pgbouncer) connection string.
// max: 1 — each serverless function instance keeps a single connection.
const client =
  globalForDb.dbClient ??
  postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
if (process.env.NODE_ENV !== "production") globalForDb.dbClient = client;

export const db = drizzle(client, { schema });
