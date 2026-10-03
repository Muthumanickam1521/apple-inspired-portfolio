import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPortfolio } from "@/lib/portfolio";
import { formatDate, getPosts } from "@/lib/writing";

const { writing } = getPortfolio();

export const metadata: Metadata = { title: "Blog", description: writing.blogIntro, openGraph: { title: "Blog", description: writing.blogIntro } };

export default function BlogIndex() {
  const content = getPortfolio();

  return (
    <main>
      <SiteHeader content={content} />
      <section className="page-intro shell"><p className="kicker">Blog</p><h1>{content.writing.blogTitle}</h1><p>{content.writing.blogIntro}</p></section>
      <section className="entry-list shell">{getPosts().map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="entry-row"><time dateTime={post.date}>{formatDate(post.date)}</time><div><h2>{post.title}</h2><p>{post.summary}</p></div><b>›</b></Link>)}</section>
      <SiteFooter content={content} />
    </main>
  );
}
