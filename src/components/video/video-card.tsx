"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { YouTubePlayer } from "./youtube-player";

type VideoCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  playLabel: string;
  /** A line under the title, e.g. the channel and views (DarTube). */
  meta?: string;
  /** The thumbnail's width on the page, for the browser to pick its size (default: up to 3 per row). */
  sizes?: string;
};

// Sent when a card starts playing, so the others on the page close their player.
const PLAY_EVENT = "dar:video-play";

/**
 * Thumbnail and title (and an optional line under it); the YouTube player loads in place on click, so a page of many
 * videos stays light. One video plays at a time: starting one turns any other playing card back into its thumbnail.
 */
export function VideoCard({
  id,
  title,
  thumbnail,
  playLabel,
  meta,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const cardId = useId();
  const player = useRef<HTMLIFrameElement>(null);

  // The play button goes away when the player loads, so focus moves to the player (and screen readers read its title).
  useEffect(() => {
    if (playing) player.current?.focus({ preventScroll: true });
  }, [playing]);

  useEffect(() => {
    const stopIfOther = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== cardId) setPlaying(false);
    };
    window.addEventListener(PLAY_EVENT, stopIfOther);
    return () => window.removeEventListener(PLAY_EVENT, stopIfOther);
  }, [cardId]);

  function play() {
    setPlaying(true);
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: cardId }));
  }

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-soft">
        {playing ? (
          <YouTubePlayer ref={player} id={id} title={title} autoplay />
        ) : (
          <button
            type="button"
            onClick={play}
            data-random-pick="play"
            aria-label={`${playLabel}: ${title}`}
            className="group absolute inset-0 size-full"
          >
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent_60%)]" />
            <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary-fill text-on-primary shadow-lift transition-transform duration-300 group-hover:scale-110">
              <Play aria-hidden="true" className="size-6 translate-x-0.5 fill-current" />
            </span>
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
