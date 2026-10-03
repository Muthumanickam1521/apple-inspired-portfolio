import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPortfolio } from "@/lib/portfolio";
import { formatDate, getPost, getPosts } from "@/lib/writing";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.summary, openGraph: { type: "article", title: post.title, description: post.summary } } : {};
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const content = getPortfolio();

  return (
    <main>
      <SiteHeader content={content} />
      <article className="post shell">
        <Link href="/blog" className="back-link"><b>‹</b> Blog</Link>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <h1>{post.title}</h1>
        <p className="post-summary">{post.summary}</p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <SiteFooter content={content} />
    </main>
  );
}
