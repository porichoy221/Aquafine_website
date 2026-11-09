import Link from "next/link"; import { listProducts } from "@/lib/store"; import { adjustStockAction } from "../../actions"; import { taka } from "@/lib/site";
export default function Products() {
  return (<div><div className="mb-4 flex items-center justify-between"><h1 className="text-xl font-extrabold">Products &amp; Stock</h1><Link href="/admin/products/new" className="btn">+ Add product</Link></div>
    <div className="overflow-x-auto rounded-2xl bg-white"><table className="w-full text-sm"><thead><tr className="text-left text-xs text-slate-500"><th className="p-3">Product</th><th>Price</th><th>Stock</th><th>Adjust stock</th></tr></thead><tbody>
      {listProducts({ all: true }).map((p) => (<tr key={p.id} className="border-t align-top"><td className="p-3"><Link href={"/admin/products/" + p.id} className="font-bold text-ocean">{p.name}</Link><p className="text-xs text-slate-500">{p.category}{p.active ? "" : " · hidden"}</p></td>
        <td>{taka(p.price)}</td><td className={p.stock <= p.lowStockAt ? "font-bold text-red-600" : "font-bold"}>{p.stock}</td>
        <td><form action={adjustStockAction} className="flex gap-1"><input type="hidden" name="id" value={p.id} /><input name="delta" type="number" placeholder="+5 / -2" className="inp w-24" /><input name="reason" placeholder="Reason" className="inp w-32" /><button className="btn">Save</button></form></td></tr>))}
    </tbody></table></div></div>);
}
