import type { Metadata } from "next";
import {
  BookOpen,
  ChevronDown,
  Clock,
  Code,
  Download,
  Eye,
  Construction,
  ExternalLink,
  GraduationCap,
  Hammer,
  PlayCircle,
  ScrollText,
  ShieldCheck,
  Target,
} from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary, getLocale, type Dictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { getYouTubeVideo } from "@/lib/youtube";
import { externalDomains, platformDomains } from "@/content/learn";
import type { BookSeries, RoadmapDomain, RoadmapLevel, RoadmapPath } from "@/content/types";
import { CtaPanel, PageHero } from "@/components/page-blocks";
import { Tabs } from "@/components/tabs";
import { VideoCard } from "@/components/video/video-card";
import { Badge, Container, IconTile, toneDot, toneText, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/learn", title: dict.nav.learn, description: dict.learn.description });
}

const domainStyle: Record<RoadmapDomain["id"], { icon: React.ComponentType<{ className?: string }>; tone: Tone }> = {
  sharia: { icon: ScrollText, tone: "mint" },
  tech: { icon: Code, tone: "blue" },
};

// The two paths of a domain take their own tones, so each domain reads as a sequence.
const pathTones: Tone[] = ["gold", "rose"];

type Learn = Dictionary["learn"];

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
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex max-w-3xl gap-4 rounded-3xl border border-line bg-tone-gold-soft p-5 sm:p-6">
            <Target aria-hidden="true" className="mt-1 size-6 shrink-0 text-tone-gold" />
            <div>
              <p className="font-display text-lg font-semibold text-ink">{t.goalTitle}</p>
              <p className="mt-1 leading-relaxed text-ink-2">{t.goal}</p>
            </div>
          </div>

          <Tabs
            label={t.sectionsLabel}
            stackOnMobile
            items={[
              {
                id: "external",
                label: t.external.tab,
                content: (
                  <Roadmap
                    id="external"
                    domains={externalDomains}
                    intro={t.external.intro}
                    pathNote={t.sourcesSoon}
                    locale={locale}
                    t={t}
                  />
                ),
              },
              {
                id: "platform",
                label: t.platform.tab,
                // Still being planned: the plan shows blurred and out of reach, under a card that says so.
                content: (
                  <div className="relative">
                    <div inert className="pointer-events-none blur-[3px] select-none opacity-70">
                      <Roadmap
                        id="platform"
                        domains={platformDomains}
                        intro={t.platform.intro}
                        pathBadge={t.underConstruction}
                        locale={locale}
                        t={t}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-start justify-center pt-8 sm:pt-14">
                      <div className="sticky top-28 max-w-md rounded-3xl border border-line bg-surface/95 p-6 text-center shadow-lift backdrop-blur sm:p-8">
                        <IconTile tone="gold" className="mx-auto">
                          <Construction />
                        </IconTile>
                        <h2 className="mt-4 font-display text-xl font-semibold text-ink">{t.platform.planningTitle}</h2>
                        <p className="mt-2 leading-relaxed text-muted">{t.platform.planningBody}</p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
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

/** The program plan: each domain with its paths in order. */
function Roadmap({
  id,
  domains,
  intro,
  pathBadge,
  pathNote,
  locale,
  t,
}: {
  /** Prefixes the headings' ids: both tabs are in the page, so ids must differ between them. */
  id: string;
  domains: RoadmapDomain[];
  intro: string;
  pathBadge?: string;
  pathNote?: string;
  locale: Locale;
  t: Learn;
}) {
  return (
    <>
      <p className="max-w-3xl leading-relaxed text-ink-2">{intro}</p>
      {/* The two domains side by side on wide screens, as they are studied together; stacked on phones. */}
      <div className="mt-10 grid items-start gap-14 lg:grid-cols-2 lg:gap-8">
        {domains.map((domain) => {
          const { icon: Icon, tone } = domainStyle[domain.id];
          return (
            <section key={domain.id} aria-labelledby={`${id}-${domain.id}`}>
              <div className="flex items-center gap-3">
                <IconTile tone={tone}>
                  <Icon />
                </IconTile>
                <h2 id={`${id}-${domain.id}`} className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {domain.title[locale]}
                </h2>
              </div>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{domain.description[locale]}</p>
              <ol className="relative mt-6 space-y-4">
                <span
                  aria-hidden="true"
                  className="absolute start-[2.625rem] top-8 bottom-8 w-px bg-line-strong sm:start-[3.125rem]"
                />
                {domain.paths.map((path, index) => (
                  <PathCard
                    key={path.id}
                    path={path}
                    index={index}
                    tone={tone}
                    badge={pathBadge}
                    note={pathNote}
                    locale={locale}
                    t={t}
                  />
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </>
  );
}

function PathCard({
  path,
  index,
  tone,
  badge,
  note,
  locale,
  t,
}: {
  path: RoadmapPath;
  index: number;
  tone: Tone;
  badge?: string;
  note?: string;
  locale: Locale;
  t: Learn;
}) {
  return (
    <li className="reveal relative flex gap-5 rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <IconTile tone={pathTones[index % pathTones.length]} className="relative z-10 size-11 ring-4 ring-surface">
        <span className="font-mono text-sm font-semibold">{String(index + 1).padStart(2, "0")}</span>
      </IconTile>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{path.title[locale]}</h3>
          {badge && (
            <Badge tone="muted">
              <Construction aria-hidden="true" className="size-3" />
              {badge}
            </Badge>
          )}
        </div>
        <p className="mt-2 leading-relaxed text-muted">{path.description[locale]}</p>
        {/* A path studied from a book series says how long the reading takes; the others, that sources are coming. */}
        {path.series ? (
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-ink-2">
            <Clock aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", toneText[tone])} />
            {path.series.reading[locale]}
          </p>
        ) : (
          note && <p className="mt-2 text-xs font-medium text-muted">{note}</p>
        )}

        {path.levels.length > 0 && (
          <ul className="mt-5 space-y-2">
            {path.levels.map((level) => (
              <LevelToggle key={level.id} level={level} tone={tone} locale={locale} t={t} />
            ))}
          </ul>
        )}
        {path.series && <SeriesLevels series={path.series} tone={tone} locale={locale} t={t} />}

        {path.graduation && (
          <div className="mt-4 flex gap-3 rounded-2xl border border-line bg-tone-gold-soft p-4">
            <GraduationCap aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", toneText.gold)} />
            <div>
              <p className="text-sm font-semibold text-ink">{t.graduation}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{path.graduation[locale]}</p>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

/** A level as a toggle: its topics (with what each covers, or as plain subjects) and its project. */
function LevelToggle({ level, tone, locale, t }: { level: RoadmapLevel; tone: Tone; locale: Locale; t: Learn }) {
  const plainSubjects = level.topics.length > 0 && level.topics.every((topic) => !topic.points);
  return (
    <li>
      <details className="group rounded-2xl border border-line bg-surface-2">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", toneDot[tone])} />
            {level.title[locale]}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="border-t border-line px-4 pt-3 pb-4">
          {plainSubjects ? (
            <ul className="flex flex-wrap gap-2">
              {level.topics.map((topic) => (
                <li
                  key={topic.id}
                  className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink"
                >
                  <BookOpen aria-hidden="true" className={cn("size-3.5 shrink-0", toneText[tone])} />
                  {topic.title[locale]}
                </li>
              ))}
            </ul>
          ) : (
            level.topics.length > 0 && (
              <ul className="space-y-3">
                {level.topics.map((topic) => (
                  <li key={topic.id} className="text-sm leading-relaxed">
                    <span className="font-semibold text-ink">{topic.title[locale]}</span>
                    {topic.points && (
                      <span className="text-muted">
                        {": "}
                        {topic.points[locale].join(locale === "ar" ? "، " : ", ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )
          )}
          {level.videos && level.videos.length > 0 && (
            <LevelVideos urls={level.videos} tone={tone} label={t.startHere} />
          )}
          {level.project && (
            <div className={cn("flex gap-2 text-sm leading-relaxed", (level.topics.length > 0 || level.videos?.length) && "mt-4")}>
              <Hammer aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", toneText[tone])} />
              <p>
                <span className="font-semibold text-ink">{t.project}: </span>
                <span className="text-ink-2">{level.project[locale]}</span>
              </p>
            </div>
          )}
        </div>
      </details>
    </li>
  );
}

/**
 * The videos a level starts with, as cards that play in place (title and thumbnail from YouTube, cached). A link
 * YouTube doesn't know is dropped.
 */
async function LevelVideos({ urls, tone, label }: { urls: string[]; tone: Tone; label: string }) {
  const [videos, dict] = await Promise.all([Promise.all(urls.map((url) => getYouTubeVideo(url))), getDictionary()]);
  // The same video listed twice (e.g. a youtu.be and a watch link) shows once.
  const found = videos
    .filter((video) => video !== null)
    .filter((video, index, list) => list.findIndex((other) => other.id === video.id) === index);
  if (found.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <PlayCircle aria-hidden="true" className={cn("size-4 shrink-0", toneText[tone])} />
        {label}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {found.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title ?? dict.entertainment.untitled}
            thumbnail={video.thumbnail}
            playLabel={dict.entertainment.play}
            meta={video.channel ?? undefined}
            sizes="(min-width: 640px) 360px, 100vw"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * A book series studied level by level: each level a toggle with its books in the order they are read and what each
 * covers, then how to study it with its publisher. Books by name only (see BookSeries).
 */
function SeriesLevels({ series, tone, locale, t }: { series: BookSeries; tone: Tone; locale: Locale; t: Learn }) {
  return (
    <>
      {series.permission && (
        <p className="mt-3 flex gap-2 text-sm leading-relaxed text-ink-2">
          <ShieldCheck aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", toneText[tone])} />
          {series.permission[locale]}
        </p>
      )}
      <ul className="mt-5 space-y-2">
        {series.levels.map((level) => (
          <li key={level.id}>
            <details className="group rounded-2xl border border-line bg-surface-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", toneDot[tone])} />
                  {level.title[locale]}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                />
              </summary>
              <ol className="space-y-2 border-t border-line px-4 pt-3 pb-4">
                {level.books.map((book) => (
                  <li key={book.id} className="rounded-xl border border-line bg-surface px-3 py-2.5 text-sm">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <BookOpen aria-hidden="true" className={cn("size-3.5 shrink-0", toneText[tone])} />
                      {book.title[locale]}
                    </p>
                    <p className="mt-1 leading-relaxed text-muted">{book.contents[locale]}</p>
                    {book.file?.[locale] && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a
                          href={book.file[locale].read}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.read}: ${book.title[locale]} — ${level.title[locale]}`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 text-sm font-semibold text-ink transition-colors hover:border-line-strong"
                        >
                          <Eye aria-hidden="true" className={cn("size-4", toneText[tone])} />
                          {t.read}
                        </a>
                        <a
                          href={book.file[locale].download}
                          download
                          aria-label={`${t.download}: ${book.title[locale]} — ${level.title[locale]}`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 text-sm font-semibold text-ink transition-colors hover:border-line-strong"
                        >
                          <Download aria-hidden="true" className={cn("size-4", toneText[tone])} />
                          {t.download}
                        </a>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </details>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-3 rounded-2xl border border-line bg-tone-gold-soft p-4">
        <GraduationCap aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", toneText.gold)} />
        <div>
          <p className="text-sm leading-relaxed text-ink-2">{series.study.body[locale]}</p>
          <a
            href={series.study.url[locale]}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {series.study.label[locale]}
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </>
  );
}
