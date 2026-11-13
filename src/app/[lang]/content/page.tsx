import type { Metadata } from "next";
import { Hash, Newspaper } from "lucide-react";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { posts } from "@/content/posts";
import { videos } from "@/content/videos";
import { YouTubeIcon } from "@/components/icons";
import { EmptyState, PageHero } from "@/components/page-blocks";
import { PostCard } from "@/components/content/post-card";
import { Tabs } from "@/components/tabs";
import { ButtonLink, Container, toneText, type Tone } from "@/components/ui";
import { YouTubeEmbed } from "@/components/video/youtube-embed";
import { cn } from "@/lib/cn";

const topicTones: Tone[] = ["blue", "gold", "mint", "rose"];

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, dict, path: "/content", title: dict.nav.content, description: dict.content.description });
}

export default async function ContentPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.content;

  const articles = posts.filter((post) => post.kind === "article");
  const news = posts.filter((post) => post.kind === "news");
  const hasContent = posts.length + videos.length > 0;

  const postGrid = (items: typeof posts) =>
    items.length > 0 ? (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} dict={dict} />
        ))}
      </div>
    ) : (
      <p className="rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center text-muted">
        {t.emptyTab}
      </p>
    );

  const videoGrid =
    videos.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <figure key={video.youtubeId}>
            <YouTubeEmbed id={video.youtubeId} title={video.title[locale]} />
            <figcaption className="mt-3 font-medium text-ink">{video.title[locale]}</figcaption>
          </figure>
        ))}
      </div>
    ) : (
      <p className="rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center text-muted">
        {t.emptyTab}
      </p>
    );

  // "All" holds the posts and then the videos, so a page with only videos still opens on them.
  const allGrid =
    posts.length === 0 ? (
      videoGrid
    ) : videos.length === 0 ? (
      postGrid(posts)
    ) : (
      <div className="space-y-10">
        {postGrid(posts)}
        {videoGrid}
      </div>
    );

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
          { href: localePath(locale, "/content"), label: dict.nav.content },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          {dict.topics.map((topic, index) => (
            <li
              key={topic}
              className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-2"
            >
              <Hash aria-hidden="true" className={cn("size-3.5", toneText[topicTones[index % topicTones.length]])} />
              {topic}
            </li>
          ))}
        </ul>
      </PageHero>

      <Container className="py-16 sm:py-20">
        {hasContent ? (
          <Tabs
            label={t.tabs.label}
            items={[
              { id: "all", label: t.tabs.all, count: posts.length + videos.length, content: allGrid },
              { id: "articles", label: t.tabs.articles, count: articles.length, content: postGrid(articles) },
              { id: "news", label: t.tabs.news, count: news.length, content: postGrid(news) },
              { id: "videos", label: t.tabs.videos, count: videos.length, content: videoGrid },
            ]}
          />
        ) : (
          <EmptyState
            icon={<Newspaper />}
            title={t.emptyTitle}
            body={t.emptyBody}
            actions={
              <ButtonLink href={siteConfig.youtubeChannel} external>
                <YouTubeIcon className="size-[1.1rem]" />
                {t.youtubeCta}
              </ButtonLink>
            }
          />
        )}
      </Container>
    </>
  );
}
