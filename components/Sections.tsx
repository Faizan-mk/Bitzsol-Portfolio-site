import Image from "next/image";
import { FaAndroid, FaGithub, FaLinkedinIn, FaStar } from "react-icons/fa6";
import {
  HiArrowRight, HiOutlineAcademicCap, HiOutlineArrowTopRightOnSquare, HiOutlineCheckBadge,
  HiOutlineCodeBracket, HiOutlineDocumentText, HiOutlineEnvelope, HiOutlineMapPin,
  HiOutlinePhone, HiOutlineTrophy, HiOutlineUserGroup,
} from "react-icons/hi2";
import {
  achievements, certifications, education, experience, process, profile, projects,
  skillGroups, stats, testimonials, toolTags,
} from "@/lib/data";

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div data-heading className="mb-14 text-center">
      <p data-kicker className="kicker mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">{kicker}</p>
      <h2 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl" aria-label={title}>
        {/* two-tone: first half of the words in ink, the rest in gold */}
        {title.split(" ").map((w, i, all) => (
          <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-1 last:mr-0" aria-hidden>
            <span data-word className={`inline-block ${i >= Math.max(1, Math.floor(all.length / 2)) ? "gold-text" : ""}`}>{w}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8">
      <div data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-panel px-4 py-7 text-center">
            <div className="text-3xl font-bold text-brand sm:text-4xl" data-count={s.value.replace("+", "")} data-suffix={s.value.endsWith("+") ? "+" : ""}>
              {s.value}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-white/45">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="About Me" title="Professional Profile" />
      {/* bento grid: one large story tile, a portrait, and small fact tiles */}
      <div className="grid gap-4 md:grid-cols-3">
        <div data-reveal className="spotlight panel panel-hover flex flex-col justify-between gap-6 p-7 sm:p-9 md:col-span-2 md:row-span-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Who I am</p>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">{profile.about}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-gold !py-2.5 !text-xs">Let&apos;s talk <HiArrowRight /></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 !text-xs"><FaGithub /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 !text-xs"><FaLinkedinIn /> LinkedIn</a>
          </div>
        </div>

        <div data-reveal className="panel relative aspect-square overflow-hidden">
          <Image src="/profile.jpg" alt={profile.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#000]/80 via-transparent to-transparent" />
          <div className="pointer-events-none absolute bottom-4 left-5">
            <p className="text-base font-bold text-[#fff]">{profile.name}</p>
            <p className="text-xs text-[#fff]/70">{profile.role}</p>
          </div>
        </div>

        <div data-reveal className="spotlight panel panel-hover flex items-center gap-4 p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-2xl text-gold"><HiOutlineAcademicCap /></span>
          <div>
            <p className="text-sm font-semibold text-white">{education.degree}</p>
            <p className="text-xs text-white/50">{education.school} · {education.period}</p>
          </div>
        </div>

        <div data-reveal className="spotlight panel panel-hover p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">CGPA</p>
          <p className="mt-1 text-3xl font-extrabold text-white">{education.cgpa.split(" ")[0]}<span className="text-base font-medium text-white/40"> / 4.0</span></p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-gold"><HiOutlineTrophy /> Dean&apos;s List Honor</p>
        </div>

        <div data-reveal className="spotlight panel panel-hover p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Based in</p>
          <p className="mt-1 flex items-center gap-2 text-lg font-bold text-white"><HiOutlineMapPin className="text-gold" /> {profile.location}</p>
          <p className="mt-1 text-xs text-white/50">Open to remote work</p>
        </div>

        <div data-reveal className="spotlight panel panel-hover p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Status</p>
          <p className="mt-1 flex items-center gap-2 text-lg font-bold text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            Available for work
          </p>
          <p className="mt-1 text-xs text-white/50">Full-time, freelance or contract</p>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Experience" title="Work History" />
      <ol className="relative space-y-6 pl-8">
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <span aria-hidden data-line className="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-gold via-gold/60 to-transparent" />
        {experience.map((job) => (
          <li key={job.role} data-reveal className="relative">
            <span data-dot className="absolute -left-[39px] top-6 h-3.5 w-3.5 rounded-full border-2 border-black bg-gold ring-4 ring-gold/20" />
            <div className="panel panel-hover p-6">
              <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {job.role} <span className="text-sm font-normal text-white/45">— {job.company}</span>
                </h3>
                <span className="chip shrink-0">{job.period}</span>
              </div>
              <ul className="space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-white/65">
                    <HiArrowRight className="mt-1 shrink-0 text-xs text-brand" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Skills" title="Technical Expertise" />
      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.title} data-reveal className="spotlight panel panel-hover p-6">
            <h3 className="mb-5 text-sm font-semibold text-white">{g.title}</h3>
            <div className="space-y-4">
              {g.skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-white/80">{s.name}</span>
                    <span className="text-white/40">{s.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div className="skill-fill h-full rounded-full" data-w={`${s.level}%`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div data-reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
        {toolTags.map((t) => (
          <span key={t} className="rounded-md border border-line px-3 py-1 text-xs text-white/60 transition hover:border-gold hover:text-gold">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Process" title="How I Work" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((p) => (
          <div key={p.step} data-step className="panel panel-hover group p-6">
            <div className="mb-4 text-4xl font-extrabold text-white/10 transition group-hover:text-gold">{p.step}</div>
            <h3 className="mb-2 text-base font-semibold text-brand">{p.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Portfolio" title="Featured Work" />
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
              <h3 className="mb-2 text-base font-semibold text-white">{p.title}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-white/55">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-5 self-start !px-4 !py-2 !text-xs"
                >
                  {p.link.kind === "apk" ? <FaAndroid /> : <HiOutlineArrowTopRightOnSquare />} {p.link.label}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Certifications" title="Licenses & Certificates" />
      <div data-reveal className="panel grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
        {certifications.map((c) => (
          <div key={c.title} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-white/5">
            <HiOutlineCheckBadge className="mt-0.5 shrink-0 text-lg text-gold" />
            <div>
              <p className="text-sm font-medium text-white">{c.title}</p>
              <p className="mt-0.5 text-xs text-white/45">{c.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Testimonials" title="What People Say" />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} data-reveal className="spotlight panel panel-hover flex flex-col p-6">
            <div className="mb-3 flex gap-1 text-xs text-gold">
              {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
            </div>
            <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-white/65">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xs font-bold text-on-gold">{t.initials}</span>
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

const achievementIcons = {
  trophy: HiOutlineTrophy,
  users: HiOutlineUserGroup,
  code: HiOutlineCodeBracket,
  cert: HiOutlineCheckBadge,
};

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Achievements" title="Honors & Recognition" />
      <div data-reveal className="panel grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
        {achievements.map((a) => {
          const Icon = achievementIcons[a.icon];
          return (
            <div key={a.title} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-white/5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon className="text-lg" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">{a.title}</p>
                <p className="mt-0.5 text-xs text-white/45">{a.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


