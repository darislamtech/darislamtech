import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type NavItem = { href: string; label: string };

/** Main sections. Home is reached through the logo; "Contribute" is the header call to action. */
export function getNavItems(locale: Locale, dict: Dictionary): NavItem[] {
  return [
    { href: localePath(locale, "/content"), label: dict.nav.content },
    { href: localePath(locale, "/entertainment"), label: dict.nav.entertainment },
    { href: localePath(locale, "/products"), label: dict.nav.products },
    { href: localePath(locale, "/learn"), label: dict.nav.learn },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];
}

/** Mobile menu: home first, and "Contribute" placed before the about/contact pages. */
export function getAllNavItems(locale: Locale, dict: Dictionary): NavItem[] {
  const items = getNavItems(locale, dict);
  const aboutIndex = items.findIndex((item) => item.href === localePath(locale, "/about"));
  return [
    { href: localePath(locale), label: dict.nav.home },
    ...items.slice(0, aboutIndex),
    { href: localePath(locale, "/contribute"), label: dict.nav.contribute },
    ...items.slice(aboutIndex),
  ];
}
