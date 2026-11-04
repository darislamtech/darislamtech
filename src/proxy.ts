import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

// A visit without a locale in the URL opens in the language the visitor last chose with the language switcher;
// on a first visit, English when the browser's main language is English, otherwise Arabic.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment)) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  // Temporary redirect: the target depends on the visitor, so caches must vary on what decided it.
  const response = NextResponse.redirect(request.nextUrl);
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  // The browser's main language is the Accept-Language entry with the highest quality (the first one wins ties).
  let main = "";
  let mainQuality = -1;
  for (const entry of (request.headers.get("accept-language") ?? "").split(",")) {
    const [tag, ...params] = entry.trim().split(";");
    const quality = Number(params.find((param) => param.trim().startsWith("q="))?.trim().slice(2) ?? 1);
    if (tag && quality > mainQuality) {
      main = tag.toLowerCase().split("-")[0];
      mainQuality = quality;
    }
  }
  return main === "en" ? "en" : defaultLocale;
}

export const config = {
  // Skip Next.js internals and files with an extension (favicon.ico, images, ...).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
