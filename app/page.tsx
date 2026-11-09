import Link from "next/link"; import ProductCard from "@/components/ProductCard"; import BookingForm from "@/components/BookingForm"; import WaterTestForm from "@/components/WaterTestForm"; import HeroQuiz from "@/components/HeroQuiz";
import { listProducts } from "@/lib/store"; import { site, solutions } from "@/lib/site";
export const dynamic = "force-dynamic";
const services: [string, string, string][] = [
  ["Household and commercial purifiers", "RO purifiers, hot and cold dispensers and under-sink units from Lan Shan, Bravo and other brands.", "/products"],
  ["Accessories, pumps and filtration media", "Membranes, filters, pumps and blowers to keep an existing system running.", "/products?category=Accessories"],
  ["Water treatment plants", "RO, iron removal, wastewater, packaged STP and rain water harvesting for factories and buildings.", "/industrial-solution/ro-water-treatment-plant"],
  ["Service and filter change", "Book a technician for cartridge changes, membrane repair or a general check-up.", "/#book"],
];
export default function Home() {
  const all = listProducts(); const latest = all.slice(0, 6);
  const quizProducts = all.map(({ id, slug, name, specs, price, image, stock }) => ({ id, slug, name, specs, price, image, stock }));
  return (<>
    <section className="relative bg-ocean text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-28 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pb-36 lg:pt-16">
        <div>
          <h1 className="text-4xl leading-[1.08] md:text-6xl">100% pure and safe drinking water for your family</h1>
          <p lang="bn" className="mt-4 text-2xl text-mist">আপনার পরিবারের জন্য ১০০% বিশুদ্ধ ও নিরাপদ পানি</p>
          <p className="mt-5 max-w-xl text-lg text-white/85">Aqua Fine Engineering supplies RO and UV purifiers, accessories and industrial water treatment, with a service team in Mirpur, Dhaka.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/products" className="btn-leaf">Order a purifier</Link>
            <a href={"tel:+" + site.phones[0].replace(/\D/g, "")} className="inline-flex items-center rounded-full border border-white/60 px-5 py-3 font-semibold hover:bg-white/10">Call {site.phones[0]}</a></div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/25 pt-6 text-sm">
            <div><dt className="text-white/70">Warranty</dt><dd className="font-semibold">12 to 18 months on our main RO models</dd></div>
            <div><dt className="text-white/70">Range</dt><dd className="font-semibold">Household, office and industrial</dd></div>
            <div><dt className="text-white/70">Based in</dt><dd className="font-semibold">Mirpur 10, Dhaka</dd></div></dl></div>
        <div className="mx-auto w-full max-w-md">
          <img src="/hero-water.jpg" alt="Clean drinking water being poured into a glass" width={624} height={350} className="ml-auto h-72 w-64 rounded-t-full object-cover" />
          <div className="relative -mt-28 mr-auto w-[94%]"><HeroQuiz products={quizProducts} /></div></div></div>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" height="64"><path d="M0,44 C220,84 460,6 720,34 C980,62 1200,74 1440,22 L1440,80 L0,80 Z" fill="#F7FBFE" /></svg>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-16"><h2 className="max-w-lg text-3xl md:text-4xl">Everything for clean water, under one roof</h2>
      <ul className="mt-8 divide-y divide-line border-y border-line">{services.map(([t, d, h]) => (
        <li key={t} className="grid gap-2 py-6 md:grid-cols-[1fr_1.6fr_auto] md:items-center md:gap-8"><h3 className="text-2xl">{t}</h3><p className="text-slate-600">{d}</p><Link href={h} className="font-semibold text-ocean underline">Browse</Link></li>))}</ul></section>

    <section className="mx-auto max-w-6xl px-4 pb-16"><div className="mb-6 flex items-end justify-between gap-4"><h2 className="text-3xl md:text-4xl">Latest products</h2><Link href="/products" className="font-semibold text-ocean underline">See all products</Link></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{latest.map((p) => <ProductCard key={p.id} p={p} />)}</div></section>

    <section id="industrial" className="bg-mist"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_1.4fr]">
      <div><h2 className="text-3xl md:text-4xl">Industrial solutions</h2><p className="mt-3 max-w-sm text-slate-700">For factories, buildings and communities that need clean water at scale. Tell us your daily requirement and we will propose a plant.</p></div>
      <ul className="grid gap-x-8 sm:grid-cols-2">{solutions.map((s) => <li key={s.slug} className="border-b border-ocean/15"><Link href={"/industrial-solution/" + s.slug} className="block py-3 font-semibold text-ocean hover:underline">{s.title}</Link></li>)}</ul></div></section>

    <section id="book" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1fr_1.15fr]"><WaterTestForm /><BookingForm /></section>
  </>);
}
