// Horizontal lockup made from the official artwork. To change the logo, replace public/logo.png.
export default function Logo({ h = 52 }: { h?: number }) {
  return <img src="/logo.png" alt="Aqua Fine Engineering – Pure Expert" height={h} style={{ height: h, width: "auto" }} />;
}
