"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  ariaLabel: string;
  className?: string;
};

/** In the header next to the theme toggle; below sm it shows the icon only (the aria-label names the target language). */
export function LanguageSwitcher({ locale, label, ariaLabel, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target: Locale = locale === "ar" ? "en" : "ar";
  const rest = pathname.split("/").slice(2).join("/");

  // Remember the choice for a year, so the next visit to the site without a language opens in it (src/proxy.ts).
  function rememberChoice() {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <Link
      href={`/${target}${rest ? `/${rest}` : ""}`}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      onClick={rememberChoice}
      className={cn(
        "relative inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink max-sm:w-9 max-sm:px-0 max-sm:before:absolute max-sm:before:-inset-1",
        className,
      )}
    >
      <Languages aria-hidden="true" className="size-4" />
      <span className="max-sm:hidden">{label}</span>
    </Link>
  );
}
