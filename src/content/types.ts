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

/**
 * One step of a path, shown as a toggle: its topics, the YouTube videos to start with (links or bare IDs; title and
 * thumbnail are fetched from YouTube; a link with `list=` is a whole series, shown as a link to it) and the project
 * that proves it was learned.
 */
export type RoadmapLevel = { id: string; title: Localized; topics: RoadmapTopic[]; videos?: LevelVideo[]; project?: Localized };

/** A YouTube link a level starts with, optionally with what it covers (shown under it, e.g. for a series). */
export type LevelVideo = string | { url: string; about: Localized };

/** A path studied in order within its domain, at the learner's own pace (no timing). */
export type RoadmapPath = {
  id: string;
  title: Localized;
  description: Localized;
  levels: RoadmapLevel[];
  graduation?: Localized;
  /** A book series the path is studied from, level by level, each level with its books in order. */
  series?: BookSeries;
};

/** Where a book is read in the browser and where it is downloaded from. */
export type BookFile = { read: string; download: string };

/** A book of a series: what it covers, and (with its publisher's permission) its file in each language's edition. */
export type SeriesBook = { id: string; title: Localized; contents: Localized; file?: Localized<BookFile> };

/**
 * A recommended book series, e.g. Zad Academy's: its levels in order, each with its books in the order they are
 * studied and what each covers. A book gets read and download links only with its publisher's permission, whose
 * terms are shown with the books.
 */
export type BookSeries = {
  /** How long reading the series takes, shown at the top of the path. */
  reading: Localized;
  levels: { id: string; title: Localized; books: SeriesBook[] }[];
  /** The publisher's permission and its terms, shown above the levels once books can be read or downloaded. */
  permission?: Localized;
  /** Studying the series with its publisher, shown after the levels. */
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
