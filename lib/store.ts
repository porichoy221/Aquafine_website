import { fees } from "./site"; import fs from "fs"; import path from "path"; import crypto from "crypto";
export type Product = { id: string; slug: string; name: string; category: string; description: string; specs: string; image?: string; price: number; stock: number; lowStockAt: number; active: boolean };
export type OrderStatus = "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED";
export type PayMethod = "COD" | "BKASH" | "NAGAD" | "ROCKET";
export type Order = { id: string; number: string; name: string; phone: string; email?: string; district?: string; thana?: string; address: string; items: { productId: string; name: string; price: number; qty: number }[]; installation?: boolean; deliveryFee?: number; installationFee?: number; paymentMethod?: PayMethod; trxId?: string; paymentStatus?: "UNPAID" | "PAID"; total: number; status: OrderStatus; createdAt: string };
export type BookingStatus = "PENDING" | "ASSIGNED" | "COMPLETED";
export type Booking = { id: string; name: string; phone: string; serviceType: string; date: string; slot?: string; issue?: string; address: string; status: BookingStatus; technician?: string; createdAt: string };
export type Lead = { id: string; name: string; phone: string; area: string; source: string; status: "NEW" | "CONTACTED"; createdAt: string };
export type StockLog = { id: string; productId: string; delta: number; reason: string; at: string };
export type Message = { id: string; name: string; email: string; subject: string; message: string; createdAt: string };
type DB = { products: Product[]; orders: Order[]; bookings: Booking[]; stockLogs: StockLog[]; messages: Message[]; leads: Lead[] };

const FILE = process.env.DATA_FILE || path.join(process.cwd(), "data", "db.json");
export const uploadDir = path.join(path.dirname(FILE), "uploads");
const id = () => crypto.randomUUID();
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const seed = (name: string, category: string, specs: string, description: string, image?: string): Product =>
  ({ id: id(), slug: slugify(name), name, category, specs, description, image, price: 0, stock: 10, lowStockAt: 3, active: true });
const ask = "For order: 01715-217871";

function load(): DB {
  if (!fs.existsSync(FILE)) {
    const db: DB = { orders: [], bookings: [], stockLogs: [], messages: [], leads: [], products: [
      seed("Lan Shan LSRO-575G (RO+Mineral) Water Purifier", "RO Purifier", "6-Stage | RO + Mineral | 18 Months Warranty",
        `Production: 283 liters per day\nReserve tank: 3.2 gallon pressure tank\nDimension: 18×36×44 cm\nOrigin: Taiwan\nBrand: Lan Shan\nFiltration: 6 stages — 1st Micron filter, 2nd Granular active carbon filter, 3rd Active block carbon filter, 4th Reverse osmosis membrane, 5th Taste & odor, 6th Mineral\nWarranty: 18 months\n${ask}`, "/products/lan-shan-lsro-575g.jpg"),
      seed("Standing Hot Cold & Warm Lan Shan LSRO-929-CAR RO Water Purifier", "Hot Cold Normal Purifier", "6-Stage | Hot / Cold / Warm | 1 Year Warranty",
        `Warranty: 1 year\nMade in: Taiwan\nBrand: Lan Shan\nModel: LSRO-929-CAR\nPurification: 6 stages\nFamily usable: 1-5 persons\nRO element: Lan Shan membrane (USA technology)\nReserve tank capacity: 13 liters (max)\nProduction capacity: 07.87(±) liters per hour\n${ask}`, "/products/lsro-929-car.jpg"),
      seed("Bravo 75 GPD Five Stage Reverse Osmosis Water Purifier", "RO Purifier", "5-Stage | RO 75 GPD | 1 Year Warranty",
        `Warranty: 1 year\nMade in: China\nBrand: Bravo\nModel: BRO5-75\nPurification: 5 stages\nFamily usable: 1-8 persons\nRO element: Membrane (USA technology)\nReserve tank capacity: 12 liters (max)\nProduction capacity: 11.81(±) liters per hour\nPump: made in China\nFaucet: SUS 304 stainless steel (WQA patented)\n${ask}`, "/products/bravo-75-gpd.jpg"),
      seed("LAN SHAN Taiwan LSRO-1550-G RO Box Water Filter", "Commercial Water Purifier", "5-Stage | RO Box | 1 Year Warranty",
        `Warranty: 1 year\nMade in: Taiwan\nBrand: Lan Shan\nModel: LSRO-1550-G\nPurification: 5 stages\nFamily usable: 1-10 persons\nRO element: Lan Shan membrane (USA technology)\nReserve tank capacity: 15 liters (max)\nProduction capacity: 07.87 / 15 (±) liters per hour\nUnder-sink RO box\n${ask}`, "/products/lsro-1550-g.jpg"),
      seed("Heron Pro-7 Five Stage Best Water Purifier", "RO Purifier", "5-Stage | RO", `Five stage water purifier. Call for full specifications.\n${ask}`),
      seed("Easy Pure 400 GPD Water Purifier", "RO Purifier", "400 GPD | RO", `400 GPD water purifier. Call for full specifications.\n${ask}`),
    ] };
    fs.mkdirSync(path.dirname(FILE), { recursive: true }); fs.writeFileSync(FILE, JSON.stringify(db, null, 2)); return db;
  }
  const db = JSON.parse(fs.readFileSync(FILE, "utf8")) as DB; db.messages ??= []; db.leads ??= [];
  db.bookings.forEach((b) => { const o = b.status as string; if (o === "NEW") b.status = "PENDING"; if (o === "DONE") b.status = "COMPLETED"; });
  return db;
}
// All reads/writes are synchronous, so each mutation below is atomic within one server process.
const save = (db: DB) => { const tmp = FILE + ".tmp"; fs.writeFileSync(tmp, JSON.stringify(db, null, 2)); fs.renameSync(tmp, FILE); };

export const listProducts = (o: { all?: boolean; category?: string; categories?: string[]; q?: string } = {}) =>
  load().products.filter((p) => (o.all || p.active) && (!o.category || p.category === o.category) && (!o.categories || o.categories.includes(p.category)) &&
    (!o.q || (p.name + p.specs + p.category).toLowerCase().includes(o.q.toLowerCase())));
export const getProduct = (key: string) => load().products.find((p) => p.id === key || p.slug === key);
export const listOrders = () => load().orders.slice().reverse();
export const listBookings = () => load().bookings.slice().reverse();
export const listLeads = () => load().leads.slice().reverse();
export const listMessages = () => load().messages.slice().reverse();
export const stockLogsFor = (pid: string) => load().stockLogs.filter((l) => l.productId === pid).slice(-10).reverse();

export function saveProduct(input: Omit<Product, "id" | "slug" | "image"> & { id?: string; image?: string }) {
  const db = load();
  if (input.id) {
    const p = db.products.find((x) => x.id === input.id); if (!p) return;
    const before = p.stock; const { image, ...rest } = input; Object.assign(p, rest); if (image) p.image = image;
    if (before !== p.stock) db.stockLogs.push({ id: id(), productId: p.id, delta: p.stock - before, reason: "Set from edit form", at: new Date().toISOString() });
  } else {
    const p: Product = { ...input, id: id(), slug: slugify(input.name) + "-" + id().slice(0, 4) };
    db.products.push(p);
    if (p.stock) db.stockLogs.push({ id: id(), productId: p.id, delta: p.stock, reason: "Opening stock", at: new Date().toISOString() });
  }
  save(db);
}
export function adjustStock(pid: string, delta: number, reason: string) {
  const db = load(); const p = db.products.find((x) => x.id === pid); if (!p) return;
  p.stock = Math.max(0, p.stock + delta);
  db.stockLogs.push({ id: id(), productId: pid, delta, reason: reason || "Manual adjustment", at: new Date().toISOString() }); save(db);
}
type NewOrder = { productId: string; qty: number; name: string; phone: string; email?: string; district: string; thana: string; address: string; installation: boolean; paymentMethod: PayMethod; trxId?: string };
export function createOrder(i: NewOrder): { ok: true; number: string; total: number } | { ok: false; error: string } {
  const db = load(); const p = db.products.find((x) => x.id === i.productId && x.active);
  if (!p) return { ok: false, error: "Product not found." };
  if (p.stock < i.qty) return { ok: false, error: p.stock ? `Only ${p.stock} left in stock.` : "Out of stock." };
  p.stock -= i.qty;
  // Price, delivery and installation are all calculated here on the server, never taken from the browser.
  const deliveryFee = i.district === "Dhaka" ? fees.insideDhaka : fees.outsideDhaka; const installationFee = i.installation ? fees.installation : 0;
  const total = p.price * i.qty + deliveryFee + installationFee; const number = "AF-" + Date.now().toString(36).toUpperCase();
  db.orders.push({ id: id(), number, name: i.name, phone: i.phone, email: i.email || undefined, district: i.district, thana: i.thana, address: i.address,
    items: [{ productId: p.id, name: p.name, price: p.price, qty: i.qty }], installation: i.installation, deliveryFee, installationFee,
    paymentMethod: i.paymentMethod, trxId: i.trxId || undefined, paymentStatus: "UNPAID", total, status: "PENDING", createdAt: new Date().toISOString() });
  db.stockLogs.push({ id: id(), productId: p.id, delta: -i.qty, reason: "Order " + number, at: new Date().toISOString() });
  save(db); return { ok: true, number, total };
}
export function setPaymentStatus(oid: string, ps: "UNPAID" | "PAID") { const db = load(); const o = db.orders.find((x) => x.id === oid); if (o) { o.paymentStatus = ps; save(db); } }
export function setOrderStatus(oid: string, status: OrderStatus) {
  const db = load(); const o = db.orders.find((x) => x.id === oid); if (!o || o.status === status) return;
  const restock = (sign: 1 | -1) => o.items.forEach((it) => { const p = db.products.find((x) => x.id === it.productId); if (p) { p.stock = Math.max(0, p.stock + sign * it.qty); db.stockLogs.push({ id: id(), productId: p.id, delta: sign * it.qty, reason: `${sign > 0 ? "Cancelled" : "Reopened"} ${o.number}`, at: new Date().toISOString() }); } });
  if (status === "CANCELLED") restock(1); else if (o.status === "CANCELLED") restock(-1);
  o.status = status; save(db);
}
export function createBooking(b: Omit<Booking, "id" | "status" | "createdAt" | "technician">) {
  const db = load(); db.bookings.push({ ...b, id: id(), status: "PENDING", createdAt: new Date().toISOString() }); save(db);
}
export function assignBooking(bid: string, technician: string, status: BookingStatus) {
  const db = load(); const b = db.bookings.find((x) => x.id === bid); if (!b) return;
  b.technician = technician || undefined; b.status = status === "PENDING" && technician ? "ASSIGNED" : status; save(db);
}
export function createLead(l: Omit<Lead, "id" | "status" | "createdAt">) { const db = load(); db.leads.push({ ...l, id: id(), status: "NEW", createdAt: new Date().toISOString() }); save(db); }
export function setLeadStatus(lid: string, status: Lead["status"]) { const db = load(); const l = db.leads.find((x) => x.id === lid); if (l) { l.status = status; save(db); } }
export function createMessage(m: Omit<Message, "id" | "createdAt">) {
  const db = load(); db.messages.push({ ...m, id: id(), createdAt: new Date().toISOString() }); save(db);
}
