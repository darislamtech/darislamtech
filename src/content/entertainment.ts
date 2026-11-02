import type { EntertainmentGroup } from "./types";

// Recommended videos for the Entertainment page. Add a YouTube link under its category; the title and
// thumbnail are fetched from YouTube automatically. The first group is the one shown by default.
export const entertainmentGroups: EntertainmentGroup[] = [
  {
    id: "cultural",
    title: { ar: "محتوى ترفيهي تثقيفي", en: "Cultural entertainment" },
    categories: [
      { id: "music", title: { ar: "الموسيقى والأغاني", en: "Music and songs" }, videos: [] },
      { id: "kpop", title: { ar: "فرق K-pop وBTS", en: "K-pop bands and BTS" }, videos: [] },
    ],
  },
  {
    id: "tech",
    title: { ar: "محتوى ترفيهي تقني", en: "Tech entertainment" },
    categories: [
      { id: "ai-jobs", title: { ar: "الذكاء الاصطناعي وسوق العمل", en: "AI and the job market" }, videos: [] },
      { id: "tokens", title: { ar: "الحفاظ على التوكنز", en: "Saving tokens" }, videos: [] },
    ],
  },
];
