import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export function ProjectCard({ study }: { study: CaseStudy }) {
  const fm = study.frontmatter;
  const allTech = Object.values(fm.stack).flat().slice(0, 6);

  return (
    <Link
      href={`/projects/${fm.slug}`}
      className="group block rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/30 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 text-xs text-muted font-mono">
            <span>{fm.period}</span>
            {fm.status.includes("Shipping") && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                CURRENTLY SHIPPING
              </span>
            )}
            {fm.status.includes("Published") && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-semibold">
                PUBLISHED
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold tracking-tight group-hover:text-highlight transition-colors">
            {fm.title}
          </h3>
          {fm.subtitle && (
            <p className="text-sm text-muted mt-1">{fm.subtitle}</p>
          )}
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-highlight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
      </div>

      <div className="text-xs text-muted mb-4 font-mono">
        {fm.company} · {fm.role}
      </div>

      <p className="text-sm leading-relaxed text-foreground/80 mb-4 line-clamp-3">
        {fm.tldr}
      </p>

      {fm.metrics && fm.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 pb-4 border-b border-border">
          {fm.metrics.slice(0, 4).map((m) => (
            <div key={m.label}>
              <div className="text-base font-bold text-foreground">
                {m.value}
              </div>
              <div className="text-[11px] text-muted leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {allTech.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded-md bg-muted-bg text-muted font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
