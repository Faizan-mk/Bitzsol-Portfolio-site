import type { Metadata } from "next";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Purpose from "@/components/sections/Purpose";
import PageHeader from "@/components/ui/PageHeader";
import { company } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        kicker="About Us"
        title="Technology that moves business forward"
        accent={2}
        intro={company.tagline}
      />
      <About />
      <Purpose />
      <Process />
    </>
  );
}
