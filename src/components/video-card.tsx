"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type VideoCardProps = { id: string; title: string; thumbnail: string; playLabel: string };

// Sent when a card starts playing, so the others on the page close their player.
const PLAY_EVENT = "dar:video-play";

/**
 * Thumbnail and title only; the YouTube player loads in place on click, so a page of many videos stays light. One
 * video plays at a time: starting one turns any other playing card back into its thumbnail.
 */
export function VideoCard({ id, title, thumbnail, playLabel }: VideoCardProps) {
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
          <iframe
            ref={player}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="size-full focus-visible:rounded-2xl focus-visible:outline-offset-[-3px]"
          />
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
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent_60%)]" />
            <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary-fill text-on-primary shadow-lift transition-transform duration-300 group-hover:scale-110">
              <Play aria-hidden="true" className="size-6 translate-x-0.5 fill-current" />
            </span>
          </button>
        )}
      </div>
      {/* YouTube titles can be in any language, so each one takes its own direction. */}
      <figcaption dir="auto" className="line-clamp-2 leading-relaxed font-medium text-ink">{title}</figcaption>
    </figure>
  );
}
