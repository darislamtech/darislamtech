import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { ChannelSection } from "@/components/home/channel-section";
import { HomeHero } from "@/components/home/home-hero";
import { LatestPosts } from "@/components/home/latest-posts";
import { MissionSection } from "@/components/home/mission-section";
import { OfferSection } from "@/components/home/offer-section";
import { CtaPanel } from "@/components/page-blocks";
import { pageMetadata } from "@/lib/seo";
import ar from "@/i18n/dictionaries/ar.json";
import en from "@/i18n/dictionaries/en.json";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "", description: dict.meta.description });
}

/** The home page: its sections (in `components/home/`) in order, and the site's structured data. */
export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const home = dict.home;

  // Structured data for search engines: who publishes the site, its logo, email and accounts.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // One organization, described the same on both language pages: Arabic name and description, the same alternates as the WebSite.
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: ar.brand.name,
        alternateName: [en.brand.name, "darislamtech"],
        url: siteConfig.url,
        logo: `${siteConfig.url}/icons/icon-512.png`,
        email: siteConfig.email,
        description: ar.meta.description,
        sameAs: siteConfig.socials.map((social) => social.href),
      },
      {
        // The site name Google shows above results: Google reads it from one WebSite node whose url is the domain
        // root, so it is the same on both language pages. Arabic is the main name; the English one is an alternate.
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: ar.brand.name,
        alternateName: [en.brand.name, "darislamtech"],
        url: `${siteConfig.url}/`,
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
      <HomeHero locale={locale} dict={dict} />
      <OfferSection locale={locale} dict={dict} />
      <LatestPosts locale={locale} dict={dict} />
      <MissionSection locale={locale} dict={dict} />
      <ChannelSection dict={dict} />
      <CtaPanel
        title={home.ctaTitle}
        body={home.ctaBody}
        primary={{ href: localePath(locale, "/contribute"), label: home.ctaPrimary }}
        secondary={{ href: localePath(locale, "/contact"), label: home.ctaSecondary }}
      />
    </>
  );
}
