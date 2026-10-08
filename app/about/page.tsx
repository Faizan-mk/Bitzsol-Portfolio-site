import type { Metadata } from "next";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Purpose from "@/components/sections/Purpose";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <Purpose />
      <Process />
    </div>
  );
}
