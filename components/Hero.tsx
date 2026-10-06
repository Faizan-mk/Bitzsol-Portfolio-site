"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn, FaNodeJs, FaReact } from "react-icons/fa6";
import { HiOutlineMapPin } from "react-icons/hi2";
import { SiMongodb, SiNextdotjs } from "react-icons/si";
import { profile } from "@/lib/data";
import Magnetic from "./motion/Magnetic";
import { INTRO_DELAY } from "./motion/Preloader";

const roles = ["Full Stack Developer", "MERN Stack Developer", "React Native Developer", "Next.js Developer"];
const ease = [0.16, 1, 0.3, 1] as const;
const TYPE_STEP = 0.09; // seconds per typed character

const badges = [
  { Icon: FaReact, label: "React", className: "left-[2%] top-[18%]", color: "#61dafb", float: 10, dur: 4.5 },
  { Icon: SiNextdotjs, label: "Next.js", className: "right-[0%] top-[28%]", color: "currentColor", float: -12, dur: 5.2 },
  { Icon: FaNodeJs, label: "Node.js", className: "left-[0%] top-[58%]", color: "#68a063", float: -9, dur: 4.8 },
  { Icon: SiMongodb, label: "MongoDB", className: "right-[4%] top-[66%]", color: "#47a248", float: 11, dur: 5.6 },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // looping decorations only run while the hero is actually on screen
  const live = useInView(sectionRef) && !reduced;

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setRole((r) => (r + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [live]);
  const d = reduced ? 0 : INTRO_DELAY;
  const [role, setRole] = useState(0);



  // portrait leans toward the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const shiftX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-60, 60]);

  // Typewriter: "I’m Muhammad Faizan" appears one character at a time once the preloader lifts.
  const words = [`I’m`, ...profile.name.split(" ")];
  const totalChars = words.join("").length;
  const typeStart = d + 0.2;
  const t = typeStart + totalChars * TYPE_STEP; // everything else waits for the name to finish
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced) { setTyped(totalChars); return; }
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setTyped((n) => (n >= totalChars ? (clearInterval(id), n) : n + 1)), TYPE_STEP * 1000);
    }, typeStart * 1000);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [reduced, totalChars, typeStart]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div
        style={{ x: glowX }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: d, duration: 1.6, ease }}
        className="pointer-events-none absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full glow [--glow:0.20]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      <div data-hero-content className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-6 px-5 pt-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div data-hero-text className="order-2 pb-12 lg:order-1 lg:pb-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d, duration: 0.7, ease }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs text-white/60"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Available for work
          </motion.p>

          <h1 className="text-4xl font-extrabold leading-[1.1] text-brand sm:text-6xl" aria-label={`I'm ${profile.name}`}>
            {(() => {
              let idx = 0;
              return words.map((w, wi) => (
                <span key={wi} className="relative mr-[0.25em] inline-flex pb-1" aria-hidden>
                  {wi === 0 && typed === 0 && <span className="type-caret" style={{ left: 0, right: "auto" }} />}
                  {[...w].map((ch) => {
                    const i = idx++;
                    const shown = i < typed;
                    return (
                      <span key={i} className="relative inline-flex">
                        {/* letters stay in the layout while hidden so the line never reflows */}
                        <motion.span
                          className="inline-block"
                          initial={false}
                          animate={shown ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: 12, scale: 0.6, filter: "blur(6px)" }}
                          transition={{ duration: 0.35, ease }}
                        >
                          {ch}
                        </motion.span>
                        {i === typed - 1 && <span className="type-caret" />}
                      </span>
                    );
                  })}
                </span>
              ));
            })()}
          </h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t + 0.1, duration: 0.8, ease }}
            className="mt-2 flex flex-wrap items-baseline gap-x-2 text-2xl font-bold leading-tight text-white sm:text-4xl"
          >
            <span>Expert</span>
            <span className="relative inline-flex h-[1.25em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[role]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="inline-block whitespace-nowrap bg-linear-to-r from-white to-gold bg-clip-text text-transparent"
                >
                  {roles[role]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t + 0.25, duration: 0.8, ease }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t + 0.4, duration: 0.8, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href={profile.resume} download className="btn-gold">Download CV</a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className="btn-outline">View Portfolio</a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: t + 0.55, duration: 0.8 }}
            className="mt-8 flex items-center gap-4 text-white/50"
          >
            {[
              { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
              { href: profile.github, label: "GitHub", Icon: FaGithub },
            ].map(({ href, label, Icon }) => (
              <Magnetic key={label} strength={0.5}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-brand hover:bg-gold/10 hover:text-gold">
                  <Icon />
                </a>
              </Magnetic>
            ))}
            <span className="ml-2 flex items-center gap-1.5 text-xs">
              <HiOutlineMapPin className="text-brand" /> {profile.location}
            </span>
          </motion.div>
        </div>

        <div data-hero-portrait className="relative order-1 mx-auto w-full max-w-[22rem] self-end sm:max-w-md lg:order-2 lg:max-w-[min(100%,calc((100svh-6rem)*0.8))] [perspective:1000px]">
          {/* slow spinning gold ring */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, rotate: live ? 360 : 0 }}
            transition={{
              opacity: { delay: d + 0.2, duration: 1 },
              scale: { delay: d + 0.2, duration: 1.2, ease },
              rotate: live ? { duration: 40, repeat: Infinity, ease: "linear" } : { duration: 0 },
            }}
            className="absolute left-1/2 top-[8%] aspect-square w-[85%] -translate-x-1/2 rounded-full border border-dashed border-gold/30"
          />
          <motion.div
            aria-hidden
            animate={live ? { scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] } : { scale: 1, opacity: 0.45 }}
            transition={live ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            className="absolute left-1/2 top-[18%] aspect-square w-[62%] -translate-x-1/2 rounded-full glow [--glow:0.30]"
          />

          <motion.div
            style={{ rotateY: rotY, rotateX: rotX, x: shiftX }}
            initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: d + 0.15, duration: 1.3, ease }}
            className="relative aspect-[4/5] w-full [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]"
          >
            <Image
              src="/assets/profile-main.png"
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain object-bottom"
            />
          </motion.div>

          {badges.map(({ Icon, label, className, color, float, dur }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: live ? [0, float, 0] : 0 }}
              transition={{
                opacity: { delay: d + 0.8 + i * 0.12, duration: 0.5 },
                scale: { delay: d + 0.8 + i * 0.12, type: "spring", stiffness: 260, damping: 16 },
                y: live ? { duration: dur, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 },
              }}
              className={`absolute z-10 hidden items-center gap-2 rounded-xl border border-white/10 bg-panel px-3 py-2 text-xs font-medium text-white shadow-xl sm:flex ${className}`}
            >
              <Icon style={{ color }} className="text-base" /> {label}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: t + 0.9 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 lg:flex"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold"
            animate={live ? { y: [0, 12, 0], opacity: [1, 0.2, 1] } : { y: 0, opacity: 1 }}
            transition={live ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
          />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
