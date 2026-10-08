"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { introDelay } from "@/components/motion/Preloader";

const ease = [0.16, 1, 0.3, 1] as const;

/* Opening banner for inner pages: breadcrumb, kicker, a headline whose words rise out of a mask
   (the last `accent` words in neon), and a short intro, over a faint grid and glow. */
export default function PageHeader({
  crumb, parent, kicker, title, accent = 1, intro,
}: { crumb: string; parent?: { href: string; label: string }; kicker: string; title: string; accent?: number; intro: string }) {
  const reduced = useReducedMotion();
  const [delay] = useState(introDelay);
  const d = reduced ? 0 : delay + 0.15;
  const words = title.split(" ");
  const rise = (i: number) =>
    reduced
      ? {}
      : { initial: { y: "110%", rotate: 4 }, animate: { y: 0, rotate: 0 }, transition: { delay: d + 0.15 + i * 0.07, duration: 0.9, ease } };
  const fade = (at: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d + at, duration: 0.8, ease } };

  return (
    <header className="relative overflow-hidden px-5 pb-6 pt-36 sm:px-8 sm:pt-44">
      <div aria-hidden className="page-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[52rem] max-w-full -translate-x-1/2 rounded-full glow [--glow:0.22]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.nav {...fade(0)} aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-xs text-white/45">
          <Link href="/" className="transition hover:text-neon">Home</Link>
          <HiChevronRight className="text-white/25" />
          {parent && (
            <>
              <Link href={parent.href} className="transition hover:text-neon">{parent.label}</Link>
              <HiChevronRight className="text-white/25" />
            </>
          )}
          <span className="text-white/75">{crumb}</span>
        </motion.nav>

        <motion.p {...fade(0.05)} className="kicker mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-neon">
          {kicker}
        </motion.p>

        <h1 aria-label={title} className="text-4xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span key={i} aria-hidden className="mr-[0.22em] inline-flex overflow-hidden pb-2 last:mr-0">
              <motion.span {...rise(i)} className={`inline-block ${i >= words.length - accent ? "neon-text" : ""}`}>
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p {...fade(0.45)} className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-lg">
          {intro}
        </motion.p>

        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: d + 0.6, duration: 1.1, ease }}
          className="mx-auto mt-12 h-px w-full max-w-3xl origin-center bg-linear-to-r from-transparent via-neon/50 to-transparent"
        />
      </div>
    </header>
  );
}
