"use client";

import { useEffect, useState } from "react";
import { Download, Share } from "lucide-react";
import { LogoMark } from "./brand";

// Chromium's install event is not in the DOM typings yet.
type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type InstallLabels = {
  title: string;
  body: string;
  install: string;
  later: string;
  iosBefore: string;
  iosAfter: string;
};

const SNOOZE_KEY = "install-prompt-snooze-until";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const INSTALLED_MS = 10 * 365 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 3000;

function snoozed() {
  try {
    return Number(localStorage.getItem(SNOOZE_KEY) ?? 0) > Date.now();
  } catch {
    return false;
  }
}

function snooze(ms: number) {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + ms));
  } catch {
    // Storage can be blocked (private mode); the card then simply shows again on the next visit.
  }
}

/**
 * Mobile-only card inviting the visitor to install the site as an app. Chromium browsers get an "Install" button
 * (their own install dialog); iPhone and iPad get the Share → Add to Home Screen steps, since Safari has no install
 * API. "Remind me in a week" hides it for 7 days; it never shows once the site runs as an installed app.
 */
export function InstallPrompt({ labels }: { labels: InstallLabels }) {
  const [mode, setMode] = useState<"hidden" | "install" | "ios">("hidden");
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    const installed =
      matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const phoneOrTablet = matchMedia("(max-width: 1023px) and (pointer: coarse)").matches;
    if (installed || !phoneOrTablet || snoozed()) return;

    let timer: number | undefined;
    const onInstallAvailable = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
      timer = window.setTimeout(() => setMode("install"), SHOW_DELAY_MS);
    };
    const onInstalled = () => {
      snooze(INSTALLED_MS);
      setMode("hidden");
    };
    window.addEventListener("beforeinstallprompt", onInstallAvailable);
    window.addEventListener("appinstalled", onInstalled);

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios) timer = window.setTimeout(() => setMode("ios"), SHOW_DELAY_MS);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallAvailable);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(timer);
    };
  }, []);

  if (mode === "hidden") return null;

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    // Accepted: the appinstalled event hides it for good. Dismissed: treat like "remind me in a week".
    if (outcome === "dismissed") snooze(WEEK_MS);
    setInstallEvent(null);
    setMode("hidden");
  }

  function later() {
    snooze(WEEK_MS);
    setMode("hidden");
  }

  return (
    <section
      role="dialog"
      aria-labelledby="install-prompt-title"
      className="fixed inset-x-3 bottom-3 z-30 mb-[env(safe-area-inset-bottom)] animate-fade-up rounded-3xl border border-line bg-surface p-4 shadow-lift sm:inset-x-auto sm:end-4 sm:w-96"
    >
      <div className="flex gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface-2">
          <LogoMark className="h-7 w-auto" />
        </span>
        <div className="min-w-0">
          <h2 id="install-prompt-title" className="font-semibold text-ink">
            {labels.title}
          </h2>
          {mode === "install" ? (
            <p className="mt-1 text-sm leading-relaxed text-muted">{labels.body}</p>
          ) : (
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {labels.iosBefore}{" "}
              <Share aria-hidden="true" className="inline size-4 align-text-bottom text-primary" /> {labels.iosAfter}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {mode === "install" && (
          <button
            type="button"
            onClick={install}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary-fill font-semibold text-on-primary shadow-button transition-colors hover:bg-primary-hover"
          >
            <Download aria-hidden="true" className="size-4" />
            {labels.install}
          </button>
        )}
        <button
          type="button"
          onClick={later}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-line-strong px-4 text-sm font-medium text-ink-2 transition-colors hover:border-ink-2/40 hover:text-ink"
        >
          {labels.later}
        </button>
      </div>
    </section>
  );
}
