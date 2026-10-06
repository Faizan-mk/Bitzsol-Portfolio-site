import type { Metadata } from "next";
import { Hanken_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

// Headings use Manrope: modern, minimal, and strong at heavy weights.
const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-face",
});

export const metadata: Metadata = {
  title: "Muhammad Faizan | Full Stack Developer",
  description:
    "Portfolio of Muhammad Faizan, a Full Stack Developer building web and mobile apps with MERN, Next.js, React Native, Firebase and Supabase.",
};

// Runs before first paint: always opens the page at the top, since the intro animation and hero parallax
// assume a fresh start rather than a restored scroll position. The site always opens in dark mode;
// light mode is a per-visit choice from the toggle.
const themeScript = `try{history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
