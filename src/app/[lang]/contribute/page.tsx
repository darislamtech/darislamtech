import type { Metadata } from "next";
import {
  BookOpenCheck,
  Code,
  Eye,
  Handshake,
  Languages,
  Lightbulb,
  Mail,
  Palette,
  Plus,
  ScrollText,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { GitHubIcon } from "@/components/icons";
import { CtaPanel, PageHero } from "@/components/page-blocks";
import { ButtonLink, Container, ForwardArrow, IconTile, SectionHeading, toneText, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/contribute", title: dict.nav.contribute, description: dict.contribute.description });
}

// Suggestions and the da'wah projects first, then Islamic review, development, design and translation.
const wayIcons = [Lightbulb, BookOpenCheck, ScrollText, Code, Palette, Languages];
const principleIcons = [Eye, Handshake, UserCheck, ShieldCheck];
const wayTones: Tone[] = ["gold", "mint", "rose", "blue", "rose", "gold"];

// An email to the project with the subject filled in, as on the Contact page.
const mailto = (subject: string) => `mailto:${siteConfig.email}?subject=${encodeURIComponent(`[Dar] ${subject}`)}`;
const principleTones: Tone[] = ["blue", "mint", "gold", "rose"];

export default async function ContributePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.contribute;

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
          { href: localePath(locale, "/contribute"), label: dict.nav.contribute },
        ]}
      >
        <div className="flex max-w-2xl gap-4 rounded-2xl border border-line bg-surface/90 p-5 shadow-soft backdrop-blur">
          <IconTile tone="gold" className="size-11 shrink-0">
            <Lightbulb />
          </IconTile>
          <div>
            <p className="font-semibold text-ink">{t.suggestTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t.suggestBody}</p>
            <ButtonLink href={mailto(t.suggestSubject)} variant="secondary" size="sm" arrow className="mt-4">
              {t.suggestButton}
            </ButtonLink>
          </div>
        </div>
      </PageHero>

      {/* Ways to contribute */}
      <section className="reveal py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.waysEyebrow} eyebrowTone="blue" title={t.waysTitle} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.ways.map((way, index) => {
              const Icon = wayIcons[index];
              return (
                <li key={way.title}>
                  <a
                    href={mailto(way.subject)}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7"
                  >
                    <IconTile tone={wayTones[index]}>
                      <Icon />
                    </IconTile>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{way.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{way.body}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                      <Mail aria-hidden="true" className="size-4" />
                      {t.waysSend}
                      <ForwardArrow />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <ScrollText aria-hidden="true" className="size-4 text-tone-gold" />
            {t.shariaNote}
          </p>
        </Container>
      </section>

      {/* Contributing to development, for developers */}
      <section className="reveal border-y border-line bg-band py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow={t.stepsEyebrow} eyebrowTone="mint" title={t.stepsTitle} description={t.stepsBody} />
              <ButtonLink href={siteConfig.repository} external variant="secondary" size="sm" arrow className="mt-6">
                <GitHubIcon className="me-2 size-4" />
                {t.repoButton}
              </ButtonLink>
            </div>
          </div>
          <ol className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute start-5 top-5 bottom-5 w-px bg-line-strong" />
            {t.steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-surface font-mono text-sm font-medium text-primary-ink">
                  {index + 1}
                </span>
                <div className="flex-1 rounded-2xl border border-line bg-surface p-5">
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Governance */}
      <section className="reveal py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.principlesEyebrow} eyebrowTone="gold" title={t.principlesTitle} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.map((principle, index) => {
              const Icon = principleIcons[index];
              return (
                <li key={principle.title} className="bg-surface p-7">
                  <Icon aria-hidden="true" className={cn("size-6", toneText[principleTones[index]])} strokeWidth={1.6} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{principle.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="reveal pb-4">
        <Container className="grid gap-10 lg:grid-cols-12">
          <SectionHeading title={t.faqTitle} className="lg:col-span-4" />
          <div className="divide-y divide-line rounded-3xl border border-line bg-surface lg:col-span-8">
            {t.faq.map((item) => (
              <details key={item.q} className="group px-6 sm:px-7 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-primary/30 group-open:text-primary">
                    <Plus aria-hidden="true" className="size-4" />
                  </span>
                </summary>
                <p className="pb-6 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaPanel
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ href: localePath(locale, "/contact"), label: t.ctaButton }}
      />
    </>
  );
}
