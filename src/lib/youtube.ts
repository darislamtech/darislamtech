import { cacheLife } from "next/cache";

export type YouTubeVideo = { id: string; title: string | null; thumbnail: string };

/** Extracts the video ID from a YouTube link (watch, youtu.be, shorts, embed, live) or returns a bare ID as is. */
export function getYouTubeId(input: string): string | null {
  const value = input.trim();
  const valid = (id: string | null | undefined) => (id && /^[\w-]{11}$/.test(id) ? id : null);
  if (valid(value)) return value;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^(www\.|m\.|music\.)/, "");
    if (host === "youtu.be") return valid(url.pathname.slice(1));
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const fromQuery = url.searchParams.get("v");
      if (fromQuery) return valid(fromQuery);
      return valid(url.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1]);
    }
  } catch {
    // Not a URL.
  }
  return null;
}

/**
 * Title and thumbnail of a YouTube video, from YouTube's public oEmbed endpoint (no API key).
 * Cached so the request happens when the page is built, not on every visit. A video YouTube reports as missing,
 * private or not embeddable returns null and is dropped; if YouTube is unreachable the video still shows with its
 * thumbnail and a generic label.
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
    if ([400, 401, 403, 404].includes(response.status)) return null;
    if (!response.ok) return { id, title: null, thumbnail };
    const data = (await response.json()) as { title?: string };
    return { id, title: data.title ?? null, thumbnail };
  } catch {
    return { id, title: null, thumbnail };
  }
}
