import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { projects } from "@/lib/data";

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
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-36 sm:px-8">
      <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-neon">
        <HiArrowLeft /> All projects
      </Link>

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neon">{p.category}</p>
      <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">{p.title}</h1>
      <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{p.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div data-reveal className="panel relative mt-12 aspect-[16/9] overflow-hidden">
        <Image src={p.image} alt={p.title} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
        <Link href="/contact" className="btn-neon">Start a similar project <HiArrowRight /></Link>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-white/40">Next project</span>
          <span className="text-lg font-bold text-white transition group-hover:text-neon">{next.title} →</span>
        </Link>
      </div>
    </article>
  );
}
