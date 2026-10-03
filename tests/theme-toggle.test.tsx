// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";
import { themeScript, themeStorageKey } from "@/lib/theme";

function mockSystemTheme(dark: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: dark && query === "(prefers-color-scheme: dark)",
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    mockSystemTheme(false);
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("head script follows the system theme when nothing is saved", () => {
    mockSystemTheme(true);
    new Function(themeScript)();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("head script prefers the saved theme over the system theme", () => {
    mockSystemTheme(true);
    localStorage.setItem(themeStorageKey, "light");
    new Function(themeScript)();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("toggle reflects the theme already on the page", () => {
    document.documentElement.dataset.theme = "dark";
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeTruthy();
  });

  it("toggle switches theme and remembers the choice", () => {
    document.documentElement.dataset.theme = "light";
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(themeStorageKey)).toBe("dark");
  });
});
