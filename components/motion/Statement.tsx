"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaAndroid, FaCloudArrowUp, FaDatabase, FaLaptopCode, FaMobileScreenButton, FaNodeJs, FaReact, FaServer,
  FaShieldHalved,
} from "react-icons/fa6";
import { SiMongodb, SiNextdotjs, SiSupabase } from "react-icons/si";

/* "What I do", told without words: a developer character juggles service icons between raised hands. */

type Ic = { Icon: IconType; color?: string; label: string };

// What each hand holds, cycling.
const leftHand: Ic[] = [
  { Icon: FaLaptopCode, label: "Web development" },
  { Icon: FaServer, label: "Backend APIs" },
  { Icon: FaShieldHalved, label: "Auth & security" },
];
const rightHand: Ic[] = [
  { Icon: FaMobileScreenButton, label: "Mobile apps" },
  { Icon: FaDatabase, label: "Databases" },
  { Icon: FaCloudArrowUp, label: "Deployment" },
];
// What flies through the air between them.
const juggled: Ic[] = [
  { Icon: FaReact, color: "#61dafb", label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: FaNodeJs, color: "#68a063", label: "Node.js" },
  { Icon: SiMongodb, color: "#47a248", label: "MongoDB" },
  { Icon: FaAndroid, color: "#3ddc84", label: "Android" },
  { Icon: SiSupabase, color: "#3ecf8e", label: "Supabase" },
];

const SKIN = "#e9b48b";
const SKIN_SHADE = "#d49a72";
const HAIR = "#1d1410";
const HOODIE = "#1b1b22";
const JUGGLE_DUR = 4.2;

/* Icon tile, rendered as HTML over the drawing (GPU-composited), sized relative to the character box. */
function IconBadge({ ic, size, gold = false }: { ic: Ic; size: number; gold?: boolean }) {
  const cq = (size / 400) * 100; // viewBox units -> % of box width (cqw)
  return (
    <div
      role="img"
      aria-label={ic.label}
      className={`flex items-center justify-center rounded-[22%] border ${
        gold
          ? "border-[#fbd384]/60 bg-linear-to-br from-[#fbd384] to-[#d99a3a] text-on-gold shadow-[0_10px_30px_-6px_rgba(240,178,82,0.8)]"
          : "border-white/15 bg-[#121218] text-[#f5f5f5]"
      }`}
      style={{ width: `${cq}cqw`, height: `${cq}cqw`, fontSize: `${cq * 0.46}cqw` }}
    >
      <ic.Icon style={ic.color ? { color: ic.color } : undefined} />
    </div>
  );
}

/* Badge that swaps to the next icon every few seconds with a little pop. */
function HeldIcon({ items, offset, live }: { items: Ic[]; offset: number; live: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!live) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setI((n) => (n + 1) % items.length);
      id = setInterval(() => setI((n) => (n + 1) % items.length), 2800);
    }, offset);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [items.length, offset, live]);
  const ic = items[i];
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={ic.label}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 90, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <IconBadge ic={ic} size={64} gold />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const reduced = useReducedMotion();
  const live = inView && !reduced; // loops only run while the section is on screen

  // arm sway: the left arm "tosses" while the right "catches", then they swap
  const sway = (dir: 1 | -1) =>
    live
      ? { rotate: [0, -9 * dir, 0, 5 * dir, 0], transition: { duration: JUGGLE_DUR / 2, repeat: Infinity, ease: "easeInOut" as const } }
      : { rotate: 0 };

  return (
    <section
      ref={ref}
      id="services"
      aria-label="What I do: web development, mobile apps, backend APIs, databases, authentication and security, deployment"
      className="relative mx-auto flex max-w-5xl scroll-mt-24 items-center justify-center px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[45%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full glow [--glow:0.15]" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[34rem] [container-type:inline-size]"
      >
        {/* the whole figure breathes; done on this HTML wrapper so it's a cheap GPU transform */}
        <motion.div className="relative" animate={live ? { y: [0, -6, 0] } : { y: 0 }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
        <svg viewBox="0 0 400 460" className="w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="wid-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "var(--sig-a)" }} />
              <stop offset="1" style={{ stopColor: "var(--sig-c)" }} />
            </linearGradient>
            <radialGradient id="wid-floor" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#f0b252" stopOpacity="0.45" />
              <stop offset="1" stopColor="#f0b252" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* juggling arc guide */}
          <path d="M95 150 Q200 -230 305 150" fill="none" stroke="url(#wid-gold)" strokeOpacity="0.25" strokeDasharray="3 9" strokeWidth="2" />

          <ellipse cx="200" cy="452" rx="150" ry="16" fill="url(#wid-floor)" />

          <g>
            {/* body: hoodie with gold zip */}
            <path d="M108 460 C108 345 140 312 200 312 C260 312 292 345 292 460 Z" fill={HOODIE} />
            <path d="M108 460 C108 345 140 312 200 312 C260 312 292 345 292 460" fill="none" stroke="url(#wid-gold)" strokeOpacity="0.35" strokeWidth="2" />
            <path d="M170 316 Q200 345 230 316" fill="none" stroke="#2a2a33" strokeWidth="10" strokeLinecap="round" />
            <line x1="200" y1="340" x2="200" y2="460" stroke="url(#wid-gold)" strokeWidth="3" strokeOpacity="0.7" />
            <circle cx="200" cy="395" r="9" fill="url(#wid-gold)" />

            {/* left arm (viewer's left), rotating from the shoulder */}
            <motion.g style={{ originX: "125px", originY: "340px" }} animate={sway(1)}>
              <path d="M128 342 L82 300 L95 205" fill="none" stroke={HOODIE} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M128 342 L82 300 L95 205" fill="none" stroke="url(#wid-gold)" strokeOpacity="0.2" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="95" cy="198" r="17" fill={SKIN} />
            </motion.g>

            {/* right arm */}
            <motion.g style={{ originX: "275px", originY: "340px" }} animate={sway(-1)}>
              <path d="M272 342 L318 300 L305 205" fill="none" stroke={HOODIE} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M272 342 L318 300 L305 205" fill="none" stroke="url(#wid-gold)" strokeOpacity="0.2" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="305" cy="198" r="17" fill={SKIN} />
            </motion.g>

            {/* head bobs along, watching the icons fly */}
            <motion.g
              style={{ originX: "200px", originY: "300px" }}
              animate={live ? { rotate: [-4, 4, -4] } : { rotate: 0 }}
              transition={{ duration: JUGGLE_DUR, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="184" y="270" width="32" height="42" rx="10" fill={SKIN_SHADE} />
              <circle cx="141" cy="228" r="12" fill={SKIN_SHADE} />
              <circle cx="259" cy="228" r="12" fill={SKIN_SHADE} />
              <ellipse cx="200" cy="222" rx="58" ry="64" fill={SKIN} />
              <path d="M141 214 C134 150 176 132 206 138 C248 136 270 166 260 214 C254 186 238 172 200 174 C170 175 150 190 141 214 Z" fill={HAIR} />
              <path d="M146 232 C150 284 182 294 200 294 C218 294 250 284 254 232 C246 262 224 274 200 274 C176 274 154 262 146 232 Z" fill={HAIR} />
              <path d="M184 256 Q200 266 216 256" fill="none" stroke="#6b2e22" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M164 200 Q177 193 190 199" fill="none" stroke={HAIR} strokeWidth="5" strokeLinecap="round" />
              <path d="M210 199 Q223 193 236 200" fill="none" stroke={HAIR} strokeWidth="5" strokeLinecap="round" />
              <motion.g
                style={{ originX: "200px", originY: "222px" }}
                animate={live ? { scaleY: [1, 1, 0.1, 1, 1] } : { scaleY: 1 }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
              >
                <ellipse cx="178" cy="222" rx="5.5" ry="7" fill={HAIR} />
                <ellipse cx="222" cy="222" rx="5.5" ry="7" fill={HAIR} />
              </motion.g>
              <g fill="none" stroke="url(#wid-gold)" strokeWidth="3.5">
                <circle cx="178" cy="222" r="17" />
                <circle cx="222" cy="222" r="17" />
                <path d="M195 220 Q200 216 205 220" />
                <path d="M161 218 L145 214 M239 218 L255 214" />
              </g>
            </motion.g>
          </g>

          {/* sparkles popping around */}
          {live &&
            [[50, 60], [350, 50], [35, 300], [365, 310], [200, -95]].map(([x, y], k) => (
              <motion.path
                key={k}
                d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`}
                fill="url(#wid-gold)"
                style={{ originX: `${x}px`, originY: `${y}px` }}
                animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], rotate: [0, 90, 180] }}
                transition={{ duration: 2.2, delay: k * 0.6, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              />
            ))}
        </svg>

        {/* icon layer, laid over the drawing in the same coordinate space (x/400, y/460) */}
        <div className="pointer-events-none absolute inset-0">
          {/* held icons ride on overlays that rotate about each shoulder exactly like the arms */}
          <motion.div className="absolute inset-0" style={{ transformOrigin: "31.25% 73.9%" }} animate={sway(1)}>
            <div className="absolute" style={{ left: "23.75%", top: "32.6%" }}><HeldIcon items={leftHand} offset={0} live={live} /></div>
          </motion.div>
          <motion.div className="absolute inset-0" style={{ transformOrigin: "68.75% 73.9%" }} animate={sway(-1)}>
            <div className="absolute" style={{ left: "76.25%", top: "32.6%" }}><HeldIcon items={rightHand} offset={1400} live={live} /></div>
          </motion.div>

          {/* juggled icons: each rides a full-size layer whose translate % maps 1:1 onto the drawing */}
          {live &&
            juggled.map((ic, i) => {
              const X = [95, 140, 200, 260, 305].map((v) => `${(v / 400) * 100}%`);
              const Y = [150, 10, -40, 10, 150].map((v) => `${(v / 460) * 100}%`);
              return (
                <motion.div
                  key={ic.label}
                  className="absolute inset-0"
                  initial={{ x: X[0], y: Y[0], opacity: 0 }}
                  animate={{ x: X, y: Y, opacity: [0, 1, 1, 1, 0] }}
                  transition={{ duration: JUGGLE_DUR, delay: i * (JUGGLE_DUR / juggled.length), repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
                >
                  <motion.div
                    className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: [0, 120, 180, 240, 360], scale: [0.4, 0.9, 1, 0.9, 0.4] }}
                    transition={{ duration: JUGGLE_DUR, delay: i * (JUGGLE_DUR / juggled.length), repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
                  >
                    <IconBadge ic={ic} size={44} />
                  </motion.div>
                </motion.div>
              );
            })}
        </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
