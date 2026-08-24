import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { career } from "@/lib/profile";

// Use nodejs runtime: the 10MB Korean font puts the function over Edge's
// 1MB size limit on Vercel Hobby. OG images are CDN-cached so cold start
// difference doesn't matter in practice.
export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "강지은 · AI Engineer Portfolio";

// Read the font from public/ with fs — NOT fetch(new URL(...,
// import.meta.url)): undici has no file: support ("not implemented...
// yet"), which 500'd this route in dev and in the Docker image alike.
// public/ is also the one asset dir the deploy Dockerfile copies.
//
// The font is a 30KB static subset (weight pinned to 700, only the glyphs
// this card draws). The original 10MB *variable* Noto Sans KR broke satori
// outright — regenerate with tools/subset-og-font.py if the card's copy
// gains new characters.
async function loadFont() {
  return readFile(join(process.cwd(), "public/fonts/NotoSansKR-OG.ttf"));
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
                {`${career.nthYear}년차`}
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
