import { NextResponse } from "next/server"; import { orderSchema } from "@/lib/validation"; import { createOrder } from "@/lib/store"; import { limited } from "@/lib/rate";
export async function POST(req: Request) {
  if (limited("o:" + (req.headers.get("x-forwarded-for") ?? "local"))) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const p = orderSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ errors: p.error.flatten().fieldErrors }, { status: 400 });
  const r = createOrder(p.data); return r.ok ? NextResponse.json(r) : NextResponse.json({ error: r.error }, { status: 409 });
}
