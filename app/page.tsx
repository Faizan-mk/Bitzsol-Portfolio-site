import Marquee from "@/components/motion/Marquee";
import Statement from "@/components/motion/Statement";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import TrustedBy from "@/components/sections/TrustedBy";
import Why from "@/components/sections/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <About />
      <Marquee />
      <Services />
      <Why />
      <Projects limit={6} />
      <Testimonials />
      <TrustedBy />
    </>
  );
}
