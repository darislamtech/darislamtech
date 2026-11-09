import type { MetadataRoute } from "next";
import { defaultLocale } from "@/i18n/config";
import { THEME_COLORS } from "@/components/theme/colors";
import ar from "@/i18n/dictionaries/ar.json";

// Web app manifest (makes the site installable as a PWA). The installed app opens on "/", which src/proxy.ts sends to
// the visitor's saved language or their browser's language, like the website. Name and direction stay Arabic.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: ar.brand.name,
    short_name: ar.brand.short,
    description: ar.meta.description,
    lang: defaultLocale,
    dir: "rtl",
    start_url: "/",
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
