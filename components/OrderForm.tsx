"use client";
import { useState } from "react"; import Bn from "./Bn"; import { districts, fees, mfs, taka } from "@/lib/site";
const PAY = [["COD", "Cash on delivery"], ["BKASH", "bKash"], ["NAGAD", "Nagad"], ["ROCKET", "Rocket"]] as const;
export default function OrderForm({ productId, max, price }: { productId: string; max: number; price: number }) {
  const [f, setF] = useState({ qty: "1", name: "", phone: "", email: "", district: "Dhaka", thana: "", address: "", installation: false, paymentMethod: "COD", trxId: "" });
  const [err, setErr] = useState<Record<string, string[]>>({}); const [done, setDone] = useState<{ number: string; total: number } | null>(null); const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const q = Math.max(1, Number(f.qty) || 1); const delivery = f.district === "Dhaka" ? fees.insideDhaka : fees.outsideDhaka; const install = f.installation ? fees.installation : 0;
  const pending = price <= 0 || delivery === 0 || (f.installation && fees.installation === 0);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr({});
    try { const r = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId, ...f, qty: q }) });
      const d = await r.json(); if (r.ok) setDone(d); else setErr(d.errors ?? { form: [d.error ?? "Something went wrong."] }); }
    catch { setErr({ form: ["Network error. Please try again."] }); } setBusy(false);
  }
  const E = ({ k }: { k: string }) => (err[k] ? <p className="mt-1 text-sm text-red-700">{err[k][0]}</p> : null);
  if (done) return <div className="rounded-3xl bg-mist p-6 text-center"><p className="font-display text-2xl">Order received</p><p className="mt-2 text-lg font-semibold text-ocean">{done.number}</p>
    <p className="mt-2 text-slate-700">We will call {f.phone} to confirm your order{done.total > 0 ? `. Items total ${taka(done.total)}` : ""}. Keep this order number for tracking.</p></div>;
  const mfsNo = f.paymentMethod === "BKASH" ? mfs.bkash : f.paymentMethod === "NAGAD" ? mfs.nagad : f.paymentMethod === "ROCKET" ? mfs.rocket : "";
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl border border-line bg-white p-6">
      <h3 className="text-2xl">Order this purifier <span lang="bn" className="text-base font-normal text-slate-500">অর্ডার করুন</span></h3>
      <label className="font-semibold">Quantity<input type="number" min={1} max={Math.max(1, max)} className="inp mt-1" value={f.qty} onChange={set("qty")} /><E k="qty" /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="font-semibold"><Bn en="Full name" bn="আপনার নাম" /><input className="inp mt-1" autoComplete="name" value={f.name} onChange={set("name")} /><E k="name" /></label>
        <label className="font-semibold"><Bn en="Mobile number" bn="মোবাইল নম্বর" /><input className="inp mt-1" inputMode="numeric" autoComplete="tel" placeholder="01XXXXXXXXX" value={f.phone} onChange={set("phone")} /><E k="phone" /></label>
        <label className="font-semibold sm:col-span-2">Email <span className="font-normal text-slate-500">(optional, for order updates)</span><input className="inp mt-1" type="email" autoComplete="email" value={f.email} onChange={set("email")} /><E k="email" /></label>
        <label className="font-semibold"><Bn en="District" bn="জেলা" /><select className="inp mt-1" value={f.district} onChange={set("district")}>{districts.map((d) => <option key={d}>{d}</option>)}</select><E k="district" /></label>
        <label className="font-semibold"><Bn en="Thana" bn="থানা" /><input className="inp mt-1" value={f.thana} onChange={set("thana")} /><E k="thana" /></label>
        <label className="font-semibold sm:col-span-2"><Bn en="Delivery address" bn="ঠিকানা" /><input className="inp mt-1" autoComplete="street-address" value={f.address} onChange={set("address")} /><E k="address" /></label></div>
      <label className="flex items-start gap-3 rounded-xl bg-mist p-3"><input type="checkbox" className="mt-1.5 h-4 w-4" checked={f.installation} onChange={(e) => setF({ ...f, installation: e.target.checked })} />
        <span><span className="font-semibold">Add technician installation</span><span className="block text-sm text-slate-600">{fees.installation > 0 ? taka(fees.installation) : "Charge confirmed by phone"}</span></span></label>
      <fieldset><legend className="mb-2 font-semibold"><Bn en="Payment" bn="পেমেন্ট" /></legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{PAY.map(([v, t]) => (
          <label key={v} className={"cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold " + (f.paymentMethod === v ? "border-ocean bg-ocean text-white" : "border-line")}>
            <input type="radio" name="pay" className="sr-only" checked={f.paymentMethod === v} onChange={() => setF({ ...f, paymentMethod: v })} />{t}</label>))}</div>
        {f.paymentMethod !== "COD" && (<div className="mt-3 rounded-xl bg-mist p-3 text-sm">
          <p>{mfsNo ? `Send the payment to ${mfsNo}, then enter the transaction ID below.` : "We will tell you the payment number when we call to confirm. If you have already paid, enter the transaction ID."}</p>
          <input className="inp mt-2" placeholder="Transaction ID (optional)" value={f.trxId} onChange={set("trxId")} /><E k="trxId" /></div>)}</fieldset>
      <dl className="grid gap-1 rounded-xl border border-line p-4 text-sm">
        <div className="flex justify-between"><dt>Price × {q}</dt><dd>{price > 0 ? taka(price * q) : "On request"}</dd></div>
        <div className="flex justify-between"><dt>Delivery ({f.district === "Dhaka" ? "inside Dhaka" : "outside Dhaka"})</dt><dd>{delivery > 0 ? taka(delivery) : "Confirmed by phone"}</dd></div>
        {f.installation && <div className="flex justify-between"><dt>Installation</dt><dd>{install > 0 ? taka(install) : "Confirmed by phone"}</dd></div>}
        {!pending && <div className="flex justify-between border-t border-line pt-2 font-semibold"><dt>Total</dt><dd>{taka(price * q + delivery + install)}</dd></div>}</dl>
      <E k="form" /><button disabled={busy || max <= 0} className="btn py-3 text-lg">{max <= 0 ? "Out of stock" : busy ? "Sending..." : "Place order"}</button>
    </form>);
}
