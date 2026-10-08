import Link from "next/link";
import { HiArrowRight, HiOutlineGlobeAlt } from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { company, snapshot } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Who We Are" title="About Bitzsol" />
      <div className="grid gap-4 md:grid-cols-3">
        <div data-reveal className="spotlight panel panel-hover flex flex-col justify-between gap-8 p-7 sm:p-9 md:col-span-2">
          <div>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">{company.about}</p>
            <p className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-neon">Our Philosophy</p>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">{company.philosophy}</p>
            <p className="neon-text mt-8 text-base font-semibold leading-snug sm:text-lg">
              Embrace modern technology, rethink processes, and elevate experiences.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-neon !py-2.5 !text-xs">Start a project <HiArrowRight /></Link>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 !text-xs">
              <HiOutlineGlobeAlt /> {company.websiteLabel}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {snapshot.map((s) => (
            <div key={s.label} data-reveal className="spotlight panel panel-hover p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{s.label}</p>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
