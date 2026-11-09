import Link from "next/link"; import { listProducts, listOrders, listBookings, listLeads } from "@/lib/store";
export default function Dash() {
  const ps = listProducts({ all: true }), low = ps.filter((p) => p.active && p.stock <= p.lowStockAt);
  const card = (t: string, n: number) => <div className="rounded-2xl border border-line bg-white p-5"><p className="text-sm text-slate-500">{t}</p><p className="text-3xl font-bold text-ocean">{n}</p></div>;
  return (<div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{card("Products", ps.length)}{card("Pending orders", listOrders().filter((o) => o.status === "PENDING").length)}{card("Service requests waiting", listBookings().filter((b) => b.status === "PENDING").length)}{card("New water-test requests", listLeads().filter((l) => l.status === "NEW").length)}{card("Low or out of stock", low.length)}</div>
    <h2 className="mb-2 mt-6 font-bold">Needs restocking</h2><div className="rounded-2xl border border-line bg-white p-4">{low.length ? low.map((p) => <p key={p.id}><Link className="text-ocean underline" href={"/admin/products/" + p.id}>{p.name}</Link> — {p.stock} left</p>) : "Everything is well stocked."}</div></div>);
}
