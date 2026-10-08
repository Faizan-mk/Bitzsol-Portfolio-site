import type { Metadata } from "next";
import Marquee from "@/components/motion/Marquee";
import Services from "@/components/sections/Services";
import Solutions from "@/components/sections/Solutions";
import Why from "@/components/sections/Why";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <Services />
      <Marquee />
      <Solutions />
      <Why />
    </div>
  );
}
