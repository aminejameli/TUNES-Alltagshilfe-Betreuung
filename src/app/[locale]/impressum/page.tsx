import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { isProduction, siteConfig } from "@/config/site";
import { localizedAlternates } from "@/lib/seo";
import { LegalPending } from "@/components/site/legal-pending";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Legal.impressum");
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/impressum"),
    robots: siteConfig.legalContentApproved && isProduction ? undefined : { index: false, follow: true },
  };
}

export default function ImpressumPage() {
  if (isProduction && !siteConfig.legalContentApproved) notFound();
  // Swap the placeholder for the approved Impressum text before setting legalContentApproved.
  return <LegalPending page="impressum" />;
}
