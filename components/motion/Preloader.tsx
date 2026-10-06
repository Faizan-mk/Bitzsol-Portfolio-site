"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "../brand/signature-path";

export const INTRO_DELAY = 3.1; // seconds the page waits for the preloader to lift

const ease = [0.76, 0, 0.24, 1] as const;
const DRAW = 1.7; // signature stroke-draw time
const HOLD = 2.6; // when the curtains start to open

/* Signature intro: "Faizan" is hand-drawn in a gold stroke, fills in, gets a shine sweep,
   then the screen splits open like curtains. */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) { setDone(true); return; }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (HOLD * 1000 - 200));
      setCount(Math.round(p * 100));
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
          {/* two curtains that part on exit */}
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-black" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-black" exit={{ y: "100%" }} transition={{ duration: 0.9, ease }} />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeIn" }}
          >
            <motion.div
              aria-hidden
              className="absolute h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[110px]"
              animate={{ scale: [0.8, 1.15, 0.95], opacity: [0.4, 0.9, 0.6] }}
              transition={{ duration: HOLD, ease: "easeInOut" }}
            />

            <div className="relative w-[78vw] max-w-[34rem]">
              <svg viewBox={SIGNATURE_VIEWBOX} className="w-full overflow-visible" role="img" aria-label="Faizan">
                <defs>
                  <linearGradient id="pre-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style={{ stopColor: "var(--sig-a)" }} />
                    <stop offset="0.5" style={{ stopColor: "var(--sig-b)" }} />
                    <stop offset="1" style={{ stopColor: "var(--sig-c)" }} />
                  </linearGradient>
                  {/* bright band that sweeps across the finished signature */}
                  <linearGradient id="pre-shine" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="pre-clip"><path d={SIGNATURE_PATH} /></clipPath>
                  <filter id="pre-glow" x="-10%" y="-30%" width="120%" height="160%">
                    <feGaussianBlur stdDeviation="10" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* 1. the pen draws the outline */}
                <motion.path
                  d={SIGNATURE_PATH}
                  fill="transparent"
                  stroke="url(#pre-gold)"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#pre-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ pathLength: { duration: DRAW, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2 } }}
                />
                {/* 2. ink floods in */}
                <motion.path
                  d={SIGNATURE_PATH}
                  fill="url(#pre-gold)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: DRAW - 0.35, duration: 0.6 }}
                />
                {/* 3. a shine passes over it */}
                <g clipPath="url(#pre-clip)">
                  <motion.rect
                    y="-800"
                    height="1000"
                    width="500"
                    fill="url(#pre-shine)"
                    initial={{ x: -600 }}
                    animate={{ x: 2900 }}
                    transition={{ delay: DRAW + 0.15, duration: 0.8, ease: "easeInOut" }}
                  />
                </g>
              </svg>
            </div>

            <div className="relative mt-6 flex overflow-hidden text-[10px] font-medium uppercase tracking-[0.5em] text-white/60 sm:text-xs">
              {"Full Stack Developer".split("").map((ch, i) => (
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
                <div className="h-full bg-linear-to-r from-gold-deep via-[#ffe6b0] to-gold-deep" style={{ width: `${count}%` }} />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10px] tabular-nums text-white/35">
                <span>LOADING</span>
                <span>{String(count).padStart(3, "0")}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
