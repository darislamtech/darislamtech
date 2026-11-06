# Project — Dar Islam & Technology website

## Purpose
Public website of **دار الإسلام والتقنية | Dar Islam & Technology**, a non-profit, open-source educational and da'wah initiative. Tagline: «علمٌ نافع، وتقنيةٌ تصنع الأثر.»
It aims to prepare scholars and callers with da'wah projects of their own, and programmers and technologists who build tech projects that serve Islam. It offers Islamic knowledge and da'wah first, then technology, plus cultural, awareness and beneficial entertainment content, and free, open-source digital products.

## Users
- Visitors (Arabic first, English second): young Muslims, students of Islamic knowledge, programmers and technologists, and anyone interested.
- Contributors (developers, designers, translators, testers, qualified Islamic reviewers) — through the GitHub repository `darislamtech/darislamtech`.

## Priorities
1. Truthfulness: never present a product, course, link or account as live before it is.
2. Arabic-first, correct RTL, equal-quality English.
3. Accessibility and performance.
4. Simple to maintain by one owner; content changes through pull requests.

## Current state
- Website v1 in the "Foundation" phase, live at https://darislamtech.com (Vercel). Sections: Home, Content, Entertainment, Products, Learn (under construction), Contribute, Support, About, Contact. Installable as a PWA.
- Entertainment lists 10 recommended videos, 33 YouTube channels and 14 books. Products lists four, none available yet: Dar Al-Adhkar (coming soon), Dar Al-Quran, Dar Al-Dirasa and Dar Al-Shubuhat (ideas). No articles or Content videos published yet; those pages show empty states.
- The logo is the owner's image (approved). The palette and fonts are not final yet.
- Name (approved by the owner): «دار الإسلام والتقنية» / "Dar Islam & Technology".
  - Logo lockup: `brand.short` («دار» / "Dar") over `brand.descriptor` («الإسلام والتقنية» / "Islam & Technology"); prose uses the full `brand.name`.
  - Accounts: `darislamtech` on YouTube, Facebook, Instagram, TikTok, GitHub, LinkedIn, Telegram, X and Qabilah; email `darislamtech@gmail.com`. Full list with links: `docs/accounts.md`. The site shows all of them (`src/config/site.ts`).
- Repository: `darislamtech/darislamtech` (public) in the GitHub organization `darislamtech` (owner: `marwan7egazy`). Code license: MIT; the name and logo are not licensed for reuse.
- Domain: `darislamtech.com` (owned). Hosting: Vercel Hobby (free; works because the organization repository is public).

## Task tracker
Notion workspace of the owner: page **tech & ai** (`https://app.notion.com/p/88dc94450f9b4872b5587a95c6916d31`), section «دار الإسلام والتقنية», and its database **مهام العمل دار الإسلام والتقنية — التأسيس والإطلاق**. The section also holds the owner's notes, the pre-launch checklist, the policies page and «ارشيف» (name, accounts, decisions and vision). Page-by-page descriptions of the site live in `docs/pages.md`, not in Notion. Working language: Arabic.
