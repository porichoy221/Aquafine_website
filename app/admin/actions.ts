"use server";
import { redirect } from "next/navigation"; import { revalidatePath } from "next/cache";
import { isAdmin, tryLogin, logout } from "@/lib/auth";
import * as store from "@/lib/store"; import fs from "fs"; import path from "path"; import crypto from "crypto";
const guard = () => { if (!isAdmin()) redirect("/admin/login"); };
const refresh = () => { revalidatePath("/admin", "layout"); revalidatePath("/products", "layout"); revalidatePath("/"); };
const num = (v: FormDataEntryValue | null) => Math.max(0, Math.round(Number(v) || 0));
export async function loginAction(fd: FormData) { redirect(tryLogin(String(fd.get("password") ?? "")) ? "/admin" : "/admin/login?error=1"); }
export async function logoutAction() { logout(); redirect("/admin/login"); }
export async function saveProductAction(fd: FormData) {
  guard();
  const name = String(fd.get("name") ?? "").trim(); if (!name) return;
  let image: string | undefined; const file = fd.get("image"); const ext = file instanceof File ? ({ "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" } as Record<string, string>)[file.type] : undefined;
  if (file instanceof File && ext && file.size > 0 && file.size <= 3_000_000) { // only png/jpg/webp up to 3 MB
    const fname = crypto.randomUUID() + "." + ext; fs.mkdirSync(store.uploadDir, { recursive: true });
    fs.writeFileSync(path.join(store.uploadDir, fname), Buffer.from(await file.arrayBuffer())); image = "/uploads/" + fname;
  }
  store.saveProduct({ image, id: String(fd.get("id") ?? "") || undefined, name, category: String(fd.get("category")), description: String(fd.get("description") ?? ""),
    specs: String(fd.get("specs") ?? ""), price: num(fd.get("price")), stock: num(fd.get("stock")), lowStockAt: num(fd.get("lowStockAt")), active: fd.get("active") === "on" });
  refresh(); redirect("/admin/products");
}
export async function adjustStockAction(fd: FormData) {
  guard(); const d = Math.trunc(Number(fd.get("delta"))); if (!d) return;
  store.adjustStock(String(fd.get("id")), d, String(fd.get("reason") ?? "")); refresh();
}
export async function orderStatusAction(fd: FormData) { guard(); store.setOrderStatus(String(fd.get("id")), String(fd.get("status")) as store.OrderStatus); refresh(); }
export async function assignBookingAction(fd: FormData) { guard(); store.assignBooking(String(fd.get("id")), String(fd.get("technician") ?? "").trim().slice(0, 60), String(fd.get("status")) as store.BookingStatus); refresh(); }
export async function paymentStatusAction(fd: FormData) { guard(); store.setPaymentStatus(String(fd.get("id")), String(fd.get("status")) === "PAID" ? "PAID" : "UNPAID"); refresh(); }
export async function leadStatusAction(fd: FormData) { guard(); store.setLeadStatus(String(fd.get("id")), String(fd.get("status")) === "CONTACTED" ? "CONTACTED" : "NEW"); refresh(); }
