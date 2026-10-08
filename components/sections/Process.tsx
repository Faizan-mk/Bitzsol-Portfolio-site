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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p) => (
            <div key={p.step} data-reveal className="spotlight panel panel-hover group p-6">
              <div className="mb-4 text-4xl font-extrabold text-white/10 transition group-hover:text-neon">{p.step}</div>
              <h3 className="mb-2 text-base font-semibold text-brand">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
