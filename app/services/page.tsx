import type { Metadata } from "next";
import Marquee from "@/components/motion/Marquee";
import Services from "@/components/sections/Services";
import Solutions from "@/components/sections/Solutions";
import Why from "@/components/sections/Why";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumb="Services"
        kicker="Services"
        title="Everything your brand needs to grow"
        accent={2}
        intro="Websites, AI automation, GoHighLevel, marketing, SEO, design and video, all from one team at fixed and transparent rates."
      />
      <Services />
      <Marquee />
      <Solutions />
      <Why />
    </>
  );
}
