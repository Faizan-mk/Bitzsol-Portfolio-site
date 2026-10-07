import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { HiArrowRight, HiOutlineEye, HiOutlineGlobeAlt, HiOutlineRocketLaunch } from "react-icons/hi2";
import {
  advantages, approach, company, process, projects, services, snapshot,
  solutions, testimonials, trustedBy, values,
} from "@/lib/data";

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div data-heading className="mb-14 text-center">
      <p data-kicker className="kicker mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neon">{kicker}</p>
      <h2 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl" aria-label={title}>
        {/* two-tone: first half of the words in ink, the rest in neon */}
        {title.split(" ").map((w, i, all) => (
          <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-1 last:mr-0" aria-hidden>
            <span data-word className={`inline-block ${i >= Math.max(1, Math.floor(all.length / 2)) ? "neon-text" : ""}`}>{w}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}

export function About() {
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
            <a href="#contact" className="btn-neon !py-2.5 !text-xs">Start a project <HiArrowRight /></a>
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

const purposeCards = [
  { label: "Our Mission", text: company.mission, Icon: HiOutlineRocketLaunch },
  { label: "Our Vision", text: company.vision, Icon: HiOutlineEye },
];

export function Purpose() {
  return (
    <section id="purpose" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Our Purpose" title="Mission & Vision" />
      <div className="grid gap-5 md:grid-cols-2">
        {purposeCards.map(({ label, text, Icon }) => (
          <div key={label} data-reveal className="spotlight panel panel-hover p-7 sm:p-9">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-neon/10 text-2xl text-neon">
              <Icon />
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neon">{label}</p>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Heading kicker="What Guides Us" title="Our Core Values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.num} data-reveal className="spotlight panel panel-hover group p-6">
              <div className="mb-4 text-4xl font-extrabold text-white/10 transition group-hover:text-neon">{v.num}</div>
              <h3 className="mb-2 text-base font-semibold text-brand">{v.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
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
        <a href="#contact" className="btn-neon shrink-0 !py-2.5 !text-sm">Start a project <HiArrowRight /></a>
      </div>
    </section>
  );
}

export function Services() {
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

export function Why() {
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

export function Process() {
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

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Portfolio" title="Selected Work" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} data-tilt data-card className="spotlight panel group flex flex-col overflow-hidden hover:border-brand/40">
            <div className="relative h-48 overflow-hidden" data-cursor-label="View">
              <div data-parallax className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-panel via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-neon">{p.category}</p>
              <h3 className="mb-2 text-base font-semibold text-white">{p.title}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-white/55">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
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

      <div data-reveal className="mt-10 flex flex-col items-center gap-5 border-t border-line pt-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">Trusted by</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {trustedBy.map((n) => (
            <span key={n} className="text-lg font-bold text-white/70 transition hover:text-neon sm:text-xl">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
