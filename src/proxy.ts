import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

// Every visit without a locale in the URL opens in Arabic, whatever the browser language;
// visitors switch to English with the language switcher.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment)) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next.js internals and files with an extension (favicon.ico, images, ...).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
