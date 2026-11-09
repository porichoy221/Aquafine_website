import ProductCard from "@/components/ProductCard"; import { listProducts } from "@/lib/store"; import { industrialCategories } from "@/lib/site";
export const dynamic = "force-dynamic";
export default function Industrial() {
  const items = listProducts({ categories: industrialCategories });
  return (
    <main className="mx-auto max-w-6xl px-4 py-10"><h1 className="mb-2 text-3xl font-extrabold">Industrial Products</h1><p className="mb-6 text-slate-600">Industrial products, pumps &amp; blowers, filtration media and chemicals.</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {items.length === 0 && <p className="rounded-2xl bg-white p-6 text-slate-500">Products coming soon. Please call {" "}+880 1715-217871 for current availability.</p>}</main>);
}
