import { FaStar } from "react-icons/fa6";
import Heading from "@/components/ui/Heading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Testimonials" title="What Our Clients Say" />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} data-reveal className="spotlight panel panel-hover flex flex-col p-6">
            <div className="mb-3 flex gap-1 text-xs text-neon">
              {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
            </div>
            <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-white/65">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{t.initials}</span>
              <span>
                <span className="block text-sm font-medium text-white">{t.name}</span>
                <span className="block text-[11px] text-white/40">{t.title}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
