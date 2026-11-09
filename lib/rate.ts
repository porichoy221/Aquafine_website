// Tiny in-memory limiter (per server process): max N requests per minute per key.
const hits = new Map<string, number[]>();
export function limited(key: string, max = 10) {
  const now = Date.now(); const arr = (hits.get(key) ?? []).filter((t) => now - t < 60000);
  arr.push(now); hits.set(key, arr); return arr.length > max;
}
