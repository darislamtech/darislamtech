"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/cn";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Overlays the homepage hero; gains a surface and border once scrolled. (Codex) */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = locales.some((locale) => pathname === `/${locale}` || pathname === `/${locale}/`);
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 8,
    () => false,
  );

  // The blur lives on a sibling layer: backdrop-filter on <header> itself would become the
  // containing block of the fixed mobile menu and clip it to the header's height.
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[border-color,box-shadow] duration-300",
        isHome && "-mb-16 lg:-mb-[4.5rem]",
        scrolled ? "border-line shadow-header" : "border-transparent",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 transition-colors duration-300",
          // Transparent at the top so the page's green glow shows through; solid green once scrolled.
          scrolled ? "bg-paper/85 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent",
        )}
      />
      {children}
    </header>
  );
}
