"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { IconType } from "react-icons";
import { FaAndroid, FaCloudArrowUp, FaDatabase, FaGitAlt, FaGithub, FaNodeJs, FaReact, FaShieldHalved } from "react-icons/fa6";
import { SiMongodb, SiNextdotjs, SiSupabase } from "react-icons/si";

/* "What I do", told without words: a developer builds at a laptop and the tech stack flies across
   to a teammate's phone, while more tools drift around the scene. */

type Ic = { Icon: IconType; color?: string; label: string };

// Icons that fly from the laptop to the phone, one after another.
const stream: Ic[] = [
  { Icon: FaReact, color: "#61dafb", label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: FaNodeJs, color: "#68a063", label: "Node.js" },
  { Icon: SiMongodb, color: "#47a248", label: "MongoDB" },
  { Icon: SiSupabase, color: "#3ecf8e", label: "Supabase" },
];
// Icons drifting around the scene. x/y are in scene units (viewBox 480 x 400).
const floaters: (Ic & { x: number; y: number; dy: number; dur: number })[] = [
  { Icon: FaGitAlt, color: "#f05032", label: "Git", x: 48, y: 70, dy: -10, dur: 4.2 },
  { Icon: FaDatabase, color: "#f5be62", label: "Databases", x: 250, y: 30, dy: 9, dur: 5 },
  { Icon: FaCloudArrowUp, color: "#7cc4ff", label: "Deployment", x: 440, y: 60, dy: -8, dur: 4.6 },
  { Icon: FaShieldHalved, color: "#f5be62", label: "Auth & security", x: 450, y: 300, dy: 10, dur: 5.4 },
  { Icon: FaAndroid, color: "#3ddc84", label: "Android", x: 30, y: 210, dy: 8, dur: 4.8 },
  { Icon: FaGithub, label: "GitHub", x: 105, y: 135, dy: -7, dur: 3.9 },
];

const W = 480;
const H = 400;
const SKIN = "#e9b48b";
const SKIN_SHADE = "#d49a72";
const HAIR = "#1d1410";
const SHIRT = "#f1ebdf";

// The arc the icons travel: laptop -> phone. Sampled so the HTML icons follow the same curve the SVG draws.
const P = [[170, 205], [190, 95], [300, 60], [332, 238]] as const;
const ARC = `M${P[0]} C${P[1]} ${P[2]} ${P[3]}`;
const STEPS = 16;
const arcPts = Array.from({ length: STEPS + 1 }, (_, i) => {
  const t = i / STEPS, u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((d) => k.reduce((s, kk, j) => s + kk * P[j][d], 0));
});
const arcLeft = arcPts.map(([x]) => `${(x / W) * 100}%`);
const arcTop = arcPts.map(([, y]) => `${(y / H) * 100}%`);
const arcFade = arcPts.map((_, i) => (i === 0 || i === STEPS ? 0 : 1));
const arcScale = arcPts.map((_, i) => (i === 0 || i === STEPS ? 0.3 : 1));
const FLIGHT = 4; // seconds per icon trip

function Tile({ ic }: { ic: Ic }) {
  return (
    <div
      role="img"
      aria-label={ic.label}
      className="flex h-[10cqw] w-[10cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] border border-white/10 bg-panel text-[5cqw] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
    >
      <ic.Icon style={ic.color ? { color: ic.color } : undefined} />
    </div>
  );
}

function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const live = useInView(ref, { margin: "-10%" }) && !reduced; // loops only run while on screen
  const loop = (duration: number, extra = {}) => (live ? { duration, repeat: Infinity, ease: "easeInOut" as const, ...extra } : { duration: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto aspect-[6/5] w-full max-w-[44rem] [container-type:inline-size]"
    >
      <div aria-hidden className="absolute inset-[15%] rounded-full glow [--glow:0.18]" />

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="sc-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbd384" />
            <stop offset="1" stopColor="#d99a3a" />
          </linearGradient>
          <radialGradient id="sc-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#f0b252" stopOpacity="0.35" />
            <stop offset="1" stopColor="#f0b252" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="240" cy="368" rx="220" ry="20" fill="url(#sc-floor)" />

        {/* the arc the icons fly along */}
        <path d={ARC} fill="none" stroke="#f0b252" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" style={{ animation: live ? "dash 1.2s linear infinite" : "none" }} />

        {/* ---------- developer at the desk ---------- */}
        <rect x="128" y="184" width="84" height="122" rx="20" fill="#2a2a33" />
        <g>
          <path d="M130 292 L130 238 Q130 208 170 206 Q210 208 210 238 L210 292Z" fill="url(#sc-gold)" />
          <path d="M150 209 Q170 228 190 209" fill="none" stroke="#c98320" strokeWidth="4" strokeLinecap="round" />
          {/* typing arms */}
          <motion.g animate={live ? { y: [0, 2, 0, 1.5, 0] } : { y: 0 }} transition={loop(0.6)}>
            <path d="M138 232 Q118 256 150 264" fill="none" stroke="#e8a843" strokeWidth="15" strokeLinecap="round" />
            <path d="M202 232 Q222 256 190 264" fill="none" stroke="#e8a843" strokeWidth="15" strokeLinecap="round" />
          </motion.g>
          <rect x="163" y="190" width="14" height="18" fill={SKIN_SHADE} />
          {/* head nods to the music */}
          <motion.g animate={live ? { y: [0, -3, 0] } : { y: 0 }} transition={loop(0.9)}>
            <circle cx="170" cy="166" r="30" fill={SKIN} />
            <path d="M140 166 Q137 128 170 128 Q204 128 200 166 Q196 148 182 146 Q170 141 156 146 Q144 150 140 166Z" fill={HAIR} />
            <motion.g animate={live ? { scaleY: [1, 1, 0.1, 1] } : { scaleY: 1 }} transition={loop(4, { times: [0, 0.92, 0.96, 1] })}>
              <circle cx="159" cy="170" r="3.2" fill={HAIR} />
              <circle cx="181" cy="170" r="3.2" fill={HAIR} />
            </motion.g>
            <path d="M162 182 Q170 189 178 182" fill="none" stroke={HAIR} strokeWidth="2.5" strokeLinecap="round" />
            {/* headphones */}
            <path d="M137 168 Q136 124 170 124 Q204 124 203 168" fill="none" stroke="#15151a" strokeWidth="6" strokeLinecap="round" />
            <rect x="130" y="157" width="11" height="22" rx="5" fill="url(#sc-gold)" />
            <rect x="199" y="157" width="11" height="22" rx="5" fill="url(#sc-gold)" />
          </motion.g>
        </g>

        {/* laptop (lid faces us) */}
        <rect x="126" y="212" width="88" height="54" rx="6" fill="#d4d6dc" />
        <motion.circle cx="170" cy="239" r="7" fill="#f5be62" animate={live ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }} transition={loop(1.6)} />
        <rect x="116" y="264" width="108" height="6" rx="3" fill="#a9adb6" />

        {/* desk, plant, coffee */}
        <rect x="60" y="268" width="240" height="12" rx="4" fill="#2c2c35" />
        <rect x="76" y="280" width="9" height="84" fill="#23232b" />
        <rect x="275" y="280" width="9" height="84" fill="#23232b" />
        <motion.g style={{ originX: 0.5, originY: 1 }} animate={live ? { rotate: [-4, 4, -4] } : { rotate: 0 }} transition={loop(3.2)}>
          <ellipse cx="82" cy="236" rx="7" ry="16" fill="#5fbf7a" transform="rotate(-25 82 236)" />
          <ellipse cx="96" cy="232" rx="7" ry="18" fill="#4fa868" transform="rotate(20 96 232)" />
          <ellipse cx="89" cy="228" rx="6" ry="18" fill="#6fd08a" />
        </motion.g>
        <rect x="76" y="248" width="26" height="20" rx="4" fill="#3a3a44" />
        <rect x="246" y="246" width="18" height="22" rx="3" fill="#f5be62" />
        <path d="M264 251 q9 0 9 7 q0 7 -9 7" fill="none" stroke="#f5be62" strokeWidth="3" />
        {[250, 259].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 240 q-4 -6 0 -12 q4 -6 0 -12`}
            fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round"
            animate={live ? { y: [0, -8], opacity: [0, 1, 0] } : { opacity: 0.6 }}
            transition={loop(2, { delay: i * 0.7, ease: "easeOut" })}
          />
        ))}

        {/* ---------- teammate with a phone ---------- */}
        <rect x="345" y="298" width="13" height="64" rx="6" fill="#2a2a33" />
        <rect x="362" y="298" width="13" height="64" rx="6" fill="#2a2a33" />
        <ellipse cx="351" cy="364" rx="11" ry="5" fill="#111" />
        <ellipse cx="369" cy="364" rx="11" ry="5" fill="#111" />
        <path d="M330 305 L330 240 Q330 214 360 212 Q390 214 390 240 L390 305Z" fill={SHIRT} />
        <path d="M350 214 L360 229 L370 214" fill="none" stroke="#f0b252" strokeWidth="3" strokeLinejoin="round" />
        <rect x="353" y="198" width="14" height="16" fill={SKIN_SHADE} />
        <motion.g animate={live ? { rotate: [0, -4, 0, 3, 0] } : { rotate: 0 }} transition={loop(3)}>
          <circle cx="360" cy="182" r="27" fill={SKIN} />
          <path d="M333 184 Q329 152 360 152 Q392 152 387 184 Q384 164 360 162 Q340 164 333 184Z" fill="#3b2416" />
          <circle cx="360" cy="148" r="11" fill="#3b2416" />
          <circle cx="348" cy="192" r="4" fill="#f08a7a" opacity="0.35" />
          <circle cx="372" cy="192" r="4" fill="#f08a7a" opacity="0.35" />
          <motion.g animate={live ? { scaleY: [1, 1, 0.1, 1] } : { scaleY: 1 }} transition={loop(3.6, { times: [0, 0.9, 0.95, 1], delay: 0.8 })}>
            <circle cx="351" cy="184" r="3" fill={HAIR} />
            <circle cx="369" cy="184" r="3" fill={HAIR} />
          </motion.g>
          <path d="M352 195 Q360 202 368 195" fill="none" stroke={HAIR} strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
        {/* phone in the left hand; its screen flashes as each icon lands */}
        <path d="M334 236 Q318 262 332 270" fill="none" stroke={SHIRT} strokeWidth="14" strokeLinecap="round" />
        <rect x="320" y="238" width="22" height="36" rx="4" fill="#15151a" />
        <motion.rect x="323" y="242" width="16" height="27" rx="2" fill="url(#sc-gold)" animate={live ? { opacity: [0.45, 1, 0.45] } : { opacity: 0.8 }} transition={loop(FLIGHT / stream.length)} />
        <circle cx="333" cy="270" r="7" fill={SKIN} />
        {/* waving right arm */}
        <motion.g style={{ originX: 0, originY: 1 }} animate={live ? { rotate: [0, 14, -6, 14, 0] } : { rotate: 0 }} transition={loop(2.4)}>
          <path d="M386 236 Q404 214 410 186" fill="none" stroke={SHIRT} strokeWidth="14" strokeLinecap="round" />
          <circle cx="410" cy="182" r="8" fill={SKIN} />
        </motion.g>
      </svg>

      {/* icons flying laptop -> phone */}
      {live &&
        stream.map((ic, i) => (
          <motion.div
            key={ic.label}
            className="absolute z-10"
            initial={{ left: arcLeft[0], top: arcTop[0], opacity: 0, scale: 0.3 }}
            animate={{ left: arcLeft, top: arcTop, opacity: arcFade, scale: arcScale }}
            transition={{ duration: FLIGHT, ease: "linear", repeat: Infinity, delay: (i * FLIGHT) / stream.length }}
          >
            <Tile ic={ic} />
          </motion.div>
        ))}

      {/* icons drifting around the scene */}
      {floaters.map(({ x, y, dy, dur, ...ic }) => (
        <motion.div
          key={ic.label}
          className="absolute"
          style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
          animate={live ? { y: [0, dy, 0], rotate: [0, dy > 0 ? 6 : -6, 0] } : { y: 0 }}
          transition={loop(dur)}
        >
          <Tile ic={ic} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Statement() {
  return (
    <section
      id="services"
      aria-label="What I do: web and mobile apps with React, Next.js, Node.js, MongoDB and Supabase"
      className="relative mx-auto max-w-4xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28"
    >
      <Scene />
    </section>
  );
}
