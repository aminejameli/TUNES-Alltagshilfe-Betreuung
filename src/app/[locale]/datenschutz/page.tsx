import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { isProduction, siteConfig } from "@/config/site";
import { localizedAlternates } from "@/lib/seo";
import { LegalPending } from "@/components/site/legal-pending";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Legal.privacy");
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/datenschutz"),
    robots: siteConfig.legalContentApproved && isProduction ? undefined : { index: false, follow: true },
  };
}

export default function DatenschutzPage() {
  if (isProduction && !siteConfig.legalContentApproved) notFound();
  // Swap the placeholder for the approved privacy policy text before setting legalContentApproved.
  return <LegalPending page="privacy" />;
}
