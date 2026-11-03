# Project rules

## Business rules (from the owner's decisions in Notion)
- Dar Islam & Technology is non-profit: no ads, and no paid products, courses or subscriptions. Financial support is optional and lives only on the support page (`/support`). Its wording is "support the project" / "support the content": never "donation" (تبرع) or "charity" (صدقة), and no WhatsApp contact for payments. The words "free" / «مجاني», "non-profit" / «غير ربحية» and "open source" / «مفتوح المصدر» appear only on the home page and the support page; the rest of the site (including the footer) does not repeat them.
- "Non-profit" describes the mission; never claim it is a registered charity.
- All products are free and open source. Never mark a product `available` before it actually launches; product statuses are `available`, `inDevelopment`, `comingSoon`, `idea`.
- "Learn" is under construction: it shows the plan of a two-year program (a foundation year with one track, then a specialization year with two tracks) and no lessons until real material exists. This plan is the owner's initial idea: never describe it on the site as an "initial idea".
- Videos stay on YouTube and are embedded only, added by hand (no automatic import).
- Entertainment videos show only the YouTube title and thumbnail (no description); the player loads in the page on click (`components/video-card.tsx`, youtube-nocookie).
- The founder's name and personal accounts (`marwan7egazy`) appear only in the contact card of the support page («مروان حجازي — المؤسس والمشرف»); no photo.
- Only link accounts and channels that exist (`src/config/site.ts`, listed in `docs/accounts.md`). No Snapchat.
- Islamic content needs trusted sources and qualified review; never add verses, adhkar or rulings from unverified sources.
- Design decisions (logo, colors, fonts, page layouts) are discussed with the owner before they are treated as approved.

## Mobile — check on every change (owner's rule, added by claude)
- Mobile first: check every changed page at phone width (≈375px) in Arabic and English and in both themes. No horizontal page scroll, touch targets at least 44px, and grids that collapse to one column. Give `next/image` a real `sizes`.
- Report in the final summary which mobile widths were checked.

## SEO — build every page on these basics (owner's rule, added by claude)
SEO matters to the owner. Apply these on every new or changed page:
- Every page exports `generateMetadata` with its own title and description from the dictionaries (both locales). Write them for people, with the words visitors actually search for and no keyword stuffing. Titles follow the layout template `Page | دار الإسلام والتقنية`.
- One `h1` per page; headings follow order (`h2` under it, `h3` under that), never skipped for styling.
- The brand name «دار الإسلام والتقنية» stays readable as text. The logo SVG is decorative (`aria-hidden`); the logo link's accessible name contains the brand name.
- Content that should be indexed is rendered on the server. Interactive parts (tabs, players) receive server-rendered content and only hide or show it, never fetch it on the client.
- Meaningful images get descriptive `alt` text; decorative ones get `alt=""`.
- Internal links use `next/link` with descriptive link text; URLs are short readable English slugs (`/entertainment`, `/products/<slug>`).
- Use semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`) and keep `<html lang dir>` correct per locale.
- Deferred until the end of the project, because they need the final domain: `metadataBase`, `sitemap.xml`, `robots.txt`, ar/en `hreflang` alternates, Open Graph images. Do not start these before the owner asks.

## Documentation — `docs/` (owner's rule, added by claude)
- `docs/` is the organized explanation of the site, written in Arabic: `README.md` (index), `pages.md`, `content.md`, `design.md`, `languages-seo-pwa.md`, `accounts.md`.
- Every change to the site updates the affected doc in the same change, following `core/reporting.md`: docs describe the current state only, so outdated text is rewritten or deleted, never kept as history.
- A new page, content type or feature gets its section in the matching doc. A new doc is listed in `docs/README.md`. A doc whose subject no longer exists is deleted and removed from the index.
- `docs/` describes what the site is and how to use it; binding rules (must / must not) live in `RULES.md` and file locations in `ARCHITECTURE.md`. When a value appears in both (for example a color), change both in the same edit.

## Conventions
- Site copy: Islamic knowledge and da'wah always come before technology in every title, list and ordering. The Islamic side addresses the Muslim; the tech side addresses every person (e.g. «ما لا يسع المسلمَ جهلُه في دينه، وما لا يسع الإنسانَ جهلُه في التقنية»). Keep the current style: simple, warm Modern Standard Arabic. The approved definition, mission, vision and ambition are in `docs/README.md`.
- Every user-facing string goes in both `ar.json` and `en.json`; content entries carry `{ ar, en }`.
- Arabic is the default locale and must read correctly in RTL: use logical utilities (`ms-`, `pe-`, `start-`, `end-`), flip directional icons with `rtl:`, and wrap mixed-direction snippets with `<bdi>` or `dir`.
- No letter-spacing on Arabic text (it breaks letter joining); apply tracking with `ltr:` only.
- Colors only through the tokens in `globals.css`. No raw hex/rgb in components. Two themes, set by `data-theme` on `<html>`:
  - Light (default): white leaning very slightly grey #F7F7F8 (neutral, not warm or cream), cards #FDFDFD, charcoal text #29292B, calm green accent #3E6B53, gold buttons #DDA853 with charcoal text (same "gold = action" as the dark theme).
  - Dark: deep green page #17382F (glow #24483D), charcoal panels #29292B, cream text #F3F0E4. Gold #F0C982 only on buttons, the logo's door and ornaments; links and generic accents are blue #9EC0EE.
  - Four cheerful tones (owner: gold #F0C982, rose #FFBDB3, mint #A0E0C3, blue #9EC0EE) as `tone-gold|rose|mint|blue` (+ `-soft`). Every element takes its own tone so each page uses all four — not one tone per section. In the light theme the text uses a deep shade of the hue on a pastel fill. Use `Tone` / `toneText` / `toneDot` from `components/ui.tsx` and the `tone` props of `Badge`, `IconTile`, `Eyebrow`, `SectionHeading` (`eyebrowTone`) and `PageHero` (`eyebrowTone`).
  - The visitor's choice is stored in `localStorage` (`theme`) and applied before paint by `components/theme-script.tsx`; the toggle is `components/theme-toggle.tsx`. Use the `dark:` variant only for things tokens cannot express.
  - Page = `paper`; full-width alternate sections = `band`; cards = `surface` with `shadow-panel`; elements inside cards = `surface-2`.
  - Text = `ink` / `ink-2` / `muted`. Accent text, links and icons = `primary`; button fill = `primary-fill` with `on-primary` text (they differ in the light theme).
  - Primitive scales (`sand-*`, `emerald-*`, `gold-*`, `lapis-*`, `madder-*`) only for small decorative details.
  - Every new text/background pair must meet WCAG AA (4.5:1, or 3:1 for large text and UI marks) on every surface of both themes.
  - Product status colors come from `components/product-status.ts`.
- Logo: `components/brand.tsx`, traced from the owner's logo image (a house-shaped arch spelling «دار» with a gold door). Tokens `logo` (left half), `logo-deep` (right half) and `logo-accent` (door): greens #2A513F / #1C3A2F and gold #D0A368 in light, cream #F3F0E4 / #DDD8C6 and gold #F0C982 in dark. The favicon and app icons show the image's own colors on its cream #F8F5EB. `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` and `public/icons/*` are generated from the same paths.
- PWA: `app/manifest.ts` (installable, opens on `/ar`, standalone, RTL) with the icons in `public/icons/` (192, 512 and a maskable 512). No service worker yet: no offline mode and no notifications.
- Reuse primitives in `components/ui.tsx` and `components/page-blocks.tsx` before adding new ones.
- Animations must respect `prefers-reduced-motion`.
- Read the relevant guide in `node_modules/next/dist/docs/` before using a Next.js API.
