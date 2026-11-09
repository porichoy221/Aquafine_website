import { notFound } from "next/navigation"; import OrderForm from "@/components/OrderForm"; import { CompareButton } from "@/components/Compare"; import { getProduct } from "@/lib/store"; import { parseSpecs } from "@/lib/specs"; import { taka } from "@/lib/site";
export const dynamic = "force-dynamic";
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug); if (!p || !p.active) notFound();
  const { rows, notes } = parseSpecs(p.description);
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="flex h-96 items-center justify-center rounded-3xl border border-line bg-gradient-to-b from-white to-mist p-6">{p.image ? <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" /> : <span className="text-slate-400">Photo coming soon</span>}</div>
        <h2 className="mb-3 mt-8 text-2xl">Specifications</h2>
        <dl className="divide-y divide-line rounded-2xl border border-line bg-white">{rows.map(([k, v]) => <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr]"><dt className="text-slate-500">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
        {notes.map((n) => <p key={n} className="mt-3 text-slate-600">{n}</p>)}</div>
      <div><p className="text-slate-500">{p.category}</p><h1 className="mt-1 text-3xl leading-tight">{p.name}</h1>
        <p className="mt-3 font-display text-4xl font-semibold text-ocean">{taka(p.price)}</p>
        <p className={"mt-1 font-semibold " + (p.stock <= 0 ? "text-red-700" : "text-eco")}>{p.stock <= 0 ? "Out of stock" : p.stock <= p.lowStockAt ? `Only ${p.stock} left` : "In stock"}</p>
        <ul className="mt-4 flex flex-wrap gap-2">{p.specs.split("|").map((s) => <li key={s} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-ocean">{s.trim()}</li>)}</ul>
        <CompareButton slug={p.slug} /><div className="mt-6"><OrderForm productId={p.id} max={p.stock} price={p.price} /></div></div></main>);
}
