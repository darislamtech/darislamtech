import type { Metadata } from "next";
import { Clapperboard, Code, Coffee, HandCoins, HandHeart, Heart, Mail, Megaphone, Server, Share2, UserRound, Users, Wallet } from "lucide-react";
import { siteConfig, type SupportLink } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { CopyButton } from "@/components/copy-button";
import { socialIcons } from "@/components/icons";
import { PageHero } from "@/components/page-blocks";
import { ButtonLink, Container, IconTile, toneText, type Tone } from "@/components/ui";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/support", title: dict.nav.support, description: dict.support.description });
}

const linkIcons: Record<SupportLink["name"], typeof Coffee> = {
  "Ko-fi": Coffee,
  PayPal: Wallet,
  "Buy Me a Coffee": Coffee,
  Patreon: HandCoins,
};
// Developing the platform, hosting, promotion, content, the founder's margin.
const useIcons = [Code, Server, Megaphone, Clapperboard, UserRound];
const useTones: Tone[] = ["blue", "mint", "rose", "gold", "blue"];
// Du'a, moral support, taking part.
const otherIcons = [HandHeart, Share2, Users];
const otherTones: Tone[] = ["mint", "blue", "rose"];

export default async function SupportPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.support;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        eyebrowTone="gold"
        title={t.title}
        description={t.description}
        crumbsLabel={dict.nav.breadcrumb}
        crumbs={[
          { href: localePath(locale), label: dict.nav.home },
          { href: localePath(locale, "/support"), label: dict.nav.support },
        ]}
      />

      <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-12">
        <section className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
          <IconTile tone="gold">
            <HandHeart />
          </IconTile>
          <h2 className="mt-5 font-display text-2xl font-semibold text-ink">{t.moneyTitle}</h2>
          <p className="mt-2 leading-relaxed text-muted">{t.moneyBody}</p>

          {siteConfig.supportLinks.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-3">
              {siteConfig.supportLinks.map((link) => {
                const Icon = linkIcons[link.name];
                return (
                  <li key={link.name}>
                    <ButtonLink href={link.href} external>
                      <Icon aria-hidden="true" className="size-[1.1rem]" />
                      {link.name}
                    </ButtonLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-line-strong px-5 py-6 text-center text-muted">
              {t.moneyPending}
            </p>
          )}

          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-ink-2">
            <Heart aria-hidden="true" className="size-4 shrink-0 text-tone-rose" />
            {t.moneyThanks}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.moneyNote}</p>
        </section>

        <section className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
          <h2 className="font-display text-2xl font-semibold text-ink">{t.usesTitle}</h2>
          <ul className="mt-6 space-y-3">
            {t.uses.map((use, index) => {
              const Icon = useIcons[index] ?? Heart;
              return (
                <li key={use} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 px-4 py-3">
                  <Icon aria-hidden="true" className={cn("size-5 shrink-0", toneText[useTones[index % useTones.length]])} />
                  <span className="font-medium text-ink">{use}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      <section className="reveal border-y border-line bg-band py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{t.otherTitle}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {t.other.map((item, index) => {
              const Icon = otherIcons[index];
              return (
                <li key={item.title} className="flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-7">
                  <IconTile tone={otherTones[index]}>
                    <Icon />
                  </IconTile>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                  {index === t.other.length - 1 && (
                    <div className="mt-auto pt-6">
                      <ButtonLink href={localePath(locale, "/contribute")} variant="secondary" size="sm" arrow>
                        {t.contributeButton}
                      </ButtonLink>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <section className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold text-ink">{t.contactTitle}</h2>
            <p className="mt-2 leading-relaxed text-muted">{t.contactBody}</p>
            {/* Separate flex items: inline siblings with no space would join the name's last Arabic letter to the role. */}
            <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold text-ink">{t.founderName}</span>
              <span className="text-sm text-muted">{t.founderRole}</span>
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              dir="ltr"
              className="mt-2 inline-flex items-center gap-2 font-mono text-[0.95rem] break-all text-ink transition-colors hover:text-primary"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0 text-muted" />
              {siteConfig.email}
            </a>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.founderSocials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.founderName} – ${social.name}`}
                      className="grid size-11 place-items-center rounded-full border border-line bg-surface-2 text-ink-2 transition-colors hover:border-primary/30 hover:bg-primary-soft hover:text-primary-ink"
                    >
                      <Icon className="size-[1.1rem]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <CopyButton value={siteConfig.email} label={dict.contact.copy} copiedLabel={dict.contact.copied} />
            <ButtonLink href={localePath(locale, "/contact")} variant="secondary" size="sm" arrow>
              {t.contactButton}
            </ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
