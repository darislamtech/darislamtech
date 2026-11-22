"use client";

import { useLayoutEffect, useRef } from "react";

// Videos stay on YouTube; we only embed them, in privacy-enhanced mode (youtube-nocookie, the only frame the CSP allows).
const ORIGIN = "https://www.youtube-nocookie.com";

const permissions = (autoplay: boolean) =>
  `accelerometer; ${autoplay ? "autoplay; " : ""}clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`;

/**
 * The YouTube player iframe, shared by every video on the site. It fills its frame (the caller gives the size and the
 * rounded corners); its keyboard focus ring is drawn inside, since the frame clips anything outside. `autoplay` starts
 * the video at once (used when a visitor presses play on a thumbnail); otherwise it loads lazily.
 *
 * Leaving the page pauses it: Next keeps a page the visitor left in the document, only hidden, and a hidden player
 * keeps playing (its sound went on over the next page). React runs this cleanup when the page is hidden, so the player
 * is told to pause (YouTube's iframe API, hence `enablejsapi`), and it is still there, paused, on return.
 */
export function YouTubePlayer({
  id,
  title,
  autoplay = false,
  ref,
}: {
  id: string;
  title: string;
  autoplay?: boolean;
  ref?: React.Ref<HTMLIFrameElement>;
}) {
  const frame = useRef<HTMLIFrameElement | null>(null);

  useLayoutEffect(() => {
    const player = frame.current;
    return () => {
      player?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), ORIGIN);
    };
  }, []);

  return (
    <iframe
      ref={(node) => {
        frame.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      src={`${ORIGIN}/embed/${id}?enablejsapi=1${autoplay ? "&autoplay=1" : ""}`}
      title={title}
      loading={autoplay ? undefined : "lazy"}
      allow={permissions(autoplay)}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="size-full focus-visible:rounded-2xl focus-visible:outline-offset-[-3px]"
    />
  );
}
