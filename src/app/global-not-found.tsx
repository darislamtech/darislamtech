import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | دار الإسلام والتقنية",
};

// Rendered for URLs that match no route at all, outside the [lang] layout, so it is bilingual.
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="grid min-h-screen place-items-center bg-paper px-4 text-center font-sans">
        <main>
          <p className="font-mono text-7xl font-medium text-primary">404</p>
          <h1 className="mt-5 text-2xl font-bold text-ink">الصفحة غير موجودة</h1>
          <p lang="en" dir="ltr" className="mt-2 text-muted">
            Page not found
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/ar" className="rounded-full bg-primary-fill px-5 py-2.5 text-sm font-semibold text-on-primary">
              الرئيسية
            </Link>
            <Link
              href="/en"
              lang="en"
              className="rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink"
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
