import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/portfolio";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const description = "The portfolio of Muthumanickam, a data scientist and ML engineer.";

// Pages set a short title (e.g. "Blog") and the template adds the name. The link-preview image comes from opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Muthumanickam — Data Scientist & ML Engineer", template: "%s — Muthumanickam" },
  description,
  openGraph: { type: "website", siteName: "Muthumanickam", title: "Muthumanickam — Data Scientist & ML Engineer", description },
  twitter: { card: "summary_large_image" },
};

// No maximum-scale or user-scalable=no, so browser zoom and pinch-zoom keep working. Theme colour tints the Chrome/Edge/Safari toolbar.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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
