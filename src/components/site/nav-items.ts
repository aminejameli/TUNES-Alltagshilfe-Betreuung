import { sectionIds, type AppLocale, type SectionKey } from "@/i18n/routing";

export const navSections: SectionKey[] = ["services", "about", "process", "faq", "contact"];

export function sectionHref(locale: AppLocale, key: SectionKey) {
  return { pathname: "/" as const, hash: sectionIds[locale][key] };
}
