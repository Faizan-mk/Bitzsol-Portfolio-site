import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { solutions } from "@/lib/data";

export default function Solutions() {
  return (
    <section id="solutions" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="What We Do" title="Premier Digital Solutions" />
      <div className="grid gap-5 md:grid-cols-3">
        {solutions.map((s) => (
          <div key={s.title} data-reveal className="spotlight panel panel-hover flex flex-col p-6 sm:p-7">
            <h3 className="mb-3 text-lg font-bold text-white">{s.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-white/60">{s.text}</p>
            <ul className="mt-auto space-y-2 border-t border-line pt-4">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-xs text-white/65">
                  <HiArrowRight className="mt-0.5 shrink-0 text-xs text-brand" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div data-reveal className="panel mt-6 flex flex-col items-center justify-between gap-5 p-7 sm:flex-row sm:p-9">
        <p className="text-lg font-semibold text-white sm:text-xl">Ready to modernize your business?</p>
        <Link href="/contact" className="btn-neon shrink-0 !py-2.5 !text-sm">Start a project <HiArrowRight /></Link>
      </div>
    </section>
  );
}
