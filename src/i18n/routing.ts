import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  // German is the primary market: `/` always resolves to `/de`, regardless of browser language.
  localeDetection: false,
  // hreflang alternates are emitted in the HTML from the configured production origin instead.
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/impressum": { de: "/impressum", en: "/legal-notice" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const sectionIds = {
  de: {
    services: "leistungen",
    about: "ueber-uns",
    process: "ablauf",
    faq: "fragen",
    contact: "kontakt",
  },
  en: {
    services: "services",
    about: "about",
    process: "process",
    faq: "faq",
    contact: "contact",
  },
} as const satisfies Record<AppLocale, Record<string, string>>;

export type SectionKey = keyof (typeof sectionIds)["de"];
