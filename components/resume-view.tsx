"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { useLang, ui, type Lang } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

const strings: Record<Lang, Record<string, string>> = {
  ko: {
    back: "포트폴리오로",
    print: "PDF로 저장",
    hint: "인쇄 대화상자에서 「PDF로 저장」을 고르세요.",
    summary: "Summary",
    experience: "Experience",
    projects: "Side Projects",
    papers: "Publications",
    skills: "Skills",
    education: "Education",
    credentials: "Certifications & Training",
    site: "포트폴리오",
  },
  en: {
    back: "Back to portfolio",
    print: "Save as PDF",
    hint: "Choose “Save as PDF” in the print dialog.",
    summary: "Summary",
    experience: "Experience",
    projects: "Side Projects",
    papers: "Publications",
    skills: "Skills",
    education: "Education",
    credentials: "Certifications & Training",
    site: "Portfolio",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-3 break-inside-avoid">
      <h2 className="text-[10.5pt] font-bold tracking-tight border-b border-border pb-0.5 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ResumeView() {
  const { lang } = useLang();
  const p = getProfile(lang);
  const t = strings[lang];
  const labels = ui[lang].labels;

  return (
    <div className="min-h-screen print:min-h-0 bg-muted-bg print:bg-white">
      {/* screen-only toolbar */}
      <div className="print:hidden sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-[210mm] mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted">{t.hint}</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Printer className="w-4 h-4" /> {t.print}
            </button>
          </div>
        </div>
      </div>

      {/* A4 sheet */}
      <article className="resume-sheet max-w-[210mm] mx-auto my-6 print:my-0 bg-background p-[12mm] shadow-sm print:shadow-none text-[9pt] leading-snug">
        {/* header */}
        <header className="pb-2 border-b-2 border-foreground">
          <h1 className="text-[20pt] font-bold tracking-tight leading-none">
            {lang === "en" ? p.nameEn : p.name}
          </h1>
          <p className="text-[10.5pt] text-muted mt-1">{p.tagline}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-[8.5pt] text-muted">
            <a href={`mailto:${p.email}`}>{p.email}</a>
            <span>·</span>
            <span>{p.phone}</span>
            <span>·</span>
            <span>{lang === "en" ? p.locationEn : p.location}</span>
            <span>·</span>
            <a href={p.github}>github.com/hizieun</a>
            <span>·</span>
            <a href="https://zieun.dev">zieun.dev</a>
          </div>
        </header>

        <Section title={t.summary}>
          <p className="text-foreground/85">{p.subtagline}</p>
          <ul className="mt-1.5 grid grid-cols-2 gap-x-6 gap-y-0.5">
            {p.strengths.map((s) => (
              <li key={s.label} className="flex gap-1.5">
                <span className="font-semibold shrink-0">{s.label}:</span>
                <span className="text-muted">{s.detail}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.experience}>
          <div className="space-y-2">
            {p.experience.map((e) => (
              <div key={e.company} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-semibold">
                    {e.company}
                    {e.client && (
                      <span className="font-normal text-muted">
                        {" "}
                        · {e.client}
                      </span>
                    )}
                    {e.current && (
                      <span className="ml-1.5 text-[7.5pt] font-semibold text-emerald-600">
                        ({labels.current})
                      </span>
                    )}
                  </div>
                  <div className="text-[8.5pt] text-muted shrink-0 tabular-nums">
                    {e.period}
                  </div>
                </div>
                <div className="text-[8.5pt] text-muted">{e.role}</div>
                <div className="mt-0.5">{e.highlight}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t.papers}>
          <div className="space-y-1.5">
            {p.publications.map((pub) => (
              <div key={pub.url} className="break-inside-avoid">
                <div className="font-medium">{pub.title}</div>
                <div className="text-[8.5pt] text-muted">
                  {pub.venue} · {pub.date} · {pub.role}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t.skills}>
          <div className="space-y-1">
            {Object.entries(p.skills).map(([group, items]) => (
              <div key={group} className="flex gap-2">
                <span className="font-semibold w-[26mm] shrink-0">{group}</span>
                <span className="text-muted">{items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t.projects}>
          <div className="space-y-1.5">
            {p.sideProjects.map((s) => (
              <div key={s.repo} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-[8.5pt] text-muted shrink-0">
                    {s.live?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </div>
                <div className="text-muted">{s.tagline}</div>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-2 gap-x-8">
          <Section title={t.education}>
            <div className="space-y-1.5">
              {p.education.map((e) => (
                <div key={e.school}>
                  <div className="font-medium">{e.school}</div>
                  <div className="text-[8.5pt] text-muted">
                    {e.degree} · {e.status} · {e.period}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t.credentials}>
            <div className="space-y-1.5">
              {p.certifications.map((c) => (
                <div key={c.name}>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-[8.5pt] text-muted">
                    {c.issuer} · {c.date}
                  </div>
                </div>
              ))}
              {p.training.map((tr) => (
                <div key={tr.name}>
                  <div className="font-medium">{tr.name}</div>
                  <div className="text-[8.5pt] text-muted">
                    {tr.issuer} · {tr.period}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </article>
    </div>
  );
}
