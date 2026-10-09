"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LOGO_BULB, LOGO_PATH, LOGO_VIEWBOX } from "../brand/logo-path";

export const INTRO_DELAY = 3.1;

let bootAt: number | null = null;

export function introDelay() {
  if (bootAt === null) return INTRO_DELAY;
  return Math.max(0, INTRO_DELAY - (performance.now() - bootAt) / 1000);
}

const ease = [0.76, 0, 0.24, 1] as const;
const DRAW = 1.7;
const HOLD = 2.6;

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    bootAt ??= performance.now();
    if (reduced) { setDone(true); return; }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (HOLD * 1000 - 200));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (numRef.current) numRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const end = setTimeout(() => { setDone(true); document.body.style.overflow = ""; }, HOLD * 1000);
    return () => { cancelAnimationFrame(raf); clearTimeout(end); document.body.style.overflow = ""; };
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="preloader" className="fixed inset-0 z-[200]" exit={{ pointerEvents: "none" }} transition={{ duration: 1 }}>
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-black" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-black" exit={{ y: "100%" }} transition={{ duration: 0.9, ease }} />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeIn" }}
          >
            <motion.div
              aria-hidden
              className="absolute h-[28rem] w-[28rem] rounded-full bg-violet/25 blur-[110px]"
              animate={{ scale: [0.8, 1.15, 0.95], opacity: [0.4, 0.9, 0.6] }}
              transition={{ duration: HOLD, ease: "easeInOut" }}
            />

            <div className="relative w-[64vw] max-w-[26rem]">
              <svg viewBox={LOGO_VIEWBOX} className="w-full overflow-visible" role="img" aria-label="Bitzsol">
                <defs>
                  <linearGradient id="pre-neon" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style={{ stopColor: "var(--sig-a)" }} />
                    <stop offset="0.5" style={{ stopColor: "var(--sig-b)" }} />
                    <stop offset="1" style={{ stopColor: "var(--sig-c)" }} />
                  </linearGradient>
                  <linearGradient id="pre-shine" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="pre-clip"><path d={LOGO_PATH} /></clipPath>
                  <filter id="pre-glow" x="-10%" y="-30%" width="120%" height="160%">
                    <feGaussianBlur stdDeviation="1.2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <motion.path
                  d={LOGO_PATH}
                  fill="transparent"
                  stroke="url(#pre-neon)"
                  strokeWidth={0.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#pre-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ pathLength: { duration: DRAW, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2 } }}
                />
                <motion.path
                  d={LOGO_PATH}
                  fill="var(--color-white)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: DRAW - 0.35, duration: 0.6 }}
                />
                <motion.path
                  d={LOGO_BULB}
                  fill="var(--color-neon)"
                  filter="url(#pre-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.3, 1] }}
                  transition={{ delay: DRAW, duration: 0.5, times: [0, 0.3, 0.55, 1] }}
                />
                <g clipPath="url(#pre-clip)">
                  <motion.rect
                    y="-10"
                    height="80"
                    width="40"
                    fill="url(#pre-shine)"
                    initial={{ x: -50 }}
                    animate={{ x: 220 }}
                    transition={{ delay: DRAW + 0.15, duration: 0.8, ease: "easeInOut" }}
                  />
                </g>
              </svg>
            </div>

            <div className="relative mt-6 flex overflow-hidden text-[10px] font-medium uppercase tracking-[0.5em] text-white/60 sm:text-xs">
              {"Build the Next Era".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block whitespace-pre"
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <div className="absolute bottom-10 left-1/2 w-56 -translate-x-1/2 sm:bottom-12">
              <div className="h-px w-full overflow-hidden bg-white/10">
                <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-neon-deep via-white to-neon-deep" />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10px] tabular-nums text-white/35">
                <span>LOADING</span>
                <span ref={numRef}>000</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
