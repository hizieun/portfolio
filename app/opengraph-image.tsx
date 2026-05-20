import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "강지은 · AI Engineer Portfolio";

// Load Noto Sans KR variable font from the colocated _fonts/ dir.
// We tried Google Fonts CSS fetching at request time but the Edge runtime
// returned 200 + 0 bytes — likely because the CSS endpoint changed format
// or the binary URL is blocked. Bundling a local TTF is the reliable path.
async function loadFont() {
  const url = new URL("./_fonts/NotoSansKR-Bold.ttf", import.meta.url);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OG() {
  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #18181b 50%, #1e1b4b 100%)",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "Noto Sans KR",
          position: "relative",
        }}
      >
        {/* subtle gradient glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(96,165,250,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,70,239,0.14) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* top: status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            color: "#a1a1aa",
            fontFamily: "monospace",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#10b981",
              display: "flex",
            }}
          />
          <span>Currently shipping at KB증권</span>
        </div>

        {/* middle: name + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "120px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            강지은
          </div>
          <div
            style={{
              fontSize: "38px",
              fontWeight: 500,
              color: "#d4d4d8",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            데이터의 가치를 구현하는 AI 엔지니어
          </div>
        </div>

        {/* bottom: stats + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "32px",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", gap: "56px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{ fontSize: "36px", fontWeight: 700, display: "flex" }}
              >
                6년차
              </div>
              <div
                style={{ fontSize: "16px", color: "#a1a1aa", display: "flex" }}
              >
                경력
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{ fontSize: "36px", fontWeight: 700, display: "flex" }}
              >
                5+
              </div>
              <div
                style={{ fontSize: "16px", color: "#a1a1aa", display: "flex" }}
              >
                Production 프로젝트
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{ fontSize: "36px", fontWeight: 700, display: "flex" }}
              >
                2편
              </div>
              <div
                style={{ fontSize: "16px", color: "#a1a1aa", display: "flex" }}
              >
                국제 학술지 게재
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#a1a1aa",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            LLM · RAG · MLOps
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: font, weight: 700, style: "normal" },
      ],
    },
  );
}
