import Link from "next/link"; import { notFound } from "next/navigation"; import { solutions } from "@/lib/site";
export default function Solution({ params }: { params: { slug: string } }) {
  const s = solutions.find((x) => x.slug === params.slug); if (!s) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-12"><h1 className="text-3xl font-extrabold">{s.title}</h1>
      <p className="mt-4 whitespace-pre-line text-slate-700">{s.body}</p><Link href="/#book" className="btn mt-6 inline-block py-3">Request a quote</Link></main>);
}
