"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share } from "lucide-react";
import { LogoMark } from "../brand";

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
const SHOW_DELAY_MS = 3000;
// In-app browsers of social apps (Instagram, Facebook, TikTok, LinkedIn, Snapchat, LINE) have no "Add to Home Screen".
const IN_APP_BROWSER = /instagram|fban|fbav|fb_iab|musical_ly|bytedancewebview|linkedinapp|snapchat|line\//i;

function snoozed() {
  try {
    return Number(localStorage.getItem(SNOOZE_KEY) ?? 0) > Date.now();
  } catch {
    return false;
  }
}

function snoozeForAWeek() {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + WEEK_MS));
  } catch {
    // Storage can be blocked (private mode); the card then simply shows again on the next visit.
  }
}

/**
 * Mobile-only card inviting the visitor to install the site as an app. Chromium browsers get an "Install" button
 * (their own install dialog) once they report the site installable; iPhone and iPad get the Share → Add to Home
 * Screen steps, since Safari has no install API. "Remind me in a week", or closing the install dialog, hides it for
 * 7 days. It never shows on desktop or inside the installed app.
 */
export function InstallPrompt({ labels }: { labels: InstallLabels }) {
  const [mode, setMode] = useState<"hidden" | "install" | "ios">("hidden");
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  // Once the visitor has answered the card on this page, it stays hidden even if the browser offers install again.
  const answered = useRef(false);

  useEffect(() => {
    const installed =
      matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const phoneOrTablet = matchMedia("(max-width: 1023px) and (pointer: coarse)").matches;
    if (installed || !phoneOrTablet) return;

    let timer: number | undefined;
    const showLater = (next: "install" | "ios") => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMode(next), SHOW_DELAY_MS);
    };

    // Always hold back the browser's own install banner on phones, including during the snooze week; the browser
    // menu's "Install app" stays available. Chrome fires this again after its dialog is closed, hence the checks.
    const onInstallAvailable = (event: Event) => {
      event.preventDefault();
      if (answered.current || snoozed()) return;
      setInstallEvent(event as InstallEvent);
      showLater("install");
    };
    const onInstalled = () => {
      answered.current = true;
      window.clearTimeout(timer);
      setMode("hidden");
    };
    window.addEventListener("beforeinstallprompt", onInstallAvailable);
    window.addEventListener("appinstalled", onInstalled);

    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios && !IN_APP_BROWSER.test(ua) && !snoozed()) showLater("ios");

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallAvailable);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(timer);
    };
  }, []);

  if (mode === "hidden") return null;

  async function install() {
    const event = installEvent;
    // The ref is set synchronously, so a second tap before the re-render can't call prompt() twice.
    if (!event || answered.current) return;
    answered.current = true;
    setInstallEvent(null);
    setMode("hidden");
    try {
      await event.prompt();
      const { outcome } = await event.userChoice;
      if (outcome === "dismissed") snoozeForAWeek();
    } catch {
      // The browser refused the prompt (already used, or no longer installable); nothing to show.
    }
  }

  function later() {
    answered.current = true;
    snoozeForAWeek();
    setMode("hidden");
  }

  return (
    <aside
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
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary-fill px-4 py-2 font-semibold text-on-primary shadow-button transition-colors hover:bg-primary-hover"
          >
            <Download aria-hidden="true" className="size-4" />
            {labels.install}
          </button>
        )}
        <button
          type="button"
          onClick={later}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line-strong px-4 py-2 text-center text-sm font-medium text-ink-2 transition-colors hover:border-ink-2/40 hover:text-ink"
        >
          {labels.later}
        </button>
      </div>
    </aside>
  );
}
