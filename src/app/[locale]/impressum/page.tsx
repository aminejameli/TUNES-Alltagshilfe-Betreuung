import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, Building2, FileCheck, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Legal.impressum");
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/impressum"),
  };
}

export default async function ImpressumPage() {
  const locale = await getLocale();
  const isGerman = locale === "de";

  return (
    <section aria-labelledby="impressum-title" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Back button */}
      <Button asChild variant="outline" size="sm" className="mb-8">
        <Link href="/">
          <ArrowLeft aria-hidden className="mr-1.5 size-4" />
          {isGerman ? "Zurück zur Startseite" : "Back to homepage"}
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-3">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-accent-green/15 px-3 py-1 text-xs font-semibold tracking-wider text-accent-green-strong uppercase">
          <ShieldCheck aria-hidden className="size-3.5" />
          {isGerman ? "Rechtliche Angaben" : "Legal Information"}
        </p>
        <h1 id="impressum-title" className="text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
          {isGerman ? "Impressum" : "Legal Notice (Impressum)"}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          {isGerman
            ? "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV"
            : "Information pursuant to Section 5 DDG (Digital Services Act) and Section 18 (2) MStV"}
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {/* Company & Provider */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <Building2 aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "Diensteanbieter" : "Service Provider"}
          </h2>
          <div className="mt-4 space-y-2 text-base text-foreground sm:text-lg">
            <p className="font-semibold text-heading">{siteConfig.legalName}</p>
            <p className="text-muted-foreground">
              {isGerman ? "Rechtsform:" : "Legal form:"} {siteConfig.legalForm}
            </p>
            <p>
              <span className="text-muted-foreground">{isGerman ? "Inhaber:" : "Owner:"}</span>{" "}
              <strong className="font-medium text-heading">{siteConfig.owner}</strong>
            </p>
          </div>
        </div>

        {/* Address & Contact */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
              <MapPin aria-hidden className="size-5 text-accent-green-strong" />
              {isGerman ? "Anschrift" : "Address"}
            </h2>
            <address className="mt-4 not-italic text-base text-foreground sm:text-lg leading-relaxed">
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
              <p className="text-muted-foreground">Deutschland</p>
            </address>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
              <Phone aria-hidden className="size-5 text-accent-green-strong" />
              {isGerman ? "Kontakt" : "Contact"}
            </h2>
            <div className="mt-4 space-y-2.5 text-base sm:text-lg">
              <p className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground uppercase">{isGerman ? "Tel:" : "Phone:"}</span>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
                >
                  {siteConfig.phoneFormatted}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground uppercase">E-Mail:</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground uppercase">Web:</span>
                <a
                  href="https://www.tunesalltagshilfe.de"
                  className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
                >
                  www.tunesalltagshilfe.de
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Tax, IK & Care Recognition */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <FileCheck aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "Steuer & Abrechnungsdaten" : "Tax & Billing Identifiers"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-background/60 p-4 border border-border/60">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {isGerman ? "Steuernummer" : "Tax Number"}
              </p>
              <p className="mt-1 text-lg font-bold text-heading">{siteConfig.taxNumber}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{isGerman ? "Finanzamt Gelsenkirchen" : "Tax Office Gelsenkirchen"}</p>
            </div>

            <div className="rounded-xl bg-background/60 p-4 border border-border/60">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {isGerman ? "Institutionskennzeichen (IK-Nr.)" : "Institution Identifier (IK-Nr.)"}
              </p>
              <p className="mt-1 text-lg font-bold text-heading">{siteConfig.ikNumber}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{isGerman ? "Zur Abrechnung mit Pflegekassen" : "For care insurance billing"}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-accent-green/30 bg-accent-green/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 text-sm sm:text-base text-foreground leading-relaxed">
            <div className="shrink-0 bg-white p-2.5 rounded-lg border border-border shadow-xs">
              <Image
                src="/brand/mags-nrw-logo.png"
                alt="Ministerium für Arbeit, Gesundheit und Soziales des Landes Nordrhein-Westfalen"
                width={220}
                height={44}
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <strong className="font-semibold text-heading">{isGerman ? "Anerkennung im Pflegebereich:" : "Care Insurance Recognition:"}</strong>{" "}
              {isGerman
                ? "Anerkanntes Angebot zur Unterstützung im Alltag gemäß § 45a SGB XI (Landesrecht Nordrhein-Westfalen). Leistungen können über den Entlastungsbetrag (§ 45b SGB XI) direkt mit allen Pflegekassen abgerechnet werden."
                : "Recognised offer for everyday assistance under Section 45a SGB XI (State Law of North Rhine-Westphalia). Services can be billed directly through the relief allowance (Section 45b SGB XI) with long-term care insurance funds."}
            </div>
          </div>
        </div>

        {/* Responsible for content */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-bold text-heading">
            {isGerman ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" : "Responsible for Content (Section 18 (2) MStV)"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground leading-relaxed">
            <strong className="font-medium text-heading">{siteConfig.owner}</strong>
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.city}
          </p>
        </div>

        {/* Dispute Resolution */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <Scale aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "Streitschlichtung" : "Dispute Resolution"}
          </h2>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {isGerman
                ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:"
                : "The European Commission provides a platform for online dispute resolution (ODR):"}{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <p>
              {isGerman
                ? `Unsere E-Mail-Adresse finden Sie oben im Impressum (${siteConfig.email}).`
                : `Our email address can be found above in this legal notice (${siteConfig.email}).`}
            </p>
            <p>
              {isGerman
                ? "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
                : "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."}
            </p>
          </div>
        </div>

        {/* Liability Disclaimer */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-bold text-heading">
            {isGerman ? "Haftungsausschluss" : "Disclaimer"}
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-semibold text-heading mb-1">{isGerman ? "Haftung für Inhalte" : "Liability for Content"}</h3>
              <p>
                {isGerman
                  ? "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
                  : "As a service provider, we are responsible for our own content on these pages under general law pursuant to Section 7 (1) DDG. However, pursuant to Sections 8 to 10 DDG, we are not obligated to monitor transmitted or stored external information or to investigate circumstances that indicate illegal activity."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-heading mb-1">{isGerman ? "Haftung für Links" : "Liability for Links"}</h3>
              <p>
                {isGerman
                  ? "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich."
                  : "Our website contains links to external websites of third parties over whose content we have no influence. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-heading mb-1">{isGerman ? "Urheberrecht" : "Copyright"}</h3>
              <p>
                {isGerman
                  ? "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
                  : "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
