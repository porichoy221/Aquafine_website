import ContactForm from "@/components/ContactForm"; import { site } from "@/lib/site";
export const metadata = { title: "Contact Us – Aqua Fine Engineering" };
export default function Contact() {
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2"><div><h1 className="text-3xl font-extrabold text-ocean">{site.name}</h1>
      <p className="mt-4 text-lg font-bold">Mobile: {site.phones.join(" / ")}</p><p className="mt-3 font-bold">Email us</p>{site.emails.map((e) => <p key={e}>{e}</p>)}
      <p className="mt-4 font-bold">Office Address:</p><p className="text-slate-600">{site.address}</p></div><ContactForm /></main>);
}
