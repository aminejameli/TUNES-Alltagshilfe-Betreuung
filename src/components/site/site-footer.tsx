import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { isProduction, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { buildMailto } from "@/lib/mailto";
import { Logo } from "@/components/brand/logo";
import { EmailAddress } from "./email-address";
import { navSections, sectionHref } from "./nav-items";

const linkClass =
  "inline-flex min-h-11 items-center text-base text-foreground underline-offset-4 hover:text-heading hover:underline";

export function SiteFooter() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const tc = useTranslations("Common");
  // Legal links only appear in production once approved texts exist; the preview shows the placeholders.
  const showLegal = !isProduction || siteConfig.legalContentApproved;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label={tc("homeLink")} className="-m-1 self-start rounded-md p-1">
            <Logo className="w-[200px]" />
          </Link>
          <p className="text-lg font-semibold text-heading">{tc("slogan")}</p>
          <p className="text-base text-muted-foreground">{tc("serviceLanguages")}</p>
        </div>

        <nav aria-label={t("navLabel")}>
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {t("navHeading")}
          </h2>
          <ul className="mt-3 flex flex-col">
            {navSections.map((key) => (
              <li key={key}>
                <Link href={sectionHref(locale, key)} className={linkClass}>
                  {tn(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {t("contactHeading")}
          </h2>
          <p className="mt-3">
            <a href={buildMailto(tc("emailSubject"))} className={`${linkClass} font-semibold text-heading`}>
              <span>
                <EmailAddress email={siteConfig.email} />
              </span>
            </a>
          </p>
        </div>

        <div className="md:col-span-3 border-t border-border pt-8 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="shrink-0 bg-white px-3 py-2 rounded-lg border border-border shadow-xs">
              <Image
                src="/brand/mags-nrw-logo.png"
                alt="Ministerium für Arbeit, Gesundheit und Soziales des Landes Nordrhein-Westfalen"
                width={220}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              {locale === "de"
                ? "Anerkanntes Angebot zur Unterstützung im Alltag nach Landesrecht NRW (§ 45a SGB XI) · Abrechnung mit allen Pflegekassen möglich (Entlastungsbetrag nach § 45b SGB XI)."
                : "Recognised provider for everyday assistance under NRW state law (Section 45a SGB XI) · Direct billing with all German long-term care insurance funds."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span>IK-Nr.:</span>
            <span className="font-semibold text-heading">{siteConfig.ikNumber}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            {siteConfig.name} · {siteConfig.descriptor}
          </p>
          {showLegal && (
            <nav aria-label={t("legalLabel")}>
              <ul className="flex flex-wrap gap-x-6">
                <li>
                  <Link href="/impressum" className={`${linkClass} text-sm text-muted-foreground`}>
                    {t("impressum")}
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className={`${linkClass} text-sm text-muted-foreground`}>
                    {t("privacy")}
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
