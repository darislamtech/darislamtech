import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Post } from "@/content/types";
import { Badge, Card, ForwardArrow } from "./ui";

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(date));
}

export function PostCard({ post, locale, dict }: { post: Post; locale: Locale; dict: Dictionary }) {
  return (
    <Card href={localePath(locale, `/content/${post.slug}`)} className="h-full">
      <div className="flex items-center gap-3 text-sm text-muted">
        <Badge tone={post.kind === "news" ? "gold" : "blue"}>{dict.content.kind[post.kind]}</Badge>
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
      </div>
      <h3 className="mt-5 font-display text-xl leading-snug font-semibold text-ink">{post.title[locale]}</h3>
      <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{post.summary[locale]}</p>
      <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
        {dict.common.readMore}
        <ForwardArrow />
      </span>
    </Card>
  );
}
