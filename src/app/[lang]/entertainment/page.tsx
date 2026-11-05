import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";
import { VideoCard } from "@/components/video-card";
import { getYouTubeVideo } from "@/lib/youtube";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/entertainment", title: dict.nav.entertainment, description: dict.entertainment.description });
}

export default async function EntertainmentPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  // Resolve every video (title + thumbnail from YouTube) up front; unknown links are dropped.
  const groups = await Promise.all(
    entertainmentGroups.map(async (group) => ({
      id: group.id,
      label: group.title[locale],
      categories: await Promise.all(
        group.videos.map(async (category) => {
          const videos = (await Promise.all(category.items.map((link) => getYouTubeVideo(link)))).filter((video) => video !== null);
          return {
            id: category.id,
            title: category.title[locale],
            items: videos.map((video) => ({
              key: video.id,
              node: <VideoCard id={video.id} title={video.title ?? t.untitled} thumbnail={video.thumbnail} playLabel={t.play} />,
            })),
          };
        }),
      ),
    })),
  );

  return (
    <EntertainmentShell
      locale={locale}
      dict={dict}
      current="videos"
      description={t.description}
      groups={groups}
      empty={t.empty}
      gridClassName="sm:grid-cols-2 lg:grid-cols-3"
    />
  );
}
