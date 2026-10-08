"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);

/* Every scroll-driven animation on the page, wired up by data attributes in the markup.
   Lives in the root layout, so it re-runs (and reverts the previous page's triggers) on every route change. */
export default function ScrollFX() {
  const pathname = usePathname();
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Section headings: kicker fades in, title words rise out of a mask.
      gsap.utils.toArray<HTMLElement>("[data-heading]").forEach((h) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: "top 85%" } });
        const kicker = h.querySelector<HTMLElement>("[data-kicker]")!;
        tl.from(kicker, { opacity: 0, duration: 0.3 })
          .to(kicker, { duration: 1.1, scrambleText: { text: kicker.textContent ?? "", chars: "01<>/{}#$%&*", speed: 0.6, revealDelay: 0.2 } }, "<")
          .from(h.querySelectorAll("[data-word]"), { yPercent: 110, rotate: 4, duration: 0.9, stagger: 0.06, ease: "power4.out" }, "<0.15");
      });

      // Generic blocks.
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", overwrite: true }),
      });
      gsap.set("[data-reveal]", { opacity: 0 });

      // Project cards flip up in a 3D cascade.
      gsap.set("[data-card]", { opacity: 0, transformPerspective: 1000 });
      ScrollTrigger.batch("[data-card]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 100, rotateX: -18, scale: 0.94, opacity: 0 },
            { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out", clearProps: "transform" }
          ),
      });

      // Card images drift inside their frames while scrolling (not on touch screens, where every drifting image
      // would hold its own GPU layer).
      const touch = window.matchMedia("(pointer: coarse)").matches;
      if (!touch) gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Hero sinks and fades as you leave it (home page only).
      if (document.querySelector("#home")) {
        gsap.to("[data-hero-portrait]", {
          yPercent: 18, opacity: 0.2, ease: "none",
          scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-text]", {
          yPercent: -12, opacity: 0, ease: "none",
          scrollTrigger: { trigger: "#home", start: "30% top", end: "bottom top", scrub: true },
        });
      }

      // Timeline rail draws itself (down, or across when laid out horizontally), dots pop in as each step arrives.
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
        const across = line.offsetWidth > line.offsetHeight;
        gsap.fromTo(line, across ? { scaleX: 0 } : { scaleY: 0 }, {
          ...(across ? { scaleX: 1 } : { scaleY: 1 }), ease: "none", transformOrigin: across ? "left" : "top",
          scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: across ? "top 35%" : "bottom 60%", scrub: 0.6 },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot, i, all) => {
        // dots sharing a row would all trigger at once, so stagger them left to right
        const row = all.filter((d) => Math.abs(d.offsetTop - dot.offsetTop) < 4 && d.offsetParent === dot.offsetParent);
        gsap.from(dot, {
          scale: 0, duration: 0.6, ease: "back.out(3)", delay: row.length > 1 ? row.indexOf(dot) * 0.12 : 0,
          scrollTrigger: { trigger: dot, start: "top 75%" },
        });
      });

      // Outlined words fill in one after another.
      gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
        gsap.fromTo(el.querySelectorAll("[data-fill-word]"), { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", ease: "none", stagger: 0.6,
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: 0.5 },
        });
      });

      // Process steps slide in from alternating sides.
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 ? 80 : -80, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    // Stats count up (also runs with reduced motion, just instantly).
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count!);
      const decimals = (el.dataset.count!.split(".")[1] ?? "").length;
      const suffix = el.dataset.suffix ?? "";
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 2, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => { el.textContent = obj.v.toFixed(decimals) + suffix; },
      });
    });

    // Skill bars fill when their card shows up.
    gsap.utils.toArray<HTMLElement>(".skill-fill").forEach((bar) => {
      gsap.fromTo(bar, { width: "0%" }, {
        width: bar.dataset.w, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: bar, start: "top 92%", once: true },
      });
    });

    // Fonts and images shift layout after load (or after a client-side navigation); re-measure trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settle = setTimeout(refresh, 300);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("load", refresh);
    };
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
