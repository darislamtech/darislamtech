"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; count?: number; content: React.ReactNode };

/**
 * Accessible tabs (roving focus with arrow keys). Panels are rendered on the server and passed in. With
 * `stackOnMobile`, long labels stack as full-width 44px buttons on phones instead of scrolling out of sight.
 */
export function Tabs({ items, label, stackOnMobile }: { items: TabItem[]; label: string; stackOnMobile?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);
  const baseId = useId();

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const isRtl = document.documentElement.dir === "rtl";
    const next = { ArrowRight: isRtl ? -1 : 1, ArrowLeft: isRtl ? 1 : -1 }[event.key];
    if (!next) return;
    event.preventDefault();
    const target = items[(index + next + items.length) % items.length];
    setActive(target.id);
    document.getElementById(`${baseId}-tab-${target.id}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "max-w-full gap-1 border border-line bg-surface p-1",
          stackOnMobile
            ? "flex flex-col rounded-3xl sm:inline-flex sm:flex-row sm:rounded-full"
            : "inline-flex overflow-x-auto rounded-full",
        )}
      >
        {items.map((item, index) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                stackOnMobile && "min-h-11 justify-center",
                selected ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2",
              )}
            >
              {item.label}
              {item.count !== undefined && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[0.7rem] leading-none",
                    selected ? "bg-paper/15" : "bg-paper-2 text-muted",
                  )}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          className="mt-8"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
