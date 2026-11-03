import type { Metadata } from "next";
import {
  Code,
  Eye,
  FlaskConical,
  Handshake,
  Languages,
  Lightbulb,
  Palette,
  Plus,
  ScrollText,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { GitHubIcon } from "@/components/icons";
import { CtaPanel, PageHero } from "@/components/page-blocks";
import { ButtonLink, Container, IconTile, SectionHeading, toneText, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.contribute, description: dict.contribute.description };
}

// Islamic review first, then the technical and creative ways to help.
const wayIcons = [ScrollText, Code, Palette, Languages, FlaskConical, Lightbulb];
const principleIcons = [Eye, Handshake, UserCheck, ShieldCheck];
const wayTones: Tone[] = ["mint", "blue", "rose", "gold", "blue", "rose"];
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
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-paper">
            <GitHubIcon className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-ink">{t.statusTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t.status}</p>
            <ButtonLink href={siteConfig.repository} external variant="secondary" size="sm" arrow className="mt-4">
              {t.repoButton}
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
                <li
                  key={way.title}
                  className="group rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7"
                >
                  <IconTile tone={wayTones[index]}>
                    <Icon />
                  </IconTile>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{way.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{way.body}</p>
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

      {/* Code contribution flow */}
      <section className="reveal border-y border-line bg-band py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow={t.stepsEyebrow} eyebrowTone="mint" title={t.stepsTitle} description={t.stepsBody} />
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
