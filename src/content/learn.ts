import type { LearningYear } from "./types";

// The Learn program is under construction: no lessons are published until real learning material exists.
export const learningYears: LearningYear[] = [
  {
    id: "foundation",
    title: { ar: "السنة الأولى: سنة تأسيسية", en: "Year one: the foundation year" },
    description: { ar: "مسار واحد للجميع.", en: "One track for everyone." },
    tracks: [
      {
        id: "foundation",
        title: { ar: "المسار التأسيسي", en: "Foundation track" },
        description: {
          ar: "ما لا يسع المسلمَ جهلُه في دينه، وما لا يسع الإنسانَ جهلُه في التقنية واستخدام الأدوات الحديثة في حياته.",
          en: "What every Muslim must know of their religion, and what every person must know of technology and using modern tools in daily life.",
        },
      },
    ],
  },
  {
    id: "specialization",
    title: { ar: "السنة الثانية: سنة التخصص", en: "Year two: the specialization year" },
    description: { ar: "مساران للتخصص.", en: "Two specialization tracks." },
    tracks: [
      {
        id: "sharia",
        title: { ar: "المسار الديني والدعوي", en: "Islamic knowledge and da'wah track" },
        description: { ar: "العلم الشرعي والدعوة.", en: "Islamic knowledge and da'wah." },
      },
      {
        id: "tech",
        title: { ar: "المسار التقني وبناء المشاريع", en: "Technology and building projects track" },
        description: { ar: "التقنية وبناء المشاريع.", en: "Technology and building projects." },
      },
    ],
  },
];
