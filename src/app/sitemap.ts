import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing, type AppPathname } from "@/i18n/routing";
import { absoluteUrl, localizedPath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: AppPathname[] = ["/"];
  if (siteConfig.legalContentApproved) pages.push("/impressum", "/datenschutz");

  return pages.flatMap((href) => {
    const languages = Object.fromEntries([
      ...routing.locales.map((l) => [l, absoluteUrl(localizedPath(l, href))]),
      ["x-default", absoluteUrl(localizedPath(routing.defaultLocale, href))],
    ]);
    return routing.locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, href)),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.3,
      alternates: { languages },
    }));
  });
}
