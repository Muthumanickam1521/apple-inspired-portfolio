import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { getPortfolio } from "@/lib/portfolio";
import { formatDate, getPosts } from "@/lib/writing";
import type { CSSProperties } from "react";

export default function Home() {
  const content = getPortfolio();
  const { profile } = content;
  const posts = getPosts().slice(0, 3);

  return (
    <main id="top">
      <SiteHeader content={content} home />

      <section className="apple-hero shell">
        <Reveal>
          <h1>{profile.name}<br /><span>{profile.role}.</span></h1>
          <p className="hero-lede">{profile.intro}</p>
          <div className="hero-actions"><a className="button primary" href="#work">View selected work <b>›</b></a><a className="button text-button" href={`mailto:${profile.email}`}>Get in touch <b>↗</b></a></div>
        </Reveal>
      </section>

      <section className="work-block" id="work"><div className="shell"><Reveal className="headline-row"><div><p className="kicker">Selected work</p><h2>Built for people.<br /><span>Designed to last.</span></h2></div><p>Selected product, brand, and digital work from the last few years.</p></Reveal></div><div className="project-rail shell">
        {content.projects.map((project, index) => <Reveal key={project.title} delay={index * 0.08} className={`project-tile tile-${index + 1}`}><a href={project.link} className="project-link"><div className={`tile-art${project.image ? " has-image" : ""}`} style={{ "--project-tint": project.accent, "--project-ink": project.accentDeep, backgroundImage: project.image ? `url(${project.image})` : undefined } as CSSProperties}><span className="project-index">0{index + 1}</span><span className="project-word">{project.title}</span><span className="project-mark">↗</span></div><div className="tile-copy"><p>{project.category} <span>·</span> {project.year}</p><h3>{project.title}</h3><p className="tile-description">{project.description}</p><span className="learn-more">Explore project <b>›</b></span></div></a></Reveal>)}
      </div></section>

      <section className="about-apple" id="about"><div className="shell"><Reveal><p className="kicker">{content.about.eyebrow}</p><h2>{content.about.title}</h2><p>{content.about.body}</p><div className="availability-strip"><span>✦</span>{content.about.note}</div></Reveal></div></section>

      <section className="capabilities shell"><Reveal><p className="kicker">Capabilities</p><h2>From the first question<br />to the <span>final pixel.</span></h2></Reveal><div className="capability-list">{content.skills.map((skill, index) => <Reveal key={skill.group} delay={index * .09}><article><span>0{index + 1}</span><h3>{skill.group}</h3><p>{skill.items.join(" · ")}</p></article></Reveal>)}</div></section>

      <section className="history shell" id="experience"><Reveal><p className="kicker">Experience & education</p><h2>A few places that<br />shaped <span>my perspective.</span></h2></Reveal><div className="history-list">{content.experience.map((item, index) => <Reveal key={item.company} delay={index*.06}><article className="history-row"><p>{item.period}</p><div><h3>{item.role}</h3><h4>{item.company}</h4></div><p>{item.description}</p></article></Reveal>)}</div><Reveal><div className="education-row"><p>Education</p><div>{content.education.map((item) => <p key={item.institution}><strong>{item.degree}</strong><br />{item.institution} <span>· {item.period}</span></p>)}</div></div></Reveal></section>

      <section className="interests"><div className="shell"><Reveal className="interests-title"><p className="kicker">{content.interests.title}</p><h2>{content.interests.intro}</h2></Reveal><div className="interest-row">{content.interests.items.map((item,index) => <Reveal key={item.name} delay={index*.07}><article><span>{item.symbol}</span><h3>{item.name}</h3><p>{item.detail}</p></article></Reveal>)}</div></div></section>

      <section className="writing shell" id="writing"><Reveal><p className="kicker">{content.writing.eyebrow}</p><h2>{content.writing.title}</h2></Reveal><Reveal><div className="writing-col"><div className="writing-head"><h3>Latest posts</h3><Link href="/blog">All posts <b>›</b></Link></div>{posts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="writing-item"><time dateTime={post.date}>{formatDate(post.date)}</time><h4>{post.title}</h4><p>{post.summary}</p></Link>)}</div></Reveal></section>

      <footer id="contact"><div className="shell footer-main"><Reveal><p className="kicker">Have a project in mind?</p><h2>Let&apos;s make something<br /><span>remarkable.</span></h2><a href={`mailto:${profile.email}`} className="button primary">Start a conversation <b>↗</b></a></Reveal></div><div className="shell footer-meta"><p>© {new Date().getFullYear()} {profile.name}</p><div>{content.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}</a>)}</div><p>{content.footer.credit}</p></div></footer>
    </main>
  );
}
