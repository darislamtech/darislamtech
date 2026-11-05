import type { EntertainmentGroup } from "./types";

// Recommendations for the three Entertainment pages. Each group is a tab; videos, channels and books each have their
// own categories under it. Videos: a YouTube link (title and thumbnail are fetched). Channels: link and the name as
// written on the channel (name and picture are fetched). Books: title, author, why, optional cover.
// The first group is the one shown by default. How to add each: docs/content.md.
export const entertainmentGroups: EntertainmentGroup[] = [
  {
    id: "cultural",
    title: { ar: "محتوى ترفيهي تثقيفي", en: "Cultural entertainment" },
    videos: [
      { id: "music", title: { ar: "الموسيقى والأغاني", en: "Music and songs" }, items: [] },
      { id: "kpop", title: { ar: "فرق K-pop وBTS", en: "K-pop bands and BTS" }, items: [] },
    ],
    channels: [
      {
        id: "islamic",
        title: { ar: "العلم الشرعي والدعوة", en: "Islamic knowledge and da'wah" },
        items: [
          { url: "https://www.youtube.com/@Dr.Haitham_Talaat", name: "د. هيثم طلعت Dr. Haitham Talaat" },
          { url: "https://www.youtube.com/@eyadqunaibi", name: "الدكتور إياد قنيبي - القناة الرسمية" },
          { url: "https://www.youtube.com/@amgad_samir", name: "أمجد سمير" },
          { url: "https://www.youtube.com/@y.salama", name: "ياسر سلامة - Yasser Salama" },
          { url: "https://www.youtube.com/@AlHuwayni", name: "الشيخ أبو إسحاق الحويني" },
          { url: "https://www.youtube.com/@fedaaadeen", name: "Fedaadeen فداءالدين" },
          { url: "https://www.youtube.com/@مؤسسةوعي", name: "مؤسسة وعي" },
          { url: "https://www.youtube.com/@abdullahrushdy", name: "abdullah rushdy-عبدالله رشدي" },
          { url: "https://www.youtube.com/@mo7amed-al5zragy", name: "محمد الخزرجي (أبوسفيان)" },
          { url: "https://www.youtube.com/@amrnoureldeen", name: "عمرو نور الدين Amr Nour ELdeen" },
          { url: "https://www.youtube.com/@albhbhany", name: "البحبحاني" },
          { url: "https://www.youtube.com/@waleedismail1", name: "وليد إسماعيل الدافع" },
          { url: "https://www.youtube.com/@RamyEissa", name: "رامي عيسى ( للمهتدين )" },
          { url: "https://www.youtube.com/@AntiShubohat", name: "قناة مكافح الشبهات" },
          { url: "https://www.youtube.com/@Fayezalkandary", name: "فايز الكندري | Fayez Alkandary" },
          { url: "https://www.youtube.com/@mo3az3lian", name: "moaz alian معاذ عليان" },
          { url: "https://www.youtube.com/@Dr.Ibrahem_Emam", name: "Ibrahim Emam - الساخر الهادف" },
          { url: "https://www.youtube.com/@3laaHamed", name: "Alaa Hamed - علاء حامد" },
          { url: "https://www.youtube.com/@hishamsedqialibrashi", name: "هشام صدقي الإبراشي" },
          { url: "https://www.youtube.com/@AcademyZAD", name: "برنامج أكاديمية زاد - Zad academy" },
        ],
      },
    ],
    books: [],
  },
  {
    id: "tech",
    title: { ar: "محتوى ترفيهي تقني", en: "Tech entertainment" },
    videos: [
      { id: "ai-jobs", title: { ar: "الذكاء الاصطناعي وسوق العمل", en: "AI and the job market" }, items: [] },
      { id: "tokens", title: { ar: "الحفاظ على التوكنز", en: "Saving tokens" }, items: [] },
    ],
    channels: [
      {
        id: "programming",
        title: { ar: "البرمجة", en: "Programming" },
        items: [
          { url: "https://www.youtube.com/@ElzeroWebSchool", name: "Elzero Web School" },
          { url: "https://www.youtube.com/@GhareebElshaikh", name: "غريب الشيخ || Ghareeb Elshaikh" },
          { url: "https://www.youtube.com/@BashmohandesMazen", name: "Bashmohandes Mazen - بشمهندس مازن" },
          { url: "https://www.youtube.com/@yehiatech", name: "Yehia Tech يحيى تك" },
          { url: "https://www.youtube.com/@Learn_Simply", name: "اتعلم ببساطة" },
          { url: "https://www.youtube.com/@FathyAndAbusrea", name: "Fathy & Abusrea - فتحي و أبوسريع" },
          { url: "https://www.youtube.com/@SimpleArabCode", name: "Simple Arab Code" },
          { url: "https://www.youtube.com/@freecodecamp", name: "freeCodeCamp.org" },
          { url: "https://www.youtube.com/@tarmeez", name: "أكاديمية ترميز" },
          { url: "https://www.youtube.com/@MagdyBytes", name: "أحمد مجدي - MagdyBytes" },
          { url: "https://www.youtube.com/@ArabicCompetitiveProgramming", name: "Arabic Competitive Programming" },
          { url: "https://www.youtube.com/@kariimnabiil", name: "Kariim Nabiil - كريم نبيل" },
          { url: "https://www.youtube.com/@Limbo0x01", name: "MrLimbo" },
        ],
      },
    ],
    books: [],
  },
];
