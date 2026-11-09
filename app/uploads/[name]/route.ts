import fs from "fs"; import path from "path"; import { uploadDir } from "@/lib/store";
const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" };
// Serves admin-uploaded product photos. The strict name check blocks path tricks like ../
export async function GET(_: Request, { params }: { params: { name: string } }) {
  const m = /^[a-f0-9-]{36}\.(png|jpg|webp)$/.exec(params.name); const file = path.join(uploadDir, params.name);
  if (!m || !fs.existsSync(file)) return new Response("Not found", { status: 404 });
  return new Response(fs.readFileSync(file), { headers: { "Content-Type": TYPES[m[1]], "Cache-Control": "public, max-age=31536000, immutable" } });
}
