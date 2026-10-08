import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Cursor from "@/components/motion/Cursor";
import Effects from "@/components/motion/Effects";
import Preloader from "@/components/motion/Preloader";
import ScrollFX from "@/components/motion/ScrollFX";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

// Bitzsol brand typeface: Plus Jakarta Sans (body + display).
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  // absolute base for the share image and other metadata URLs (Vercel sets this on production builds)
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"
  ),
  title: { default: "Bitzsol Digital | Build the Next Era", template: "%s | Bitzsol Digital" },
  description:
    "Bitzsol Digital (SMC-PVT) Ltd — technology-driven digital solutions. Web, e-commerce and cloud products, AI and GoHighLevel automation, marketing, SEO and social media at fixed, transparent rates.",
};

// Runs before first paint: always opens the page at the top, since the intro animation and hero parallax
// assume a fresh start rather than a restored scroll position. The site always opens in dark mode;
// light mode is a per-visit choice from the toggle.
const themeScript = `try{history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}`;

// Shared chrome lives here so it persists across routes: the preloader and navbar intro play once per visit.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <div aria-hidden className="aurora" />
        <SmoothScroll />
        <Preloader />
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Effects />
        <ScrollFX />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
