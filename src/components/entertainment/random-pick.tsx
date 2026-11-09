"use client";

import { useRef } from "react";
import { Shuffle } from "lucide-react";

// How long a picked channel or book stays outlined. The outline itself is the cards' `data-picked:` classes.
const HIGHLIGHT_MS = 2500;

/**
 * "Pick one for me": a random item shown on the page (visible tab only), marked with `data-random-pick`. A video
 * ("play") is scrolled to and started; a channel or book ("highlight") is scrolled to, outlined for a moment (via a
 * `data-picked` attribute) and focused. Never the same item twice in a row.
 */
export function RandomPick({ label }: { label: string }) {
  const last = useRef<HTMLElement | null>(null);
  // One timer per item, so picking it again restarts its outline instead of an older timer cutting it short.
  const timers = useRef(new WeakMap<HTMLElement, number>());

  function pick() {
    // Only what is actually shown: not the other tab, and not the other entertainment pages, which Next keeps in the
    // document (hidden) after a visit so going back is instant.
    const items = [...document.querySelectorAll<HTMLElement>("[data-random-pick]")].filter(
      (item) => item.getClientRects().length > 0,
    );
    const choices = items.length > 1 ? items.filter((item) => item !== last.current) : items;
    if (choices.length === 0) return;
    const item = choices[Math.floor(Math.random() * choices.length)];
    last.current = item;

    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center", inline: "center" });
    if (item.dataset.randomPick === "play") {
      item.click();
      return;
    }
    window.clearTimeout(timers.current.get(item));
    item.dataset.picked = "";
    timers.current.set(
      item,
      window.setTimeout(() => delete item.dataset.picked, HIGHLIGHT_MS),
    );
    // A book card is not focusable on its own: made focusable for this one focus, then back to normal.
    if (!item.matches("a, button")) {
      item.tabIndex = -1;
      item.addEventListener("blur", () => item.removeAttribute("tabindex"), { once: true });
    }
    item.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={pick}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-paper-2"
    >
      <Shuffle aria-hidden="true" className="size-4 text-tone-gold" />
      {label}
    </button>
  );
}
