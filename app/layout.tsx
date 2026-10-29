import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "./fonts/font-0.ttf", weight: "400", style: "normal" },
    { path: "./fonts/font-1.ttf", weight: "500", style: "normal" },
    { path: "./fonts/font-2.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "./fonts/font-3.ttf", weight: "400", style: "normal" },
    { path: "./fonts/font-4.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata: Metadata = {
  title: "Arslan Ambalaj — Markanızı En İyi Şekilde Sarıyoruz",
  description: "Pasta kutuları, pasta altlıkları, kargo kutuları, karton kutular ve özel baskı çözümleri. Arslan Ambalaj ürünlerini inceleyin.",
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="tr"><body className={`${serif.variable} ${sans.variable} antialiased`}>{children}</body></html>;
}
