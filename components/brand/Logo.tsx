import { LOGO_B, LOGO_BULB, LOGO_REST, LOGO_VIEWBOX } from "./logo-path";

export default function Logo({ className = "", title = "Bitzsol" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={LOGO_B + LOGO_REST} fill="currentColor" />
      <path d={LOGO_BULB} className="fill-neon" />
    </svg>
  );
}
