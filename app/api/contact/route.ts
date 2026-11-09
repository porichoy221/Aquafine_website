import { NextResponse } from "next/server"; import { contactSchema } from "@/lib/validation"; import { createMessage } from "@/lib/store"; import { limited } from "@/lib/rate";
export async function POST(req: Request) {
  if (limited("c:" + (req.headers.get("x-forwarded-for") ?? "local"), 5)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const p = contactSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ errors: p.error.flatten().fieldErrors }, { status: 400 });
  createMessage(p.data); return NextResponse.json({ ok: true });
}
