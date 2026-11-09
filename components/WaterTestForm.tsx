"use client";
import { useState } from "react"; import Bn from "./Bn";
export default function WaterTestForm() {
  const [f, setF] = useState({ name: "", phone: "", area: "", source: "Tap water" }); const [err, setErr] = useState<Record<string, string[]>>({}); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr({});
    try { const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); const d = await r.json(); if (r.ok) setDone(true); else setErr(d.errors ?? { form: [d.error ?? "Something went wrong."] }); }
    catch { setErr({ form: ["Network error. Please try again."] }); } setBusy(false);
  }
  const E = ({ k }: { k: string }) => (err[k] ? <p className="mt-1 text-sm text-red-700">{err[k][0]}</p> : null);
  return (
    <div className="rounded-3xl bg-ocean p-6 text-white" id="water-test">
      <h2 className="text-2xl">Not sure what you need?</h2><p lang="bn" className="mb-1 text-mist">পানি পরীক্ষা ও পরামর্শ</p>
      <p className="mb-4 text-white/85">Tell us where you live and where your water comes from. An expert will call you to arrange a water test and advise.</p>
      {done ? <div className="rounded-2xl bg-white p-5 text-ink"><p className="font-display text-xl">Request received</p><p className="mt-1">We will call {f.phone} soon.</p></div> : (
        <form onSubmit={submit} noValidate className="grid gap-3">
          <label className="font-semibold"><Bn en="Your name" bn="নাম" tone="text-mist" /><input className="inp mt-1 text-ink" value={f.name} onChange={set("name")} /><E k="name" /></label>
          <label className="font-semibold"><Bn en="Mobile number" bn="মোবাইল নম্বর" tone="text-mist" /><input className="inp mt-1 text-ink" inputMode="numeric" placeholder="01XXXXXXXXX" value={f.phone} onChange={set("phone")} /><E k="phone" /></label>
          <label className="font-semibold">Area<input className="inp mt-1 text-ink" placeholder="e.g. Mirpur 10, Dhaka" value={f.area} onChange={set("area")} /><E k="area" /></label>
          <fieldset><legend className="mb-1 font-semibold">Water source</legend><div className="grid grid-cols-2 gap-2">{["Tap water", "Deep tube-well"].map((s) => (
            <label key={s} className={"cursor-pointer rounded-xl border px-3 py-2.5 text-center font-semibold " + (f.source === s ? "border-white bg-white text-ocean" : "border-white/40")}>
              <input type="radio" name="src" className="sr-only" checked={f.source === s} onChange={() => setF({ ...f, source: s })} />{s}</label>))}</div></fieldset>
          <E k="form" /><button disabled={busy} className="btn-leaf py-3 text-lg disabled:opacity-50">{busy ? "Sending..." : "Request a call"}</button></form>)}
    </div>);
}
