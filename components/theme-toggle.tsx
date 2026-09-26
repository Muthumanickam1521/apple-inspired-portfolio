"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    const nextTheme = saved ?? "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggle() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      <span className="theme-sun" aria-hidden="true">☼</span>
      <span className="theme-orb" aria-hidden="true" />
      <span className="theme-moon" aria-hidden="true">◐</span>
    </button>
  );
}
