import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";
import { VideoRow, VideoSortControl, VideoSortProvider } from "@/components/entertainment/video-rows";
import { VideoCard } from "@/components/video-card";
import { getYouTubeVideo, getYouTubeViews } from "@/lib/youtube";

const ADDED_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/entertainment", title: dict.nav.entertainment, description: dict.entertainment.description });
}

export default async function EntertainmentPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  // Resolve every video (title + thumbnail from YouTube, views for the sort) up front; unknown links are dropped.
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
                return { ...video, order, added: Date.parse(item.added), views: await getYouTubeViews(video.id) };
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
            newest: Math.max(0, ...videos.map((video) => video.added)),
            content: <VideoRow items={items} labels={{ previous: t.previous, next: t.next }} />,
          };
        }),
      );
      // The category we added a video to most recently comes first; empty ones keep their order at the end.
      return { id: group.id, label: group.title[locale], categories: categories.sort((a, b) => b.newest - a.newest) };
    }),
  );

  return (
    <VideoSortProvider>
      <EntertainmentShell
        locale={locale}
        dict={dict}
        current="videos"
        description={t.description}
        groups={groups}
        empty={t.empty}
        gridClassName="sm:grid-cols-2 lg:grid-cols-3"
        toolbar={<VideoSortControl label={t.sortLabel} options={t.sort} />}
      />
    </VideoSortProvider>
  );
}
