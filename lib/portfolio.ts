import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

export type Portfolio = {
  profile: { firstName: string; name: string; role: string; location: string; intro: string; availability: string; email: string };
  navigation: { label: string; href: string }[];
  projects: { title: string; category: string; year: string; description: string; tags: string[]; accent: string; accentDeep: string; image?: string; link: string }[];
  skills: { group: string; items: string[] }[];
  about: { eyebrow: string; title: string; body: string; note: string };
  experience: { company: string; role: string; period: string; description: string }[];
  education: { institution: string; degree: string; period: string }[];
  interests: { title: string; intro: string; items: { name: string; detail: string; symbol: string }[] };
  writing: { eyebrow: string; title: string; blogTitle: string; blogIntro: string; notesTitle: string; notesIntro: string };
  socials: { label: string; url: string }[];
  footer: { credit: string };
};

export function getPortfolio(): Portfolio {
  const source = readFileSync(join(process.cwd(), "content", "portfolio.yml"), "utf8");
  return parse(source) as Portfolio;
}
