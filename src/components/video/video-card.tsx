"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { youtubeImage } from "@/lib/youtube-image";
import { PLAY_EVENT, STOPPED_EVENT, rememberStop, stopPoint } from "./playback";
import { YouTubePlayer } from "./youtube-player";

type VideoCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  playLabel: string;
  /** Said instead of `playLabel` when the video continues from where the visitor stopped it. */
  resumeLabel: string;
  /** A line under the title, e.g. the channel and views (the videos page's «الكل» tab). */
  meta?: string;
  /** The thumbnail's width on the page, for the browser to pick its size (default: up to 3 per row). */
  sizes?: string;
};

/**
 * Thumbnail and title (and an optional line under it); the YouTube player loads in place on click, so a page of many
 * videos stays light. One video plays at a time: starting one turns any other playing card back into its thumbnail.
 *
 * A card whose player is closed (another video starts, the visitor leaves the page or its tab, the row is re-sorted)
 * goes back to its thumbnail and remembers where it stopped, shown as a bar along the thumbnail's bottom like
 * YouTube's; pressing play again continues from there, also from another card of the same video.
 */
export function VideoCard({
  id,
  title,
  thumbnail,
  playLabel,
  resumeLabel,
  meta,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: VideoCardProps) {
  // The thumbnail's address on this site; a picture the site can't serve shows no image rather than load from YouTube.
  const picture = youtubeImage(thumbnail);
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState<number>();
  const cardId = useId();
  const player = useRef<HTMLIFrameElement>(null);
  // Where this video last stopped (none on the server), kept in step with other cards of the same video.
  const stopped = useSyncExternalStore(
    (onChange) => {
      const listener = (event: Event) => {
        if ((event as CustomEvent<string>).detail === id) onChange();
      };
      window.addEventListener(STOPPED_EVENT, listener);
      return () => window.removeEventListener(STOPPED_EVENT, listener);
    },
    () => stopPoint(id),
    () => null,
  );

  // The play button goes away when the player loads, so focus moves to the player (and screen readers read its title).
  useEffect(() => {
    if (playing) player.current?.focus({ preventScroll: true });
  }, [playing]);

  useEffect(() => {
    const stopIfOther = (event: Event) => {
      if ((event as CustomEvent<string | null>).detail !== cardId) setPlaying(false);
    };
    window.addEventListener(PLAY_EVENT, stopIfOther);
    return () => window.removeEventListener(PLAY_EVENT, stopIfOther);
  }, [cardId]);

  function play() {
    setStart(stopPoint(id)?.time);
    setPlaying(true);
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: cardId }));
  }

  return (
    <figure className="flex flex-col gap-3" data-stopped={stopped ? "" : undefined}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-soft">
        {playing ? (
          <YouTubePlayer
            ref={player}
            id={id}
            title={title}
            autoplay
            start={start}
            onStop={(time, duration) => {
              rememberStop(id, time, duration);
              setPlaying(false);
            }}
          />
        ) : (
          <button
            type="button"
            onClick={play}
            data-random-pick="play"
            aria-label={`${stopped ? resumeLabel : playLabel}: ${title}`}
            className="group absolute inset-0 size-full"
          >
            {/* Served from this site as is (see youtube-image.ts), not through Vercel's image optimization. */}
            {picture && (
              <Image
                src={picture}
                alt=""
                fill
                unoptimized
                sizes={sizes}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent_60%)]" />
            <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary-fill text-on-primary shadow-lift transition-transform duration-300 group-hover:scale-110">
              <Play aria-hidden="true" className="size-6 translate-x-0.5 fill-current" />
            </span>
            {stopped && stopped.duration > 0 && (
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-paper/50">
                <span
                  className="block h-full bg-primary-fill"
                  style={{ width: `${Math.min(100, (stopped.time / stopped.duration) * 100)}%` }}
                />
              </span>
            )}
          </button>
        )}
      </div>
      {/* YouTube titles and channel names can be in any language, so each takes its own direction. */}
      <figcaption>
        <p dir="auto" className="line-clamp-2 leading-relaxed font-medium text-ink">
          {title}
        </p>
        {meta && (
          <p dir="auto" className="mt-1 truncate text-sm text-muted">
            {meta}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
