import { useId } from "react";
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "./signature-path";

/* Gold "Faizan" signature logo; gradient stops come from the theme (--sig-a/b/c). */
export default function Signature({ className = "", title = "Faizan" }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg viewBox={SIGNATURE_VIEWBOX} className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--sig-a)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--sig-b)" }} />
          <stop offset="1" style={{ stopColor: "var(--sig-c)" }} />
        </linearGradient>
      </defs>
      <path d={SIGNATURE_PATH} fill={`url(#${id}-g)`} />
    </svg>
  );
}
