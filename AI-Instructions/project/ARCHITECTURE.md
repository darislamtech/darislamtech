# Architecture

Next.js 16 (App Router, Cache Components, Turbopack) + React 19 + TypeScript + Tailwind CSS 4. Fully static: every page is prerendered at build time; no database, no API routes, no auth.

## Layout
```
src/
  proxy.ts                  # redirects paths without a locale to /ar (Arabic is always the default)
  app/
    globals.css             # design tokens (colors, fonts, shadows, animations) — the only place for raw colors
    manifest.ts             # PWA web app manifest (name, start_url /ar, icons in public/icons/)
    icon.svg favicon.ico apple-icon.png   # generated from the logo paths in components/brand.tsx
    global-not-found.tsx    # bilingual 404 for URLs outside /[lang] (experimental.globalNotFound)
    [lang]/                 # root layout; every page lives under /ar or /en
      layout.tsx            # <html lang dir data-theme>, theme script, fonts, header, footer, metadata
      page.tsx              # Home
      content/ entertainment/ products/ learn/ contribute/ about/ contact/
      content/[slug]/ products/[slug]/   # detail pages; generateStaticParams from src/content
      not-found.tsx
  components/               # shared UI (ui.tsx primitives, page-blocks.tsx, header/footer, icons, pattern)
    home/                   # home-only components
  content/                  # site content as typed data (posts, videos, entertainment, products, learning program) + types.ts
  i18n/
    config.ts               # locales, direction, localePath()
    dictionaries.ts         # getLocale() / getDictionary() via next/root-params
    dictionaries/ar.json    # UI text — source of truth for the shape
    dictionaries/en.json    # must match ar.json's shape (type-checked)
  config/site.ts            # project email and the social accounts that actually exist
  lib/cn.ts                 # clsx + tailwind-merge
  lib/youtube.ts            # link → video id; title via YouTube oEmbed ("use cache", cacheLife days), hqdefault thumbnail
```

## Data flow
- Locale comes from the `[lang]` root param (`next/root-params`), never from props drilled through components.
- UI strings come from the dictionaries; content entries carry both languages as `{ ar, en }`.
- Client components are limited to interactivity: header scroll state, mobile menu, nav active state, language switcher, theme script and toggle, tabs, video player, copy button.

## Cache Components constraints
- Dynamic routes must return at least one param from `generateStaticParams`; empty content lists return a placeholder slug that renders `notFound()`.
- `dynamicParams` segment config is not allowed.
- No `new Date()` / request-time APIs in server components without caching.
