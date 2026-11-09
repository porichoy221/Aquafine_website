import Link from "next/link"; import { redirect } from "next/navigation"; import { isAdmin } from "@/lib/auth"; import { logoutAction } from "../actions";
export const dynamic = "force-dynamic";
export default function Panel({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) redirect("/admin/login");
  return (
    <div className="admin mx-auto max-w-6xl px-4 py-6"><nav className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-3 font-semibold text-ocean">
      <Link href="/admin">Dashboard</Link><Link href="/admin/products">Products &amp; Stock</Link><Link href="/admin/orders">Orders</Link><Link href="/admin/bookings">Service queue</Link><Link href="/admin/leads">Water tests</Link><Link href="/admin/messages">Messages</Link>
      <form action={logoutAction} className="ml-auto"><button className="text-slate-500">Log out</button></form></nav>{children}</div>);
}
