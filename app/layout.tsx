import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { career } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Canonical origin for og:image and friends. The site self-hosts now, so
// there is no platform-injected URL to read — and a relative og:image is no
// use to a crawler. The apex 301s to www, so www is the canonical host.
const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.zieun.dev"
    : "http://localhost:3000";

const title = "강지은 · AI Engineer Portfolio";
const description =
  `데이터의 가치를 구현하는 AI 엔지니어 강지은의 포트폴리오. LLM·RAG·Agent를 production까지 책임진 ${career.nthYear}년차의 케이스 스터디.`;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ko_KR",
    siteName: "강지은 · Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
