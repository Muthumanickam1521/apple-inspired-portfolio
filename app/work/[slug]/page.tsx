import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { getPortfolio } from "@/lib/portfolio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: study.project.title, description: study.project.description, openGraph: { type: "article", title: study.project.title, description: study.project.description } } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const content = getPortfolio();
  const { project } = study;
  const studies = getCaseStudies();
  const next = studies[(studies.findIndex((s) => s.slug === slug) + 1) % studies.length];
  const facts = [["Role", study.role], ["Timeline", study.timeline], ["Team", study.team], ["Focus", project.tags.join(", ")]].filter(([, value]) => value);

  return (
    <main>
      <SiteHeader content={content} />
      <article className="case-study">
        <header className="case-head shell">
          <Link href="/#work" className="back-link"><b>‹</b> Selected work</Link>
          <p className="kicker">{project.category} <span>·</span> {project.year}</p>
          <h1>{project.title}</h1>
          <p className="post-summary">{project.description}</p>
        </header>
        <div className="shell">
          <div className={`case-cover${study.image ? " has-image" : ""}`} style={{ "--project-tint": project.accent, "--project-ink": project.accentDeep, backgroundImage: study.image ? `url(${study.image})` : undefined } as CSSProperties} role={study.image ? "img" : undefined} aria-label={study.image ? `${project.title} cover image` : undefined}>
            {!study.image && <span className="project-word">{project.title}</span>}
          </div>
          <dl className="case-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
        <div className="case-body shell prose" dangerouslySetInnerHTML={{ __html: study.html }} />
        {next && next.slug !== slug && <div className="shell"><Link href={`/work/${next.slug}`} className="next-case"><span>Next project</span><strong>{next.project.title} <b>›</b></strong></Link></div>}
      </article>
      <SiteFooter content={content} />
    </main>
  );
}
