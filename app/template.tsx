"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { introDelay } from "@/components/motion/Preloader";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [firstLoad] = useState(() => introDelay() > 0);
  const animate = !firstLoad && !reduced;

  return (
    <>
      {animate && (
        <motion.div
          aria-hidden
          className="route-curtain"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.05 }}
        />
      )}
      <motion.div
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
