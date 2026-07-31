import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Metric = {
  label: string;
  value: string;
  detail?: string;
  label_en?: string;
  detail_en?: string;
};

export type Paper = {
  title: string;
  venue: string;
  date: string;
  url: string;
};

export type CaseStudyStack = Record<string, string[]>;

export type CaseStudyFrontmatter = {
  slug: string;
  title: string;
  subtitle?: string;
  company: string;
  role: string;
  period: string;
  duration?: string;
  domain: string;
  status: string;
  tldr: string;
  stack: CaseStudyStack;
  metrics?: Metric[];
  papers?: Paper[];
  // English overrides (big-tech résumé tone). Fall back to the Korean
  // field when absent. See lib/localize.ts.
  title_en?: string;
  subtitle_en?: string;
  company_en?: string;
  role_en?: string;
  period_en?: string;
  tldr_en?: string;
};

export type CaseStudy = {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  /** Body from the sibling `*.en.md`, when one exists. */
  contentEn: string | null;
  order: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

// "2025.12 – 현재", "2024.03 – 2025.03" 같은 period 문자열에서 시작일을 Date로 추출
function periodStartTime(period: string): number {
  const start = period.split(/[–-]/)[0].trim();
  const [year, month] = start.split(".").map((s) => Number.parseInt(s, 10));
  if (!Number.isFinite(year)) return 0;
  return new Date(year, (month || 1) - 1).getTime();
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const files = await fs.readdir(CONTENT_DIR);
  // `foo.en.md` holds the English body of `foo.md` — paired, not listed.
  const mdFiles = files
    .filter((f) => f.endsWith(".md") && !f.endsWith(".en.md"))
    .sort();

  const studies = await Promise.all(
    mdFiles.map(async (file) => {
      const filePath = path.join(CONTENT_DIR, file);
      const raw = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(raw);
      const order = Number.parseInt(file.split("-")[0], 10);
      const contentEn = await fs
        .readFile(filePath.replace(/\.md$/, ".en.md"), "utf8")
        .catch(() => null);
      return {
        frontmatter: data as CaseStudyFrontmatter,
        content,
        contentEn,
        order,
      };
    }),
  );

  // 최신순 (시작일 desc). 동일하면 파일 순서 fallback
  return studies.sort((a, b) => {
    const diff =
      periodStartTime(b.frontmatter.period) -
      periodStartTime(a.frontmatter.period);
    return diff !== 0 ? diff : a.order - b.order;
  });
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  const all = await getAllCaseStudies();
  return all.find((s) => s.frontmatter.slug === slug) ?? null;
}
