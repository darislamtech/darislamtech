"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { THEME_COLORS, THEME_STORAGE_KEY } from "./theme";

/** Switches between the light and dark themes and remembers the choice. Icons swap through the `dark:` variant. */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[next]);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink",
        className,
      )}
    >
      <Moon aria-hidden="true" className="size-[1.1rem] dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-[1.1rem] dark:block" />
    </button>
  );
}
