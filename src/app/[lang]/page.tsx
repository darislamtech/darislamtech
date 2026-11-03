import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Code,
  Construction,
  Gift,
  GitPullRequest,
  GraduationCap,
  Languages,
  Newspaper,
  Quote,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { learningYears } from "@/content/learn";
import { posts } from "@/content/posts";
import { LogoMark } from "@/components/brand";
import { HeroVisual } from "@/components/home/hero-visual";
import { socialIcons, YouTubeIcon } from "@/components/icons";
import { CtaPanel } from "@/components/page-blocks";
import { GeometricPattern } from "@/components/pattern";
import { PostCard } from "@/components/post-card";
import { productStatusOrder, productStatusStyles } from "@/components/product-status";
import { Badge, ButtonLink, Container, ForwardArrow, IconTile, SectionHeading, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

const pillarIcons = [BookOpen, Gift, Code, Languages];
// Every element on the page takes one of the four tones, so the page uses all of them.
const pillarTones: Tone[] = ["mint", "gold", "blue", "rose"];

// YouTube channel tracks: Islamic knowledge and da'wah first, then technology.
const channelTrackIcons = [BookOpen, Code];
const channelTrackTones: Tone[] = ["mint", "blue"];

// The project is currently in its first phase ("Foundation"), per the launch plan.
const CURRENT_PHASE = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "", description: dict.meta.description });
}

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const home = dict.home;
  const latest = posts.slice(0, 3);

  // Structured data for search engines: who publishes the site, its logo, email and accounts.
  const homeUrl = `${siteConfig.url}${localePath(locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: dict.brand.name,
        alternateName: locale === "ar" ? "Dar Islam & Technology" : "دار الإسلام والتقنية",
        url: homeUrl,
        logo: `${siteConfig.url}/icons/icon-512.png`,
        email: siteConfig.email,
        description: dict.meta.description,
        sameAs: siteConfig.socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website-${locale}`,
        name: dict.brand.name,
        url: homeUrl,
        inLanguage: locale,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_20%,var(--primary-tint),transparent_70%)] rtl:bg-[radial-gradient(50%_60%_at_20%_20%,var(--primary-tint),transparent_70%)]" />
        <GeometricPattern className="text-primary/5 mask-[radial-gradient(60%_50%_at_50%_0%,black,transparent)]" />
        <Container className="relative grid items-center gap-14 pt-28 pb-16 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pt-38 lg:pb-24">
          <div className="lg:col-span-7">
            <div className="animate-fade-up">
              <Badge tone="rose" dot className="px-3 py-1.5 text-[0.8rem]">
                {home.badge}
              </Badge>
            </div>
            <h1 className="mt-7 animate-fade-up font-display text-[2.6rem] leading-[1.2] font-bold text-ink [animation-delay:80ms] sm:text-6xl lg:text-[4.25rem] ltr:tracking-tight ltr:lg:text-[3.6rem]">
              <span className="block">{home.titleLead}</span>
              <span className="relative inline-block text-tone-mint">
                {home.titleAccent}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-3 h-3 w-full text-gold-bright/80 ltr:-bottom-2"
                >
                  <path d="M2 9C60 3 140 2 298 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-8 max-w-xl animate-fade-up text-lg leading-[1.9] text-ink-2 [animation-delay:160ms] sm:text-xl sm:leading-[1.9]">
              {home.intro}
            </p>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
              <ButtonLink href={localePath(locale, "/content")} size="lg" arrow>
                {home.primaryCta}
              </ButtonLink>
              <ButtonLink href={localePath(locale, "/contribute")} size="lg" variant="secondary">
                {home.secondaryCta}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroVisual dict={dict} />
          </div>
        </Container>

        {/* Pillars */}
        <Container className="relative pb-16 lg:pb-20">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {dict.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <li key={pillar.title} className="flex items-start gap-3.5 bg-surface p-5 sm:p-6">
                  <IconTile tone={pillarTones[index]} className="size-10 [&>svg]:size-[1.15rem]">
                    <Icon />
                  </IconTile>
                  <div>
                    <p className="font-semibold text-ink">{pillar.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* What we offer */}
      <section className="reveal py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={home.offerEyebrow}
            eyebrowTone="blue"
            title={home.offerTitle}
            description={home.offerBody}
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-6">
            <BentoCard
              href={localePath(locale, "/content")}
              tone="blue"
              icon={<Newspaper />}
              title={home.cards.content.title}
              body={home.cards.content.body}
              className="lg:col-span-4"
            >
              <ul className="mt-8 flex flex-wrap gap-2">
                {/* The first topics of each group, religious and da'wah topics first. */}
                {dict.topics.flatMap((group) => group.items.slice(0, 4)).map((topic) => (
                  <li key={topic} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink-2">
                    {topic}
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              href={localePath(locale, "/products")}
              tone="gold"
              icon={<Boxes />}
              title={home.cards.products.title}
              body={home.cards.products.body}
              className="lg:col-span-2"
            >
              <ul className="mt-8 grid grid-cols-2 gap-2">
                {productStatusOrder.map((status) => (
                  <li
                    key={status}
                    className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-sm text-ink-2"
                  >
                    <span className={cn("size-2 rounded-full", productStatusStyles[status].dot)} />
                    {dict.products.status[status]}
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              href={localePath(locale, "/learn")}
              tone="mint"
              icon={<GraduationCap />}
              title={home.cards.learn.title}
              body={home.cards.learn.body}
              className="lg:col-span-2"
            >
              <ul className="mt-8 space-y-2">
                {learningYears.map((year) => (
                  <li
                    key={year.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3 py-2.5 text-sm"
                  >
                    <span className="flex items-center gap-2 text-ink-2">
                      <Construction aria-hidden="true" className="size-3.5 shrink-0 text-muted" />
                      {year.title[locale]}
                    </span>
                    <span className="shrink-0 text-xs text-muted">{dict.learn.underConstruction}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              href={localePath(locale, "/contribute")}
              tone="rose"
              icon={<GitPullRequest />}
              title={home.cards.contribute.title}
              body={home.cards.contribute.body}
              className="lg:col-span-4"
            >
              <ul className="mt-8 flex flex-wrap gap-2">
                {dict.contribute.ways.map((way) => (
                  <li key={way.title} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink-2">
                    {way.title}
                  </li>
                ))}
              </ul>
              <ol className="mt-6 flex flex-wrap items-center gap-2 border-t border-dashed border-line pt-6">
                {home.cards.contribute.flow.map((step, index) => (
                  <li key={step} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-[0.8rem] font-medium",
                        index === home.cards.contribute.flow.length - 1
                          ? "border-tone-mint/25 bg-tone-mint-soft text-tone-mint"
                          : "border-line bg-surface-2 text-ink-2",
                      )}
                    >
                      {step}
                    </span>
                    {index < home.cards.contribute.flow.length - 1 && (
                      <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
                    )}
                  </li>
                ))}
              </ol>
            </BentoCard>
          </div>
        </Container>
      </section>

      {/* Latest content (only once something is published) */}
      {latest.length > 0 && (
        <section className="reveal pb-20 sm:pb-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading title={home.cards.content.title} />
              <ButtonLink href={localePath(locale, "/content")} variant="secondary" arrow>
                {dict.common.readMore}
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} dict={dict} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Mission */}
      <section className="relative overflow-hidden border-y border-line bg-band">
        <GeometricPattern size={80} className="text-primary/5 mask-[radial-gradient(60%_70%_at_50%_50%,transparent_30%,black)]" />
        <Container className="reveal relative py-24 text-center sm:py-32">
          <Quote aria-hidden="true" className="mx-auto size-10 text-tone-rose rtl:-scale-x-100" strokeWidth={1.5} />
          <p className="mt-4 text-sm font-semibold text-tone-gold">{home.missionEyebrow}</p>
          <blockquote className="mx-auto mt-6 max-w-4xl font-display text-2xl leading-[1.7] font-medium text-ink sm:text-[2.1rem] sm:leading-[1.65]">
            {dict.about.mission}
          </blockquote>
          <Link
            href={localePath(locale, "/about")}
            className="group mt-10 inline-flex items-center gap-2 font-semibold text-tone-blue transition-opacity hover:opacity-80"
          >
            {home.missionLink}
            <ForwardArrow />
          </Link>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="reveal py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={home.roadmapEyebrow}
            eyebrowTone="mint"
            title={home.roadmapTitle}
            description={home.roadmapBody}
          />
          <ol className="relative mt-14 grid gap-4 md:grid-cols-5 md:gap-0">
            <span aria-hidden="true" className="absolute inset-x-[10%] top-5 hidden h-px bg-line-strong md:block" />
            {dict.phases.map((phase, index) => {
              const current = index === CURRENT_PHASE;
              return (
                <li
                  key={phase.title}
                  aria-current={current ? "step" : undefined}
                  className="relative flex gap-4 md:flex-col md:items-center md:px-3 md:text-center"
                >
                  <span
                    className={cn(
                      "relative grid size-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-medium",
                      current
                        ? "border-primary-fill bg-primary-fill text-on-primary shadow-[0_0_0_6px_var(--tone-gold-soft)]"
                        : "border-line-strong bg-paper text-muted",
                    )}
                  >
                    {current && (
                      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-primary-fill/30" />
                    )}
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pb-2 md:mt-5">
                    <p className="flex items-center gap-2 font-display text-lg font-semibold text-ink md:justify-center">
                      {phase.title}
                      {current && <Badge tone="mint">{dict.common.now}</Badge>}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{phase.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* YouTube channel */}
      <section className="reveal pb-4">
        <Container>
          <div className="grid items-center gap-12 rounded-4xl border border-line bg-surface p-6 shadow-panel sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <SectionHeading
                eyebrow={home.channelEyebrow}
                eyebrowTone="rose"
                title={home.channelTitle}
                description={home.channelBody}
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {home.channelTracks.map((track, index) => {
                  const Icon = channelTrackIcons[index];
                  return (
                    <li key={track.title} className="flex gap-3 rounded-2xl border border-line bg-surface-2 p-4">
                      <IconTile tone={channelTrackTones[index]}>
                        <Icon aria-hidden="true" />
                      </IconTile>
                      <div>
                        <h3 className="font-semibold text-ink">{track.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{track.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={siteConfig.youtubeChannel} external size="lg">
                  <YouTubeIcon className="size-5" />
                  {home.channelCta}
                </ButtonLink>
                {siteConfig.socials
                  .filter((social) => social.name !== "YouTube")
                  .map((social) => {
                    const Icon = socialIcons[social.name];
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="grid size-12 place-items-center rounded-full border border-line-strong text-ink-2 transition-colors hover:border-primary/30 hover:bg-primary-soft hover:text-primary-ink"
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
              </div>
            </div>

            <a
              href={siteConfig.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-3xl border border-line bg-surface-2 transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="relative h-36 overflow-hidden bg-primary-tint">
                <GeometricPattern className="text-primary/15" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--primary-tint),transparent)]" />
              </div>
              <div className="relative px-6 pb-6">
                <div className="-mt-10 grid size-20 place-items-center rounded-2xl border-4 border-surface-2 bg-surface shadow-soft">
                  <LogoMark className="size-11" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-semibold text-ink">{dict.brand.name}</p>
                    <p dir="ltr" className="mt-1 font-mono text-sm text-muted rtl:text-end">
                      {siteConfig.youtubeHandle}
                    </p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110">
                    <YouTubeIcon className="size-5" />
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {home.channelTracks.map((track) => (
                    <li key={track.title} className="rounded-full bg-surface px-3 py-1 text-xs text-ink-2 ring-1 ring-line">
                      {track.title}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </div>
        </Container>
      </section>

      <CtaPanel
        title={home.ctaTitle}
        body={home.ctaBody}
        primary={{ href: localePath(locale, "/contribute"), label: home.ctaPrimary }}
        secondary={{ href: localePath(locale, "/contact"), label: home.ctaSecondary }}
      />
    </>
  );
}

function BentoCard({
  href,
  tone,
  icon,
  title,
  body,
  className,
  children,
}: {
  href: string;
  tone: Tone;
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <IconTile tone={tone}>{icon}</IconTile>
        <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-primary-fill group-hover:bg-primary-fill group-hover:text-on-primary">
          <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md leading-relaxed text-muted">{body}</p>
      <div className="mt-auto">{children}</div>
    </Link>
  );
}
