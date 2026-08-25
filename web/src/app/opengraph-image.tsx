import { ImageResponse } from "next/og";

export const alt = "Canvas Connect: MCP server for Canvas LMS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf9",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#1e293b",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            &gt;_
          </div>
          <div style={{ display: "flex", fontSize: "28px", color: "#57534e" }}>Canvas Connect</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "64px",
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#1c1917",
            letterSpacing: "-0.02em",
          }}
        >
          <span>Ask your AI what&apos;s due.</span>
          <span>It actually knows.</span>
        </div>

        <div style={{ display: "flex", fontSize: "24px", color: "#c2410c" }}>
          100 tools &middot; MCP server for Canvas LMS &middot; canvaslms-api.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
