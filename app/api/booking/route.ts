import { NextResponse } from "next/server"; import { bookingSchema } from "@/lib/validation"; import { createBooking } from "@/lib/store"; import { limited } from "@/lib/rate";
export async function POST(req: Request) {
  if (limited("b:" + (req.headers.get("x-forwarded-for") ?? "local"))) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const p = bookingSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ errors: p.error.flatten().fieldErrors }, { status: 400 });
  createBooking(p.data); return NextResponse.json({ ok: true, name: p.data.name, phone: p.data.phone });
}
