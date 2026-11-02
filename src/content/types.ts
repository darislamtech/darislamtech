import type { Locale } from "@/i18n/config";

export type Localized<T = string> = Record<Locale, T>;

export type Post = {
  slug: string;
  kind: "article" | "news";
  /** ISO date, e.g. "2026-11-01" */
  date: string;
  title: Localized;
  summary: Localized;
  /** Paragraphs separated by a blank line. */
  body: Localized;
  /** Optional related YouTube video ID (the part after watch?v=). */
  youtubeId?: string;
};

export type Video = {
  youtubeId: string;
  title: Localized;
};

export type ProductStatus = "available" | "inDevelopment" | "comingSoon" | "idea";

export type Product = {
  slug: string;
  status: ProductStatus;
  name: Localized;
  summary: Localized;
  /** Paragraphs separated by a blank line. */
  description: Localized;
  url?: string;
  repoUrl?: string;
  youtubeId?: string;
  /** Install-on-phone steps, for products shipped as a PWA. */
  installSteps?: Localized<string[]>;
};

export type LearningTrack = {
  id: string;
  title: Localized;
  description: Localized;
};

export type LearningYear = {
  id: string;
  title: Localized;
  description: Localized;
  tracks: LearningTrack[];
};

export type EntertainmentCategory = {
  id: string;
  title: Localized;
  /** YouTube links (or bare video IDs). The title and thumbnail are fetched from YouTube. */
  videos: string[];
};

export type EntertainmentGroup = {
  id: string;
  title: Localized;
  categories: EntertainmentCategory[];
};
