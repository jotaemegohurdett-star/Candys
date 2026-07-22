import { createHmac } from "crypto";
import type { Request, Response, NextFunction } from "express";

const SECRET = process.env["SESSION_SECRET"] ?? "dev-secret";
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

export function signToken(ts: number): string {
  return createHmac("sha256", SECRET).update(`admin:${ts}`).digest("hex");
}

export function verifyAdminCookie(req: Request): boolean {
  const raw = req.cookies?.["admin_token"];
  if (!raw) return false;
  const [tsStr, sig] = raw.split(":");
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) return false;
  if (Date.now() - ts > TOKEN_TTL_MS) return false;
  return sig === signToken(ts);
}

export function adminGuard(req: Request, res: Response, next: NextFunction): void {
  if (verifyAdminCookie(req)) { next(); return; }
  res.status(401).json({ error: "UNAUTHORIZED" });
}
