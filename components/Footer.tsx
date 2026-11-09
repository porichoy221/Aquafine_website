import Link from "next/link"; import Logo from "./Logo"; import { site } from "@/lib/site";
export default function Footer() {
  const links: [string, string][] = [["About Us", "/about-us"], ["Contact Us", "/contact-us"], ["Industrial Product", "/industrial-product"], ["Wastewater Treatment Plant", "/industrial-solution/wastewater-treatment-plant"], ["Accessories", "/products?category=Accessories"], ["All Products", "/products"], ["Compare products", "/compare"]];
  return (
    <footer className="mt-20 bg-ocean text-white"><div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1.2fr]">
      <div><div className="inline-block rounded-xl bg-white px-4 py-3"><Logo h={52} /></div>
        <p className="mt-4 max-w-sm text-white/85">A trusted provider of water purification solutions in Bangladesh: RO and UV purifiers for homes and businesses, filtration media, pumps and treatment plants.</p></div>
      <div><h3 className="mb-3 text-lg">Useful links</h3><ul className="grid gap-1.5">{links.map(([t, h]) => <li key={h}><Link href={h} className="text-white/85 hover:text-white hover:underline">{t}</Link></li>)}</ul></div>
      <div><h3 className="mb-3 text-lg">Contact</h3><p className="text-white/85">{site.address}</p>
        <p className="mt-3"><span className="text-white/70">Mobile</span> {site.phones.join(" / ")}</p><p><span className="text-white/70">Email</span> {site.emails.join(", ")}</p>
        <a href={site.facebook} className="mt-3 inline-block underline">Find us on Facebook</a></div></div>
      <p className="border-t border-white/20 py-4 text-center text-sm text-white/75">© {new Date().getFullYear()} {site.name}. All rights reserved.</p></footer>);
}
