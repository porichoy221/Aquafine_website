"use client";
import { usePathname } from "next/navigation"; import { site, whatsapp } from "@/lib/site";
export default function FloatingContact() {
  if (usePathname().startsWith("/admin")) return null;
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 text-sm font-semibold">
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-leaf px-4 py-3 text-center text-ink shadow-lg">WhatsApp</a>
      <a href={"tel:+" + site.phones[0].replace(/\D/g, "")} className="rounded-full border-2 border-ocean bg-white px-4 py-3 text-center text-ocean shadow-lg">Call now</a></div>);
}
