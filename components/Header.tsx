"use client";
import Link from "next/link"; import { useState } from "react"; import Logo from "./Logo"; import { site, menuProducts, solutions } from "@/lib/site";
type Item = { href: string; t: string };
function Dd({ label, items }: { label: string; items: Item[] }) {
  return (
    <div className="group relative"><button type="button" className="py-2 font-semibold hover:text-ocean">{label} ▾</button>
      <div className="lg:invisible lg:absolute lg:left-0 lg:top-full lg:z-40 lg:min-w-[260px] lg:rounded-xl lg:border lg:border-line lg:bg-white lg:p-2 lg:shadow-lg lg:group-hover:visible lg:group-focus-within:visible">
        {items.map((i) => <Link key={i.href} href={i.href} className="block rounded-lg px-3 py-2 hover:bg-mist hover:text-ocean">{i.t}</Link>)}</div></div>);
}
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <div className="bg-ocean px-4 py-1.5 text-sm text-white"><div className="mx-auto flex max-w-6xl justify-between gap-4">
        <a href={"tel:+" + site.phones[0].replace(/\D/g, "")}>{site.phones[0]}</a><a href={"mailto:" + site.emails[1]}>{site.emails[1]}</a></div></div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-2.5">
        <Link href="/" aria-label="Aqua Fine Engineering home"><Logo h={58} /></Link>
        <button className="ml-auto rounded-full border border-line px-4 py-1.5 text-sm font-semibold lg:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        <nav className={(open ? "flex" : "hidden") + " w-full flex-col gap-2 text-base lg:ml-auto lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6"} onClick={() => setOpen(false)}>
          <Link href="/" className="font-semibold hover:text-ocean">Home</Link><Link href="/about-us" className="font-semibold hover:text-ocean">About Us</Link>
          <Dd label="Product" items={menuProducts.map((c) => ({ href: "/products?category=" + encodeURIComponent(c), t: c }))} />
          <Dd label="Industrial Solution" items={solutions.slice(0, 3).map((s) => ({ href: "/industrial-solution/" + s.slug, t: s.title }))} />
          <Link href="/industrial-product" className="font-semibold hover:text-ocean">Industrial Product</Link>
          <form action="/products" role="search" onClick={(e) => e.stopPropagation()}><input name="q" aria-label="Search products" placeholder="Search products" className="inp w-40 rounded-full py-1.5" /></form>
          <Link href="/contact-us" className="btn-leaf py-2">Contact Us</Link>
        </nav>
      </div>
    </header>);
}
