import type { Metadata } from "next";
import { Bug, HandHeart, Lightbulb, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { mailtoDar } from "@/lib/mailto";
import { pageMetadata } from "@/lib/seo";
import { CopyButton } from "@/components/copy-button";
import { socialIcons } from "@/components/icons";
import { PageHero } from "@/components/page-blocks";
import { Container, ForwardArrow, IconTile, type Tone } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/contact", title: dict.nav.contact, description: dict.contact.description });
}

const reasonIcons = [MessageCircle, Lightbulb, HandHeart, Bug];
const reasonTones: Tone[] = ["blue", "gold", "mint", "rose"];

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.contact;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        eyebrowTone="blue"
        title={t.title}
        description={t.description}
        crumbsLabel={dict.nav.breadcrumb}
        crumbs={[
          { href: localePath(locale), label: dict.nav.home },
          { href: localePath(locale, "/contact"), label: dict.nav.contact },
        ]}
      />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <h2 className="font-display text-2xl font-semibold text-ink">{t.reasonsTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <li key={reason.title}>
                  <a
                    href={mailtoDar(reason.subject)}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7"
                  >
                    <IconTile tone={reasonTones[index]}>
                      <Icon />
                    </IconTile>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{reason.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{reason.body}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                      {t.send}
                      <ForwardArrow />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="space-y-4 lg:col-span-4 lg:pt-16">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <IconTile tone="gold">
              <Mail />
            </IconTile>
            <p className="mt-5 text-sm font-semibold text-muted">{t.emailLabel}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              dir="ltr"
              className="mt-1 block font-mono text-[0.95rem] break-all text-ink transition-colors hover:text-primary rtl:text-end"
            >
              {siteConfig.email}
            </a>
            <div className="mt-5">
              <CopyButton value={siteConfig.email} label={t.copy} copiedLabel={t.copied} />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <p className="font-display text-lg font-semibold text-ink">{t.followTitle}</p>
            <p className="mt-1 text-sm text-muted">{t.followBody}</p>
            <ul className="mt-5 space-y-2">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-line bg-surface-2 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-primary-tint"
                    >
                      <Icon className="size-5 text-ink-2" />
                      <span className="font-medium text-ink">{social.name}</span>
                      <ForwardArrow className="ms-auto text-muted" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}
