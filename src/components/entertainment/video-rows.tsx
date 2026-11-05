"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type VideoSort = "newest" | "oldest" | "mostViewed";

/** A rendered video card plus what the sorts need: when we added it, its place in the list, and its YouTube views. */
export type SortableVideo = { key: string; added: number; order: number; views: number | null; node: React.ReactNode };

// "Newest" and "oldest" follow when we added the video (ties keep the list order); "most viewed" follows YouTube.
const compare: Record<VideoSort, (a: SortableVideo, b: SortableVideo) => number> = {
  newest: (a, b) => b.added - a.added || b.order - a.order,
  oldest: (a, b) => a.added - b.added || a.order - b.order,
  mostViewed: (a, b) => (b.views ?? -1) - (a.views ?? -1) || b.added - a.added,
};

const SortContext = createContext<{ sort: VideoSort; setSort: (sort: VideoSort) => void }>({
  sort: "newest",
  setSort: () => {},
});

/** Holds the chosen sort for every video row on the page. */
export function VideoSortProvider({ children }: { children: React.ReactNode }) {
  const [sort, setSort] = useState<VideoSort>("newest");
  return <SortContext.Provider value={{ sort, setSort }}>{children}</SortContext.Provider>;
}

export function VideoSortControl({ label, options }: { label: string; options: Record<VideoSort, string> }) {
  const { sort, setSort } = useContext(SortContext);
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span aria-hidden="true" className="text-sm text-muted">
        {label}
      </span>
      {(Object.keys(options) as VideoSort[]).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={sort === value}
          onClick={() => setSort(value)}
          className={cn(
            "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
            sort === value ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink-2 hover:bg-paper-2",
          )}
        >
          {options[value]}
        </button>
      ))}
    </div>
  );
}

/**
 * One category's videos in a single row: three at a time on large screens (two on tablets) with previous/next
 * arrows when there are more, and one at a time with a peek of the next on phones, where the row is swiped.
 */
export function VideoRow({ items, labels }: { items: SortableVideo[]; labels: { previous: string; next: string } }) {
  const { sort } = useContext(SortContext);
  const sorted = useMemo(() => [...items].sort(compare[sort]), [items, sort]);
  const scroller = useRef<HTMLDivElement>(null);
  const startArrow = useRef<HTMLButtonElement>(null);
  const endArrow = useRef<HTMLButtonElement>(null);
  // The arrow last pressed while it had keyboard focus. When the row then stops at that end, the arrow gets disabled
  // and would drop focus, so focus moves to the other arrow instead.
  const pressedArrow = useRef<"start" | "end" | null>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const pressed = pressedArrow.current;
    if (!pressed) return;
    const other = pressed === "start" ? "end" : "start";
    const active = document.activeElement;
    const pressedElement = (pressed === "start" ? startArrow : endArrow).current;
    if (edges[pressed] && !edges[other] && (active === pressedElement || active === document.body)) {
      (other === "start" ? startArrow : endArrow).current?.focus();
      pressedArrow.current = null;
    }
  });

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    // scrollLeft is negative in right-to-left pages, so compare its distance from the start.
    const update = () => {
      const position = Math.abs(element.scrollLeft);
      const max = element.scrollWidth - element.clientWidth;
      setEdges({ start: position <= 1, end: position >= max - 1 });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [sorted]);

  // A new sort reorders the row, so show it again from its first video.
  useEffect(() => {
    scroller.current?.scrollTo({ left: 0 });
  }, [sort]);

  function move(direction: 1 | -1) {
    const element = scroller.current;
    if (!element) return;
    const side = direction === 1 ? "end" : "start";
    pressedArrow.current = document.activeElement === (side === "end" ? endArrow : startArrow).current ? side : null;
    const rtl = getComputedStyle(element).direction === "rtl";
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({ left: direction * element.clientWidth * (rtl ? -1 : 1), behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="relative @container">
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sorted.map((item) => (
          <div key={item.key} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
            {item.node}
          </div>
        ))}
      </div>
      {!(edges.start && edges.end) && (
        <>
          <RowArrow ref={startArrow} label={labels.previous} disabled={edges.start} onClick={() => move(-1)} side="start" />
          <RowArrow ref={endArrow} label={labels.next} disabled={edges.end} onClick={() => move(1)} side="end" />
        </>
      )}
    </div>
  );
}

// Arrows sit over the middle of the thumbnails (a 16:9 thumbnail is 9/32 of its card width down to its middle);
// phones swipe instead.
type RowArrowProps = {
  ref: React.Ref<HTMLButtonElement>;
  label: string;
  disabled: boolean;
  onClick: () => void;
  side: "start" | "end";
};

function RowArrow({ ref, label, disabled, onClick, side }: RowArrowProps) {
  const Icon = side === "start" ? ChevronLeft : ChevronRight;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-[calc((100cqw-1.25rem)/2*0.28125)] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-ink shadow-lift transition-opacity hover:bg-paper-2 disabled:pointer-events-none disabled:opacity-0 sm:grid lg:top-[calc((100cqw-2.5rem)/3*0.28125)]",
        side === "start" ? "-start-3" : "-end-3",
      )}
    >
      <Icon aria-hidden="true" className="size-5 rtl:rotate-180" />
    </button>
  );
}
