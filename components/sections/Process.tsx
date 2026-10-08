import Heading from "@/components/ui/Heading";
import { approach, process } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="How We Deliver" title="Our Approach" />
      <div className="grid gap-5 sm:grid-cols-3">
        {approach.map((p) => (
          <div key={p.step} data-step className="panel panel-hover group p-6">
            <div className="mb-4 text-4xl font-extrabold text-white/10 transition group-hover:text-neon">{p.step}</div>
            <h3 className="mb-2 text-base font-semibold text-brand">{p.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Heading kicker="Step by Step" title="How We Work" />
        {/* a timeline: the rail draws itself as you scroll and each step's dot pops in (ScrollFX: [data-line], [data-dot]).
            Vertical on phones, horizontal from lg. */}
        <div className="relative">
          <div aria-hidden className="absolute bottom-0 left-[27px] top-0 w-px bg-linear-to-b from-white/10 via-white/10 to-transparent lg:bg-none lg:bg-line lg:inset-x-0 lg:bottom-auto lg:top-[27px] lg:h-px lg:w-auto" />
          <div aria-hidden data-line className="absolute bottom-0 left-[27px] top-0 w-px bg-linear-to-b from-neon via-brand to-transparent lg:to-brand lg:inset-x-0 lg:bottom-auto lg:top-[27px] lg:h-px lg:w-auto lg:bg-linear-to-r" />
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
            {process.map((p) => (
              <li key={p.step} className="relative pl-20 lg:pl-0 lg:pt-20">
                <span
                  data-dot
                  className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-neon/40 bg-ink text-sm font-bold text-neon shadow-[0_0_28px_-6px_rgba(213,255,39,0.6)]"
                >
                  {p.step}
                </span>
                <div data-reveal className="spotlight panel panel-hover p-6">
                  <h3 className="mb-2 text-base font-semibold text-brand">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
