import { describe, expect, it } from "vitest";
import { formatDate, getPost, getPosts } from "@/lib/writing";

const posts = getPosts();

describe("blog posts (content/blog)", () => {
  it("loads at least one post with every field the blog renders", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.title, `${post.slug}: title`).toBeTruthy();
      expect(post.summary, `${post.slug}: summary`).toBeTruthy();
      expect(post.html, `${post.slug}: body`).toContain("<");
    }
  });

  it("uses url-safe slugs and ISO dates", () => {
    for (const post of posts) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.date)), `${post.slug}: date`).toBe(false);
    }
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
  });

  it("sorts newest first", () => {
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("finds a post by slug and returns undefined for unknown slugs", () => {
    expect(getPost(posts[0].slug)?.title).toBe(posts[0].title);
    expect(getPost("does-not-exist")).toBeUndefined();
  });
});

describe("formatDate", () => {
  it("formats ISO dates in UTC regardless of the machine time zone", () => {
    expect(formatDate("2026-08-02")).toBe("August 2, 2026");
    expect(formatDate("2026-01-01")).toBe("January 1, 2026");
  });
});
