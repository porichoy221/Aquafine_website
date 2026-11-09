// Rule-based product match for the Water Solution Finder. Pure function: easy to read and to change.
export type QuizProduct = { id: string; slug: string; name: string; specs: string; price: number; image?: string; stock: number };
export type Answers = { source: string; use: string; size: string };
export const quizOptions = {
  source: ["Tap Water", "Tube Well", "High Iron / Salinity"],
  use: ["Home", "Office", "Industrial"],
  size: ["2-4", "5-8", "8+"],
};
export function recommend(products: QuizProduct[], a: Answers) {
  // Each key is matched against the product's slug (its web address), e.g. "1550" finds the LSRO-1550-G.
  let key: string;
  if (a.use === "Industrial" || a.size === "8+") key = "1550";          // largest family capacity (1-10 persons)
  else if (a.use === "Office") key = a.size === "2-4" ? "929" : "bravo"; // hot/cold dispenser, or Bravo for 5-8
  else key = a.size === "2-4" ? "575" : "bravo";                         // home use
  const product = products.find((p) => p.slug.includes(key) && p.stock > 0) ?? products.find((p) => p.stock > 0) ?? products[0];
  const note = a.source === "High Iron / Salinity" ? "High iron needs pre-treatment before an RO purifier — ask us about an Iron Removal Plant." : undefined;
  return { product, note };
}
