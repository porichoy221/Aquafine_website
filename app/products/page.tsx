import Link from "next/link"; import ProductCard from "@/components/ProductCard"; import { listProducts } from "@/lib/store"; import { categories } from "@/lib/site";
export const dynamic = "force-dynamic";
export default function Products({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const items = listProducts({ category: searchParams.category, q: searchParams.q }); const chip = (on: boolean) => "rounded-full border px-4 py-1.5 text-sm font-semibold " + (on ? "border-ocean bg-ocean text-white" : "border-line bg-white hover:border-ocean");
  return (
    <main className="mx-auto max-w-6xl px-4 py-10"><h1 className="mb-5 text-4xl">{searchParams.q ? `Results for “${searchParams.q}”` : searchParams.category ?? "All products"}</h1>
      <div className="mb-8 flex flex-wrap gap-2"><Link href="/products" className={chip(!searchParams.category && !searchParams.q)}>All</Link>{categories.map((c) => <Link key={c} href={"/products?category=" + encodeURIComponent(c)} className={chip(searchParams.category === c)}>{c}</Link>)}</div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {items.length === 0 && <p className="rounded-2xl bg-white p-6 text-slate-600">No products here yet. Call us on +880 1715-217871 and we will help.</p>}</main>);
}
