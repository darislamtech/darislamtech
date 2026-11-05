import Image from "next/image";
import { GeometricPattern } from "@/components/pattern";

type BookCardProps = { title: string; author: string; why: string; cover?: string };

/** A recommended book: its cover (or a plain one drawn with the title), title, author and why. No link. */
export function BookCard({ title, author, why, cover }: BookCardProps) {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-soft">
        {cover ? (
          <Image src={cover} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-primary-fill p-5 text-center text-on-primary">
            <GeometricPattern className="text-on-primary/10" />
            {/* The title is read once, from the heading below. */}
            <span aria-hidden="true" dir="auto" className="relative font-display text-lg leading-snug font-semibold">
              {title}
            </span>
          </div>
        )}
      </div>
      <div>
        {/* Titles and authors keep their own language, so each one takes its own direction. */}
        <h3 dir="auto" className="font-semibold text-ink">
          {title}
        </h3>
        <p dir="auto" className="mt-1 text-sm text-muted">
          {author}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{why}</p>
      </div>
    </article>
  );
}
