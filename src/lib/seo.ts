import type { Metadata } from "next";
import { localePath, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const ogLocales: Record<Locale, string> = { ar: "ar_AR", en: "en_US" };

// Share image (logo, name and tagline). Set explicitly on every page: a page's own openGraph object would
// otherwise replace an image inherited from the app/opengraph-image file convention.
const shareImage = { url: "/og-image.png", width: 1200, height: 630 };

/**
 * ar/en/x-default alternates for a path after the locale ("" for home, "/about", ...). x-default is the same path
 * without a locale, which src/proxy.ts sends to the visitor's language.
 */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)])),
    "x-default": path || "/",
  };
}

/**
 * Title, description, canonical URL, ar/en alternates and Open Graph / X card for a page. Every page's
 * generateMetadata goes through this so all pages share the same SEO basics. Without a title the layout's
 * default title (brand | tagline) is used. URLs are relative to `metadataBase` (set in the layout).
 */
export function pageMetadata({
  locale,
  dict,
  path,
  title,
  description,
}: {
  locale: Locale;
  dict: Dictionary;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${dict.brand.name}` : `${dict.brand.name} | ${dict.brand.tagline}`;
  const url = localePath(locale, path);
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      title: fullTitle,
      description,
      url,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => ogLocales[other]),
      images: [{ ...shareImage, alt: `${dict.brand.name} — ${dict.brand.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
  };
}
