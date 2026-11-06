# دار الإسلام والتقنية | Dar Islam & Technology

> علمٌ نافع، وتقنيةٌ تصنع الأثر.

موقع دار الإسلام والتقنية: مبادرة تعليمية ودعوية مجانية ومفتوحة المصدر، تجمع العلم الشرعي والدعوة والتقنية. الموقع عربي (افتراضي) وإنجليزي.

The Dar Islam & Technology website — a free, open-source educational and da'wah initiative that brings together Islamic knowledge, da'wah and technology. Arabic (default) and English.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to the visitor's language (/ar or /en)
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/[lang]/          # every page lives under /ar or /en
    page.tsx           # Home
    content/           # Articles, news, featured videos (+ [slug] detail)
    entertainment/     # Recommended YouTube videos: groups → categories → videos
    products/          # Product cards (+ [slug] detail)
    learn/             # Two-year learning program plan, under construction
    contribute/ support/ about/ contact/
  app/globals.css      # design tokens: colors of both themes, fonts, shadows
  content/             # site content as typed data — edit these to publish
  i18n/dictionaries/   # UI text: ar.json (source of truth) and en.json
  config/site.ts       # email and social accounts
  proxy.ts             # sends / to the visitor's language (saved choice, else English browsers → /en, others → /ar)
docs/                  # site documentation (Arabic), current state only
```

## Documentation

How the site works today — its pages, adding content (articles, videos, products, entertainment videos), design, languages, SEO and the PWA — is documented in Arabic in [`docs/`](docs/README.md). Every change to the site updates the affected doc in the same change.

## License

The code is released under the [MIT License](LICENSE).

The license covers the code only. The name «دار الإسلام والتقنية» / "Dar Islam & Technology" and its logo are not licensed for reuse: forks must not present themselves as Dar Islam & Technology. Site content (articles, videos, Islamic texts) is not covered by the code license.

الترخيص MIT يغطي الكود فقط. اسم «دار الإسلام والتقنية» وشعارها غير مرخَّصين لإعادة الاستخدام، ولا يجوز لأي نسخة معدّلة أن تقدّم نفسها باسم الدار. محتوى الموقع (المقالات والفيديوهات والنصوص الشرعية) لا يدخل في ترخيص الكود.
