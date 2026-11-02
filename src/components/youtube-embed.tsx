// Videos stay on YouTube; we only embed them (privacy-enhanced mode).
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-paper-2 shadow-soft">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="size-full"
      />
    </div>
  );
}
