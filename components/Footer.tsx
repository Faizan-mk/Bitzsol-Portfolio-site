"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { HiArrowUpRight, HiOutlineDocumentArrowDown, HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { navLinks, profile } from "@/lib/data";
import Signature from "./brand/Signature";
import Magnetic from "./motion/Magnetic";
import { scrollToTop } from "./motion/SmoothScroll";

const ease = [0.16, 1, 0.3, 1] as const;

/* Live clock in Faizan's timezone, so visitors know when he's likely online. */
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
  const socials = [
    { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
    { href: profile.github, label: "GitHub", Icon: FaGithub },
    { href: `mailto:${profile.email}`, label: "Email", Icon: HiOutlineEnvelope },
  ];

  return (
    <footer id="contact" className="relative scroll-mt-10 overflow-hidden border-t border-line bg-black pt-20">
      {/* soft gold glow rising from the bottom */}
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full glow [--glow:0.10]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* call to action */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-14 md:flex-row md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl"
          >
            Have an idea? Let&apos;s build something{" "}
            <span className="gold-text">great together.</span>
          </motion.h2>
          <Magnetic strength={0.4}>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get in touch on WhatsApp"
              className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#fbd384] to-gold-deep text-sm font-semibold text-on-gold shadow-[0_0_40px_-8px_rgba(240,178,82,0.7)] transition-transform duration-500 hover:scale-105 sm:h-36 sm:w-36"
            >
              <span className="flex flex-col items-center gap-1">
                <FaWhatsapp className="text-2xl transition-transform duration-500 group-hover:scale-110" />
                Get in touch
              </span>
            </a>
          </Magnetic>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Signature className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {profile.role} building secure, scalable web and mobile apps with MERN, Next.js and React Native.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-gold hover:bg-gold hover:text-on-gold"
                  >
                    <Icon />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Navigate</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href={`mailto:${profile.email}`} className="flex items-start gap-3 break-all transition hover:text-white">
                  <HiOutlineEnvelope className="mt-0.5 shrink-0 text-gold" /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                  <HiOutlinePhone className="shrink-0 text-gold" /> {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMapPin className="shrink-0 text-gold" /> {profile.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Status</h3>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to new opportunities
            </p>
            <p className="mt-3 text-sm text-white/50">
              Local time: <LocalTime />
            </p>
            <a href={profile.resume} download className="btn-outline mt-6 !py-2.5 !text-xs">
              <HiOutlineDocumentArrowDown /> Download CV
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
          Faizan
        </motion.p>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-white/40 sm:flex-row sm:px-8">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition hover:text-gold"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition group-hover:border-gold group-hover:-translate-y-1">
              <HiArrowUpRight className="-rotate-45" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
