"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { INTRO_DELAY } from "./Preloader";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { __lenis?: Lenis }
}

/* Inertial smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1.1, anchors: { offset: -20 }, autoRaf: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    // prioritized: scroll first, then GSAP renders, so nothing reads a stale layout mid-frame
    gsap.ticker.add(raf, false, true);
    gsap.ticker.lagSmoothing(0);

    // hold the page still while the preloader plays
    lenis.stop();
    const start = setTimeout(() => lenis.start(), (INTRO_DELAY - 0.5) * 1000);

    return () => {
      clearTimeout(start);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/* Scroll helper that goes through Lenis when it's running. */
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
