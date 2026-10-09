import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { siteConfig } from "./src/config/site";

const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production";

// Publication guard: a production build must not ship placeholder legal pages or a missing origin.
if (isProductionSite && process.argv.includes("build")) {
  const missing: string[] = [];
  if (!process.env.NEXT_PUBLIC_SITE_URL) missing.push("NEXT_PUBLIC_SITE_URL (final domain)");
  if (!siteConfig.legalContentApproved) missing.push("approved Impressum and Datenschutz (siteConfig.legalContentApproved)");
  if (missing.length > 0) {
    throw new Error(
      `Production build blocked. Missing publication inputs:\n- ${missing.join("\n- ")}\nSee docs/publication-checklist.md.`,
    );
  }
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    if (isProductionSite) return [];
    // Belt and braces for preview deployments: never indexable, even if robots.txt is ignored.
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
