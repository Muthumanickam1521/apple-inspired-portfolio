import { getPortfolio, type Portfolio } from "@/lib/portfolio";
import { readEntries } from "@/lib/writing";

// Case studies live in content/work, one Markdown file per project, named after the project's slug in portfolio.yml.

export type CaseStudy = {
  slug: string;
  project: Portfolio["projects"][number];
  role: string;
  timeline: string;
  team: string;
  image?: string;
  html: string;
};

export function getCaseStudies(): CaseStudy[] {
  const entries = new Map(readEntries("work").map((entry) => [entry.slug, entry]));
  return getPortfolio().projects.flatMap((project) => {
    const entry = entries.get(project.slug);
    if (!entry) return [];
    const { data, html } = entry;
    return [{
      slug: project.slug,
      project,
      html,
      role: String(data.role ?? ""),
      timeline: String(data.timeline ?? ""),
      team: String(data.team ?? ""),
      image: data.image ? String(data.image) : undefined,
    }];
  });
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}
