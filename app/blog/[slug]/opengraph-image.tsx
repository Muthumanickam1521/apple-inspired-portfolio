import { getPortfolio } from "@/lib/portfolio";
import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { formatDate, getPost, getPosts } from "@/lib/writing";

export const size = shareImageSize;
export const contentType = "image/png";
export const alt = "Blog post";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  const { profile } = getPortfolio();
  if (!post) return renderShareImage({ eyebrow: profile.name, title: "Blog" });
  return renderShareImage({ eyebrow: formatDate(post.date), title: post.title, footer: `Writing by ${profile.name}`, compact: true });
}
