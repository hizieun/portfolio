import type { Lang } from "@/lib/i18n";
import type { CaseStudyFrontmatter, Metric } from "@/lib/case-studies";

// Client-safe (no fs import): resolves a case-study frontmatter into the
// active locale, falling back to the Korean field when an `_en` override
// is absent. Numbers/dates/company facts only differ in presentation.
export type LocalizedFrontmatter = CaseStudyFrontmatter & {
  metrics?: Metric[];
};

export function localizeFrontmatter(
  fm: CaseStudyFrontmatter,
  lang: Lang,
): LocalizedFrontmatter {
  if (lang !== "en") return fm;
  return {
    ...fm,
    title: fm.title_en ?? fm.title,
    subtitle: fm.subtitle_en ?? fm.subtitle,
    company: fm.company_en ?? fm.company,
    role: fm.role_en ?? fm.role,
    period: fm.period_en ?? fm.period,
    tldr: fm.tldr_en ?? fm.tldr,
    metrics: fm.metrics?.map((m) => ({
      ...m,
      label: m.label_en ?? m.label,
      detail: m.detail_en ?? m.detail,
    })),
  };
}
