import Link from "next/link"; import { Product } from "@/lib/store"; import { taka } from "@/lib/site"; import { CompareButton } from "./Compare";
export default function ProductCard({ p }: { p: Product }) {
  const out = p.stock <= 0;
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <Link href={"/products/" + p.slug} className="flex h-52 items-center justify-center bg-gradient-to-b from-white to-mist p-5">
        {p.image ? <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" /> : <span className="text-sm text-slate-400">Photo coming soon</span>}</Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-slate-500">{p.category}</p>
        <h3 className="mt-1 text-xl leading-snug"><Link href={"/products/" + p.slug} className="hover:text-ocean">{p.name}</Link></h3>
        <p className="mt-1 text-sm text-slate-600">{p.specs}</p>
        <div className="mt-auto flex items-end justify-between pt-4"><span className="font-display text-2xl font-semibold text-ocean">{taka(p.price)}</span>
          <span className={"text-sm font-semibold " + (out ? "text-red-700" : "text-eco")}>{out ? "Out of stock" : "In stock"}</span></div>
        <CompareButton slug={p.slug} /></div></article>);
}
