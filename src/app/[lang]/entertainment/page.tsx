import type { Metadata } from "next";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { entertainmentGroups } from "@/content/entertainment";
import { PageHero } from "@/components/page-blocks";
import { Tabs } from "@/components/tabs";
import { Container, toneDot, type Tone } from "@/components/ui";
import { VideoCard } from "@/components/video-card";
import { getYouTubeVideo } from "@/lib/youtube";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.entertainment, description: dict.entertainment.description };
}

// Each category heading takes the next of the four tones.
const categoryTones: Tone[] = ["gold", "blue", "mint", "rose"];

export default async function EntertainmentPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  // Resolve every video (title + thumbnail from YouTube) up front; unknown links are dropped.
  const groups = await Promise.all(
    entertainmentGroups.map(async (group) => ({
      ...group,
      categories: await Promise.all(
        group.categories.map(async (category) => ({
          ...category,
          videos: (await Promise.all(category.videos.map((link) => getYouTubeVideo(link)))).filter((video) => video !== null),
        })),
      ),
    })),
  );

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        eyebrowTone="rose"
        title={t.title}
        description={t.description}
        crumbsLabel={dict.nav.breadcrumb}
        crumbs={[
          { href: localePath(locale), label: dict.nav.home },
          { href: localePath(locale, "/entertainment"), label: dict.nav.entertainment },
        ]}
      />

      <Container className="py-16 sm:py-20">
        <Tabs
          label={t.groupsLabel}
          items={groups.map((group) => ({
            id: group.id,
            label: group.title[locale],
            count: group.categories.reduce((total, category) => total + category.videos.length, 0),
            content: (
              <div className="space-y-14">
                {group.categories.map((category, index) => (
                  <section key={category.id} aria-labelledby={`category-${category.id}`}>
                    <h2
                      id={`category-${category.id}`}
                      className="mb-6 flex items-center gap-3 font-display text-2xl font-semibold text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className={cn("size-2.5 rotate-45 rounded-[2px]", toneDot[categoryTones[index % categoryTones.length]])}
                      />
                      {category.title[locale]}
                    </h2>
                    {category.videos.length > 0 ? (
                      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {category.videos.map((video) => (
                          <VideoCard
                            key={video.id}
                            id={video.id}
                            title={video.title ?? t.untitled}
                            thumbnail={video.thumbnail}
                            playLabel={t.play}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-2xl border border-dashed border-line-strong px-6 py-10 text-center text-muted">
                        {t.empty}
                      </p>
                    )}
                  </section>
                ))}
              </div>
            ),
          }))}
        />
      </Container>
    </>
  );
}
