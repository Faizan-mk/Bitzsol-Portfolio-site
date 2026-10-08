import Heading from "@/components/ui/Heading";
import { advantages } from "@/lib/data";

export default function Why() {
  return (
    <section id="why" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Our Advantage" title="Why Bitzsol" />
      <p className="mb-12 text-center text-3xl font-extrabold leading-tight sm:text-5xl">
        <span className="text-white">Fixed.</span> <span className="neon-text">Fast.</span>{" "}
        <span className="text-white">Scalable.</span> <span className="neon-text">Efficient.</span>
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
