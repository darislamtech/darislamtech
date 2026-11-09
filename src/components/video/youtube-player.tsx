// Videos stay on YouTube; we only embed them, in privacy-enhanced mode (youtube-nocookie, the only frame the CSP allows).
const permissions = (autoplay: boolean) =>
  `accelerometer; ${autoplay ? "autoplay; " : ""}clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`;

/**
 * The YouTube player iframe, shared by every video on the site. It fills its frame (the caller gives the size and the
 * rounded corners); its keyboard focus ring is drawn inside, since the frame clips anything outside. `autoplay` starts
 * the video at once (used when a visitor presses play on a thumbnail); otherwise it loads lazily.
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
  return (
    <iframe
      ref={ref}
      src={`https://www.youtube-nocookie.com/embed/${id}${autoplay ? "?autoplay=1" : ""}`}
      title={title}
      loading={autoplay ? undefined : "lazy"}
      allow={permissions(autoplay)}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="size-full focus-visible:rounded-2xl focus-visible:outline-offset-[-3px]"
    />
  );
}
