import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Portfolio" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        crumb="Portfolio"
        kicker="Our Portfolio"
        title="Work we're proud of"
        accent={2}
        intro="Web apps, e-commerce stores and business platforms we've designed and built for clients around the world."
      />
      <Projects />
      <Testimonials />
    </>
  );
}
