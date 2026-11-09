import Link from "next/link";
export const metadata = { title: "About Us – Aqua Fine Engineering" };
export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12"><h1 className="text-4xl font-extrabold">Aqua Fine Engineering</h1>
      <p className="mt-4 text-slate-700">Aqua Fine Engineering is a trusted provider of water purification solutions in Bangladesh. We supply high-quality RO and UV water purifiers, accessories, pumps, filtration media and industrial water treatment plants for homes, offices and industries.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2"><div className="rounded-2xl bg-white p-6"><h2 className="text-xl font-extrabold">Our Mission</h2><p className="mt-2 text-slate-600">Our mission at Aqua Fine Engineering is to provide clean, safe and high-quality water to everyone. We aim to offer the best water purification solutions using advanced technology to ensure healthy drinking water, and we are committed to making clean water accessible and affordable for all.</p></div>
        <div className="rounded-2xl bg-white p-6"><h2 className="text-xl font-extrabold">Our Vision</h2><p className="mt-2 text-slate-600">Our vision is to provide clean, safe water for everyone. We aim to be a trusted leader in water purification, delivering high-quality products that improve health and well-being, with reliable, affordable and innovative filtration systems.</p></div></div>
      <div className="mt-8 rounded-2xl bg-white p-6"><h2 className="text-xl font-extrabold">Need help choosing?</h2><p className="mt-2 text-slate-600">Browse our <Link href="/products" className="font-semibold text-ocean underline">products</Link> or <Link href="/contact-us" className="font-semibold text-ocean underline">contact us</Link>.</p></div></main>);
}
