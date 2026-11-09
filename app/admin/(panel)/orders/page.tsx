import { listOrders } from "@/lib/store"; import { orderStatusAction, paymentStatusAction } from "../../actions";
const S = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"]; const tk = (n?: number) => "৳" + (n ?? 0).toLocaleString("en-US");
export default function Orders() {
  const orders = listOrders();
  return (<div><h1 className="mb-4 text-xl">Orders</h1><div className="grid gap-3">{orders.map((o) => (
    <div key={o.id} className="rounded-2xl border border-line bg-white p-4 text-sm"><div className="flex flex-wrap justify-between gap-2"><p className="font-bold">{o.number} · {new Date(o.createdAt).toLocaleString("en-GB")}</p>
      <form action={orderStatusAction} className="flex gap-1"><input type="hidden" name="id" value={o.id} /><select name="status" defaultValue={o.status} className="inp w-36">{S.map((s) => <option key={s}>{s}</option>)}</select><button className="btn">Update</button></form></div>
      <p>{o.name} · {o.phone}{o.email ? " · " + o.email : ""}</p><p className="text-slate-500">{o.address}{o.thana ? ", " + o.thana : ""}{o.district ? ", " + o.district : ""}</p>
      {o.items.map((i) => <p key={i.productId}>{i.qty} × {i.name} — {tk(i.price)}</p>)}
      <p>Delivery {tk(o.deliveryFee)} · Installation: {o.installation ? "requested, " + tk(o.installationFee) : "no"}</p><p className="font-bold">Total {tk(o.total)}</p>
      <form action={paymentStatusAction} className="mt-2 flex flex-wrap items-center gap-2"><input type="hidden" name="id" value={o.id} /><span>Payment: {o.paymentMethod ?? "COD"}{o.trxId ? " · TrxID " + o.trxId : ""}</span>
        <select name="status" defaultValue={o.paymentStatus ?? "UNPAID"} className="inp w-32"><option>UNPAID</option><option>PAID</option></select><button className="btn">Save payment</button></form></div>))}
    {orders.length === 0 && <p className="text-slate-500">No orders yet.</p>}</div></div>);
}
