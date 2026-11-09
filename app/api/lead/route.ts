import { NextResponse } from "next/server"; import { leadSchema } from "@/lib/validation"; import { createLead } from "@/lib/store"; import { limited } from "@/lib/rate";
export async function POST(req: Request) {
  if (limited("l:" + (req.headers.get("x-forwarded-for") ?? "local"), 5)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const p = leadSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ errors: p.error.flatten().fieldErrors }, { status: 400 });
  createLead(p.data); return NextResponse.json({ ok: true, name: p.data.name, phone: p.data.phone });
}
