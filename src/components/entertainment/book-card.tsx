import Image from "next/image";
import { GeometricPattern } from "@/components/pattern";

type BookCardProps = { title: string; author?: string; cover?: string };

/** A recommended book: its cover (or a plain one drawn with the title), the title and, if given, the author. No link. */
export function BookCard({ title, author, cover }: BookCardProps) {
  return (
    <article className="flex flex-col gap-3">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line bg-surface-2 shadow-soft">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-primary-fill p-3 text-center text-on-primary">
            <GeometricPattern className="text-on-primary/10" />
            {/* The title is read once, from the heading below. */}
            <span aria-hidden="true" dir="auto" className="relative font-display text-sm leading-snug font-semibold sm:text-base">
              {title}
            </span>
          </div>
        )}
      </div>
      <div>
        {/* Titles and authors keep their own language, so each one takes its own direction. */}
        <h3 dir="auto" className="text-sm leading-snug font-semibold text-ink sm:text-base">
          {title}
        </h3>
        {author && (
          <p dir="auto" className="mt-1 text-xs text-muted sm:text-sm">
            {author}
          </p>
        )}
      </div>
    </article>
  );
}
