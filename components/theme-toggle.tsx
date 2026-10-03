"use client";

import { useEffect, useState } from "react";
import { type Theme, themeStorageKey } from "@/lib/theme";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());

    // Follow the system setting until the visitor picks a theme themselves.
    const media = matchMedia("(prefers-color-scheme: dark)");
    function onSystemChange(event: MediaQueryListEvent) {
      if (localStorage.getItem(themeStorageKey)) return;
      const nextTheme = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
    }
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const nextTheme = currentTheme() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      <span className="theme-sun" aria-hidden="true">☼</span>
    </button>
  );
}
