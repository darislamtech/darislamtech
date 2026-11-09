import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { posts } from "@/content/posts";
import { PostCard } from "../content/post-card";
import { ButtonLink, Container, SectionHeading } from "../ui";

/** Home: the three latest posts. Renders nothing until something is published. */
export function LatestPosts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="reveal pb-20 sm:pb-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title={dict.home.cards.content.title} />
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
  );
}
