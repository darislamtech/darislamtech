import { youtubeImageSource } from "@/lib/youtube-image";

// How long browsers and Vercel's CDN keep a picture: a day in the browser, 30 days at the CDN (a channel may change its
// thumbnail or picture, so not forever).
const CACHE = "public, max-age=86400, s-maxage=2592000";
const FETCH_TIMEOUT_MS = 10_000;

/** A YouTube thumbnail or channel picture, fetched from YouTube and served from this site (see src/lib/youtube-image.ts). */
export async function GET(_request: Request, { params }: RouteContext<"/yt/[...path]">) {
  const source = youtubeImageSource((await params).path);
  if (!source) return new Response(null, { status: 404 });

  try {
    const upstream = await fetch(source, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    const type = upstream.headers.get("content-type") ?? "";
    if (!upstream.ok || !type.startsWith("image/")) {
      return new Response(null, { status: 404, headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } });
    }
    return new Response(upstream.body, { headers: { "Content-Type": type, "Cache-Control": CACHE } });
  } catch {
    return new Response(null, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
