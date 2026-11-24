import type { Product } from "./types";

// Every product is free and open source. Never mark a product "available" before it is actually launched.
export const products: Product[] = [
  {
    slug: "dar-adhkar",
    status: "available",
    name: { ar: "دار الأذكار", en: "Dar Al-Adhkar" },
    url: "https://darazkar.vercel.app/",
    summary: { ar: "موقع يجمع الأذكار كلها في مكان واحد.", en: "A website that brings all the adhkar together in one place." },
    description: {
      ar: "دار الأذكار موقع يجمع جميع الأذكار في مكان واحد، لتصل إلى الذكر الذي تحتاجه بسهولة.",
      en: "Dar Al-Adhkar is a website that gathers all the adhkar in one place, so you can easily find the one you need.",
    },
    installSteps: {
      ar: [
        "افتح الموقع darazkar.vercel.app من متصفح هاتفك.",
        "على أندرويد: اضغط زر «تثبيت التطبيق» في الموقع، أو افتح قائمة Chrome (⋮) واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية» ثم «تثبيت».",
        "على الآيفون: افتح الموقع من Safari، واضغط زر المشاركة (أو زر ⋯ ثم «مشاركة»)، ثم «إضافة إلى الشاشة الرئيسية».",
        "افتح دار الأذكار من أيقونته على الشاشة، ويعمل بعدها حتى بدون إنترنت.",
      ],
      en: [
        "Open darazkar.vercel.app in your phone's browser.",
        "On Android: tap the site's «تثبيت التطبيق» (Install app) button, or open Chrome's menu (⋮) and choose Install app, or Add to home screen and then Install.",
        "On iPhone: open the site in Safari, tap the Share button (or the ⋯ button, then Share), then Add to Home Screen.",
        "Open Dar Al-Adhkar from its icon on your home screen; it then works even without internet.",
      ],
    },
  },
  {
    slug: "dar-quran",
    status: "idea",
    name: { ar: "دار القرآن", en: "Dar Al-Quran" },
    summary: {
      ar: "منصة للقرآن الكريم فيها أقسام للقراءة والحفظ والتدبر.",
      en: "A Quran platform with sections for reading, memorizing and reflecting.",
    },
    description: {
      ar: "دار القرآن فكرة لمنصة تخدم القرآن الكريم في ثلاثة أقسام: القراءة، والحفظ، والتدبر.",
      en: "Dar Al-Quran is an idea for a platform that serves the Quran in three sections: reading, memorizing and reflecting.",
    },
  },
  {
    slug: "dar-study",
    status: "idea",
    name: { ar: "دار الدراسة", en: "Dar Al-Dirasa" },
    summary: {
      ar: "أداة تساعد الطالب في المذاكرة: ملاحظات ومهام ومؤقت وتنظيم.",
      en: "A tool that helps students study: notes, tasks, a timer and planning.",
    },
    description: {
      ar: "دار الدراسة فكرة لأداة تساعد الطالب في المذاكرة، فيها أقسام للملاحظات، والمهام، ومؤقت للمذاكرة، وتنظيم الوقت، وغيرها.",
      en: "Dar Al-Dirasa is an idea for a tool that helps students study, with sections for notes, tasks, a study timer, planning and more.",
    },
  },
  {
    slug: "dar-shubuhat",
    status: "idea",
    name: { ar: "دار الشبهات", en: "Dar Al-Shubuhat" },
    summary: {
      ar: "شات بوت بالذكاء الاصطناعي يرد على الشبهات والتساؤلات تلقائيًا لمن يريد الوصول إلى الحق.",
      en: "An AI chatbot that answers doubts and questions automatically for anyone seeking the truth.",
    },
    description: {
      ar: "دار الشبهات فكرة لشات بوت بالذكاء الاصطناعي (AI) يرد على الشبهات والتساؤلات بشكل آلي، لكل شخص يريد الوصول إلى الحق.",
      en: "Dar Al-Shubuhat is an idea for an AI chatbot that answers doubts and questions automatically, for anyone who wants to reach the truth.",
    },
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
