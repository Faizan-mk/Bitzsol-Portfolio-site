"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { INTRO_DELAY } from "./Preloader";

const Studio = dynamic(() => import("../three/Studio"), { ssr: false });

const services = [
  { name: "Design", detail: "UI/UX for websites, apps and games" },
  { name: "Build", detail: "Websites, software and games" },
  { name: "Automate", detail: "AI automations and GoHighLevel" },
  { name: "Grow", detail: "Marketing and social media" },
];
const HOLD = 4;

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "10% 0px" });
  const near = useInView(ref, { margin: "300px 0px" });
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const t = setTimeout(() => setWarm(true), (INTRO_DELAY + 3.8) * 1000);
    return () => clearTimeout(t);
  }, []);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % services.length), HOLD * 1000);
    return () => clearInterval(id);
  }, [inView, reduced, cycle]);

  return (
    <section
      ref={ref}
      aria-label="What we do: design, websites and apps, AI automation, and marketing"
      onPointerMove={(e) => {
        pointer.current.x = e.clientX / window.innerWidth - 0.5;
        pointer.current.y = e.clientY / window.innerHeight - 0.5;
      }}
      className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[45%] h-[36rem] w-[56rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full glow [--glow:0.22]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mx-5 h-[440px] sm:mx-0 sm:h-[560px] lg:h-[640px]"
      >
        {(near || warm) && <Studio active={active} running={inView && !reduced} pointer={pointer} />}
      </motion.div>

      <div role="tablist" aria-label="Services" className="relative mx-auto mt-2 grid max-w-3xl grid-cols-4 gap-2 sm:gap-4">
        {services.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.name}
              role="tab"
              aria-selected={on}
              onClick={() => { setActive(i); setCycle((c) => c + 1); }}
              className={`rounded-sm text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neon/60 ${on ? "text-white" : "text-white/40 hover:text-white/75"}`}
            >
              <span className="relative block h-[2px] overflow-hidden rounded-full bg-white/10">
                {on && (
                  <motion.span
                    key={`${i}-${cycle}`}
                    className="absolute inset-0 origin-left bg-neon"
                    initial={{ scaleX: reduced ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduced ? 0 : HOLD, ease: "linear" }}
                  />
                )}
              </span>
              <span className="mt-2.5 block text-sm font-semibold sm:text-base">{s.name}</span>
              <span className="mt-0.5 hidden text-xs text-white/45 sm:block">{s.detail}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
