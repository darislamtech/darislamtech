import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";
import { RandomPick } from "@/components/entertainment/random-pick";
import { VideoRow, VideoSortControl, VideoSortProvider } from "@/components/entertainment/video-rows";
import { VideoCard } from "@/components/video-card";
import { getYouTubeDetails, getYouTubeVideo } from "@/lib/youtube";

const PATH = "/entertainment";
const ADDED_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

// Categories that have videos, in the page order: group by group (cultural before tech), and inside each group the
// category we added to most recently first.
const newestAdded = (items: { added: string }[]) => Math.max(...items.map((item) => Date.parse(item.added)));
const filledCategories = entertainmentGroups.flatMap((group) =>
  group.videos.filter((category) => category.items.length > 0).sort((a, b) => newestAdded(b.items) - newestAdded(a.items)),
);

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.entertainment;
  // Search results name the topics the videos cover.
  const topics = filledCategories.slice(0, 6).map((category) => category.title[locale]);
  const separator = locale === "ar" ? "، " : ", ";
  const more = filledCategories.length > topics.length ? "…" : ".";
  return pageMetadata({
    locale,
    dict,
    path: PATH,
    title: dict.nav.entertainment,
    description: topics.length > 0 ? `${t.description} ${t.topics} ${topics.join(separator)}${more}` : t.description,
  });
}

export default async function EntertainmentPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  // Resolve every video up front (title + thumbnail, then views and publish date); unknown links are dropped.
  const groups = await Promise.all(
    entertainmentGroups.map(async (group) => {
      const categories = await Promise.all(
        group.videos.map(async (category) => {
          const videos = (
            await Promise.all(
              category.items.map(async (item, order) => {
                // A mistyped date would silently break the order, so the build stops on it instead.
                if (!ADDED_FORMAT.test(item.added) || Number.isNaN(Date.parse(item.added))) {
                  throw new Error(`Entertainment video ${item.url}: "added" must look like 2026-11-06T21:30, got "${item.added}"`);
                }
                const video = await getYouTubeVideo(item.url);
                if (!video) return null;
                return { ...video, ...(await getYouTubeDetails(video.id)), order, added: Date.parse(item.added) };
              }),
            )
          ).filter((video) => video !== null);
          const items = videos.map((video) => ({
            key: video.id,
            added: video.added,
            order: video.order,
            views: video.views,
            node: <VideoCard id={video.id} title={video.title ?? t.untitled} thumbnail={video.thumbnail} playLabel={t.play} />,
          }));
          return {
            id: category.id,
            title: category.title[locale],
            items,
            videos,
            newest: Math.max(0, ...videos.map((video) => video.added)),
            content: <VideoRow items={items} labels={{ previous: t.previous, next: t.next }} />,
          };
        }),
      );
      // The category we added a video to most recently comes first; empty ones keep their order at the end.
      return { id: group.id, label: group.title[locale], categories: categories.sort((a, b) => b.newest - a.newest) };
    }),
  );

  // "Most viewed" only when YouTube gave us view counts; otherwise it would just repeat "newest".
  const hasViews = groups.some((group) => group.categories.some((category) => category.items.some((item) => item.views !== null)));
  const { mostViewed, ...dateSorts } = t.sort;
  const sortOptions = hasViews ? { ...dateSorts, mostViewed } : dateSorts;

  // Structured data for search engines: this page is a list of these YouTube videos. Google needs a title and a
  // publish date for each VideoObject, so a video missing either is left out of the list (it still shows on the page).
  const listed = groups
    .flatMap((group) => group.categories.flatMap((category) => category.videos))
    .filter((video) => video.title && video.published);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.nav.entertainment,
    url: `${siteConfig.url}${localePath(locale, PATH)}`,
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

  return (
    <VideoSortProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <EntertainmentShell
        locale={locale}
        dict={dict}
        current="videos"
        description={t.description}
        groups={groups}
        empty={t.empty}
        gridClassName="sm:grid-cols-2 lg:grid-cols-3"
        toolbar={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <VideoSortControl label={t.sortLabel} options={sortOptions} />
            <RandomPick label={t.random.videos} />
          </div>
        }
      />
    </VideoSortProvider>
  );
}
