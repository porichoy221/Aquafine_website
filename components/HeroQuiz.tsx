"use client";
import Link from "next/link"; import { useState } from "react";
import { QuizProduct, quizOptions, recommend } from "@/lib/recommend"; import { taka } from "@/lib/site";
type Key = "source" | "use" | "size";
export default function HeroQuiz({ products }: { products: QuizProduct[] }) {
  const [a, setA] = useState<Partial<Record<Key, string>>>({});
  const done = a.source && a.use && a.size;
  const r = done ? recommend(products, { source: a.source!, use: a.use!, size: a.size! }) : null;
  const rows: [Key, string, string[]][] = [["source", "Where does your water come from?", quizOptions.source], ["use", "Where will it be used?", quizOptions.use], ["size", "How many people will drink from it?", quizOptions.size]];
  return (
    <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl">
      <h2 className="text-2xl">Which purifier suits you?</h2><p lang="bn" className="mb-4 text-slate-500">আপনার জন্য কোন পিউরিফায়ার?</p>
      {r?.product ? (
        <div>
          <div className="flex gap-4 rounded-2xl bg-mist p-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white">{r.product.image ? <img src={r.product.image} alt="" className="max-h-full max-w-full object-contain" /> : null}</div>
            <div><p className="text-sm font-semibold text-eco">Your best match</p><p className="font-semibold leading-snug">{r.product.name}</p><p className="text-sm text-slate-600">{r.product.specs}</p><p className="font-display text-xl font-semibold text-ocean">{taka(r.product.price)}</p></div></div>
          {r.note && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm">{r.note} <Link href="/industrial-solution/iron-removal-plant" className="font-semibold text-ocean underline">Learn more</Link></p>}
          <Link href={"/products/" + r.product.slug} className="btn mt-4 w-full py-3">View details and order</Link>
          <button onClick={() => setA({})} className="mt-2 w-full py-2 text-sm font-semibold text-slate-600 hover:text-ocean">Start over</button>
        </div>
      ) : (<>
        {rows.map(([k, title, opts]) => (
          <fieldset key={k} className="mb-4"><legend className="mb-2 text-sm font-semibold">{title}</legend>
            <div className="grid grid-cols-3 gap-2">{opts.map((o) => (
              <button key={o} type="button" aria-pressed={a[k] === o} onClick={() => setA({ ...a, [k]: o })} className={"rounded-xl border px-2 py-2.5 text-sm font-semibold " + (a[k] === o ? "border-ocean bg-ocean text-white" : "border-line bg-white hover:border-ocean")}>{o}</button>))}</div></fieldset>))}
        <p className="text-sm text-slate-500">Answer all three and we will show the model that fits.</p>
      </>)}
    </div>);
}
