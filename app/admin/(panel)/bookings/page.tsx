import { listBookings } from "@/lib/store"; import { assignBookingAction } from "../../actions";
export default function Bookings() {
  const items = listBookings();
  return (<div><h1 className="mb-4 text-xl">Service queue</h1><div className="grid gap-3">{items.map((b) => (
    <div key={b.id} className="rounded-2xl border border-line bg-white p-4 text-sm"><p className="font-bold">{b.serviceType} · {b.date}{b.slot ? " · " + b.slot : ""}</p>
      <p>{b.name} · {b.phone}</p><p className="text-slate-500">{b.address}</p>{b.issue && <p className="mt-1">Problem: {b.issue}</p>}
      <form action={assignBookingAction} className="mt-2 flex flex-wrap gap-2"><input type="hidden" name="id" value={b.id} /><input name="technician" defaultValue={b.technician} placeholder="Technician name" className="inp w-48" />
        <select name="status" defaultValue={b.status} className="inp w-36"><option>PENDING</option><option>ASSIGNED</option><option>COMPLETED</option></select><button className="btn">Save</button></form></div>))}
    {items.length === 0 && <p className="text-slate-500">No service requests yet.</p>}</div></div>);
}
