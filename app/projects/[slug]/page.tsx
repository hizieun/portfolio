import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study-view";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((s) => ({ slug: s.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.frontmatter.title} · 강지은`,
    description: study.frontmatter.tldr,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return <CaseStudyView study={study} />;
}
