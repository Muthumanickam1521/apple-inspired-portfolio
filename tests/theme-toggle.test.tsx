// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });
  afterEach(cleanup);

  it("restores the saved theme", () => {
    localStorage.setItem("portfolio-theme", "dark");
    render(<ThemeToggle />);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeTruthy();
  });

  it("switches theme and remembers the choice", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  });
});
