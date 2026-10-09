"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element;
      setHover(!!t.closest?.("a, button, [data-cursor]"));
      setLabel(t.closest?.("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? null);
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[299] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/70"
        style={{ x: rx, y: ry }}
        animate={{
          width: label ? 88 : hover ? 64 : 36,
          height: label ? 88 : hover ? 64 : 36,
          backgroundColor: label ? "rgba(213,255,39,0.95)" : hover ? "rgba(213,255,39,0.12)" : "rgba(213,255,39,0)",
          scale: down ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-widest text-black"
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.5 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </>
  );
}
