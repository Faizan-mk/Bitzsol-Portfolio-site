import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="block">
      <article data-tilt data-card className="spotlight panel group flex h-full flex-col overflow-hidden hover:border-brand/40">
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
    </Link>
  );
}
