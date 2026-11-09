import { listLeads } from "@/lib/store"; import { leadStatusAction } from "../../actions";
export default function Leads() {
  const items = listLeads();
  return (<div><h1 className="mb-4 text-xl">Water-test requests</h1><div className="grid gap-3">{items.map((l) => (
    <div key={l.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-white p-4 text-sm"><div><p className="font-bold">{l.name} · <a className="text-ocean underline" href={"tel:" + l.phone}>{l.phone}</a></p>
      <p className="text-slate-500">{l.area} · {l.source} · {new Date(l.createdAt).toLocaleString("en-GB")}</p></div>
      <form action={leadStatusAction} className="flex gap-1"><input type="hidden" name="id" value={l.id} /><select name="status" defaultValue={l.status} className="inp w-36"><option>NEW</option><option>CONTACTED</option></select><button className="btn">Update</button></form></div>))}
    {items.length === 0 && <p className="text-slate-500">No requests yet.</p>}</div></div>);
}
