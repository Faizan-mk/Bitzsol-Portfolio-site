import type { Metadata } from "next";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineGlobeAlt, HiOutlinePhone } from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { company } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

const channels = [
  { label: "Email", value: company.email, href: `mailto:${company.email}`, Icon: HiOutlineEnvelope },
  { label: "Phone", value: company.phone, href: company.phoneHref, Icon: HiOutlinePhone },
  { label: "Phone", value: company.phone2, href: company.phone2Href, Icon: HiOutlinePhone },
  { label: "Website", value: company.websiteLabel, href: company.website, Icon: HiOutlineGlobeAlt, external: true },
  { label: "LinkedIn", value: "Bitzsol on LinkedIn", href: company.linkedin, Icon: FaLinkedinIn, external: true },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-12 pt-40 sm:px-8">
      <Heading kicker="Get in Touch" title="Let's Talk Business" />
      <p className="mx-auto -mt-6 mb-14 max-w-xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
        {company.ctaLine} Tell us about your project and we&apos;ll get back to you.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map(({ label, value, href, Icon, external }) => (
          <a
            key={value}
            href={href}
            data-reveal
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="spotlight panel panel-hover group flex items-start gap-4 p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neon/10 text-xl text-neon">
              <Icon />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.2em] text-white/45">{label}</span>
              <span className="mt-1 block break-all text-sm font-semibold text-white transition group-hover:text-neon">{value}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
