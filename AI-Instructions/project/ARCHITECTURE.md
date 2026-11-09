# Architecture

Next.js 16 (App Router, Cache Components, Turbopack) + React 19 + TypeScript + Tailwind CSS 4. Fully static: every page is prerendered at build time; no database, no API routes, no auth.

## Layout
```
next.config.ts              # security headers, Content-Security-Policy (production host only), vercel.app → domain redirect
SECURITY.md                 # how to report a vulnerability
public/og-image.png         # 1200×630 share image used by every page
src/
  proxy.ts                  # redirects paths without a locale to the saved language (cookie `locale`, set by the language switcher), else English for English browsers, else Arabic
  app/
    globals.css             # design tokens (colors, fonts, shadows, animations) — the only place for raw colors
    manifest.ts             # PWA web app manifest (name, start_url / → visitor's language, icons in public/icons/)
    sitemap.ts robots.ts    # /sitemap.xml (every page × locale with alternates) and /robots.txt
    icon.svg favicon.ico apple-icon.png   # generated from the logo paths in components/brand.tsx
    global-not-found.tsx    # bilingual 404 for URLs outside /[lang] (experimental.globalNotFound)
    [lang]/                 # root layout; every page lives under /ar or /en
      layout.tsx            # <html lang dir data-theme>, theme script, fonts, header, footer, metadata
      page.tsx              # Home
      content/ entertainment/ products/ learn/ contribute/ support/ about/ contact/
      content/[slug]/ products/[slug]/   # detail pages; generateStaticParams from src/content
      entertainment/channels/ entertainment/books/   # Entertainment: channel and book recommendations (videos stay at /entertainment)
      not-found.tsx
  components/               # root: only shared building blocks used across pages — ui.tsx (primitives), page-blocks.tsx, icons.tsx, pattern.tsx, brand.tsx (logo), tabs.tsx, copy-button.tsx. Everything else lives in a feature folder:
    layout/                 # the site shell: site-header (+ header-shell, mobile-menu, nav data, nav-link, language-switcher), site-footer, install-prompt (mobile install card)
    theme/                  # light/dark theme: colors.ts (theme-color values), theme-script (applied before paint), theme-toggle
    video/                  # youtube-player.tsx (the one YouTube iframe), video-card.tsx (thumbnail → player, one at a time), youtube-embed.tsx (a video shown in place)
    content/                # post-card.tsx
    products/               # product-status.ts (status order and colors)
    home/                   # the home page sections, one file each (home-hero, offer-section + bento-card, latest-posts, mission-section, roadmap-section, channel-section) + hero-visual; app/[lang]/page.tsx assembles them and adds the site JSON-LD
    entertainment/          # shared layout of the three Entertainment pages (hero, links between them, group tabs) + channel and book cards; video-rows.tsx: the videos sort buttons and one-row-per-category carousel; random-pick.tsx: the «اختر لي...» random pick button
  content/                  # site content as typed data (posts, videos, entertainment, products, learning program) + types.ts
  i18n/
    config.ts               # locales, direction, localePath()
    dictionaries.ts         # getLocale() / getDictionary() via next/root-params
    dictionaries/ar.json    # UI text — source of truth for the shape
    dictionaries/en.json    # must match ar.json's shape (type-checked)
  config/site.ts            # site URL, project email, Dar's and the founder's accounts, support links
  lib/cn.ts                 # clsx + tailwind-merge
  lib/seo.ts                # pageMetadata(): canonical, ar/en/x-default alternates, Open Graph/X card for every page
  lib/youtube.ts            # link → video id; title via YouTube oEmbed ("use cache", cacheLife days), hqdefault thumbnail; channel name and picture from the channel page's Open Graph tags (same cache); video views and publish date (getYouTubeDetails) via the YouTube Data API when `YOUTUBE_API_KEY` is set (Vercel env), else the watch page
```

## Data flow
- Locale comes from the `[lang]` root param (`next/root-params`), never from props drilled through components.
- UI strings come from the dictionaries; content entries carry both languages as `{ ar, en }`.
- Client components are limited to interactivity: header scroll state, mobile menu, nav active state, language switcher, theme script and toggle, tabs, video player, videos sort and carousel, random pick, copy button, install prompt (mobile install card).

## Cache Components constraints
- Dynamic routes must return at least one param from `generateStaticParams`; empty content lists return a placeholder slug that renders `notFound()`.
- `dynamicParams` segment config is not allowed.
- No `new Date()` / request-time APIs in server components without caching.
