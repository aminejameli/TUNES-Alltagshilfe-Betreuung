import { Languages, Mail, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { sectionIds, type AppLocale } from "@/i18n/routing";
import { buildMailto } from "@/lib/mailto";
import { CopyEmailButton } from "@/components/site/copy-email-button";
import { EmailAddress } from "@/components/site/email-address";
import { EmailCta } from "@/components/site/email-cta";
import { Eyebrow } from "./section-heading";

export function Contact() {
  const t = useTranslations("Contact");
  const tc = useTranslations("Common");
  const locale = useLocale() as AppLocale;

  return (
    <section id={sectionIds[locale].contact} aria-labelledby="contact-title" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal rounded-3xl bg-band px-6 py-12 text-band-foreground [--ring:var(--band-ring)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div className="flex flex-col gap-5">
              <Eyebrow className="text-band-muted [&>span]:bg-accent-green">{t("eyebrow")}</Eyebrow>
              <h2
                id="contact-title"
                tabIndex={-1}
                className="text-3xl leading-tight font-bold tracking-tight text-band-foreground outline-none sm:text-4xl lg:text-5xl"
              >
                {t("title")}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-band-muted sm:text-xl">{t("body")}</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-band-muted uppercase">
                  <Mail aria-hidden className="size-4" />
                  {t("emailLabel")}
                </p>
                <a
                  href={buildMailto(tc("emailSubject"))}
                  className="text-2xl leading-snug font-bold text-band-foreground underline decoration-white/40 underline-offset-[6px] hover:decoration-white sm:text-3xl lg:text-2xl xl:text-[1.75rem]"
                >
                  <EmailAddress email={siteConfig.email} />
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-band-muted uppercase">
                  <Phone aria-hidden className="size-4" />
                  {t("phoneLabel")}
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-xl leading-snug font-bold text-band-foreground underline decoration-white/40 underline-offset-[6px] hover:decoration-white"
                >
                  0155 6535 0177
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <EmailCta variant="band" size="lg" />
                <CopyEmailButton email={siteConfig.email} className="min-h-13 px-5" />
              </div>
              <p className="flex items-start gap-2.5 text-base text-band-muted">
                <Languages aria-hidden className="mt-0.5 size-5 shrink-0" />
                {tc("serviceLanguages")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
