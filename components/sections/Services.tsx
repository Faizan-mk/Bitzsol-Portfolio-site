import Heading from "@/components/ui/Heading";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="What We Offer" title="Our Services" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.num} data-reveal className="spotlight panel panel-hover group p-6">
            <div className="mb-4 text-4xl font-extrabold text-white/10 transition group-hover:text-neon">{s.num}</div>
            <h3 className="mb-2 text-base font-semibold text-brand">{s.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
