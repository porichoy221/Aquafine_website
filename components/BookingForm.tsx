"use client";
import { useState } from "react"; import Bn from "./Bn"; import { slots } from "@/lib/site";
const TYPES = ["Filter Cartridge Change", "RO Membrane Repair", "General Servicing", "New Installation", "Industrial Plant Enquiry"];
export default function BookingForm() {
  const [f, setF] = useState({ name: "", phone: "", serviceType: TYPES[0], date: "", slot: slots[0] as string, issue: "", address: "" }); const [err, setErr] = useState<Record<string, string[]>>({});
  const [done, setDone] = useState<{ name: string; phone: string } | null>(null); const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr({});
    try { const r = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); const d = await r.json(); if (r.ok) setDone(d); else setErr(d.errors ?? { form: [d.error ?? "Something went wrong."] }); }
    catch { setErr({ form: ["Network error. Please try again."] }); } setBusy(false);
  }
  const E = ({ k }: { k: string }) => (err[k] ? <p className="mt-1 text-sm text-red-700">{err[k][0]}</p> : null);
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <h2 className="text-2xl">Book a service visit</h2><p lang="bn" className="mb-4 text-slate-500">সার্ভিস বুক করুন</p>
      {done ? <div className="rounded-2xl bg-mist p-6 text-center"><p className="font-display text-xl">Booking received</p><p className="mt-2 text-slate-700">Thanks {done.name}. We will call {done.phone} to confirm the visit.</p>
        <button onClick={() => { setDone(null); setF({ ...f, name: "", phone: "", date: "", issue: "", address: "" }); }} className="mt-3 font-semibold text-ocean underline">Book another visit</button></div> : (
        <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          <label className="font-semibold"><Bn en="Full name" bn="আপনার নাম" /><input className="inp mt-1" autoComplete="name" value={f.name} onChange={set("name")} /><E k="name" /></label>
          <label className="font-semibold"><Bn en="Mobile number" bn="মোবাইল নম্বর" /><input className="inp mt-1" inputMode="numeric" placeholder="01XXXXXXXXX" value={f.phone} onChange={set("phone")} /><E k="phone" /></label>
          <label className="font-semibold">What do you need?<select className="inp mt-1" value={f.serviceType} onChange={set("serviceType")}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
          <label className="font-semibold">Preferred date<input type="date" className="inp mt-1" value={f.date} onChange={set("date")} /><E k="date" /></label>
          <label className="font-semibold sm:col-span-2">Preferred time<select className="inp mt-1" value={f.slot} onChange={set("slot")}>{slots.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="font-semibold sm:col-span-2"><Bn en="Address" bn="ঠিকানা" /><input className="inp mt-1" value={f.address} onChange={set("address")} /><E k="address" /></label>
          <label className="font-semibold sm:col-span-2">What is the problem? <span className="font-normal text-slate-500">(optional)</span><textarea rows={3} className="inp mt-1" value={f.issue} onChange={set("issue")} /></label>
          <E k="form" /><button disabled={busy} className="btn py-3 sm:col-span-2">{busy ? "Sending..." : "Book visit"}</button></form>)}
    </div>);
}
