export const siteConfig = {
  name: "TUNES",
  descriptor: "Alltagshilfe & Betreuung",
  legalName: "TUNES Alltagshilfe und Betreuung",
  legalForm: "Einzelunternehmen",
  owner: "Naim Bouzidi",
  email: "betreuung@tunesalltagshilfe.de",
  phone: "+4915565350177",
  phoneFormatted: "+49 155 65350177",
  taxNumber: "319/5069/6608",
  ikNumber: "462558393",
  sgbOffer: "Anerkanntes Angebot zur Unterstützung im Alltag (gemäß § 45a SGB XI)",
  /** Languages spoken by the team (ISO 639-1). Not the same as website translations. */
  serviceLanguages: ["de", "ar", "fr", "en"] as const,
  address: {
    street: "Hohenzollernstraße 55",
    postalCode: "45888",
    city: "Gelsenkirchen",
    state: "Nordrhein-Westfalen",
    country: "DE",
  },
  /** Service area for LocalBusiness structured data. */
  serviceArea: { city: "Gelsenkirchen", radiusKm: 30 },
  /**
   * Cal.com booking URL. Set to the full URL once the Cal.com account is ready.
   * While `null`, the booking CTA falls back to the email CTA.
   */
  calcomUrl: "https://cal.com/tunes-alltagshilfe/ersten-gesprach-zum-kennenlernen",
  /** Cal.com link embedded on /termin (username/event-slug). */
  calLink: "tunes-alltagshilfe/ersten-gesprach-zum-kennenlernen",
  /** Google Tag Manager container; loads only after analytics consent. */
  gtmId: "GTM-MM3T3RHF",
  /**
   * Set to `true` only once Impressum and Datenschutz texts have been supplied
   * and approved. Production builds fail while this is `false`.
   */
  legalContentApproved: true,
} as const;

export type SiteEnv = "production" | "preview";

export const siteEnv: SiteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV === "preview" ? "preview" : "production";

export const isProduction = siteEnv === "production";

const devPort = process.env.PORT ?? "4317";

/**
 * Absolute origin used for canonical URLs, hreflang, sitemap and structured data.
 * Defaults to the production domain https://www.tunesalltagshilfe.de.
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) return new URL(raw);
  if (isProduction || process.env.NODE_ENV === "production") {
    return new URL("https://www.tunesalltagshilfe.de");
  }
  return new URL(`http://localhost:${devPort}`);
}
