"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  ariaLabel: string;
  className?: string;
  onNavigate?: () => void;
};

export function LanguageSwitcher({ locale, label, ariaLabel, className, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target: Locale = locale === "ar" ? "en" : "ar";
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <Link
      href={`/${target}${rest ? `/${rest}` : ""}`}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      onClick={onNavigate}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink",
        className,
      )}
    >
      <Languages aria-hidden="true" className="size-4" />
      {label}
    </Link>
  );
}
