import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// Vercel's Supabase integration provides POSTGRES_URL for the connected
// production database. Keep DATABASE_URL as the local Replit fallback.
const connectionString = process.env["POSTGRES_URL"] || process.env["DATABASE_URL"];

if (!connectionString) {
  throw new Error(
    "POSTGRES_URL or DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

export * from "./schema";
