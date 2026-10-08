"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/motion/Magnetic";
import { INTRO_DELAY } from "@/components/motion/Preloader";

const ease = [0.16, 1, 0.3, 1] as const;
const HOLD = 4.2; // seconds each shape holds before the bits move on

// The field opens on the Bitzsol bulb, then spells out what we do. "bulb" is drawn, the rest are typed.
const SHAPES = [
  { word: "bulb", label: "Bitzsol", services: "Ideas turned into working digital products." },
  { word: "Build.", label: "Build", services: "Websites, web apps, e-commerce stores and cloud applications." },
  { word: "Automate.", label: "Automate", services: "AI automations, chatbots and GoHighLevel CRM, funnels and booking." },
  { word: "Grow.", label: "Grow", services: "Digital marketing, SEO and social media management." },
  { word: "Design.", label: "Design", services: "Logos, brand identities, marketing creatives and video editing." },
];

type Target = { xy: Float32Array; accent: Uint8Array; count: number; gap: number };

// Rasterise one shape off-screen and sample its filled pixels into a grid of target points.
function sample(word: string, w: number, h: number, mobile: boolean, maxN: number): Target {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  const family = getComputedStyle(document.body).fontFamily;
  const cx = w / 2;
  const cy = h * (mobile ? 0.36 : 0.4);

  // one size for every word, fitted to the longest so the rhythm never jumps
  let size = Math.min(h * (mobile ? 0.2 : 0.34), 320);
  g.font = `800 ${size}px ${family}`;
  const longest = Math.max(...SHAPES.filter((s) => s.word !== "bulb").map((s) => g.measureText(s.word).width));
  size *= Math.min(1, (w * (mobile ? 0.92 : 0.8)) / longest);

  // accent region: the full stop, or the base of the bulb
  let accentFrom = Infinity;
  g.fillStyle = "#fff";
  if (word === "bulb") {
    const r = mobile ? Math.min(w * 0.26, h * 0.13) : size * 0.62;
    const t = r * 0.36; // ring thickness
    const top = cy - r * 0.15;
    g.lineWidth = t;
    g.lineCap = "butt";
    g.beginPath();
    g.arc(cx, top, r, Math.PI * 0.72, Math.PI * 2.28);
    g.stroke();
    // tapered tails curling down toward the base
    for (const side of [-1, 1]) {
      const a = side < 0 ? Math.PI * 0.72 : Math.PI * 0.28;
      const ox = cx + Math.cos(a) * r, oy = top + Math.sin(a) * r;
      const nx = Math.cos(a), ny = Math.sin(a);
      g.beginPath();
      g.moveTo(ox + nx * t / 2, oy + ny * t / 2);
      g.lineTo(ox - nx * t / 2, oy - ny * t / 2);
      g.lineTo(cx + side * r * 0.36, top + r * 1.22);
      g.closePath();
      g.fill();
    }
    accentFrom = top + r * 1.3;
    g.beginPath();
    g.arc(cx, top + r * 1.38, r * 0.3, 0, Math.PI);
    g.closePath();
    g.fill();
  } else {
    g.font = `800 ${size}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(word, cx, cy);
    const full = g.measureText(word).width;
    const dot = g.measureText(".").width;
    accentFrom = cx + full / 2 - dot * 1.05;
  }

  const data = g.getImageData(0, 0, w, h).data;
  // start the grid near the right spacing (from the filled area), then widen until the shape fits the particle budget
  let area = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 140) area++;
  let gap = Math.max(3, Math.floor(Math.sqrt(area / maxN)));
  let pts: number[] = [];
  for (;;) {
    pts = [];
    for (let y = 0; y < h; y += gap) for (let x = 0; x < w; x += gap) if (data[(y * w + x) * 4 + 3] > 140) pts.push(x, y);
    if (pts.length / 2 <= maxN) break;
    gap++;
  }
  const n = pts.length / 2;
  // shuffle so a different scatter of bits peels away on every morph
  for (let i = n - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [pts[i * 2], pts[j * 2]] = [pts[j * 2], pts[i * 2]];
    [pts[i * 2 + 1], pts[j * 2 + 1]] = [pts[j * 2 + 1], pts[i * 2 + 1]];
  }
  const accent = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const v = word === "bulb" ? pts[i * 2 + 1] : pts[i * 2];
    accent[i] = v >= accentFrom ? 1 : 0;
  }
  return { xy: Float32Array.from(pts), accent, count: n, gap };
}

// Run work when the main thread is idle, so sampling never lands on an animation frame.
const whenIdle = (fn: () => void) =>
  typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(fn, { timeout: 800 }) : setTimeout(fn, 60) as unknown as number;
const cancelIdle = (id: number) => (typeof window.cancelIdleCallback === "function" ? window.cancelIdleCallback(id) : clearTimeout(id));

export default function Hero() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const morphRef = useRef<(i: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [cycleKey, setCycleKey] = useState(0); // restarts the auto-advance after a manual pick
  const d = reduced ? 0 : INTRO_DELAY;

  // The particle engine: lives entirely outside React state for speed.
  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const still = !!reduced;

    let W = 0, H = 0, dpr = 1, mobile = false, size = 2, maxN = 0, extra = 0;
    let targets: (Target | undefined)[] = [];
    let N = 0, live = 0; // N bits are allocated; only the first `live` are simulated and drawn
    let px = new Float32Array(0), py = new Float32Array(0), vx = new Float32Array(0), vy = new Float32Array(0);
    let tx = new Float32Array(0), ty = new Float32Array(0), hx = new Float32Array(0), hy = new Float32Array(0);
    let tone = new Uint8Array(0), base = new Uint8Array(0), free = new Uint8Array(0), phase = new Float32Array(0);
    // per-frame draw buckets (colour x loose), so each bit is visited a fixed number of times per frame
    let bucket = new Uint8Array(0), order = new Uint32Array(0);
    const counts = new Uint32Array(8), offs = new Uint32Array(8);
    let current = 0;
    let idleId = 0;
    const mouse = { x: -9999, y: -9999 };
    let colors = ["#fff", "#d5ff27", "#7f3aed", "#9f7aea"];
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      const v = (n: string, f: string) => s.getPropertyValue(n).trim() || f;
      colors = [v("--color-white", "#fff"), v("--color-neon", "#d5ff27"), v("--color-brand", "#7f3aed"), v("--color-brand-soft", "#9f7aea")];
    };

    // bits nearly touch so the letterforms read solid, with a hairline of space between them
    const refit = () => {
      const ready = targets.filter((t): t is Target => !!t);
      size = Math.max(...ready.map((t) => t.gap)) * 0.78;
      live = Math.min(N, Math.max(live, ...ready.map((t) => t.count + extra)));
    };
    const shape = (i: number) => {
      if (!targets[i]) { targets[i] = sample(SHAPES[i].word, W, H, mobile, maxN); refit(); }
      return targets[i]!;
    };
    // sample the shapes not on screen yet, one per idle slot
    const sampleRest = () => {
      const i = SHAPES.findIndex((_, k) => !targets[k]);
      if (i === -1) return;
      shape(i);
      idleId = whenIdle(sampleRest);
    };

    const assign = (idx: number, burst: boolean) => {
      current = idx;
      const t = shape(idx);
      const bulb = SHAPES[idx].word === "bulb";
      for (let i = 0; i < N; i++) {
        if (i < t.count) {
          free[i] = 0;
          tx[i] = t.xy[i * 2]; ty[i] = t.xy[i * 2 + 1];
          // the bulb glows violet with a neon base, words are ink with a neon full stop
          tone[i] = t.accent[i] ? 1 : bulb ? (base[i] === 0 ? 2 : 3) : base[i];
        } else {
          // leftover bits drift as dust around the field
          free[i] = 1;
          hx[i] = Math.random() * W; hy[i] = Math.random() * H;
          tone[i] = base[i] === 0 ? 0 : 2;
        }
        if (burst) { vx[i] += (Math.random() - 0.5) * 14; vy[i] += (Math.random() - 0.5) * 14; }
      }
    };

    const build = () => {
      const r = wrap.getBoundingClientRect();
      const w = Math.round(r.width), h = Math.round(r.height);
      if (!w || !h || (w === W && h === H)) return false;
      W = w; H = h;
      mobile = W < 640;
      // the bits are flat squares, so 1.5x is as crisp as 2x at a fraction of the fill cost
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      maxN = mobile ? 1800 : 5000;
      extra = mobile ? 120 : 260;
      cancelIdle(idleId);
      targets = new Array(SHAPES.length);
      if (maxN + extra !== N) {
        N = maxN + extra;
        px = new Float32Array(N); py = new Float32Array(N); vx = new Float32Array(N); vy = new Float32Array(N);
        tx = new Float32Array(N); ty = new Float32Array(N); hx = new Float32Array(N); hy = new Float32Array(N);
        tone = new Uint8Array(N); base = new Uint8Array(N); free = new Uint8Array(N); phase = new Float32Array(N);
        bucket = new Uint8Array(N); order = new Uint32Array(N);
        for (let i = 0; i < N; i++) {
          px[i] = Math.random() * W; py[i] = Math.random() * H;
          const roll = Math.random();
          base[i] = roll < 0.94 ? 0 : roll < 0.98 ? 1 : 2;
          phase[i] = Math.random() * Math.PI * 2;
        }
      }
      live = 0;
      assign(current, false); // samples only the shape on screen; the rest follow in idle time
      if (still) for (let i = 0; i < N; i++) { px[i] = free[i] ? hx[i] : tx[i]; py[i] = free[i] ? hy[i] : ty[i]; }
      idleId = whenIdle(sampleRest);
      return true;
    };

    const startAt = performance.now() + d * 1000;
    const draw = (now: number) => {
      const fade = still ? 1 : Math.max(0, Math.min(1, (now - startAt) / 900));
      const time = now / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (!fade) return;
      const R = mobile ? 70 : 120, R2 = R * R, lit2 = R2 * 1.6;
      const pull = now < startAt ? 0 : 0.055;

      // one pass: move each bit, then file it under its colour (bits near the pointer catch the neon)
      counts.fill(0);
      for (let i = 0; i < live; i++) {
        let dx = px[i] - mouse.x, dy = py[i] - mouse.y;
        if (!still) {
          let gx: number, gy: number, k: number;
          if (free[i]) {
            gx = hx[i] + Math.sin(time * 0.35 + phase[i]) * 40;
            gy = hy[i] + Math.cos(time * 0.28 + phase[i]) * 40;
            k = 0.004;
          } else {
            gx = tx[i] + Math.sin(time * 1.6 + phase[i]) * 0.7;
            gy = ty[i] + Math.cos(time * 1.3 + phase[i]) * 0.7;
            k = pull;
          }
          vx[i] = (vx[i] + (gx - px[i]) * k) * 0.84;
          vy[i] = (vy[i] + (gy - py[i]) * k) * 0.84;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const dist = Math.sqrt(d2), f = (1 - dist / R) * 5;
            vx[i] += (dx / dist) * f; vy[i] += (dy / dist) * f;
          }
          px[i] += vx[i]; py[i] += vy[i];
          dx += vx[i]; dy += vy[i];
        }
        const b = ((dx * dx + dy * dy < lit2 ? 1 : tone[i]) << 1) | free[i];
        bucket[i] = b; counts[b]++;
      }
      let o = 0;
      for (let b = 0; b < 8; b++) { offs[b] = o; o += counts[b]; }
      for (let i = 0; i < live; i++) order[offs[bucket[i]]++] = i;

      // one fillStyle switch per bucket keeps state changes to a handful per frame
      let from = 0;
      for (let b = 0; b < 8; b++) {
        const to = from + counts[b];
        if (to > from) {
          const loose = b & 1;
          ctx.fillStyle = colors[b >> 1];
          ctx.globalAlpha = fade * (loose ? 0.28 : 1);
          const s = loose ? size * 0.6 : size, hs = s / 2;
          for (let k = from; k < to; k++) { const i = order[k]; ctx.fillRect(px[i] - hs, py[i] - hs, s, s); }
        }
        from = to;
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, running = false;
    const loop = (now: number) => { draw(now); raf = requestAnimationFrame(loop); };
    const play = () => { if (!running && !still) { running = true; raf = requestAnimationFrame(loop); } };
    const pause = () => { running = false; cancelAnimationFrame(raf); };

    morphRef.current = (i: number) => {
      if (!N) return;
      assign(i, !still);
      if (still) { for (let j = 0; j < N; j++) { px[j] = free[j] ? hx[j] : tx[j]; py[j] = free[j] ? hy[j] : ty[j]; } draw(performance.now()); }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    // a click or tap sends a shockwave through the field
    const onDown = (e: PointerEvent) => {
      if (still) return;
      const r = canvas.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      for (let i = 0; i < live; i++) {
        const dx = px[i] - cx, dy = py[i] - cy, dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 320) { const f = (1 - dist / 320) * 38; vx[i] += (dx / dist) * f; vy[i] += (dy / dist) * f; }
      }
    };

    let ready = false, resizeT = 0;
    const io = new IntersectionObserver(([e]) => { if (ready) { if (e.isIntersecting) play(); else pause(); } });
    // resizes are debounced: re-sampling mid-drag would stall every frame of the drag
    const ro = new ResizeObserver(() => {
      if (!ready) return;
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => { if (build() && still) draw(performance.now()); }, 150);
    });
    const mo = new MutationObserver(() => { readColors(); if (still) draw(performance.now()); });

    document.fonts.ready.then(() => {
      ready = true;
      readColors();
      build();
      if (still) draw(performance.now()); else play();
      io.observe(wrap); ro.observe(wrap);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      pause(); io.disconnect(); ro.disconnect(); mo.disconnect();
      clearTimeout(resizeT); cancelIdle(idleId);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [reduced, d]);

  useEffect(() => { morphRef.current(active); }, [active]);

  // auto-advance once the intro has landed
  useEffect(() => {
    if (reduced) return;
    const first = cycleKey === 0 ? d * 1000 + 2400 : HOLD * 1000;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setActive((a) => (a + 1) % SHAPES.length);
      id = setInterval(() => setActive((a) => (a + 1) % SHAPES.length), HOLD * 1000);
    }, first);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [reduced, d, cycleKey]);

  const pick = (i: number) => { setActive(i); setCycleKey((k) => k + 1); };

  return (
    <section id="home" className="relative h-svh min-h-[640px] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full glow [--glow:0.2]" />

      <div ref={wrapRef} data-hero-portrait className="absolute inset-0">
        <canvas ref={canvasRef} aria-hidden className="block h-full w-full touch-pan-y" />
      </div>

      <div data-hero-text className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-8 sm:px-8 sm:pb-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.9, duration: 0.9, ease }}
            className="pointer-events-auto"
          >
            <h1 className="max-w-md text-3xl font-extrabold leading-[1.05] text-white sm:text-[2.6rem]">
              We build the next era of your business.
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55 sm:text-base">
              Websites, AI automation, GoHighLevel and marketing from one team, at fixed and transparent rates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic><Link href="/contact" className="btn-neon">Start a project</Link></Magnetic>
              <Magnetic><Link href="/projects" className="btn-outline">See our work</Link></Magnetic>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 1.1, duration: 0.9, ease }}
            className="pointer-events-auto"
          >
            <div role="tablist" aria-label="What we do" className="grid grid-cols-5 gap-2 sm:gap-3">
              {SHAPES.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.word}
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(i)}
                    className={`group text-left outline-none focus-visible:ring-2 focus-visible:ring-neon/60 rounded-sm ${on ? "text-white" : "text-white/40 hover:text-white/75"}`}
                  >
                    <span className="relative block h-[2px] overflow-hidden rounded-full bg-white/12">
                      {on && (
                        <motion.span
                          key={`${i}-${cycleKey}`}
                          className="absolute inset-y-0 left-0 w-full origin-left bg-neon"
                          initial={{ scaleX: reduced ? 1 : 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: reduced ? 0 : HOLD, ease: "linear" }}
                        />
                      )}
                    </span>
                    <span className="mt-2.5 block text-[11px] font-semibold tracking-tight transition-colors min-[400px]:text-[13px] sm:text-[15px] sm:tracking-normal">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 h-11 overflow-hidden sm:h-6">
              <motion.p
                key={active}
                role="tabpanel"
                initial={reduced ? false : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease }}
                className="text-sm text-white/60"
              >
                {SHAPES[active].services}
              </motion.p>
            </div>
            <p className="mt-1 hidden text-xs text-white/35 lg:block">Run your cursor through the bits, or click to scatter them.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
