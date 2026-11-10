import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { localePath, locales } from "@/i18n/config";
import { posts } from "@/content/posts";
import { products } from "@/content/products";
import { languageAlternates } from "@/lib/seo";

// Every page in both languages, each listing its ar/en/x-default alternates. Posts and products are added
// as they are published in src/content.
const paths = [
  "",
  "/content",
  "/entertainment",
  "/entertainment/channels",
  "/entertainment/books",
  "/entertainment/dartube",
  "/products",
  "/learn",
  "/contribute",
  "/support",
  "/about",
  "/contact",
  ...posts.map((post) => `/content/${post.slug}`),
  ...products.map((product) => `/products/${product.slug}`),
];

const absolute = (url: string) => `${siteConfig.url}${url}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([language, url]) => [language, absolute(url)]),
        ),
      },
    })),
  );
}
