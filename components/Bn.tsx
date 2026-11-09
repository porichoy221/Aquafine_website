// Label with a Bangla translation next to the English text (the site is bilingual).
export default function Bn({ en, bn, tone = "text-slate-500" }: { en: string; bn: string; tone?: string }) {
  return <span>{en} <span lang="bn" className={"font-normal " + tone}>{bn}</span></span>;
}
