import Link from "next/link";
import { HiArrowRight, HiOutlineBolt, HiOutlineGlobeAlt, HiOutlineTag } from "react-icons/hi2";
import { LOGO_B, LOGO_BULB } from "@/components/brand/logo-path";

const title = ["We", "turn", "ideas", "into", "digital", "products."];

// chips that ride the orbit: position on the ring, and a float delay so they bob out of step
const chips = [
  { label: "Fixed pricing", Icon: HiOutlineTag, pos: "left-[2%] top-[18%]", delay: "0s" },
  { label: "Fast delivery", Icon: HiOutlineBolt, pos: "right-[-2%] top-[46%]", delay: "-2s" },
  { label: "Global clients", Icon: HiOutlineGlobeAlt, pos: "bottom-[8%] left-[12%]", delay: "-4s" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          {/* data-heading/data-kicker/data-word: ScrollFX scrambles the kicker and raises the words */}
          <div data-heading>
            <p data-kicker className="kicker mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-neon">Who We Are</p>
            <h2 aria-label={title.join(" ")} className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
              {title.map((w, i) => (
                <span key={i} aria-hidden className="mr-[0.25em] inline-flex overflow-hidden pb-1 last:mr-0">
                  <span data-word className={`inline-block ${i >= 4 ? "neon-text" : ""}`}>{w}</span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            Websites, apps, AI automation and marketing, built by one focused team at fixed and transparent rates.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-neon">Start a project <HiArrowRight /></Link>
            <Link href="/projects" className="btn-outline">See our work</Link>
          </div>
        </div>

        {/* the Bitzsol bulb at the centre of slowly turning orbits */}
        <div data-reveal aria-hidden className="relative mx-auto aspect-square w-full max-w-[26rem]">
          <div className="absolute inset-0 rounded-full glow [--glow:0.28]" />
          <div className="deco-loop orbit absolute inset-0 rounded-full border border-dashed border-white/12" />
          <div className="deco-loop orbit orbit-rev absolute inset-[16%] rounded-full border border-white/10">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon shadow-[0_0_14px_var(--color-neon)]" />
          </div>
          <div className="deco-loop orbit absolute inset-[31%] rounded-full border border-neon/25">
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-soft shadow-[0_0_12px_var(--color-brand)]" />
          </div>

          <div className="absolute inset-[38%] flex items-center justify-center rounded-full border border-white/10 bg-panel shadow-[0_0_60px_-10px_rgba(127,58,237,0.6)]">
            <svg viewBox="0 0 41 59" className="h-[55%] w-auto">
              <path d={LOGO_B} className="fill-white" />
              <path d={LOGO_BULB} className="fill-neon drop-shadow-[0_0_6px_var(--color-neon)]" />
            </svg>
          </div>

          {chips.map(({ label, Icon, pos, delay }) => (
            <div key={label} className={`chip-float absolute ${pos}`} style={{ animationDelay: delay }}>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-2 text-xs font-medium text-white/85 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md sm:text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neon/15 text-neon"><Icon /></span>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
