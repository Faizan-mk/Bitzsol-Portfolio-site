import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiArrowRight, HiArrowUpRight, HiCheck } from "react-icons/hi2";
import RevealFrame from "@/components/motion/RevealFrame";
import Heading from "@/components/ui/Heading";
import PageHeader from "@/components/ui/PageHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { company, projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every project page at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = projects[index];
  const at = (offset: number) => projects[(index + offset + projects.length) % projects.length];
  const prev = at(-1), next = at(1);
  const more = [at(1), at(2), at(3)];

  return (
    <>
      <PageHeader
        crumb={p.title}
        parent={{ href: "/projects", label: "Work" }}
        kicker={p.category}
        title={p.title}
        accent={Math.max(1, Math.floor(p.title.split(" ").length / 2))}
        intro={p.description}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* the screenshot, framed as a browser window */}
        <figure className="relative mt-6">
          <div aria-hidden className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10 rounded-full glow [--glow:0.18]" />
          <div className="panel relative overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto truncate rounded-full bg-white/[0.04] px-4 py-1 text-[11px] text-white/40">{p.title}</span>
              <span className="w-[42px]" />
            </div>
            <RevealFrame className="relative aspect-[16/9] overflow-hidden">
              <Image src={p.image} alt={p.title} fill priority sizes="(min-width: 1152px) 72rem, 100vw" className="object-cover" />
            </RevealFrame>
          </div>
        </figure>

        {/* overview + key facts */}
        <section className="grid gap-5 py-20 md:grid-cols-3">
          <div data-reveal className="spotlight panel p-7 sm:p-9 md:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neon">Overview</p>
            <p className="text-base leading-relaxed text-white/75 sm:text-lg">{p.description}</p>
            <p className="mb-4 mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-neon">Highlights</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {p.tags.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon/15 text-xs text-neon"><HiCheck /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <dl data-reveal className="spotlight panel flex flex-col gap-6 p-7">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/45">Category</dt>
              <dd className="mt-1.5 text-sm font-semibold text-white">{p.category}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/45">Delivered by</dt>
              <dd className="mt-1.5 text-sm font-semibold text-white">{company.legalName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/45">Pricing</dt>
              <dd className="mt-1.5 text-sm font-semibold text-white">Fixed, transparent rate</dd>
            </div>
            <div className="mt-auto flex flex-col gap-3">
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 !text-xs">Visit live site <HiArrowUpRight /></a>
              )}
              <Link href="/contact" className="btn-neon !py-2.5 !text-xs">Start a similar project <HiArrowRight /></Link>
            </div>
          </dl>
        </section>

        {/* previous / next */}
        <nav aria-label="More projects" className="grid gap-4 border-y border-line py-8 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-white/60 transition group-hover:border-neon group-hover:text-neon"><HiArrowLeft /></span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-white/40">Previous</span>
              <span className="text-base font-bold text-white transition group-hover:text-neon">{prev.title}</span>
            </span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex items-center justify-end gap-4 text-right">
            <span>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-white/40">Next</span>
              <span className="text-base font-bold text-white transition group-hover:text-neon">{next.title}</span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-white/60 transition group-hover:border-neon group-hover:text-neon"><HiArrowRight /></span>
          </Link>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Heading kicker="Keep Exploring" title="More of Our Work" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((m) => <ProjectCard key={m.slug} project={m} />)}
        </div>
      </section>
    </>
  );
}
