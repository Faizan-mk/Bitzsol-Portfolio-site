import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        crumb="Work"
        kicker="Our Work"
        title="Work we're proud of"
        accent={2}
        intro="Web apps, e-commerce stores and business platforms we've designed and built for clients around the world."
      />
      <Projects />
      <Testimonials />
    </>
  );
}
