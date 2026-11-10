import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";
import { RandomPick } from "@/components/entertainment/random-pick";
import { VideoRow, VideoSortControl, VideoSortProvider } from "@/components/entertainment/video-rows";
import { VideoCard } from "@/components/video/video-card";
import { describeVideoTopics, resolveVideo, videoListJsonLd } from "@/lib/entertainment-videos";

const PATH = "/entertainment";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.entertainment;
  return pageMetadata({
    locale,
    dict,
    path: PATH,
    title: dict.nav.entertainment,
    description: describeVideoTopics(locale, t.description, t.topics),
  });
}

export default async function EntertainmentPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  // Resolve every video up front (lib/entertainment-videos.ts); unknown links are dropped.
  const groups = await Promise.all(
    entertainmentGroups.map(async (group) => {
      const categories = await Promise.all(
        group.videos.map(async (category) => {
          const videos = (await Promise.all(category.items.map(resolveVideo))).filter((video) => video !== null);
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

  const jsonLd = videoListJsonLd({
    locale,
    name: dict.nav.entertainment,
    path: PATH,
    videos: groups.flatMap((group) => group.categories.flatMap((category) => category.videos)),
  });

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
