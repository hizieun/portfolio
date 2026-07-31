"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Calendar, Building2, User2, Languages } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useLang, ui } from "@/lib/i18n";
import { localizeFrontmatter } from "@/lib/localize";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const { lang } = useLang();
  const t = ui[lang];
  const fm = localizeFrontmatter(study.frontmatter, lang);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.detail.back}
          </Link>

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-6">
            {fm.status.includes("Shipping") && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Currently Shipping
              </span>
            )}
            {fm.status.includes("Published") && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                Published
              </span>
            )}
            {fm.status.includes("Shipped") && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-foreground/10 text-foreground text-xs font-semibold">
                Shipped
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
            {fm.title}
          </h1>
          {fm.subtitle && (
            <p className="text-lg sm:text-xl text-muted leading-relaxed mb-8">
              {fm.subtitle}
            </p>
          )}

          {/* Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-muted mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-muted">Company</div>
                <div className="text-sm font-medium">{fm.company}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User2 className="w-4 h-4 text-muted mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-muted">Role</div>
                <div className="text-sm font-medium">{fm.role}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-muted mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-muted">Period</div>
                <div className="text-sm font-medium">{fm.period}</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          {fm.metrics && fm.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {fm.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-border bg-muted-bg/50 p-4"
                >
                  <div className="text-2xl font-bold tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold mt-0.5">{m.label}</div>
                  {m.detail && (
                    <div className="text-[11px] text-muted mt-1 leading-tight">
                      {m.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Only warn when an English body genuinely isn't written yet */}
          {lang === "en" && !study.contentEn && t.detail.enBanner && (
            <div className="flex items-start gap-2 rounded-lg border border-border bg-muted-bg/50 px-4 py-3 mb-8 text-sm text-muted">
              <Languages className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{t.detail.enBanner}</span>
            </div>
          )}

          {/* Markdown body */}
          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {(lang === "en" && study.contentEn) || study.content}
            </ReactMarkdown>
          </div>

          {/* Stack */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-xs font-mono text-muted mb-4">
              {t.labels.techStack}
            </div>
            <div className="space-y-4">
              {Object.entries(fm.stack).map(([group, items]) => (
                <div key={group}>
                  <div className="text-xs uppercase tracking-wider text-muted mb-2">
                    {group}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-1 rounded-md bg-muted-bg border border-border font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-muted text-center">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← {lang === "en" ? "Ji-Eun Kang" : "강지은"} portfolio
          </Link>
        </div>
      </footer>
    </>
  );
}
