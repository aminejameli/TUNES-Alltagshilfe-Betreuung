import type { Metadata } from "next";
import { CalendarCheck, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/seo";
import { CalEmbed } from "@/components/booking/cal-embed";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Booking");
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/termin"),
  };
}

export default async function TerminPage() {
  const t = await getTranslations("Booking");

  return (
    <section aria-labelledby="booking-title" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl space-y-3">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-accent-green/15 px-3 py-1 text-xs font-semibold tracking-wider text-accent-green-strong uppercase">
          <CalendarCheck aria-hidden className="size-3.5" />
          {t("eyebrow")}
        </p>
        <h1 id="booking-title" className="text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
          {t("heading")}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">{t("intro")}</p>
        <p className="flex flex-wrap items-center gap-x-2 text-base">
          <Phone aria-hidden className="size-4 text-accent-green-strong" />
          <span className="text-muted-foreground">{t("phoneHint")}</span>
          <a href={`tel:${siteConfig.phone}`} className="font-semibold text-heading underline underline-offset-4">
            {siteConfig.phoneFormatted}
          </a>
        </p>
      </div>

      <div className="mt-8">
        <CalEmbed />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {t("privacyNote")}{" "}
        <Link href="/datenschutz" className="underline underline-offset-4">
          {t("privacyLink")}
        </Link>
        .
      </p>
    </section>
  );
}
