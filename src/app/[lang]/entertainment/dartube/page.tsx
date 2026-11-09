import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";
import { RandomPick } from "@/components/entertainment/random-pick";
import { ShuffledGrid } from "@/components/entertainment/shuffled-grid";
import { VideoCard } from "@/components/video/video-card";
import { resolveVideo } from "@/lib/entertainment-videos";

const PATH = "/entertainment/dartube";

// Every recommended video, from both groups, once (a video may sit in two categories).
const allVideos = [
  ...new Map(
    entertainmentGroups.flatMap((group) => group.videos.flatMap((category) => category.items)).map((item) => [item.url, item]),
  ).values(),
];

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.entertainment;
  return pageMetadata({
    locale,
    dict,
    path: PATH,
    title: `${t.sections.dartube} – ${dict.nav.entertainment}`,
    description: t.dartube.description,
  });
}

/**
 * DarTube: all the Entertainment videos, Islamic and tech together, in one grid like YouTube's home page, in a new
 * random order on every visit. Prerendered like the other pages (video data resolved at build); the browser shuffles.
 */
export default async function DarTubePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  const videos = (await Promise.all(allVideos.map(resolveVideo))).filter((video) => video !== null);
  const views = new Intl.NumberFormat(locale, { notation: "compact" });

  return (
    <EntertainmentShell
      locale={locale}
      dict={dict}
      current="dartube"
      description={t.dartube.description}
      toolbar={<RandomPick label={t.random.videos} />}
    >
      {/* Like YouTube's home page: as many columns as the screen allows. */}
      <ShuffledGrid
        className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        items={videos.map((video) => ({
          key: video.id,
          node: (
            <VideoCard
              id={video.id}
              title={video.title ?? t.untitled}
              thumbnail={video.thumbnail}
              playLabel={t.play}
              meta={[video.channel, video.views !== null ? t.dartube.views.replace("{n}", views.format(video.views)) : null]
                .filter(Boolean)
                .join(" · ")}
            />
          ),
        }))}
      />
    </EntertainmentShell>
  );
}
