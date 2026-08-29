import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f4f1ea",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: "#22323f",
          }}
        />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5f6e7a",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#22323f",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: "#4d5c68" }}>
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #cbc0ab",
          paddingTop: 28,
          fontSize: 26,
          color: "#22323f",
        }}
      >
        <div>{siteConfig.name}</div>
        <div style={{ color: "#5f6e7a" }}>{siteConfig.domain}</div>
      </div>
    </div>,
    OG_SIZE,
  );
}
