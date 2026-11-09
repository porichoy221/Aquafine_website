import { listMessages } from "@/lib/store";
export default function Messages() {
  return (<div><h1 className="mb-4 text-xl font-extrabold">Contact messages</h1><div className="grid gap-3">{listMessages().map((m) => (
    <div key={m.id} className="rounded-2xl bg-white p-4 text-sm"><p className="font-bold">{m.subject} <span className="text-xs font-normal text-slate-400">{new Date(m.createdAt).toLocaleString("en-GB")}</span></p>
      <p>{m.name} · <a className="text-ocean underline" href={"mailto:" + m.email}>{m.email}</a></p><p className="mt-1 whitespace-pre-line text-slate-600">{m.message || "(no message)"}</p></div>))}
    {listMessages().length === 0 && <p className="text-slate-500">No messages yet.</p>}</div></div>);
}
