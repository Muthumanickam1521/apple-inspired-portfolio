import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { getPortfolio } from "@/lib/portfolio";
import { renderShareImage, shareImageSize } from "@/lib/share-image";

export const size = shareImageSize;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  const { profile } = getPortfolio();
  if (!study) return renderShareImage({ eyebrow: profile.name, title: profile.role });
  const { project } = study;
  return renderShareImage({ eyebrow: `${project.category} · ${project.year}`, title: project.title, footer: `Case study by ${profile.name}`, tint: project.accent, ink: project.accentDeep });
}
