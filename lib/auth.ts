import { cookies } from "next/headers"; import crypto from "crypto";
const pw = () => process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "admin123");
const token = () => crypto.createHmac("sha256", process.env.SESSION_SECRET || "dev-secret").update(pw()).digest("hex");
export function isAdmin() {
  const c = cookies().get("af_admin")?.value; const t = token();
  return !!pw() && !!c && c.length === t.length && crypto.timingSafeEqual(Buffer.from(c), Buffer.from(t));
}
export function tryLogin(input: string) {
  const a = Buffer.from(input), b = Buffer.from(pw());
  if (!pw() || a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  cookies().set("af_admin", token(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  return true;
}
export const logout = () => cookies().delete("af_admin");
