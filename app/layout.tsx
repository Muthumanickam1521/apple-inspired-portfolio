import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muthumanickam — Designer & Developer",
  description: "The portfolio of Muthumanickam, a designer and developer based in San Francisco.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
