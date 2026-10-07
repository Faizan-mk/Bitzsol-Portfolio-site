"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// WebGL only exists in the browser, so the 3D studio is loaded client-side.
const Studio = dynamic(() => import("../three/Studio"), { ssr: false });

/* What we do, shown by the Bitzsol studio in 3D: four characters, one per service, around the glowing bulb.
   The platform turns to bring each one to the front. */

const services = [
  { name: "Design", detail: "Logos, brand identity, graphics and video" },
  { name: "Build", detail: "Websites, web apps and online stores" },
  { name: "Automate", detail: "AI automations and GoHighLevel" },
  { name: "Grow", detail: "Marketing, SEO and social media" },
];
const HOLD = 4; // seconds per character

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "10% 0px" });
  // the WebGL canvas only exists near the screen, so phones get its GPU memory back once you scroll past
  const near = useInView(ref, { margin: "300px 0px" });
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the timer after a manual pick
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
        className="relative h-[460px] sm:h-[560px] lg:h-[640px]"
      >
        {near && <Studio active={active} running={inView && !reduced} pointer={pointer} />}
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
