import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <Projects />
      <Testimonials />
    </div>
  );
}
