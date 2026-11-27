import { siteConfig } from "@/config/site";
import { entertainmentGroups } from "@/content/entertainment";
import type { RecommendedVideo } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { getYouTubeDetails, getYouTubeVideo, type YouTubeVideo, type YouTubeVideoDetails } from "./youtube";

const ADDED_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * A recommended video with what YouTube tells us about it, plus when we added it, its place in its category, and the
 * date the page sorts it by: when YouTube published it, or when we added it if YouTube didn't say.
 */
export type ResolvedVideo = YouTubeVideo & YouTubeVideoDetails & { order: number; added: number; date: number };

/**
 * Resolves one recommended video for the Entertainment pages: title, channel and thumbnail, then views and publish
 * date (all cached; see lib/youtube.ts). Returns null for a link YouTube doesn't know, so it is dropped.
 */
async function resolveVideo(item: RecommendedVideo, order: number): Promise<ResolvedVideo | null> {
  // A mistyped date would silently break the order, so the build stops on it instead.
  if (!ADDED_FORMAT.test(item.added) || Number.isNaN(Date.parse(item.added))) {
    throw new Error(`Entertainment video ${item.url}: "added" must look like 2026-11-06T21:30, got "${item.added}"`);
  }
  const video = await getYouTubeVideo(item.url);
  if (!video) return null;
  const details = await getYouTubeDetails(video.id);
  const added = Date.parse(item.added);
  const published = details.published ? Date.parse(details.published) : Number.NaN;
  return { ...video, ...details, order, added, date: Number.isNaN(published) ? added : published };
}

// How many videos a page resolves at once. Pages list hundreds of videos, and asking YouTube about all of them together
// saturated the connection during the build: most requests timed out and the videos lost their titles.
const RESOLVE_PARALLEL = 8;

/**
 * Resolves many videos, at most RESOLVE_PARALLEL at a time, keeping their order (each entry's own `order` is its place
 * in its category). The limit lives here, in the page's render, not inside the cached YouTube functions: a cached
 * function must never wait on another call's promise.
 */
export async function resolveVideos(entries: { item: RecommendedVideo; order: number }[]): Promise<(ResolvedVideo | null)[]> {
  const results: (ResolvedVideo | null)[] = Array.from({ length: entries.length }, () => null);
  let next = 0;
  const worker = async () => {
    while (next < entries.length) {
      const index = next++;
      results[index] = await resolveVideo(entries[index].item, entries[index].order);
    }
  };
  await Promise.all(Array.from({ length: Math.min(RESOLVE_PARALLEL, entries.length) }, worker));
  return results;
}

// Categories that have videos, group by group (cultural before tech), and inside each group the category we added to
// most recently first. Close to the page's order, which follows YouTube publish dates; this one needs no YouTube request.
const newestAdded = (items: { added: string }[]) => Math.max(...items.map((item) => Date.parse(item.added)));
const filledVideoCategories = entertainmentGroups.flatMap((group) =>
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
