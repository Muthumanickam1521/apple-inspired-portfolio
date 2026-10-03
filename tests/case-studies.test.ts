import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getCaseStudies } from "@/lib/case-studies";
import { getPortfolio } from "@/lib/portfolio";

const content = getPortfolio();
const studies = getCaseStudies();

describe("case studies", () => {
  it("has a case study in content/work for every project tile", () => {
    expect(studies.map((s) => s.slug)).toEqual(content.projects.map((p) => p.slug));
  });

  it("covers the problem, role, decisions and outcome", () => {
    for (const study of studies) {
      for (const heading of ["The problem", "My role", "Key decisions", "Outcome"]) {
        expect(study.html, `${study.slug}: "${heading}"`).toContain(`<h2>${heading}</h2>`);
      }
      expect(study.role, `${study.slug}: role`).toBeTruthy();
    }
  });

  it("points images at files in public/", () => {
    for (const study of studies.filter((s) => s.image)) {
      expect(existsSync(join(process.cwd(), "public", study.image!)), study.image).toBe(true);
    }
  });
});

describe("résumé", () => {
  it("links to a file that exists in public/", () => {
    expect(content.profile.resume).toMatch(/^\/.+\.pdf$/);
    expect(existsSync(join(process.cwd(), "public", content.profile.resume))).toBe(true);
  });
});
