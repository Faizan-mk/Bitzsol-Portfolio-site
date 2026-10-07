import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Bitzsol brand typeface: Plus Jakarta Sans (body + display).
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Bitzsol Digital | Build the Next Era",
  description:
    "Bitzsol Digital (SMC-PVT) Ltd — technology-driven digital solutions. Web, e-commerce and cloud products, AI and GoHighLevel automation, marketing, SEO and social media at fixed, transparent rates.",
};

// Runs before first paint: always opens the page at the top, since the intro animation and hero parallax
// assume a fresh start rather than a restored scroll position. The site always opens in dark mode;
// light mode is a per-visit choice from the toggle.
const themeScript = `try{history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
