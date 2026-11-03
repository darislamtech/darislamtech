import Link from "next/link";
import { Heart } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./brand";
import { HeaderShell } from "./header-shell";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { getAllNavItems, getNavItems } from "./nav";
import { NavLink } from "./nav-link";
import { ButtonLink } from "./ui";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = getNavItems(locale, dict);
  const cta = { href: localePath(locale, "/contribute"), label: dict.nav.contribute };

  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href={localePath(locale)} aria-label={`${dict.brand.name} – ${dict.nav.home}`} className="shrink-0 rounded-lg">
          <Logo name={dict.brand.short} descriptor={dict.brand.descriptor} />
        </Link>

        <nav aria-label={dict.nav.label} className="hidden lg:ms-2 lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="block py-3 text-[0.925rem] font-medium whitespace-nowrap text-ink-2 transition-colors hover:text-primary aria-[current=page]:text-primary"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-1.5">
          <ThemeToggle label={dict.nav.theme} />
          <LanguageSwitcher
            locale={locale}
            label={dict.nav.switchLanguage}
            ariaLabel={dict.nav.switchLanguageLabel}
            className="hidden sm:inline-flex"
          />
          {/* English only: icon only between lg and xl, where the longer English nav leaves no room for the label. */}
          <ButtonLink
            href={localePath(locale, "/support")}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex ltr:lg:max-xl:px-3"
          >
            <Heart aria-hidden="true" className="size-4 text-tone-rose" />
            <span className="ltr:lg:max-xl:sr-only">{dict.nav.support}</span>
          </ButtonLink>
          <ButtonLink href={cta.href} size="sm" className="hidden sm:inline-flex">
            {cta.label}
          </ButtonLink>
          <MobileMenu
            locale={locale}
            items={getAllNavItems(locale, dict)}
            cta={cta}
            labels={{
              open: dict.nav.openMenu,
              close: dict.nav.closeMenu,
              nav: dict.nav.label,
              switchLanguage: dict.nav.switchLanguage,
              switchLanguageLabel: dict.nav.switchLanguageLabel,
            }}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
