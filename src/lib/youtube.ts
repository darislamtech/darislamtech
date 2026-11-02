import { cacheLife } from "next/cache";

export type YouTubeVideo = { id: string; title: string | null; thumbnail: string };

/** Extracts the video ID from a YouTube link (watch, youtu.be, shorts, embed, live) or returns a bare ID as is. */
export function getYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^(www\.|m\.|music\.)/, "");
    if (host === "youtu.be") return url.pathname.slice(1, 12) || null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const fromQuery = url.searchParams.get("v");
      if (fromQuery) return fromQuery;
      const match = url.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{11})/);
      return match?.[1] ?? null;
    }
  } catch {
    // Not a URL.
  }
  return null;
}

/**
 * Title and thumbnail of a YouTube video, from YouTube's public oEmbed endpoint (no API key).
 * Cached so the request happens when the page is built, not on every visit. If YouTube is unreachable the
 * video still shows with its thumbnail and a generic label.
 */
export async function getYouTubeVideo(input: string): Promise<YouTubeVideo | null> {
  "use cache";
  cacheLife("days");

  const id = getYouTubeId(input);
  if (!id) return null;
  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  try {
    const watchUrl = `https://www.youtube.com/watch?v=${id}`;
    const response = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`);
    if (!response.ok) return { id, title: null, thumbnail };
    const data = (await response.json()) as { title?: string };
    return { id, title: data.title ?? null, thumbnail };
  } catch {
    return { id, title: null, thumbnail };
  }
}
