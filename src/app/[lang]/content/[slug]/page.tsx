import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getPost, posts } from "@/content/posts";
import { formatDate } from "@/components/post-card";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Badge, Container, ForwardArrow, Paragraphs } from "@/components/ui";

export function generateStaticParams() {
  // Cache Components needs at least one param; the placeholder renders a 404 until real posts exist.
  if (posts.length === 0) return [{ slug: "_" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/content/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const locale = await getLocale();
  return { title: post.title[locale], description: post.summary[locale] };
}

export default async function PostPage({ params }: PageProps<"/[lang]/content/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <article>
      <header className="border-b border-line">
        <Container className="max-w-3xl pt-10 pb-14">
          <Link
            href={localePath(locale, "/content")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
          >
            <ForwardArrow className="rotate-180 rtl:rotate-0" />
            {dict.content.back}
          </Link>
          <div className="mt-10 flex items-center gap-3 text-sm text-muted">
            <Badge tone={post.kind === "news" ? "gold" : "blue"}>{dict.content.kind[post.kind]}</Badge>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.25] font-bold text-ink sm:text-5xl ltr:tracking-tight">
            {post.title[locale]}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{post.summary[locale]}</p>
        </Container>
      </header>
      <Container className="max-w-3xl py-14">
        <Paragraphs text={post.body[locale]} />
        {post.youtubeId && (
          <section className="mt-14">
            <h2 className="mb-5 font-display text-xl font-semibold text-ink">{dict.content.relatedVideo}</h2>
            <YouTubeEmbed id={post.youtubeId} title={post.title[locale]} />
          </section>
        )}
      </Container>
    </article>
  );
}
