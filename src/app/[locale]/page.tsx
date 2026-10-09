import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteUrl, siteConfig } from "@/config/site";
import { absoluteUrl, jsonLd, localizedAlternates, localizedPath } from "@/lib/seo";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Faq, faqKeys } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: localizedAlternates(locale, "/"),
    openGraph: { title: t("title"), description: t("description"), url: absoluteUrl(localizedPath(locale, "/")) },
  };
}

async function StructuredData() {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");
  const tf = await getTranslations("Faq");
  const ts = await getTranslations("Services");
  const tc = await getTranslations("Common");
  const origin = getSiteUrl().toString();
  const orgId = `${origin}#organization`;
  const pageUrl = absoluteUrl(localizedPath(locale, "/"));

  // Only facts visible on the page. LocalBusiness/address data is added once verified (see siteConfig).
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: siteConfig.name,
      alternateName: t("siteName"),
      url: origin,
      logo: absoluteUrl("/brand/tunes-logo.png"),
      email: siteConfig.email,
      slogan: tc("slogan"),
      description: t("description"),
      knowsLanguage: [...siteConfig.serviceLanguages],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.email,
        availableLanguage: [...siteConfig.serviceLanguages],
      },
      makesOffer: (["household", "errands", "accompaniment", "companionship"] as const).map((key) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: ts(`items.${key}.title`), description: ts(`items.${key}.body`) },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${origin}#website`,
      url: origin,
      name: t("siteName"),
      inLanguage: ["de", "en"],
      publisher: { "@id": orgId },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: locale,
      mainEntity: faqKeys.map((key) => ({
        "@type": "Question",
        name: tf(`items.${key}.question`),
        acceptedAnswer: {
          "@type": "Answer",
          text: tf.markup(`items.${key}.answer`, { email: (chunks) => chunks }),
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Services />
      <About />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
