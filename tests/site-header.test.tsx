// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPortfolio } from "@/lib/portfolio";

const content = getPortfolio();

describe("site header and footer", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("links the nav to in-page sections on the homepage", () => {
    render(<SiteHeader content={content} home />);
    for (const item of content.navigation) {
      expect(screen.getByRole("link", { name: item.label }).getAttribute("href")).toBe(item.href);
    }
  });

  it("links the nav back to the homepage sections on other pages", () => {
    render(<SiteHeader content={content} />);
    for (const item of content.navigation) {
      expect(screen.getByRole("link", { name: item.label }).getAttribute("href")).toBe(`/${item.href}`);
    }
  });

  it("exposes accessible landmarks and the résumé link", () => {
    render(<SiteHeader content={content} home />);
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
    const resume = screen.getByRole("link", { name: /sum/i });
    expect(resume.getAttribute("href")).toBe(content.profile.resume);
    expect(resume.getAttribute("rel")).toContain("noreferrer");
  });

  it("renders every social link in the footer, opened safely", () => {
    render(<SiteFooter content={content} />);
    for (const social of content.socials) {
      const link = screen.getByRole("link", { name: social.label });
      expect(link.getAttribute("href")).toBe(social.url);
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });
});
