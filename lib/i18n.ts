import { headers } from "next/headers";

export const LOCALES = ["en", "fr", "es", "zh", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  zh: "中文",
  ja: "日本語",
};

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  const preferred = accept.split(",")[0].split(";")[0].trim().slice(0, 2).toLowerCase();
  return (LOCALES as readonly string[]).includes(preferred)
    ? (preferred as Locale)
    : DEFAULT_LOCALE;
}

export async function getMessages(locale: Locale) {
  return (await import(`../messages/${locale}.json`)).default as typeof import("../messages/en.json");
}

export function resolveLabel(
  labels: unknown,
  locale: Locale
): string | null {
  if (!labels || typeof labels !== "object" || Array.isArray(labels)) return null;
  const map = labels as Record<string, string>;
  return map[locale] ?? map.en ?? null;
}
