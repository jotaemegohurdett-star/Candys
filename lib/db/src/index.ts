import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { rootCertificates } from "node:tls";
import { supabaseCa } from "./supabase-ca";
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

const databaseUrl = new URL(connectionString);
const isSupabase = databaseUrl.hostname.endsWith(".supabase.com") ||
  databaseUrl.hostname.endsWith(".supabase.co");
if (isSupabase) {
  // URL SSL options otherwise override pg's explicit CA configuration.
  for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) {
    databaseUrl.searchParams.delete(key);
  }
}

export const pool = new Pool({
  connectionString: isSupabase ? databaseUrl.toString() : connectionString,
  ...(isSupabase ? {
    ssl: { rejectUnauthorized: true, ca: [...rootCertificates, supabaseCa] },
  } : {}),
});
export const db = drizzle(pool, { schema });

export * from "./schema";
