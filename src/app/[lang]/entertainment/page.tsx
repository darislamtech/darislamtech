import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { EntertainmentShell, type EntertainmentGroupView } from "@/components/entertainment/entertainment-shell";
import { RandomPick } from "@/components/entertainment/random-pick";
import { ShuffledGrid } from "@/components/entertainment/shuffled-grid";
import { VideoRow, VideoSortControl, VideoSortProvider } from "@/components/entertainment/video-rows";
import { VideoCard } from "@/components/video/video-card";
import { describeVideoTopics, resolveVideos, videoListJsonLd } from "@/lib/entertainment-videos";

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

  // Resolve every video up front, a few at a time (lib/entertainment-videos.ts); unknown links are dropped.
  const entries = entertainmentGroups.flatMap((group) =>
    group.videos.flatMap((category) => category.items.map((item, order) => ({ item, order }))),
  );
  const indexOf = new Map(entries.map((entry, index) => [entry.item, index]));
  const results = await resolveVideos(entries);

  // «الكل»: every video once, both groups together (a video may sit in two categories), in a grid like YouTube's home
  // page, shown in a new random order on every visit. It is the tab the page opens on.
  const allVideos = [
    ...new Map(results.filter((video) => video !== null).map((video) => [video.id, video])).values(),
  ];
  const views = new Intl.NumberFormat(locale, { notation: "compact" });
  const allTab: EntertainmentGroupView = {
    id: "all",
    label: t.all,
    categories: [],
    own: {
      count: allVideos.length,
      content: (
        <ShuffledGrid
          className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          items={allVideos.map((video) => ({
            key: video.id,
            node: (
              <VideoCard
                id={video.id}
                title={video.title ?? t.untitled}
                thumbnail={video.thumbnail}
                playLabel={t.play}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                meta={[video.channel, video.views !== null ? t.views.replace("{n}", views.format(video.views)) : null]
                  .filter(Boolean)
                  .join(" · ")}
              />
            ),
          }))}
        />
      ),
    },
  };

  const groups = entertainmentGroups.map((group) => {
    const categories = group.videos.map((category) => {
      const videos = category.items
        .map((item) => results[indexOf.get(item) ?? -1] ?? null)
        .filter((video) => video !== null);
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
        newest: Math.max(0, ...videos.map((video) => video.added)),
        content: <VideoRow items={items} labels={{ previous: t.previous, next: t.next }} />,
      };
    });
    // The category we added a video to most recently comes first; empty ones keep their order at the end.
    return { id: group.id, label: group.title[locale], categories: categories.sort((a, b) => b.newest - a.newest) };
  });

  // "Most viewed" only when YouTube gave us view counts; otherwise it would just repeat "newest".
  const hasViews = groups.some((group) => group.categories.some((category) => category.items.some((item) => item.views !== null)));
  const { mostViewed, ...dateSorts } = t.sort;
  const sortOptions = hasViews ? { ...dateSorts, mostViewed } : dateSorts;

  const jsonLd = videoListJsonLd({ locale, name: dict.nav.entertainment, path: PATH, videos: allVideos });

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
        groups={[allTab, ...groups]}
        empty={t.empty}
        gridClassName="sm:grid-cols-2 lg:grid-cols-3"
        toolbar={<RandomPick label={t.random.videos} />}
        // The sort orders the rows of the group tabs; «الكل» keeps its random order.
        groupToolbar={<VideoSortControl label={t.sortLabel} options={sortOptions} />}
      />
    </VideoSortProvider>
  );
}
