import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import { getDirection, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { THEME_COLORS } from "@/components/theme";
import { ThemeScript } from "@/components/theme-script";
import "../globals.css";

// The fonts are not final yet; all three cover Arabic and Latin where needed.
const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-readex",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Light is the default theme; ThemeScript updates this meta tag when the visitor has chosen dark.
export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
};

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { default: `${dict.brand.name} | ${dict.brand.tagline}`, template: `%s | ${dict.brand.name}` },
    description: dict.meta.description,
    // Name and status bar when the site is added to the iOS home screen (the manifest covers other platforms).
    appleWebApp: { capable: true, title: dict.brand.short, statusBarStyle: "default" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    // data-theme may be switched to "dark" by ThemeScript before hydration, hence suppressHydrationWarning.
    <html
      lang={locale}
      dir={getDirection(locale)}
      data-theme="light"
      suppressHydrationWarning
      className={`${readex.variable} ${plexArabic.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before hydration. */}
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary-fill focus:px-4 focus:py-2 focus:text-on-primary"
        >
          {dict.nav.skipToContent}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
