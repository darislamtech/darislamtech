"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { shuffled } from "@/lib/shuffle";

type Item = { key: string; node: React.ReactNode };

/**
 * A grid shown in a new random order each time it appears (DarTube). The page is prerendered with the items in their
 * listed order; the browser shuffles them on mount, and the grid stays invisible and `aria-busy` until then so the
 * reorder isn't seen (globals.css shows it anyway if the script never runs; without JavaScript it shows at once).
 */
export function ShuffledGrid({ items, className }: { items: Item[]; className: string }) {
  const [order, setOrder] = useState<number[] | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const count = items.length;

  // On every mount, including a return to the page, which Next keeps alive in the background; before the browser
  // paints, so the old order never shows. A video still playing in the grid keeps the order: moving its player would
  // restart it.
  useLayoutEffect(() => {
    if (grid.current?.querySelector("iframe")) return;
    // Random, so it can only run in the browser after hydration.
    setOrder(shuffled(Array.from({ length: count }, (_, index) => index)));
  }, [count]);

  const list = order ? order.map((index) => items[index]) : items;
  return (
    <>
      <div ref={grid} className={className} data-shuffled-grid="" aria-busy={!order}>
        {list.map((item) => (
          <div key={item.key}>{item.node}</div>
        ))}
      </div>
      <noscript>
        <style>{"[data-shuffled-grid]{opacity:1!important}"}</style>
      </noscript>
    </>
  );
}
