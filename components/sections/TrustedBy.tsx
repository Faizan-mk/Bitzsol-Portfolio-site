import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { trustedBy, type ClientWork } from "@/lib/data";

// one accent per card so the mockups don't look identical
const accents = ["#d5ff27", "#9f7aea", "#38bdf8"];

/* Stand-in for a product screenshot: a tiny app layout tinted with the card's accent. */
function Mockup({ accent, product }: { accent: string; product: string }) {
  return (
    <div
      className="absolute inset-0 p-4 transition-transform duration-700 group-hover:scale-[1.06]"
      style={{ background: `radial-gradient(120% 90% at 85% 0%, ${accent}33, transparent 60%), linear-gradient(180deg, #121217, #0b0b0e)` }}
    >
      <div className="flex h-full gap-3">
        <div className="hidden w-14 flex-col gap-2 rounded-lg bg-white/[0.04] p-2 sm:flex">
          <span className="h-2 w-8 rounded-full" style={{ background: accent }} />
          {[0, 1, 2, 3].map((i) => <span key={i} className="h-1.5 w-full rounded-full bg-white/10" />)}
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="truncate text-[11px] font-semibold text-white/80">{product}</span>
            <span className="h-4 w-10 rounded-full" style={{ background: `${accent}55` }} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0.9, 0.6, 0.75].map((h, i) => (
              <div key={i} className="flex h-12 flex-col justify-end rounded-lg bg-white/[0.05] p-1.5">
                <span className="w-full rounded-sm" style={{ height: `${h * 100}%`, background: i === 0 ? accent : "rgba(255,255,255,0.12)" }} />
              </div>
            ))}
          </div>
          <div className="flex-1 space-y-1.5 rounded-lg bg-white/[0.04] p-2">
            {[1, 0.7, 0.85].map((w, i) => <span key={i} className="block h-1.5 rounded-full bg-white/10" style={{ width: `${w * 100}%` }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientCard({ c, accent }: { c: ClientWork; accent: string }) {
  const initials = c.client.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const body = (
    <>
      {/* product preview in a browser frame */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded-full bg-white/[0.05] px-3 py-0.5 text-[10px] text-white/40">
            {c.url ? c.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "launching soon"}
          </span>
        </div>
        <div className="relative h-44 overflow-hidden">
          {c.image ? (
            <Image src={c.image} alt={c.product} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
          ) : (
            <Mockup accent={accent} product={c.product} />
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white">{c.product}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/55">{c.text}</p>
        </div>
        {c.url && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition duration-500 group-hover:rotate-45 group-hover:border-neon group-hover:bg-neon group-hover:text-on-neon">
            <HiArrowUpRight />
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-black" style={{ background: accent }}>
            {initials}
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">{c.client}</span>
            <span className="block text-[11px] text-white/40">Client</span>
          </span>
        </span>
        {c.url ? (
          <span className="text-xs font-medium text-white/50 transition group-hover:text-neon">Visit live site</span>
        ) : (
          <span className="flex items-center gap-1.5 text-[11px] text-white/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon/70" /> Live link soon
          </span>
        )}
      </div>
    </>
  );

  const cls = "spotlight panel panel-hover group flex h-full flex-col p-4 sm:p-5";
  return c.url ? (
    <a href={c.url} target="_blank" rel="noopener noreferrer" data-reveal className={cls} data-cursor-label="Visit">{body}</a>
  ) : (
    <article data-reveal className={cls}>{body}</article>
  );
}

/* Clients, with the product we built for each and its live link. */
export default function TrustedBy() {
  return (
    <section id="clients" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Trusted By" title="Built for Real Clients" />
      <div className="grid gap-5 md:grid-cols-3">
        {trustedBy.map((c, i) => <ClientCard key={c.client} c={c} accent={accents[i % accents.length]} />)}
      </div>
    </section>
  );
}
