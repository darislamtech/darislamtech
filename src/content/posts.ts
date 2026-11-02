import type { Post } from "./types";

// Articles and news, newest first. Add entries by hand; see README for the format.
export const posts: Post[] = [];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
