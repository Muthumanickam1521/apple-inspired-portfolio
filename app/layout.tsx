import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/portfolio";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const description = "The portfolio of Muthumanickam, a designer and developer based in San Francisco.";

// Pages set a short title (e.g. "Blog") and the template adds the name. The link-preview image comes from opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Muthumanickam — Designer & Developer", template: "%s — Muthumanickam" },
  description,
  openGraph: { type: "website", siteName: "Muthumanickam", title: "Muthumanickam — Designer & Developer", description },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
