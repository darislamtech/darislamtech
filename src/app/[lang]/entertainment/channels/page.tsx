import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { entertainmentGroups } from "@/content/entertainment";
import { ChannelCard } from "@/components/entertainment/channel-card";
import { EntertainmentShell } from "@/components/entertainment/entertainment-shell";
import { getYouTubeChannel } from "@/lib/youtube";

const PATH = "/entertainment/channels";
const allChannels = entertainmentGroups.flatMap((group) => group.channels.flatMap((category) => category.items));

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.entertainment;
  // Search results show the names of the first channels, since people search for them by name.
  const names = allChannels.slice(0, 6).map((channel) => channel.name);
  const separator = locale === "ar" ? "، " : ", ";
  return pageMetadata({
    locale,
    dict,
    path: PATH,
    title: `${t.sections.channels} – ${dict.nav.entertainment}`,
    description:
      names.length > 0 ? `${t.channels.description} ${t.channels.featured} ${names.join(separator)}…` : t.channels.description,
  });
}

export default async function EntertainmentChannelsPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.entertainment;

  // Resolve every channel (name + picture from YouTube) up front; links YouTube reports as missing are dropped.
  const groups = await Promise.all(
    entertainmentGroups.map(async (group) => ({
      id: group.id,
      label: group.title[locale],
      categories: await Promise.all(
        group.channels.map(async (category) => {
          const channels = await Promise.all(
            category.items.map(async (channel) => ({ channel, youtube: await getYouTubeChannel(channel.url) })),
          );
          return {
            id: category.id,
            title: category.title[locale],
            channels: channels.flatMap(({ channel, youtube }) =>
              youtube ? [{ url: youtube.url, name: youtube.name ?? channel.name, avatar: youtube.avatar }] : [],
            ),
          };
        }),
      ),
    })),
  );

  // Structured data for search engines: this page is a list of these channels, each linked to YouTube.
  const listed = groups.flatMap((group) => group.categories.flatMap((category) => category.channels));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${t.sections.channels} – ${dict.nav.entertainment}`,
    url: `${siteConfig.url}${localePath(locale, PATH)}`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listed.map((channel, index) => ({ "@type": "ListItem", position: index + 1, name: channel.name, url: channel.url })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <EntertainmentShell
        locale={locale}
        dict={dict}
        current="channels"
        description={t.channels.description}
        groups={groups.map((group) => ({
          ...group,
          categories: group.categories.map(({ id, title, channels }) => ({
            id,
            title,
            items: channels.map((channel) => ({ key: channel.url, node: <ChannelCard {...channel} /> })),
          })),
        }))}
        empty={t.channels.empty}
        gridClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      />
    </>
  );
}
