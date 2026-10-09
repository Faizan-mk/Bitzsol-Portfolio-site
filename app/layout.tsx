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

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"
  ),
  title: { default: "Bitzsol Digital | Build the Next Era", template: "%s | Bitzsol Digital" },
  description:
    "Bitzsol Digital (SMC-PVT) Ltd — technology-driven digital solutions. Web, e-commerce and cloud products, software and game development, AI and GoHighLevel automation, marketing and social media at fixed, transparent rates.",
};

const themeScript = `try{history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}`;

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
