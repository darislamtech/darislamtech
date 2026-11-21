"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { shuffled } from "@/lib/shuffle";

type Item = { key: string; node: React.ReactNode };

// How far below the screen the "show more" button may still be when the next batch loads, so it arrives before the
// visitor reaches the end.
const LOAD_AHEAD = "800px";

/**
 * A grid shown in a new random order each time it appears (the videos page's «الكل» tab), `pageSize` items at a time:
 * the next batch loads as the visitor scrolls near the end, or on the "show more" button, so a long list stays light.
 * The page is prerendered with the first batch in its listed order; the browser shuffles the whole list on mount, and
 * the grid stays invisible and `aria-busy` until then so the reorder isn't seen (globals.css shows it anyway if the
 * script never runs; without JavaScript it shows at once, first batch only).
 */
export function ShuffledGrid({
  items,
  className,
  pageSize,
  moreLabel,
}: {
  items: Item[];
  className: string;
  pageSize: number;
  moreLabel: string;
}) {
  const [order, setOrder] = useState<number[] | null>(null);
  const [shown, setShown] = useState(pageSize);
  // Bumped when the button loses focus, so the observer checks again (it skipped loading while the button had focus).
  const [blurs, setBlurs] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const more = useRef<HTMLButtonElement>(null);
  // Set when the button (not scrolling) loaded a batch: focus then moves to the first new video.
  const focusFrom = useRef<number | null>(null);
  const count = items.length;
  const hasMore = order !== null && shown < count;

  // On every mount, including a return to the page, which Next keeps alive in the background; before the browser
  // paints, so the old order never shows. A video still playing in the grid keeps the order (and what is shown):
  // moving its player would restart it.
  useLayoutEffect(() => {
    if (grid.current?.querySelector("iframe")) return;
    // Random, so it can only run in the browser after hydration.
    setOrder(shuffled(Array.from({ length: count }, (_, index) => index)));
    setShown(pageSize);
  }, [count, pageSize]);

  // The next batch when the button comes near the screen. Observing again after each batch fires at once if the
  // button is still near, so a tall screen fills up. A hidden tab never intersects. Not while the button has focus:
  // the new videos would land before it unseen (a screen reader can jump straight to the button), so pressing it
  // loads them and moves focus to the first one.
  useEffect(() => {
    const button = more.current;
    if (!hasMore || !button) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (document.activeElement === button) return;
        if (entries.some((entry) => entry.isIntersecting)) setShown((value) => Math.min(value + pageSize, count));
      },
      { rootMargin: `0px 0px ${LOAD_AHEAD} 0px` },
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [hasMore, shown, pageSize, count, blurs]);

  useEffect(() => {
    if (focusFrom.current === null) return;
    grid.current?.children[focusFrom.current]?.querySelector<HTMLElement>("button, iframe")?.focus();
    focusFrom.current = null;
  }, [shown]);

  const list = (order ? order.map((index) => items[index]) : items).slice(0, shown);
  return (
    <>
      <div ref={grid} className={className} data-shuffled-grid="" aria-busy={!order}>
        {list.map((item) => (
          <div key={item.key}>{item.node}</div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            ref={more}
            type="button"
            onBlur={() => setBlurs((value) => value + 1)}
            onClick={() => {
              focusFrom.current = shown;
              setShown((value) => Math.min(value + pageSize, count));
            }}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition-colors hover:bg-paper-2"
          >
            {moreLabel}
          </button>
        </div>
      )}
      <noscript>
        <style>{"[data-shuffled-grid]{opacity:1!important}"}</style>
      </noscript>
    </>
  );
}
