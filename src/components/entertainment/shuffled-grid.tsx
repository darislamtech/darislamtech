"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { shuffled } from "@/lib/shuffle";

type Item = { key: string; node: React.ReactNode };

/**
 * A grid shown in a new random order each time it appears (DarTube). The page is prerendered with the items in their
 * listed order; the browser shuffles them on mount, and the grid stays invisible until then so the reorder isn't seen
 * (without JavaScript it shows in the listed order).
 */
export function ShuffledGrid({ items, className }: { items: Item[]; className: string }) {
  const [order, setOrder] = useState<number[] | null>(null);
  const count = items.length;

  // On every mount, including a return to the page, which Next keeps alive in the background.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random, so it can only run in the browser after hydration
    setOrder(shuffled(Array.from({ length: count }, (_, index) => index)));
    return () => setOrder(null);
  }, [count]);

  const list = order ? order.map((index) => items[index]) : items;
  return (
    <>
      <div className={cn(className, !order && "opacity-0")} data-shuffled-grid="">
        {list.map((item) => (
          <div key={item.key}>{item.node}</div>
        ))}
      </div>
      <noscript>
        <style>{"[data-shuffled-grid]{opacity:1}"}</style>
      </noscript>
    </>
  );
}
