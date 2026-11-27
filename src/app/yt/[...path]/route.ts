import { youtubeImageSource } from "@/lib/youtube-image";

// How long browsers and Vercel's CDN keep a picture: a day in the browser, up to 30 days at the CDN (a channel may change
// its thumbnail or picture, so not forever); an old copy may be served while it refreshes or if YouTube fails.
const CACHE = "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400, stale-if-error=604800";
// Only raster pictures: an SVG served from this site could run script.
const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const FETCH_TIMEOUT_MS = 10_000;

/** A YouTube thumbnail or channel picture, fetched from YouTube and served from this site (see src/lib/youtube-image.ts). */
export async function GET(_request: Request, { params }: RouteContext<"/yt/[...path]">) {
  const source = youtubeImageSource((await params).path);
  if (!source) return new Response(null, { status: 404 });

  try {
    const upstream = await fetch(source, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    const type = upstream.headers.get("content-type")?.split(";")[0].trim() ?? "";
    if (upstream.ok && TYPES.has(type)) {
      return new Response(upstream.body, { headers: { "Content-Type": type, "Cache-Control": CACHE } });
    }
    await upstream.body?.cancel();
    // A picture YouTube doesn't have is remembered for an hour; anything else (a rate limit, an outage) isn't kept.
    if (upstream.status === 404 || upstream.status === 410) {
      return new Response(null, { status: 404, headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } });
    }
    return new Response(null, { status: 502, headers: { "Cache-Control": "no-store" } });
  } catch {
    return new Response(null, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
