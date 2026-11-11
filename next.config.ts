import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { siteConfig } from "./src/config/site";

const isPreviewSite = process.env.NEXT_PUBLIC_SITE_ENV === "preview";

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.tunesalltagshilfe.de";
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
    if (!isPreviewSite) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
