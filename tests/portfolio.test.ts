import { describe, expect, it } from "vitest";
import { getPortfolio } from "@/lib/portfolio";

const content = getPortfolio();

describe("content/portfolio.yml", () => {
  it("has a complete profile", () => {
    for (const key of ["firstName", "name", "role", "location", "intro", "email"] as const) {
      expect(content.profile[key], `profile.${key}`).toBeTruthy();
    }
    expect(content.profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("only links navigation to sections that exist on the page", () => {
    const sectionIds = ["#top", "#work", "#about", "#experience", "#writing", "#contact"];
    for (const item of content.navigation) {
      expect(sectionIds, `navigation "${item.label}"`).toContain(item.href);
    }
  });

  it("gives every project the fields the page renders", () => {
    expect(content.projects.length).toBeGreaterThan(0);
    for (const project of content.projects) {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.year).toMatch(/^\d{4}$/);
      expect(project.accent).toMatch(/^#[0-9a-f]{3,8}$/i);
      expect(project.accentDeep).toMatch(/^#[0-9a-f]{3,8}$/i);
      expect(Array.isArray(project.tags)).toBe(true);
    }
  });

  it("uses unique titles and names where they are React keys", () => {
    const unique = (values: string[]) => new Set(values).size === values.length;
    expect(unique(content.projects.map((p) => p.title))).toBe(true);
    expect(unique(content.skills.map((s) => s.group))).toBe(true);
    expect(unique(content.experience.map((e) => e.company))).toBe(true);
    expect(unique(content.interests.items.map((i) => i.name))).toBe(true);
    expect(unique(content.socials.map((s) => s.label))).toBe(true);
  });

  it("uses absolute https URLs for social links", () => {
    for (const social of content.socials) {
      expect(social.url, social.label).toMatch(/^https:\/\//);
    }
  });
});
