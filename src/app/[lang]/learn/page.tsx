import type { Metadata } from "next";
import { BookOpen, Code, Compass, Construction, ScrollText, ShieldCheck } from "lucide-react";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { learningYears } from "@/content/learn";
import { CtaPanel, PageHero } from "@/components/page-blocks";
import { Badge, Container, IconTile, SectionHeading, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/learn", title: dict.nav.learn, description: dict.learn.description });
}

// Each year and each track takes its own tone, so the page uses all four.
const yearTones: Tone[] = ["rose", "gold"];

const tracks: Record<string, { icon: React.ComponentType; tone: Tone }> = {
  foundation: { icon: Compass, tone: "gold" },
  sharia: { icon: ScrollText, tone: "mint" },
  tech: { icon: Code, tone: "blue" },
};

export default async function LearnPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.learn;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        eyebrowTone="mint"
        title={t.title}
        description={t.description}
        crumbsLabel={dict.nav.breadcrumb}
        crumbs={[
          { href: localePath(locale), label: dict.nav.home },
          { href: localePath(locale, "/learn"), label: dict.nav.learn },
        ]}
      >
        <Badge tone="gold" className="px-3 py-2 text-sm">
          <Construction aria-hidden="true" className="size-3.5" />
          {t.notice}
        </Badge>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading title={t.roadmapTitle} />
              <div className="mt-8 flex gap-3 rounded-2xl border border-line bg-surface p-5">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-tone-mint" />
                <p className="text-sm leading-relaxed text-ink-2">{t.shariaNote}</p>
              </div>
            </div>
          </div>

          <ol className="relative space-y-4 lg:col-span-8">
            <span aria-hidden="true" className="absolute start-[2.625rem] top-8 bottom-8 w-px bg-line-strong sm:start-[3.125rem]" />
            {learningYears.map((year, yearIndex) => (
              <li key={year.id} className="reveal relative flex gap-5 rounded-3xl border border-line bg-surface p-5 sm:p-7">
                <IconTile tone={yearTones[yearIndex % yearTones.length]} className="relative z-10 size-11 ring-4 ring-surface">
                  <span className="font-mono text-sm font-semibold">{String(yearIndex + 1).padStart(2, "0")}</span>
                </IconTile>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-display text-2xl font-semibold text-ink">{year.title[locale]}</h2>
                    <Badge tone="muted">
                      <Construction aria-hidden="true" className="size-3" />
                      {t.underConstruction}
                    </Badge>
                  </div>
                  <p className="mt-2 leading-relaxed text-muted">{year.description[locale]}</p>
                  <ul className={cn("mt-5 grid gap-3", year.tracks.length > 1 && "sm:grid-cols-2")}>
                    {year.tracks.map((track) => {
                      const { icon: Icon, tone } = tracks[track.id] ?? { icon: BookOpen, tone: "blue" };
                      return (
                        <li key={track.id} className="rounded-2xl border border-line bg-surface-2 p-4">
                          <div className="flex items-center gap-3">
                            <IconTile tone={tone}>
                              <Icon />
                            </IconTile>
                            <h3 className="font-semibold text-ink">{track.title[locale]}</h3>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted">{track.description[locale]}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaPanel
        title={t.suggestTitle}
        body={t.suggestBody}
        primary={{ href: localePath(locale, "/contact"), label: t.suggestCta }}
      />
    </>
  );
}
