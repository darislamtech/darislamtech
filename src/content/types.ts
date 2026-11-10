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

/** A topic of a roadmap level, optionally with what it covers. */
export type RoadmapTopic = { id: string; title: Localized; points?: Localized<string[]> };

/** One step of a path, shown as a toggle: its topics and the project that proves it was learned. */
export type RoadmapLevel = { id: string; title: Localized; topics: RoadmapTopic[]; project?: Localized };

/** A path studied in order within its domain, at the learner's own pace (no timing). */
export type RoadmapPath = {
  id: string;
  title: Localized;
  description: Localized;
  levels: RoadmapLevel[];
  graduation?: Localized;
  /** A book series the path is studied from, shown as its subjects one under another, each with its books. */
  series?: BookSeries;
};

/**
 * A recommended book series, e.g. Zad Academy's: its subjects in order, each with one book per level. Books are listed
 * by name only (no download or read links) unless their publisher allows sharing them.
 */
export type BookSeries = {
  /** How long reading the series takes, shown at the top of the path. */
  reading: Localized;
  subjects: { id: string; title: Localized; books: { title: Localized; pages: number }[] }[];
  /** Studying the series with its publisher, shown after the subjects. */
  study: { body: Localized; label: Localized; url: Localized };
};

/** A domain of the Learn program (Islamic, technology), with its paths in order. */
export type RoadmapDomain = { id: "sharia" | "tech"; title: Localized; description: Localized; paths: RoadmapPath[] };

export type RecommendedVideo = {
  /** YouTube link (or bare video ID). The title and thumbnail are fetched from YouTube. */
  url: string;
  /** When we added it, e.g. "2026-11-06T21:30". Newest first by default; the category with the newest video goes on top. */
  added: string;
};

export type RecommendedChannel = {
  /** YouTube channel link (youtube.com/@handle or youtube.com/channel/...). Name and picture are fetched from YouTube. */
  url: string;
  /** The name as written on the channel; shown only when YouTube can't be read. */
  name: string;
};

export type RecommendedBook = {
  title: string;
  /** Shown under the title; given for Islamic books only (owner's choice). */
  author?: string;
  /** Cover image in public/, e.g. "/entertainment/books/<name>.jpg". Without it a plain cover with the title is drawn. */
  cover?: string;
};

export type EntertainmentCategory<Item> = {
  id: string;
  title: Localized;
  items: Item[];
};

/** One tab of the Entertainment pages. Videos, channels and books each have their own categories under it. */
export type EntertainmentGroup = {
  id: string;
  title: Localized;
  videos: EntertainmentCategory<RecommendedVideo>[];
  channels: EntertainmentCategory<RecommendedChannel>[];
  books: EntertainmentCategory<RecommendedBook>[];
};
