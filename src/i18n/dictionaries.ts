import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import type ar from "./dictionaries/ar.json";

export type Dictionary = typeof ar;

// The Arabic dictionary is the source of truth; English must match its shape.
const dictionaries = {
  ar: () => import("./dictionaries/ar.json").then((m): Dictionary => m.default),
  en: () => import("./dictionaries/en.json").then((m): Dictionary => m.default),
};

export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getDictionary() {
  return dictionaries[await getLocale()]();
}
