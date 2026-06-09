"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ko" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "ko",
  setLang: () => {},
  toggle: () => {},
});

const STORAGE_KEY = "portfolio-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  // Always start "ko" to match the server-rendered HTML (avoids hydration
  // mismatch). A stored preference is applied in the effect below.
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ko" || stored === "en") {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "ko" ? "en" : "ko";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// ── UI string dictionary ──────────────────────────────────────────────
// Section nouns (About, Experience, Skills…) stay English in both locales
// — that's a common bilingual-portfolio convention and keeps the nav stable.
// Only Korean-only chrome and descriptive sub-lines are translated.

type UIStrings = {
  hero: { status: string; cta: string };
  sections: {
    aboutTitle: string;
    experienceTitle: string;
    experienceSub: string;
    projectsTitle: string;
    projectsSub: string;
    sideTitle: string;
    sideSub: string;
    papersTitle: string;
    papersSub: string;
    skillsTitle: string;
    skillsSub: string;
    backgroundTitle: string;
    backgroundSub: string;
    contactTitle: string;
    contactSub: string;
  };
  labels: {
    current: string;
    caseStudy: string;
    education: string;
    certifications: string;
    training: string;
    live: string;
    source: string;
    techStack: string;
  };
  detail: { back: string; enBanner: string | null };
};

export const ui: Record<Lang, UIStrings> = {
  ko: {
    hero: { status: "Currently shipping at KB증권", cta: "프로젝트 보기" },
    sections: {
      aboutTitle: "About",
      experienceTitle: "Experience",
      experienceSub: "총 5년 3개월 · 정규직 3곳, 프리랜서 2곳",
      projectsTitle: "Featured Case Studies",
      projectsSub:
        "담당한 프로젝트를 최신순으로 정리했어요. 각 카드 클릭 시 상세 케이스 스터디로 이동합니다.",
      sideTitle: "Building Outside Work",
      sideSub: "업무 외에 직접 만들어 운영 중인 프로젝트.",
      papersTitle: "Published Papers",
      papersSub: "국제 학술지에 공동저자로 게재된 의료 영상 AI 연구 논문 2편.",
      skillsTitle: "Tech Stack",
      skillsSub: "실제 production 프로젝트에서 운영해본 기술만 정리.",
      backgroundTitle: "Education & Credentials",
      backgroundSub: "학력 · 자격증 · 교육 수료.",
      contactTitle: "함께 일해요",
      contactSub:
        "LLM 시스템 구축 · RAG 파이프라인 · AI 제품 개발 — 새로운 기회와 협업 제안을 환영합니다.",
    },
    labels: {
      current: "현재 근무 중",
      caseStudy: "Case study →",
      education: "Education",
      certifications: "Certifications",
      training: "Training",
      live: "Live",
      source: "Source",
      techStack: "TECH STACK",
    },
    detail: { back: "← 프로젝트 목록으로", enBanner: null },
  },
  en: {
    hero: { status: "Currently shipping at KB Securities", cta: "View projects" },
    sections: {
      aboutTitle: "About",
      experienceTitle: "Experience",
      experienceSub: "5 yrs 3 mos total · 3 full-time, 2 contract",
      projectsTitle: "Featured Case Studies",
      projectsSub: "My work, newest first. Click a card for the full case study.",
      sideTitle: "Building Outside Work",
      sideSub: "Things I build and run outside of work.",
      papersTitle: "Published Papers",
      papersSub: "Two peer-reviewed medical-imaging AI papers, as co-author.",
      skillsTitle: "Tech Stack",
      skillsSub: "Only tech I've actually run in production.",
      backgroundTitle: "Education & Credentials",
      backgroundSub: "Education · certifications · training.",
      contactTitle: "Let's work together",
      contactSub:
        "Building LLM systems · RAG pipelines · AI products — open to new opportunities and collaborations.",
    },
    labels: {
      current: "Current",
      caseStudy: "Case study →",
      education: "Education",
      certifications: "Certifications",
      training: "Training",
      live: "Live",
      source: "Source",
      techStack: "TECH STACK",
    },
    detail: {
      back: "← Back to projects",
      enBanner:
        "🌐 Full English write-up in progress — showing the Korean version for now.",
    },
  },
};
