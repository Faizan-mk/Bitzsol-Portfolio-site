import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { HiArrowRight } from "react-icons/hi2";
import {
  PiBezierCurveDuotone, PiBrainDuotone, PiBrowserDuotone, PiCalendarCheckDuotone, PiChartBarDuotone,
  PiChatCircleDotsDuotone, PiCodeDuotone, PiCpuDuotone, PiCursorClickDuotone, PiDeviceMobileDuotone,
  PiEnvelopeSimpleDuotone, PiFilmStripDuotone, PiFunnelDuotone, PiGearSixDuotone, PiGlobeDuotone, PiHeartDuotone,
  PiLightningDuotone, PiMagnifyingGlassDuotone, PiMegaphoneDuotone, PiMusicNotesDuotone, PiPaletteDuotone,
  PiPenNibDuotone, PiPlayCircleDuotone, PiRankingDuotone, PiRobotDuotone, PiRocketLaunchDuotone, PiStackDuotone,
  PiTargetDuotone, PiThumbsUpDuotone, PiTrendUpDuotone, PiUsersThreeDuotone, PiVideoCameraDuotone,
} from "react-icons/pi";
import Heading from "@/components/ui/Heading";
import { services } from "@/lib/data";

// per service, in the same order as `services` in lib/data: the hero icon and three satellites (the first may spin)
const art: { main: IconType; sats: [IconType, IconType, IconType]; spin?: boolean }[] = [
  { main: PiCodeDuotone, sats: [PiGearSixDuotone, PiBrowserDuotone, PiCursorClickDuotone], spin: true },
  { main: PiBrainDuotone, sats: [PiCpuDuotone, PiRobotDuotone, PiLightningDuotone] },
  { main: PiFunnelDuotone, sats: [PiCalendarCheckDuotone, PiUsersThreeDuotone, PiEnvelopeSimpleDuotone] },
  { main: PiRocketLaunchDuotone, sats: [PiChartBarDuotone, PiTrendUpDuotone, PiMegaphoneDuotone] },
  { main: PiDeviceMobileDuotone, sats: [PiHeartDuotone, PiChatCircleDotsDuotone, PiThumbsUpDuotone] },
  { main: PiMagnifyingGlassDuotone, sats: [PiRankingDuotone, PiGlobeDuotone, PiTargetDuotone] },
  { main: PiPenNibDuotone, sats: [PiGearSixDuotone, PiBezierCurveDuotone, PiStackDuotone], spin: true },
  { main: PiPlayCircleDuotone, sats: [PiFilmStripDuotone, PiVideoCameraDuotone, PiMusicNotesDuotone] },
];

// satellite positions (% of the art box); odd cards mirror them so neighbours don't look stamped
const spots = [[17, 22], [83, 26], [79, 78]] as const;
const sparks = [[30, 12], [70, 10], [10, 55], [92, 52], [40, 88], [62, 92]] as const;

const loop = (name: string, dur: number, delay = 0, timing = "ease-in-out"): CSSProperties => ({
  animation: `${name} ${dur}s ${timing} ${delay}s infinite`,
});

/* A glowing line-art scene: the service's icon on a glass tile, satellites linked to it by flowing lines,
   twinkling sparks, and rays that shoot up on hover. CSS loops only (transform/opacity, stroke offsets). */
function Illustration({ index }: { index: number }) {
  const { main: Main, sats, spin } = art[index % art.length];
  const flip = index % 2 === 1;
  const pts = spots.map(([x, y]) => [flip ? 100 - x : x, y] as const);

  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(127,58,237,0.45),rgba(213,255,39,0.08)_60%,transparent)] transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" style={loop("orbitSpin", 30, 0, "linear")} />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {pts.map(([x, y], i) => (
          <line
            key={i} x1="50" y1="50" x2={x} y2={y}
            stroke={i === 1 ? "var(--color-neon)" : "var(--color-brand-soft)"} strokeOpacity="0.55" strokeWidth="1"
            vectorEffect="non-scaling-stroke" style={{ strokeDasharray: "3 6", ...loop("dash", 1.6, i * 0.3, "linear") }}
          />
        ))}
      </svg>

      {sparks.map(([x, y], i) => (
        <span key={i} className={`absolute h-1 w-1 rounded-full ${i % 2 ? "bg-brand-soft" : "bg-neon"}`} style={{ left: `${x}%`, top: `${y}%`, ...loop("twinkle", 2.4, i * 0.4) }} />
      ))}

      {/* rays that shoot up from the tile on hover */}
      {[-18, 0, 18].map((dx, i) => (
        <span key={dx} className="svc-ray absolute bottom-1/2 h-16 w-px bg-linear-to-t from-neon to-transparent opacity-0" style={{ left: `calc(50% + ${dx}px)`, animationDelay: `${i * 0.25}s` }} />
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div style={loop("chipFloat", 5, index * -0.6)}>
          <div className="flex h-24 w-28 items-center justify-center rounded-2xl border border-neon/35 bg-[linear-gradient(145deg,rgba(127,58,237,0.35),rgba(10,10,14,0.85))] shadow-[0_0_40px_-8px_rgba(127,58,237,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm transition duration-500 group-hover:border-neon group-hover:shadow-[0_0_50px_-6px_rgba(213,255,39,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <Main className="text-6xl text-neon drop-shadow-[0_0_12px_rgba(213,255,39,0.7)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110" />
          </div>
        </div>
      </div>

      {sats.map((Sat, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pts[i][0]}%`, top: `${pts[i][1]}%` }}>
          <div style={loop("chipFloat", 4 + i, i * -1.3)}>
            <span className={`flex h-11 w-11 items-center justify-center rounded-full border bg-black/60 text-2xl backdrop-blur-sm ${i === 1 ? "border-neon/40 text-neon" : "border-brand-soft/40 text-brand-soft"} shadow-[0_0_20px_-6px_currentColor]`}>
              <Sat style={spin && i === 0 ? loop("orbitSpin", 6, 0, "linear") : undefined} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24">
      {/* floating glass orbs and drifting light waves behind the grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { c: "right-[6%] top-16 h-20 w-20", d: 0 },
          { c: "left-[3%] top-[38%] h-14 w-14", d: -2 },
          { c: "bottom-24 right-[4%] h-10 w-10", d: -4 },
          { c: "left-[10%] top-24 h-6 w-6", d: -1 },
        ].map(({ c, d }) => (
          <span key={c} className={`absolute rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),rgba(127,58,237,0.55)_35%,rgba(127,58,237,0.08)_70%)] shadow-[0_0_30px_-4px_rgba(127,58,237,0.6)] ${c}`} style={loop("chipFloat", 7, d)} />
        ))}
        {[["left-0", ""], ["right-0", "-scale-x-100"]].map(([side, mirror]) => (
          <svg key={side} viewBox="0 0 400 200" className={`absolute bottom-0 ${side} ${mirror} h-48 w-[28rem] opacity-50`} style={loop("waveDrift", 9)}>
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M0 ${120 + i * 6} C 90 ${40 + i * 10}, 180 ${200 - i * 4}, 400 ${60 + i * 9}`} fill="none" stroke={i % 3 === 0 ? "var(--color-neon)" : "var(--color-brand-soft)"} strokeOpacity={0.25 - i * 0.02} strokeWidth="1" />
            ))}
          </svg>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Heading kicker="What We Do" title="Our Services" />
        <p className="mx-auto -mt-8 mb-14 max-w-md text-center text-sm leading-relaxed text-white/55 sm:text-base">
          Empowering your business with cutting-edge digital solutions.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Link
              key={s.num}
              href="/contact"
              data-reveal
              className="svc-card spotlight panel group relative flex min-h-[25rem] flex-col overflow-hidden p-5"
            >
              <span className="absolute left-5 top-5 font-mono text-[11px] text-white/30 transition-colors group-hover:text-neon">{s.num}</span>
              <div className="relative -mx-2 flex-1">
                <Illustration index={i} />
              </div>
              <h3 className="mt-2 text-2xl font-bold leading-[1.15] text-white">{s.title}</h3>
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-300 group-hover:text-neon">
                {i % 2 ? "Explore" : "Learn More"}
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
