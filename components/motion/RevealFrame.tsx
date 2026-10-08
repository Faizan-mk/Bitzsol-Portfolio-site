"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { introDelay } from "./Preloader";

const ease = [0.76, 0, 0.24, 1] as const;

/* Wipes its content open from the top while the content settles from a slight zoom. */
export default function RevealFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [delay] = useState(introDelay);
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0% 0% 100% 0% round 1.25rem)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 1.25rem)" }}
      transition={{ delay: delay + 0.55, duration: 1.2, ease }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.55, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
