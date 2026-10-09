"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const words = ["Web Development", "AI Automations", "GoHighLevel", "Digital Marketing", "Social Media", "Software Development", "Game Development", "E-Commerce", "Cloud"];

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tracks = gsap.utils.toArray<HTMLElement>("[data-track]");
      const loops = tracks.map((t, i) =>
        gsap.to(t, { xPercent: i % 2 ? 0 : -50, startAt: { xPercent: i % 2 ? -50 : 0 }, duration: 30, ease: "none", repeat: -1 })
      );
      const speed = { v: 1 };
      const apply = () => loops.forEach((l) => l.timeScale(speed.v));
      loops.forEach((l) => l.pause());
      let kick: gsap.core.Timeline | undefined;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => loops.forEach((l) => (self.isActive ? l.resume() : l.pause())),
        onUpdate: (self) => {
          const dir = self.direction;
          const boost = dir * (1 + Math.min(Math.abs(self.getVelocity()) / 400, 4));
          kick?.kill();
          kick = gsap.timeline()
            .to(speed, { v: boost, duration: 0.25, ease: "power2.out", onUpdate: apply })
            .to(speed, { v: dir, duration: 1.2, ease: "power2.out", onUpdate: apply });
        },
      });
    },
    { scope: root }
  );

  const row = (outlined: boolean) =>
    [...words, ...words].map((w, i) => (
      <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
        <span
          className={`text-4xl font-extrabold uppercase tracking-tight sm:text-6xl ${
            outlined ? "text-transparent [-webkit-text-stroke:1px_rgba(213,255,39,0.55)]" : "text-white/90"
          }`}
        >
          {w}
        </span>
        <span className="text-2xl text-neon">✦</span>
      </span>
    ));

  return (
    <section ref={root} aria-label="Technologies" className="relative overflow-hidden border-y border-line py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-black to-transparent" />
      <div data-track className="flex w-max">{row(false)}</div>
      <div data-track className="mt-4 flex w-max">{row(true)}</div>
    </section>
  );
}
