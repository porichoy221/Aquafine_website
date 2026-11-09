import Link from "next/link"; import { getProduct, Product } from "@/lib/store"; import { parseSpecs } from "@/lib/specs"; import { taka } from "@/lib/site";
export const dynamic = "force-dynamic"; export const metadata = { title: "Compare products – Aqua Fine Engineering" };
export default function Compare({ searchParams }: { searchParams: { ids?: string } }) {
  const items = (searchParams.ids ?? "").split(",").filter(Boolean).slice(0, 3).map((s) => getProduct(s)).filter((p): p is Product => !!p);
  if (!items.length) return <main className="mx-auto max-w-3xl px-4 py-16 text-center"><h1 className="text-3xl">Nothing to compare yet</h1><p className="mt-3 text-slate-600">Press “Add to compare” on up to three products, then come back here.</p><Link href="/products" className="btn mt-6">Browse products</Link></main>;
  const specs = items.map((p) => Object.fromEntries(parseSpecs(p.description).rows)); const keys = Array.from(new Set(specs.flatMap((s) => Object.keys(s))));
  const th = "w-40 bg-mist px-4 py-3 text-left align-top font-semibold text-slate-700";
  return (
    <main className="mx-auto max-w-6xl px-4 py-10"><h1 className="mb-6 text-4xl">Compare products</h1>
      <div className="overflow-x-auto rounded-3xl border border-line bg-white"><table className="w-full min-w-[640px] border-collapse text-left">
        <thead><tr><th className={th}></th>{items.map((p) => <td key={p.id} className="border-l border-line p-4 align-top"><div className="flex h-32 items-center justify-center">{p.image ? <img src={p.image} alt="" className="max-h-full max-w-full object-contain" /> : null}</div>
          <Link href={"/products/" + p.slug} className="mt-2 block font-display text-lg font-semibold hover:text-ocean">{p.name}</Link></td>)}</tr></thead>
        <tbody><tr className="border-t border-line"><th className={th}>Price</th>{items.map((p) => <td key={p.id} className="border-l border-line px-4 py-3 font-semibold text-ocean">{taka(p.price)}</td>)}</tr>
          <tr className="border-t border-line"><th className={th}>Availability</th>{items.map((p) => <td key={p.id} className="border-l border-line px-4 py-3">{p.stock > 0 ? "In stock" : "Out of stock"}</td>)}</tr>
          {keys.map((k) => <tr key={k} className="border-t border-line"><th className={th}>{k}</th>{specs.map((s, i) => <td key={i} className="border-l border-line px-4 py-3">{s[k] ?? "-"}</td>)}</tr>)}</tbody></table></div></main>);
}
