/**
 * YouTube pictures (video thumbnails and channel pictures) are served from this site under /yt/, by
 * src/app/yt/[...path]/route.ts, so visitors' browsers never contact YouTube for them (see the privacy page) and
 * they skip Vercel's image optimization, whose free monthly quota ran out (owner, 2026-11-27). They are already small
 * JPEGs: a thumbnail is about 25 KB, and a channel picture is requested at 256 px (about 25 KB).
 */

const THUMBNAIL = /^https:\/\/i\.ytimg\.com\/vi\/([\w-]{11})\/hqdefault\.jpg$/;
// A channel picture: yt3.googleusercontent.com/<key> or /ytc/<key>, followed by its size options.
const AVATAR = /^https:\/\/yt3\.googleusercontent\.com\/((?:ytc\/)?[\w-]+)=s\d+[\w-]*$/;

/** The address on this site for a YouTube thumbnail or channel picture, or null for any other picture. */
export function youtubeImage(url: string): string | null {
  const thumbnail = url.match(THUMBNAIL);
  if (thumbnail) return `/yt/vi/${thumbnail[1]}.jpg`;
  const avatar = url.match(AVATAR);
  if (avatar) return `/yt/avatar/${avatar[1]}.jpg`;
  return null;
}

/** The YouTube address behind a /yt/ path (its segments after "yt"), or null if it isn't one this site serves. */
export function youtubeImageSource(path: string[]): string | null {
  const [kind, ...rest] = path;
  const file = rest.join("/");
  if (kind === "vi") {
    const id = file.match(/^([\w-]{11})\.jpg$/)?.[1];
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  }
  if (kind === "avatar") {
    const key = file.match(/^((?:ytc\/)?[\w-]+)\.jpg$/)?.[1];
    return key ? `https://yt3.googleusercontent.com/${key}=s256-c-k-c0x00ffffff-no-rj` : null;
  }
  return null;
}
