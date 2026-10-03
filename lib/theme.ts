export type Theme = "light" | "dark";

export const themeStorageKey = "portfolio-theme";

// Runs in <head> before first paint so the page never flashes the wrong theme.
export const themeScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;
