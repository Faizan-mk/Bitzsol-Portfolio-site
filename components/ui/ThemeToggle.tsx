"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 text-white/70 transition hover:border-neon/60 hover:text-neon"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={light ? "sun" : "moon"}
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {light ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
