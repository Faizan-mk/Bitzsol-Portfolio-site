import Heading from "@/components/ui/Heading";
import { advantages } from "@/lib/data";

export default function Why() {
  return (
    <section id="why" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Our Advantage" title="Why Bitzsol" />
      {/* each word fills in from an outline as you scroll (ScrollFX animates [data-fill-word]) */}
      <p data-fill aria-label="Fixed. Fast. Scalable. Efficient." className="mb-12 text-center text-3xl font-extrabold leading-tight sm:text-6xl">
        {["Fixed.", "Fast.", "Scalable.", "Efficient."].map((w, i) => (
          <span key={w} aria-hidden className="relative mr-[0.25em] inline-block last:mr-0">
            <span className="outline-word">{w}</span>
            <span data-fill-word className={`absolute inset-0 ${i % 2 ? "neon-text" : "text-white"}`}>{w}</span>
          </span>
        ))}
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {advantages.map((a) => (
          <div key={a.num} data-reveal className="spotlight panel panel-hover group flex gap-5 p-6 sm:p-7">
            <div className="text-5xl font-extrabold leading-none text-white/10 transition group-hover:text-neon sm:text-6xl">{a.num}</div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-white">{a.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{a.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
