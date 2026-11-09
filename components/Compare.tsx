"use client";
import Link from "next/link"; import { usePathname } from "next/navigation"; import { useEffect, useState } from "react";
const KEY = "af_compare";
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
function useCompare() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { const sync = () => setIds(read()); sync(); window.addEventListener("af-compare", sync); return () => window.removeEventListener("af-compare", sync); }, []);
  const toggle = (slug: string) => { // keeps the 3 most recent picks
    const cur = read(); const next = cur.includes(slug) ? cur.filter((x) => x !== slug) : [...cur, slug].slice(-3);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} window.dispatchEvent(new Event("af-compare"));
  };
  return { ids, toggle };
}
export function CompareButton({ slug }: { slug: string }) {
  const { ids, toggle } = useCompare(); const on = ids.includes(slug);
  return <button type="button" aria-pressed={on} onClick={() => toggle(slug)} className={"mt-3 rounded-full border px-4 py-2 text-sm font-semibold " + (on ? "border-ocean bg-ocean text-white" : "border-line bg-white text-ocean hover:border-ocean")}>{on ? "Added to compare" : "Add to compare"}</button>;
}
export function CompareBar() {
  const { ids } = useCompare(); const path = usePathname();
  if (!ids.length || path.startsWith("/admin") || path === "/compare") return null;
  return (
    <div className="fixed bottom-4 left-4 right-28 z-40 flex items-center justify-between gap-3 rounded-full bg-ink px-5 py-3 text-sm text-white shadow-lg md:left-1/2 md:right-auto md:w-96 md:-translate-x-1/2">
      <span>{ids.length} of 3 selected</span><Link href={"/compare?ids=" + ids.join(",")} className="rounded-full bg-leaf px-4 py-1.5 font-semibold text-ink">Compare now</Link></div>);
}
