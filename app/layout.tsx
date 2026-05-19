import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "강지은 · AI Engineer Portfolio",
  description:
    "데이터의 가치를 구현하는 AI 엔지니어 강지은의 포트폴리오. LLM·RAG·Agent를 production까지 책임진 6년차의 케이스 스터디.",
  metadataBase: new URL("https://zieun.dev"),
  openGraph: {
    title: "강지은 · AI Engineer Portfolio",
    description: "RAG · LLM Agent · MLOps · 6년차 AI 엔지니어",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
