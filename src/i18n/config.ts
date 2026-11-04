export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

/** Cookie holding the language the visitor chose with the language switcher; read by src/proxy.ts. */
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Prefixes an internal path with the locale: localePath("ar", "/products") -> "/ar/products" */
export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}
