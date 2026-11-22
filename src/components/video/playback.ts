// Shared by every video on the site, in the browser only.

/**
 * Sent when a video card starts playing (detail: that card's id), so every other video stops; `stopAllVideos` sends
 * it with no id, so every video stops.
 */
export const PLAY_EVENT = "dar:video-play";

/**
 * Stops every video on the page: each card goes back to its thumbnail (remembering where it stopped) and every other
 * player pauses. For anything that hides or moves a video: a tab change, a new sort.
 */
export function stopAllVideos() {
  window.dispatchEvent(new CustomEvent<string | null>(PLAY_EVENT, { detail: null }));
}

/** Sent (detail: the YouTube id) when a video's stop point changes, so every card of that video shows it. */
export const STOPPED_EVENT = "dar:video-stopped";

export type StopPoint = { time: number; duration: number };

// Where each video stopped, by YouTube id, for this visit only: kept in memory, never stored, so a reload forgets it.
// It outlives the page itself, so a video still resumes after the visitor has been through many other pages.
const stopped = new Map<string, StopPoint>();

/**
 * Records where a video stopped and returns it. A video stopped in its first seconds, or near its end, starts over next
 * time instead.
 */
export function rememberStop(id: string, time: number, duration: number): StopPoint | null {
  if (time < 3 || (duration > 0 && time > duration - 5)) {
    stopped.delete(id);
  } else {
    stopped.set(id, { time: Math.floor(time), duration });
  }
  window.dispatchEvent(new CustomEvent(STOPPED_EVENT, { detail: id }));
  return stopped.get(id) ?? null;
}

export function stopPoint(id: string): StopPoint | null {
  return stopped.get(id) ?? null;
}
