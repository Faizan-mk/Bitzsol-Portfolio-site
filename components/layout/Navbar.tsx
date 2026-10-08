"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineGlobeAlt, HiOutlinePaperAirplane } from "react-icons/hi2";
import { company, navLinks } from "@/lib/data";
import Logo from "@/components/brand/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Magnetic from "@/components/motion/Magnetic";
import { INTRO_DELAY } from "@/components/motion/Preloader";

const ease = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion.create(Link);

export default function Navbar() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // the entrance waits for the preloader only once
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), (INTRO_DELAY + 0.7) * 1000);
    return () => clearTimeout(t);
  }, []);

  // Floating pill once scrolled; the bar itself stays visible at all times.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  // Active link follows the route; nested routes like /projects/[slug] keep their parent highlighted.
  const active = navLinks.find((l) => (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)))?.href ?? null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const pill = hovered ?? active;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: introDone || reduced ? 0 : INTRO_DELAY, duration: 0.6, ease }}
        className={`fixed inset-x-0 top-0 px-3 sm:px-5 ${open ? "z-[90]" : "z-50"}`}
      >
        <nav
          className={`relative mx-auto flex items-center justify-between transition-[background-color,box-shadow,border-color,margin,height,max-width] duration-500 ${
            scrolled
              ? "mt-3 h-16 max-w-6xl rounded-full border border-white/10 bg-black/85 px-4 backdrop-blur-md lg:bg-black/55 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_32px_-4px_rgba(127,58,237,0.35)] sm:px-5"
              : "mt-0 h-20 max-w-7xl border border-transparent px-2 sm:px-3"
          }`}
        >
          {/* neon hairline glow along the top edge of the floating pill */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-10 -top-px h-px bg-linear-to-r from-transparent via-neon/70 to-transparent transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />

          <Link href="/" className="group relative flex items-center" aria-label={`${company.name}, home`}>
            <Logo className="h-7 w-auto text-white transition-transform duration-500 group-hover:scale-105 sm:h-8" />
            {/* underline flourish that draws in on hover */}
            <span className="absolute -bottom-1 left-2 h-px w-0 bg-linear-to-r from-neon to-transparent transition-all duration-500 group-hover:w-[85%]" />
          </Link>

          {/* desktop links: a neon pill slides to whatever you hover, then back to the active section */}
          <div
            className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  pill === l.href ? "text-on-neon" : "text-white/65 hover:text-white"
                }`}
              >
                {pill === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-neon shadow-[0_0_20px_-2px_rgba(213,255,39,0.55)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit www.bitzsol.com"
              title="www.bitzsol.com"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 transition hover:border-neon/60 hover:text-neon sm:flex"
            >
              <HiOutlineGlobeAlt size={18} />
            </a>
            <div className="hidden sm:block">
              <Magnetic strength={0.3}>
                <Link href="/contact" className="btn-neon !py-2.5 !text-xs">
                  <HiOutlinePaperAirplane className="-rotate-45" /> Contact Me
                </Link>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-black/40 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 rounded bg-white" />
              <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 rounded bg-white" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile: full-screen menu, circle wipe from the burger, links rise in one by one */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-black px-8 pb-10 pt-28 lg:hidden"
          >
            <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full glow [--glow:0.15]" />
            <nav className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <MotionLink
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                    className={`flex items-baseline gap-4 py-1.5 text-4xl font-bold ${active === l.href ? "text-neon" : "text-white/85"}`}
                  >
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                    {l.label}
                  </MotionLink>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-auto space-y-5"
            >
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn-neon w-full">
                <HiOutlineGlobeAlt /> Visit our website
              </a>
              <div className="space-y-1.5 text-sm text-white/50">
                <a href={`mailto:${company.email}`} className="block truncate transition hover:text-neon">{company.email}</a>
                <a href={company.phoneHref} className="block transition hover:text-neon">{company.phone}</a>
                <a href={company.phone2Href} className="block transition hover:text-neon">{company.phone2}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
