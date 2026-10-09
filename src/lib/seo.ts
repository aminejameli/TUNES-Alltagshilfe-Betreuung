import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale, type AppPathname } from "@/i18n/routing";

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export function localizedPath(locale: AppLocale, href: AppPathname) {
  return getPathname({ locale, href });
}

/** Canonical plus reciprocal hreflang (de, en) with German as the deliberate x-default. */
export function localizedAlternates(locale: AppLocale, href: AppPathname): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(localizedPath(l, href));
  languages["x-default"] = absoluteUrl(localizedPath(routing.defaultLocale, href));
  return { canonical: absoluteUrl(localizedPath(locale, href)), languages };
}

/** Serialises JSON-LD safely for inline <script> tags. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
