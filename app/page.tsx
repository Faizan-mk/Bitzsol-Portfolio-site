import Effects from "@/components/Effects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/motion/Cursor";
import Marquee from "@/components/motion/Marquee";
import Preloader from "@/components/motion/Preloader";
import ScrollFX from "@/components/motion/ScrollFX";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Statement from "@/components/motion/Statement";
import { About, Process, Projects, Purpose, Services, Solutions, Testimonials, Why } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <div aria-hidden className="aurora" />
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <About />
        <Purpose />
        <Marquee />
        <Solutions />
        <Services />
        <Why />
        <Process />
        <Projects />
        <Testimonials />
      </main>
      <Footer />
      <Effects />
      <ScrollFX />
      <div aria-hidden className="grain" />
    </>
  );
}
