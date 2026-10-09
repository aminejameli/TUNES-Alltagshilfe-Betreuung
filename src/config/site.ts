export const siteConfig = {
  name: "TUNES",
  descriptor: "Alltagshilfe & Betreuung",
  email: "betreuung@tunesalltagshilfe.de",
  /** Languages spoken by the team (ISO 639-1). Not the same as website translations. */
  serviceLanguages: ["de", "ar", "fr", "en"] as const,
  /**
   * Verified local information. Keep `null` until the client confirms it —
   * it drives visible copy and LocalBusiness structured data.
   */
  serviceArea: null as null | { city: string; radiusKm: number },
  /**
   * Set to `true` only once Impressum and Datenschutz texts have been supplied
   * and approved. Production builds fail while this is `false`.
   */
  legalContentApproved: false,
} as const;

export type SiteEnv = "production" | "preview";

export const siteEnv: SiteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "preview";

export const isProduction = siteEnv === "production";

const devPort = process.env.PORT ?? "4317";

/**
 * Absolute origin used for canonical URLs, hreflang, sitemap and structured data.
 * Production must set NEXT_PUBLIC_SITE_URL; preview falls back to localhost and is
 * never indexable (see robots.ts and the X-Robots-Tag header in next.config.ts).
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) return new URL(raw);
  if (isProduction) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set for production builds.");
  }
  return new URL(`http://localhost:${devPort}`);
}
