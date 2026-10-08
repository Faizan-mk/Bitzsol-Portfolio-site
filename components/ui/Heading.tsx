export default function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div data-heading className="mb-14 text-center">
      <p data-kicker className="kicker mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neon">{kicker}</p>
      <h2 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl" aria-label={title}>
        {/* two-tone: first half of the words in ink, the rest in neon */}
        {title.split(" ").map((w, i, all) => (
          <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-1 last:mr-0" aria-hidden>
            <span data-word className={`inline-block ${i >= Math.max(1, Math.floor(all.length / 2)) ? "neon-text" : ""}`}>{w}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}
