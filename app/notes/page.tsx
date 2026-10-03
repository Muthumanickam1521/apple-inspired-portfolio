import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPortfolio } from "@/lib/portfolio";
import { formatDate, getNotes } from "@/lib/writing";

export const metadata: Metadata = { title: "Brain dump — Muthumanickam" };

export default function Notes() {
  const content = getPortfolio();

  return (
    <main>
      <SiteHeader content={content} />
      <section className="page-intro shell"><p className="kicker">Brain dump</p><h1>{content.writing.notesTitle}</h1><p>{content.writing.notesIntro}</p></section>
      <section className="entry-list shell">{getNotes().map((note) => <article key={note.slug} id={note.slug} className="entry-row note-row"><time dateTime={note.date}>{formatDate(note.date)}</time><div className="note-body" dangerouslySetInnerHTML={{ __html: note.html }} /></article>)}</section>
      <SiteFooter content={content} />
    </main>
  );
}
