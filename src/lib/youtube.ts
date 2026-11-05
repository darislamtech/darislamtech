import { cacheLife } from "next/cache";

// A YouTube request that hangs gives up after this and falls back like any other failure, so the build never stalls.
const FETCH_TIMEOUT_MS = 10_000;

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
    const response = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if ([400, 401, 403, 404].includes(response.status)) return null;
    if (!response.ok) return { id, title: null, thumbnail };
    const data = (await response.json()) as { title?: string };
    return { id, title: data.title ?? null, thumbnail };
  } catch {
    return { id, title: null, thumbnail };
  }
}

export type YouTubeChannel = { url: string; name: string | null; avatar: string | null };

/** Normalizes a YouTube channel link (youtube.com/@handle, /channel/..., /c/..., /user/...) or returns null. */
export function getYouTubeChannelUrl(input: string): string | null {
  try {
    const url = new URL(input.trim());
    if (url.hostname.replace(/^(www\.|m\.)/, "") !== "youtube.com") return null;
    // The whole first segment: handles can be Arabic or other non-Latin letters (percent-encoded in the pathname).
    const path = url.pathname.match(/^\/(@[^/]+|channel\/[\w-]+|c\/[^/]+|user\/[^/]+)/)?.[1];
    return path ? `https://www.youtube.com/${path}` : null;
  } catch {
    return null;
  }
}

const decodeEntities = (text: string) =>
  text
    .replace(/&#x([\da-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/**
 * Name and picture of a YouTube channel, read from the Open Graph tags of its public page (YouTube has no key-free
 * API for channels). Always requested in Arabic, so a channel that sets an English name for English viewers keeps
 * its own name on both language pages. Cached like videos. A channel YouTube reports as missing or unavailable
 * returns null and is dropped; if the page can't be read, name and avatar are null and the card falls back to the
 * name written in src/content.
 */
export async function getYouTubeChannel(input: string): Promise<YouTubeChannel | null> {
  "use cache";
  cacheLife("days");

  const url = getYouTubeChannelUrl(input);
  if (!url) return null;

  try {
    const response = await fetch(url, { headers: { "Accept-Language": "ar" }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (response.status === 404) return null;
    if (!response.ok) return { url, name: null, avatar: null };
    const html = await response.text();
    // A terminated or unavailable channel still answers 200, with an error alert instead of the channel.
    if (/"alertRenderer":\{"type":"ERROR"/.test(html)) return null;
    const meta = (property: string) => {
      const value = html.match(new RegExp(`<meta property="og:${property}" content="([^"]*)"`))?.[1];
      // Without the invisible direction marks some channels put around their name.
      return value ? decodeEntities(value).replace(/[‎‏‪-‮]/g, "").trim() || null : null;
    };
    const avatar = meta("image");
    return {
      url,
      name: meta("title"),
      avatar: avatar && /^https:\/\/yt3\.(googleusercontent|ggpht)\.com\//.test(avatar) ? avatar : null,
    };
  } catch {
    return { url, name: null, avatar: null };
  }
}
