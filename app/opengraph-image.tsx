import { ImageResponse } from "next/og";
import { LOGO_B, LOGO_BULB, LOGO_REST } from "@/components/brand/logo-path";
import { company } from "@/lib/data";

// The preview card shown when a link to the site is shared (WhatsApp, LinkedIn, X, Slack...).
export const alt = `${company.name} | Build the Next Era`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand typeface (TTF, which the image renderer needs); falls back to the default font if Google Fonts is unreachable.
async function loadFont(weight: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}`)).text();
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadFont(500), loadFont(800)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", background: "#050507", color: "#fff", position: "relative", fontFamily: "Jakarta",
        }}
      >
        <div style={{ position: "absolute", left: -160, top: -220, width: 720, height: 720, borderRadius: 9999, display: "flex", background: "radial-gradient(circle, rgba(213,255,39,0.28) 0%, rgba(213,255,39,0) 70%)" }} />
        <div style={{ position: "absolute", right: -200, bottom: -260, width: 820, height: 820, borderRadius: 9999, display: "flex", background: "radial-gradient(circle, rgba(127,58,237,0.45) 0%, rgba(127,58,237,0) 70%)" }} />

        <svg width="312" height="87" viewBox="0 0 208 58">
          <path d={LOGO_B + LOGO_REST} fill="#ffffff" />
          <path d={LOGO_BULB} fill="#d5ff27" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            Build the&nbsp;<span style={{ color: "#d5ff27" }}>Next Era.</span>
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "rgba(255,255,255,0.6)", maxWidth: 900 }}>
            Web, e-commerce, AI automation, GoHighLevel and digital marketing at fixed, transparent rates.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>
          <span>{company.legalName}</span>
          <span style={{ color: "#d5ff27" }}>{company.websiteLabel}</span>
        </div>
      </div>
    ),
    { ...size, fonts: regular && bold
      ? [{ name: "Jakarta", data: regular, weight: 500, style: "normal" }, { name: "Jakarta", data: bold, weight: 800, style: "normal" }]
      : undefined }
  );
}
