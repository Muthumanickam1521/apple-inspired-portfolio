import { ImageResponse } from "next/og";

// The link-preview image shown when a page is shared, drawn in the site's light Apple-style palette.

export const shareImageSize = { width: 1200, height: 630 };

type ShareImage = { eyebrow: string; title: string; subtitle?: string; footer?: string; tint?: string; ink?: string; compact?: boolean };

export function renderShareImage({ eyebrow, title, subtitle, footer, tint = "#f5f5f7", ink = "#6e6e73", compact = false }: ShareImage) {
  // Long titles such as blog posts get a smaller size so they wrap onto a few lines.
  const titleSize = compact ? 76 : 112;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: tint, color: "#1d1d1f" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: ink, letterSpacing: "-0.01em" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: titleSize, fontWeight: 700, letterSpacing: "-0.055em", lineHeight: 1.04, maxWidth: 1000 }}>{title}</div>
          {subtitle && <div style={{ fontSize: titleSize, fontWeight: 700, letterSpacing: "-0.055em", lineHeight: 1.04, color: ink }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, color: "#6e6e73" }}>
          <div style={{ display: "flex", maxWidth: 820, lineHeight: 1.35 }}>{footer ?? ""}</div>
          <div style={{ display: "flex", color: "#0071e3" }}>muthumanickam.tech</div>
        </div>
      </div>
    ),
    shareImageSize,
  );
}
