"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiArrowUpRight, HiOutlineChatBubbleLeftRight, HiOutlineEnvelope, HiOutlineGlobeAlt, HiOutlinePhone } from "react-icons/hi2";
import { company, navLinks } from "@/lib/data";
import Logo from "@/components/brand/Logo";
import Magnetic from "@/components/motion/Magnetic";
import { scrollToTop } from "@/components/motion/SmoothScroll";

const ease = [0.16, 1, 0.3, 1] as const;

/* Live clock in the company's timezone, so visitors know when the team is online. */
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"} PKT</span>;
}

export default function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-10 overflow-hidden border-t border-line bg-black pt-20">
      {/* soft purple glow rising from the bottom */}
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full glow [--glow:0.10]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* call to action */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-14 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neon"
            >
              Thank You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl"
            >
              Let&apos;s Build the <span className="neon-text">Next Era.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
            >
              {company.ctaLine} Tell us about your project and let&apos;s turn your vision into a product your customers will love.
            </motion.p>
          </div>
          <Magnetic strength={0.4}>
            <Link
              href="/contact"
              aria-label="Get started — contact us"
              className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-neon text-sm font-semibold text-on-neon shadow-[0_0_40px_-6px_rgba(213,255,39,0.55)] transition-transform duration-500 hover:scale-105 sm:h-36 sm:w-36"
            >
              <span className="flex flex-col items-center gap-1">
                <HiArrowUpRight className="text-2xl transition-transform duration-500 group-hover:scale-110" />
                Get Started
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-10 w-auto text-white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Technology-driven digital solutions — web, e-commerce, cloud, AI automation and digital marketing at fixed, transparent rates.
            </p>
            <div className="mt-6 flex gap-3">
              <Magnetic strength={0.5}>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={company.websiteLabel}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-neon hover:bg-neon hover:text-on-neon"
                >
                  <HiOutlineGlobeAlt />
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bitzsol on LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-neon hover:bg-neon hover:text-on-neon"
                >
                  <FaLinkedinIn />
                </a>
              </Magnetic>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-neon">Navigate</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                    <span className="h-px w-0 bg-neon transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-neon">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 break-all transition hover:text-white">
                  <HiOutlineEnvelope className="mt-0.5 shrink-0 text-neon" /> {company.email}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                  <HiOutlinePhone className="shrink-0 text-neon" /> {company.phone}
                </a>
              </li>
              <li>
                <a href={company.phone2Href} className="flex items-center gap-3 transition hover:text-white">
                  <HiOutlinePhone className="shrink-0 text-neon" /> {company.phone2}
                </a>
              </li>
              <li>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 break-all transition hover:text-white">
                  <HiOutlineGlobeAlt className="mt-0.5 shrink-0 text-neon" /> {company.websiteLabel}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineChatBubbleLeftRight className="mt-0.5 shrink-0 text-neon" />
                <Link href="/contact" className="transition hover:text-white">Visit our contact page to start a conversation.</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-neon">Status</h3>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Open for new projects
            </p>
            <p className="mt-3 text-sm text-white/50">
              Local time: <LocalTime />
            </p>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn-outline mt-6 !py-2.5 !text-xs">
              <HiOutlineGlobeAlt /> {company.websiteLabel}
            </a>
          </div>
        </div>
      </div>

      {/* giant outlined name, rises into view */}
      <div aria-hidden className="relative select-none overflow-hidden">
        <motion.p
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: "18%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="whitespace-nowrap text-center text-[22vw] font-extrabold uppercase leading-none tracking-tighter outline-name"
        >
          Bitzsol
        </motion.p>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-white/40 sm:flex-row sm:px-8">
          <p>&copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition hover:text-neon"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition group-hover:border-neon group-hover:-translate-y-1">
              <HiArrowUpRight className="-rotate-45" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
