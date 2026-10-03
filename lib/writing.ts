import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import { parse } from "yaml";

// Blog posts live in content/blog, one Markdown file each with a small YAML front matter block.

export type Post = { slug: string; title: string; date: string; summary: string; html: string };

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function readEntries(folder: string) {
  const dir = join(process.cwd(), "content", folder);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(join(dir, file), "utf8");
      const match = FRONT_MATTER.exec(source);
      if (!match) throw new Error(`content/${folder}/${file} is missing its front matter`);
      const data = (parse(match[1]) ?? {}) as Record<string, unknown>;
      const date = String(data.date ?? "");
      return { slug: file.replace(/\.md$/, ""), data, date, html: marked.parse(match[2], { async: false }) };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPosts(): Post[] {
  return readEntries("blog").map(({ slug, data, date, html }) => ({
    slug,
    date,
    html,
    title: String(data.title ?? ""),
    summary: String(data.summary ?? ""),
  }));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
