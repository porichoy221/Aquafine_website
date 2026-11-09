import { notFound } from "next/navigation"; import { getProduct, stockLogsFor } from "@/lib/store"; import { categories } from "@/lib/site"; import { saveProductAction } from "../../../actions";
export default function Edit({ params }: { params: { id: string } }) {
  const p = params.id === "new" ? null : getProduct(params.id); if (params.id !== "new" && !p) notFound();
  const L = ({ t, children }: { t: string; children: React.ReactNode }) => <label className="text-sm font-semibold">{t}{children}</label>;
  return (<div className="grid gap-6 md:grid-cols-2"><form action={saveProductAction} className="grid gap-3 rounded-2xl bg-white p-5">
    <h1 className="text-xl font-extrabold">{p ? "Edit product" : "New product"}</h1>{p && <input type="hidden" name="id" value={p.id} />}
    <L t="Name"><input name="name" required defaultValue={p?.name} className="inp" /></L>
    <L t="Category"><select name="category" defaultValue={p?.category} className="inp">{categories.map((c) => <option key={c}>{c}</option>)}</select></L>
    <L t="Photo (png, jpg or webp, max 3 MB)"><input type="file" name="image" accept="image/png,image/jpeg,image/webp" className="inp" /></L>
    {p?.image && <img src={p.image} alt="" className="h-24 object-contain" />}
    <L t="Specs (separate with |)"><input name="specs" defaultValue={p?.specs} className="inp" /></L>
    <L t="Details — one per line as Key: Value (e.g. Warranty: 1 year). These become the specification table and the compare page."><textarea name="description" defaultValue={p?.description} rows={8} className="inp" /></L>
    <div className="grid grid-cols-3 gap-3"><L t="Price (৳, 0 = on request)"><input name="price" type="number" min={0} defaultValue={p?.price ?? 0} className="inp" /></L>
      <L t="Stock"><input name="stock" type="number" min={0} defaultValue={p?.stock ?? 0} className="inp" /></L><L t="Low-stock alert at"><input name="lowStockAt" type="number" min={0} defaultValue={p?.lowStockAt ?? 3} className="inp" /></L></div>
    <label className="text-sm font-semibold"><input type="checkbox" name="active" defaultChecked={p?.active ?? true} /> Visible on website</label><button className="btn">Save</button></form>
    {p && <div className="rounded-2xl bg-white p-5"><h2 className="mb-2 font-bold">Stock history</h2>{stockLogsFor(p.id).map((l) => (
      <p key={l.id} className="text-sm"><b className={l.delta < 0 ? "text-red-600" : "text-eco"}>{l.delta > 0 ? "+" : ""}{l.delta}</b> · {l.reason} <span className="text-xs text-slate-400">{new Date(l.at).toLocaleString("en-GB")}</span></p>))}</div>}</div>);
}
