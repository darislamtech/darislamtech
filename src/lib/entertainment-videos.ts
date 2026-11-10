import { siteConfig } from "@/config/site";
import { entertainmentGroups } from "@/content/entertainment";
import type { RecommendedVideo } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { getYouTubeDetails, getYouTubeVideo, type YouTubeVideo, type YouTubeVideoDetails } from "./youtube";

const ADDED_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/** A recommended video with what YouTube tells us about it, plus when we added it and its place in its category. */
export type ResolvedVideo = YouTubeVideo & YouTubeVideoDetails & { order: number; added: number };

/**
 * Resolves one recommended video for the Entertainment pages: title, channel and thumbnail, then views and publish
 * date (all cached; see lib/youtube.ts). Returns null for a link YouTube doesn't know, so it is dropped.
 */
export async function resolveVideo(item: RecommendedVideo, order: number): Promise<ResolvedVideo | null> {
  // A mistyped date would silently break the order, so the build stops on it instead.
  if (!ADDED_FORMAT.test(item.added) || Number.isNaN(Date.parse(item.added))) {
    throw new Error(`Entertainment video ${item.url}: "added" must look like 2026-11-06T21:30, got "${item.added}"`);
  }
  const video = await getYouTubeVideo(item.url);
  if (!video) return null;
  return { ...video, ...(await getYouTubeDetails(video.id)), order, added: Date.parse(item.added) };
}

// Categories that have videos, in the videos page order: group by group (cultural before tech), and inside each group
// the category we added to most recently first.
const newestAdded = (items: { added: string }[]) => Math.max(...items.map((item) => Date.parse(item.added)));
export const filledVideoCategories = entertainmentGroups.flatMap((group) =>
  group.videos.filter((category) => category.items.length > 0).sort((a, b) => newestAdded(b.items) - newestAdded(a.items)),
);

/** A meta description for a page of these videos: its own text, then the topics they cover, so search results name them. */
export function describeVideoTopics(locale: Locale, text: string, topicsLabel: string): string {
  const topics = filledVideoCategories.slice(0, 6).map((category) => category.title[locale]);
  if (topics.length === 0) return text;
  const more = filledVideoCategories.length > topics.length ? "…" : ".";
  return `${text} ${topicsLabel} ${topics.join(locale === "ar" ? "، " : ", ")}${more}`;
}

/**
 * Structured data for search engines: the page is a list of these YouTube videos. Google needs a title and a publish
 * date for each VideoObject, so a video missing either is left out of the list (it still shows on the page).
 */
export function videoListJsonLd({ locale, name, path, videos }: { locale: Locale; name: string; path: string; videos: ResolvedVideo[] }) {
  const listed = videos.filter((video) => video.title && video.published);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${siteConfig.url}${localePath(locale, path)}`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listed.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.title,
          // The title, which the page shows; markup must not describe what visitors can't see.
          description: video.title,
          thumbnailUrl: video.thumbnail,
          uploadDate: video.published,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          ...(video.views !== null && {
            interactionStatistic: {
              "@type": "InteractionCounter",
              interactionType: { "@type": "WatchAction" },
              userInteractionCount: video.views,
            },
          }),
        },
      })),
    },
  };
}
