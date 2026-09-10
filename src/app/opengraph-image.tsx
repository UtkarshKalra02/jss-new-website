import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "JSS The Print Zone — Printing & Packaging Manufacturer, New Delhi";

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
          background: "#0a0b12",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.24em",
            color: "#01a0e2",
            textTransform: "uppercase",
          }}
        >
          Okhla Phase-II · New Delhi · ISO 9001
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#f5f7fa",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Packaging built to
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#f5f7fa",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            a brand standard.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#8b92a4",
            }}
          >
            JSS The Print Zone · Offset printing & packaging manufacturing
          </div>
        </div>
        {/* The logo's three blues, in order. */}
        <div style={{ display: "flex", height: 8, width: 240 }}>
          <div style={{ display: "flex", flex: 1, background: "#01a0e2" }} />
          <div style={{ display: "flex", flex: 1, background: "#006cb5" }} />
          <div style={{ display: "flex", flex: 1, background: "#393186" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
