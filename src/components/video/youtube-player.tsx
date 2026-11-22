"use client";

import { useLayoutEffect, useRef } from "react";
import { PLAY_EVENT } from "./playback";

// Videos stay on YouTube; we only embed them, in privacy-enhanced mode (youtube-nocookie, the only frame the CSP allows).
const ORIGIN = "https://www.youtube-nocookie.com";

const permissions = (autoplay: boolean) =>
  `accelerometer; ${autoplay ? "autoplay; " : ""}clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`;

/**
 * The YouTube player iframe, shared by every video on the site. It fills its frame (the caller gives the size and the
 * rounded corners); its keyboard focus ring is drawn inside, since the frame clips anything outside. `autoplay` starts
 * the video at once (used when a visitor presses play on a thumbnail), from `start` seconds if given; otherwise it
 * loads lazily.
 *
 * Next keeps a page the visitor left in the document, only hidden, and a hidden player keeps playing; a browser may
 * also reload a hidden frame, which with `autoplay` started the video again from the beginning. So when the page is
 * hidden or the player removed (React runs this effect's cleanup for both), the player is told to pause, and:
 * - with `onStop` (a video card), the frame is also emptied, so nothing can play or reload behind the visitor's back,
 *   and `onStop` gets where the video was, for the card to go back to its thumbnail and resume from there. This waits
 *   one task: in development React runs every effect's cleanup and setup once more on mount (Strict Mode), and a
 *   setup that follows at once cancels it;
 * - without it (an embed on a content page), the player stays where it paused.
 * The player reports its time through YouTube's iframe API (`enablejsapi`). `rel=0` keeps the videos it suggests
 * to the same channel.
 */
export function YouTubePlayer({
  id,
  title,
  autoplay = false,
  start,
  onStop,
  ref,
}: {
  id: string;
  title: string;
  autoplay?: boolean;
  start?: number;
  onStop?: (time: number, duration: number) => void;
  ref?: React.Ref<HTMLIFrameElement>;
}) {
  const frame = useRef<HTMLIFrameElement | null>(null);
  // Kept across hide and show (the effect below runs again each time): whether the player has loaded, and its state.
  const loaded = useRef(false);
  const state = useRef({ time: start ?? 0, duration: 0, otherVideo: false });
  const stop = useRef(onStop);
  // The card's close, waiting one task (see above).
  const closing = useRef<number | undefined>(undefined);
  useLayoutEffect(() => {
    stop.current = onStop;
  });

  useLayoutEffect(() => {
    const player = frame.current;
    // One object for the player's life, updated in place by its messages.
    const playerState = state.current;
    if (!player) return;
    window.clearTimeout(closing.current);
    closing.current = undefined;
    // Before the player's load was seen (an embed can load before the page's script runs), its frame may still be
    // YouTube's: a pause sent to any origin is harmless, so it goes anyway.
    const pause = () =>
      player.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        loaded.current ? ORIGIN : "*",
      );
    const onMessage = (event: MessageEvent) => {
      if (event.source !== player.contentWindow || event.origin !== ORIGIN || typeof event.data !== "string") return;
      try {
        const info = JSON.parse(event.data)?.info;
        // The visitor may open another video inside the player: its time is not this video's.
        if (typeof info?.videoData?.video_id === "string") playerState.otherVideo = info.videoData.video_id !== id;
        if (playerState.otherVideo) return;
        if (typeof info?.currentTime === "number") playerState.time = info.currentTime;
        if (typeof info?.duration === "number") playerState.duration = info.duration;
      } catch {
        // Not a player message.
      }
    };
    // An embed pauses when a card starts playing or the videos are stopped; a card's player is closed by its card.
    const onPlay = () => {
      if (!stop.current) pause();
    };
    window.addEventListener("message", onMessage);
    window.addEventListener(PLAY_EVENT, onPlay);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener(PLAY_EVENT, onPlay);
      pause();
      if (!stop.current) return;
      closing.current = window.setTimeout(() => {
        closing.current = undefined;
        loaded.current = false;
        player.src = "about:blank";
        stop.current?.(playerState.time, playerState.duration);
      });
    };
  }, [id]);

  const query = new URLSearchParams({ enablejsapi: "1", rel: "0" });
  if (autoplay) query.set("autoplay", "1");
  if (start) query.set("start", String(start));

  return (
    <iframe
      ref={(node) => {
        frame.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      src={`${ORIGIN}/embed/${id}?${query}`}
      onLoad={(event) => {
        const player = event.currentTarget;
        if (!player.src.startsWith(ORIGIN)) return;
        loaded.current = true;
        // Asks the player to report its state (current time and duration) from now on.
        player.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), ORIGIN);
      }}
      title={title}
      loading={autoplay ? undefined : "lazy"}
      allow={permissions(autoplay)}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="size-full focus-visible:rounded-2xl focus-visible:outline-offset-[-3px]"
    />
  );
}
