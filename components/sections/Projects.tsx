import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

/* Pass `limit` to show a preview (home page) with a link to the full /projects page. */
export default function Projects({ limit }: { limit?: number }) {
  const shown = limit ? projects.slice(0, limit) : projects;
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Portfolio" title="Selected Work" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {limit && limit < projects.length && (
        <div className="mt-10 flex justify-center">
          <Link href="/projects" className="btn-outline">View all projects <HiArrowRight /></Link>
        </div>
      )}
    </section>
  );
}
