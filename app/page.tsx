import { HomeView } from "@/components/home-view";
import { getAllCaseStudies } from "@/lib/case-studies";

export default async function Home() {
  const studies = await getAllCaseStudies();
  // Pass only frontmatter to the client view (avoids shipping full
  // markdown bodies into the client bundle).
  const cards = studies.map((s) => s.frontmatter);
  return <HomeView cards={cards} />;
}
