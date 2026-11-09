// Product descriptions are written as "Key: Value" lines. This turns them into table rows for the product and compare pages.
export function parseSpecs(desc: string) {
  const rows: [string, string][] = []; const notes: string[] = [];
  desc.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => { const i = l.indexOf(":"); if (i > 0 && i < 32) rows.push([l.slice(0, i).trim(), l.slice(i + 1).trim()]); else notes.push(l); });
  return { rows, notes };
}
