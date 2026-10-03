import { getPortfolio } from "@/lib/portfolio";
import { renderShareImage, shareImageSize } from "@/lib/share-image";

export const size = shareImageSize;
export const contentType = "image/png";
export const alt = "Muthumanickam, designer and developer";

export default function Image() {
  const { profile } = getPortfolio();
  return renderShareImage({ eyebrow: profile.location, title: profile.name, subtitle: `${profile.role}.`, footer: profile.intro });
}
