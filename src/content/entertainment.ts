import type { EntertainmentGroup } from "./types";

// Recommendations for the three Entertainment pages. Each group is a tab; videos, channels and books each have their
// own categories under it. Videos: a YouTube link and when we added it (title, thumbnail and views are fetched).
// Channels: link and the name as written on the channel (name and picture are fetched). Books: title and cover
// (author for Islamic books only). The first group is the one shown by default. How to add each: docs/content.md.
export const entertainmentGroups: EntertainmentGroup[] = [
  {
    id: "cultural",
    title: { ar: "محتوى ترفيهي تثقيفي", en: "Cultural entertainment" },
    videos: [
      {
        id: "music",
        title: { ar: "الموسيقى والأغاني", en: "Music and songs" },
        items: [
          { url: "https://www.youtube.com/watch?v=S9QMNG9Lt9I", added: "2026-11-05T21:40" },
          { url: "https://www.youtube.com/watch?v=G7PyaAorVHE", added: "2026-11-05T21:41" },
        ],
      },
      {
        id: "kpop",
        title: { ar: "فرق K-pop وBTS", en: "K-pop bands and BTS" },
        items: [
          { url: "https://www.youtube.com/watch?v=xhBMQKo5wDc", added: "2026-11-05T21:43" },
          { url: "https://www.youtube.com/watch?v=DgVo0HqJtgM", added: "2026-11-05T21:44" },
          { url: "https://www.youtube.com/watch?v=KZQlfUGoky8", added: "2026-11-05T21:50" },
          { url: "https://www.youtube.com/watch?v=DfAuJSQu3pI", added: "2026-11-06T01:20" },
        ],
      },
      { id: "quran-clips", title: { ar: "تلاوات قرآنية قصيرة", en: "Short Quran recitations" }, items: [] },
      {
        id: "quran-reflections",
        title: { ar: "تدبرات قرآنية", en: "Quranic reflections" },
        items: [{ url: "https://www.youtube.com/watch?v=s0-kPcacIcw", added: "2026-11-06T18:21" }],
      },
      {
        id: "nasheeds",
        title: { ar: "أناشيد وابتهالات", en: "Nasheeds and devotional chants" },
        items: [
          { url: "https://www.youtube.com/watch?v=bXATUAGDNuM", added: "2026-11-06T18:10" },
          { url: "https://www.youtube.com/watch?v=x4yQdbPidhE", added: "2026-11-06T18:15" },
          { url: "https://www.youtube.com/watch?v=_-CBrlKxz9k", added: "2026-11-06T18:16" },
        ],
      },
      { id: "islamic-figures", title: { ar: "شخصيات إسلامية", en: "Islamic figures" }, items: [] },
      {
        id: "asceticism",
        title: { ar: "الزهد وحقيقة الدنيا", en: "Asceticism and the truth about this world" },
        items: [
          { url: "https://www.youtube.com/watch?v=TWgFmxN0TGE", added: "2026-11-06T18:25" },
          { url: "https://www.youtube.com/watch?v=akKm9tZo7yI", added: "2026-11-06T18:28" },
        ],
      },
      { id: "advice", title: { ar: "نصائح", en: "Advice" }, items: [] },
      { id: "fatwas", title: { ar: "فتاوى", en: "Fatwas" }, items: [] },
      {
        id: "islamic-studies",
        title: { ar: "طلب العلم الشرعي", en: "Studying Islamic knowledge" },
        items: [{ url: "https://www.youtube.com/watch?v=K9m35qrKtTE", added: "2026-11-06T18:26" }],
      },
      {
        id: "family",
        title: { ar: "الأسرة والمجتمع", en: "Family and society" },
        items: [
          { url: "https://www.youtube.com/watch?v=pm1PRg-_q5g", added: "2026-11-06T18:20" },
          { url: "https://www.youtube.com/watch?v=SoNssPRyQTE", added: "2026-11-06T18:23" },
        ],
      },
      {
        id: "doubts",
        title: { ar: "الإلحاد والرد على الشبهات", en: "Atheism and answering doubts" },
        items: [
          { url: "https://www.youtube.com/watch?v=LquO5LWcf6Y", added: "2026-11-06T18:22" },
          { url: "https://www.youtube.com/watch?v=3WVIycBGRRE", added: "2026-11-06T18:24" },
        ],
      },
      { id: "comparative-religion", title: { ar: "مقارنة الأديان والمناظرات", en: "Comparative religion and debates" }, items: [] },
      {
        id: "feminism",
        title: { ar: "النسوية", en: "Feminism" },
        items: [
          { url: "https://www.youtube.com/watch?v=BlLAcYrMR5M", added: "2026-11-06T01:10" },
          { url: "https://www.youtube.com/watch?v=cnjq7I7yMoY", added: "2026-11-06T01:11" },
          { url: "https://www.youtube.com/watch?v=iHvae7hb_q0", added: "2026-11-06T01:12" },
          { url: "https://www.youtube.com/watch?v=_EQpPmK-3jE", added: "2026-11-06T01:21" },
        ],
      },
      { id: "secularism", title: { ar: "العلمانية", en: "Secularism" }, items: [] },
      { id: "kemetism", title: { ar: "الكمايتة والعنصرية", en: "Kemetism and racism" }, items: [] },
      { id: "colonialism", title: { ar: "جرائم الاستعمار", en: "Crimes of colonialism" }, items: [] },
    ],
    channels: [
      {
        id: "doubts",
        title: { ar: "الإلحاد والرد على الشبهات", en: "Atheism and answering doubts" },
        items: [
          { url: "https://www.youtube.com/@Dr.Haitham_Talaat", name: "د. هيثم طلعت Dr. Haitham Talaat" },
          { url: "https://www.youtube.com/@abdullahrushdy", name: "abdullah rushdy-عبدالله رشدي" },
          { url: "https://www.youtube.com/@mo7amed-al5zragy", name: "محمد الخزرجي (أبوسفيان)" },
          { url: "https://www.youtube.com/@amrnoureldeen", name: "عمرو نور الدين Amr Nour ELdeen" },
          { url: "https://www.youtube.com/@albhbhany", name: "البحبحاني" },
          { url: "https://www.youtube.com/@AntiShubohat", name: "قناة مكافح الشبهات" },
        ],
      },
      {
        id: "islamic-thought",
        title: { ar: "الفكر والوعي الإسلامي", en: "Islamic thought and awareness" },
        items: [
          { url: "https://www.youtube.com/@eyadqunaibi", name: "الدكتور إياد قنيبي - القناة الرسمية" },
          { url: "https://www.youtube.com/@fedaaadeen", name: "Fedaadeen فداءالدين" },
          { url: "https://www.youtube.com/@مؤسسةوعي", name: "مؤسسة وعي" },
          { url: "https://www.youtube.com/@Dr.Ibrahem_Emam", name: "Ibrahim Emam - الساخر الهادف" },
          { url: "https://www.youtube.com/@marwan7egazy", name: "Marwan Hegazy - مروان حجازي" },
        ],
      },
      {
        id: "sermons",
        title: { ar: "دروس ومواعظ", en: "Lessons and sermons" },
        items: [
          { url: "https://www.youtube.com/@amgad_samir", name: "أمجد سمير" },
          { url: "https://www.youtube.com/@AlHuwayni", name: "الشيخ أبو إسحاق الحويني" },
          { url: "https://www.youtube.com/@Fayezalkandary", name: "فايز الكندري | Fayez Alkandary" },
          { url: "https://www.youtube.com/@3laaHamed", name: "Alaa Hamed - علاء حامد" },
        ],
      },
      {
        id: "comparative-religion",
        title: { ar: "مقارنة الأديان والمناظرات", en: "Comparative religion and debates" },
        items: [
          { url: "https://www.youtube.com/@waleedismail1", name: "وليد إسماعيل الدافع" },
          { url: "https://www.youtube.com/@RamyEissa", name: "رامي عيسى ( للمهتدين )" },
          { url: "https://www.youtube.com/@mo3az3lian", name: "moaz alian معاذ عليان" },
          { url: "https://www.youtube.com/@hishamsedqialibrashi", name: "هشام صدقي الإبراشي" },
        ],
      },
      {
        id: "quran",
        title: { ar: "القرآن الكريم وحفظه", en: "The Quran and memorizing it" },
        items: [{ url: "https://www.youtube.com/@y.salama", name: "ياسر سلامة - Yasser Salama" }],
      },
      {
        id: "islamic-studies",
        title: { ar: "طلب العلم الشرعي", en: "Studying Islamic knowledge" },
        items: [{ url: "https://www.youtube.com/@AcademyZAD", name: "برنامج أكاديمية زاد - Zad academy" }],
      },
    ],
    books: [
      {
        id: "tafsir",
        title: { ar: "تفسير القرآن الكريم", en: "Quran exegesis (tafsir)" },
        items: [
          { title: "تفسير السعدي", author: "عبد الرحمن بن ناصر السعدي" },
          { title: "تفسير ابن كثير", author: "ابن كثير" },
          { title: "تفسير الطبري", author: "ابن جرير الطبري" },
        ],
      },
      {
        id: "hadith",
        title: { ar: "الحديث النبوي", en: "Hadith" },
        items: [
          { title: "صحيح البخاري", author: "الإمام البخاري" },
          { title: "صحيح مسلم", author: "الإمام مسلم" },
        ],
      },
      {
        id: "purification",
        title: { ar: "تزكية النفس", en: "Purifying the soul" },
        items: [{ title: "الداء والدواء", author: "ابن قيم الجوزية" }],
      },
      {
        id: "doubts",
        title: { ar: "الإلحاد والرد على الشبهات", en: "Atheism and answering doubts" },
        items: [{ title: "بصائر", author: "د. هيثم طلعت" }],
      },
    ],
  },
  {
    id: "tech",
    title: { ar: "محتوى ترفيهي تقني", en: "Tech entertainment" },
    videos: [
      {
        id: "ai-jobs",
        title: { ar: "الذكاء الاصطناعي وسوق العمل", en: "AI and the job market" },
        items: [{ url: "https://www.youtube.com/watch?v=qNZJSUg6eBs", added: "2026-11-06T18:19" }],
      },
      { id: "tokens", title: { ar: "الحفاظ على التوكنز", en: "Saving tokens" }, items: [] },
    ],
    channels: [
      {
        id: "ai-software",
        title: { ar: "الذكاء الاصطناعي وهندسة البرمجيات", en: "AI and software engineering" },
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
        ],
      },
      {
        id: "automation",
        title: { ar: "الأتمتة", en: "Automation" },
        items: [{ url: "https://www.youtube.com/@kariimnabiil", name: "Kariim Nabiil - كريم نبيل" }],
      },
      {
        id: "cybersecurity",
        title: { ar: "الأمن السيبراني", en: "Cybersecurity" },
        items: [{ url: "https://www.youtube.com/@Limbo0x01", name: "MrLimbo" }],
      },
      { id: "digital-marketing", title: { ar: "التسويق الرقمي", en: "Digital marketing" }, items: [] },
    ],
    // Covers from Open Library (covers.openlibrary.org).
    books: [
      {
        id: "clean-code",
        title: { ar: "جودة الكود وهندسة البرمجيات", en: "Code quality and software engineering" },
        items: [
          { title: "Clean Code", cover: "/entertainment/books/clean-code.jpg" },
          { title: "Clean Architecture", cover: "/entertainment/books/clean-architecture.jpg" },
          { title: "Code Complete", cover: "/entertainment/books/code-complete.jpg" },
        ],
      },
      {
        id: "design-patterns",
        title: { ar: "أنماط التصميم والبرمجة الكائنية", en: "Design patterns and object-oriented programming" },
        items: [
          { title: "Design Patterns", cover: "/entertainment/books/design-patterns.jpg" },
          { title: "Learning Patterns", cover: "/entertainment/books/learning-patterns.jpg" },
          { title: "The Object-Oriented Thought Process", cover: "/entertainment/books/object-oriented-thought-process.jpg" },
        ],
      },
      {
        id: "algorithms",
        title: { ar: "الخوارزميات", en: "Algorithms" },
        items: [{ title: "Introduction to Algorithms", cover: "/entertainment/books/introduction-to-algorithms.jpg" }],
      },
    ],
  },
];
