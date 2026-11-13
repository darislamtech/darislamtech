import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-blocks";
import { Container } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/privacy", title: dict.privacy.title, description: dict.privacy.description });
}

/**
 * What the site keeps and what it doesn't, in plain words. Update it (and its date) whenever a service that stores
 * data is added: a form, accounts, analytics, a new host for files.
 */
export default async function PrivacyPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.privacy;

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
          { href: localePath(locale, "/privacy"), label: t.title },
        ]}
      />

      <Container className="max-w-3xl py-16 sm:py-20">
        <p className="text-sm text-muted">{t.updated}</p>
        <div className="mt-8 space-y-10">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{section.title}</h2>
              <ul className="mt-4 list-disc space-y-2 ps-5 leading-relaxed text-ink-2 marker:text-muted">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-12 border-t border-line pt-6 leading-relaxed text-ink-2">
          {t.questions}{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary hover:underline" dir="ltr">
            {siteConfig.email}
          </a>
        </p>
      </Container>
    </>
  );
}
