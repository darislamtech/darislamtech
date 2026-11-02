"use client";

import { THEME_COLORS, THEME_STORAGE_KEY } from "./theme";

// Applies the saved theme before the first paint so the page never flashes the wrong colors.
// Light is the default; the visitor's choice is stored in localStorage by the theme toggle.
// Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md: it must be a
// Client Component so the script is `text/javascript` in the server HTML (runs during parsing) and `text/plain`
// when React renders it in the browser (no "script tag while rendering" warning, never re-executed).
const script = `(function(){var t="light";try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")t="dark"}catch(e){}var d=document.documentElement;d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${THEME_COLORS.dark}":"${THEME_COLORS.light}")})()`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
