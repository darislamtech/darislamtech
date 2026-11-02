import type { MetadataRoute } from "next";
import { defaultLocale } from "@/i18n/config";
import { THEME_COLORS } from "@/components/theme";
import ar from "@/i18n/dictionaries/ar.json";

// Web app manifest (makes the site installable as a PWA). Arabic is the default locale, so the installed app opens on /ar.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: ar.brand.name,
    short_name: ar.brand.short,
    description: ar.meta.description,
    lang: defaultLocale,
    dir: "rtl",
    start_url: `/${defaultLocale}`,
    scope: "/",
    display: "standalone",
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
