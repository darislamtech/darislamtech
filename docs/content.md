# إضافة المحتوى وتعديل النصوص

كل المحتوى يُضاف يدويًا في ملفات داخل `src/content/` عبر Pull Request. كل نص يُكتب باللغتين: `{ ar: "...", en: "..." }`. النصوص الطويلة تُفصل فقراتها بسطر فارغ.

## مقال أو خبر — `src/content/posts.ts`
أضف عنصرًا في أول القائمة (الأحدث أولًا):

```ts
{
  slug: "what-is-ai",            // جزء الرابط: /ar/content/what-is-ai
  kind: "article",               // "article" مقال، أو "news" خبر
  date: "2026-11-01",
  title: { ar: "...", en: "..." },
  summary: { ar: "...", en: "..." },
  body: { ar: "فقرة أولى\n\nفقرة ثانية", en: "..." },
  youtubeId: "xxxxxxxxxxx",      // اختياري: فيديو مرتبط
}
```

## فيديو في صفحة المحتوى — `src/content/videos.ts`
`{ youtubeId: "xxxxxxxxxxx", title: { ar: "...", en: "..." } }` — الفيديو يبقى على يوتيوب ويُعرض داخل الموقع.

## فيديو في صفحة الترفيه — `src/content/entertainment.ts`
الصق رابط يوتيوب في قائمة `videos` الخاصة بالتصنيف:

```ts
{ id: "music", title: { ar: "الموسيقى والأغاني", en: "Music and songs" }, videos: ["https://youtu.be/xxxxxxxxxxx"] }
```

- العنوان والصورة المصغّرة يُجلبان من يوتيوب تلقائيًا، بدون وصف.
- الروابط المقبولة: `youtu.be/...`، `youtube.com/watch?v=...`، روابط shorts وembed وlive، أو معرّف الفيديو وحده.
- الرابط الخاطئ أو الفيديو المحذوف لا يظهر.
- **تصنيف جديد:** عنصر جديد `{ id, title: { ar, en }, videos: [] }` داخل `categories`.
- **فئة جديدة (تبويب):** عنصر جديد `{ id, title: { ar, en }, categories: [...] }`. أول فئة في القائمة هي الافتراضية.

## منتج — `src/content/products.ts`

```ts
{
  slug: "dar-hifz",
  status: "inDevelopment",       // available | inDevelopment | comingSoon | idea
  name: { ar: "...", en: "..." },
  summary: { ar: "...", en: "..." },
  description: { ar: "...", en: "..." },
  url: "https://...",            // اختياري: رابط المنتج
  repoUrl: "https://github.com/...", // اختياري: الكود المصدري
  youtubeId: "xxxxxxxxxxx",      // اختياري: فيديو تعريفي
  installSteps: { ar: ["...", "..."], en: ["...", "..."] }, // اختياري: التثبيت على الهاتف
}
```

لا يُعلَّم منتج بـ `available` قبل إطلاقه فعليًا.

## برنامج تعلّم — `src/content/learn.ts`
البرنامج مقسّم سنوات، وكل سنة فيها مسارات:

```ts
{
  id: "foundation",
  title: { ar: "السنة الأولى: سنة تأسيسية", en: "..." },
  description: { ar: "مسار واحد للجميع.", en: "..." },
  tracks: [{ id: "foundation", title: { ar, en }, description: { ar, en } }],
}
```

القسم كله «تحت الإنشاء» حتى توجد مادة تعليمية حقيقية. أيقونة ولون كل مسار يُحدَّدان حسب `id` في `src/app/[lang]/learn/page.tsx`.

## نصوص الواجهة
كل نصوص الصفحات والأزرار في `src/i18n/dictionaries/ar.json` و`en.json`. الملفان بنفس الشكل تمامًا؛ أي نص يُضاف أو يُعدّل في الاثنين.

**مواضيع صفحة المحتوى:** في `topics` داخل الملفين، وهي مجموعتان بالترتيب: المواضيع الدينية والدعوية ثم المواضيع التقنية، ولكل مجموعة `title` و`items`. موضوع جديد = عنصر جديد في `items` بالعربي والإنجليزي.

## البريد وحسابات التواصل
في `src/config/site.ts`، ومعها القائمة في [accounts.md](accounts.md) تُحدَّث في نفس التعديل. لا يُضاف إلا حساب موجود فعلًا.

## طرق الدعم المادي (صفحة «ادعمنا»)
في `supportLinks` داخل `src/config/site.ts`، مثلًا `{ name: "Ko-fi", href: "https://ko-fi.com/..." }` أو `{ name: "PayPal", href: "https://paypal.me/..." }`. القائمة فارغة الآن، فتعرض الصفحة «نجهّز طرق الدعم المادي». لا يُضاف رابط قبل أن يكون الحساب مفعّلًا.

## المحتوى الشرعي
الآيات والأذكار والأحكام لا تُضاف إلا من مصادر موثوقة وبمراجعة مؤهلين.
