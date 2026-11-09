"use client";
import { useState } from "react";
export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" }); const [err, setErr] = useState<Record<string, string[]>>({}); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr({});
    try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); const d = await r.json(); if (r.ok) setDone(true); else setErr(d.errors ?? { form: [d.error ?? "Something went wrong."] }); }
    catch { setErr({ form: ["Network error. Please try again."] }); } setBusy(false);
  }
  const E = ({ k }: { k: string }) => (err[k] ? <p className="mt-1 text-xs text-red-600">{err[k][0]}</p> : null);
  if (done) return <div className="rounded-2xl bg-eco/10 p-8 text-center"><p className="text-3xl text-eco">✓</p><p className="font-bold">Message sent</p><p className="mt-1 text-sm text-slate-600">Thank you. We will get back to you soon.</p></div>;
  return (
    <form onSubmit={submit} noValidate className="grid gap-3 rounded-2xl border bg-white p-5">
      <label className="text-sm font-semibold">Your name<input className="inp" value={f.name} onChange={set("name")} /><E k="name" /></label>
      <label className="text-sm font-semibold">Your email<input className="inp" value={f.email} onChange={set("email")} /><E k="email" /></label>
      <label className="text-sm font-semibold">Subject<input className="inp" value={f.subject} onChange={set("subject")} /><E k="subject" /></label>
      <label className="text-sm font-semibold">Your message (optional)<textarea rows={5} className="inp" value={f.message} onChange={set("message")} /></label>
      <E k="form" /><button disabled={busy} className="btn py-3">{busy ? "Sending..." : "Submit"}</button></form>);
}
