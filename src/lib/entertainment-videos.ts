import type { RecommendedVideo } from "@/content/types";
import { getYouTubeDetails, getYouTubeVideo, type YouTubeVideo, type YouTubeVideoDetails } from "./youtube";

const ADDED_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/** A recommended video with what YouTube tells us about it, plus when we added it and its place in its category. */
export type ResolvedVideo = YouTubeVideo & YouTubeVideoDetails & { order: number; added: number };

/**
 * Resolves one recommended video for the Entertainment pages: title, channel and thumbnail, then views and publish
 * date (all cached; see lib/youtube.ts). Returns null for a link YouTube doesn't know, so it is dropped.
 */
export async function resolveVideo(item: RecommendedVideo, order: number): Promise<ResolvedVideo | null> {
  // A mistyped date would silently break the order, so the build stops on it instead.
  if (!ADDED_FORMAT.test(item.added) || Number.isNaN(Date.parse(item.added))) {
    throw new Error(`Entertainment video ${item.url}: "added" must look like 2026-11-06T21:30, got "${item.added}"`);
  }
  const video = await getYouTubeVideo(item.url);
  if (!video) return null;
  return { ...video, ...(await getYouTubeDetails(video.id)), order, added: Date.parse(item.added) };
}
