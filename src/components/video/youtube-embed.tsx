import { YouTubePlayer } from "./youtube-player";

/** A YouTube video shown in place, in a rounded 16:9 frame (content and product pages). */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-paper-2 shadow-soft">
      <YouTubePlayer id={id} title={title} />
    </div>
  );
}
