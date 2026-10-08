import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiArrowRight, HiOutlineChartBar, HiOutlineCodeBracket, HiOutlineCpuChip, HiOutlineFilm, HiOutlineFunnel,
  HiOutlineMagnifyingGlass, HiOutlineSparkles, HiOutlineUserGroup,
} from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { services } from "@/lib/data";

// one icon per service, in the same order as `services` in lib/data
const icons: IconType[] = [
  HiOutlineCodeBracket, HiOutlineCpuChip, HiOutlineFunnel, HiOutlineChartBar,
  HiOutlineUserGroup, HiOutlineMagnifyingGlass, HiOutlineSparkles, HiOutlineFilm,
];

/* Service cards: an animated icon (spinning light around its tile, gentle float), the description, and actions.
   Cards rise in one after another as they scroll into view (ScrollFX: [data-reveal]). */
export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="What We Offer" title="Our Services" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <article key={s.num} data-reveal className="spotlight panel panel-hover group relative flex flex-col overflow-hidden p-6">
              {/* oversized faint icon in the corner, turns on hover */}
              <Icon aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 text-[8rem] text-white/[0.03] transition duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-neon/[0.07]" />

              <div className="mb-6 flex items-start justify-between">
                {/* icon tile with a light running round its border */}
                <div className="svc-icon relative h-16 w-16 overflow-hidden rounded-2xl p-[1.5px]" style={{ animationDelay: `${-i * 0.7}s` }}>
                  <span aria-hidden className="svc-ring absolute -inset-1/2" style={{ animationDelay: `${-i * 0.9}s` }} />
                  <span className="relative flex h-full w-full items-center justify-center rounded-[calc(1rem-1.5px)] bg-panel text-[1.75rem] text-neon transition-colors duration-500 group-hover:bg-neon group-hover:text-on-neon">
                    <Icon className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110" />
                  </span>
                </div>
                <span className="font-mono text-xs text-white/25 transition-colors group-hover:text-neon">{s.num}</span>
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/55">{s.text}</p>

              <div className="relative flex flex-wrap items-center gap-2">
                <Link href="/contact" className="btn-neon !px-4 !py-2 !text-xs">
                  Get Started <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link href="/projects" className="btn-outline !px-4 !py-2 !text-xs">Our Work</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
