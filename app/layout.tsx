import "@fontsource-variable/fraunces/wght.css";
import "@fontsource/hind-siliguri/latin-400.css"; import "@fontsource/hind-siliguri/latin-600.css"; import "@fontsource/hind-siliguri/latin-700.css";
import "@fontsource/hind-siliguri/bengali-400.css"; import "@fontsource/hind-siliguri/bengali-600.css"; import "@fontsource/hind-siliguri/bengali-700.css";
import "./globals.css"; import Header from "@/components/Header"; import Footer from "@/components/Footer"; import FloatingContact from "@/components/FloatingContact"; import { CompareBar } from "@/components/Compare";
export const metadata = { title: "Aqua Fine Engineering – Pure Expert", description: "Water purifiers, accessories, industrial water treatment and service in Dhaka, Bangladesh." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Header />{children}<Footer /><FloatingContact /><CompareBar /></body></html>;
}
