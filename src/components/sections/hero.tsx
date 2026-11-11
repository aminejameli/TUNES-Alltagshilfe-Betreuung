import { ArrowDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { EmailCta } from "@/components/site/email-cta";
import { sectionHref } from "@/components/site/nav-items";
import { Eyebrow } from "./section-heading";

export function Hero() {
  const t = useTranslations("Hero");
  const tc = useTranslations("Common");
  const locale = useLocale() as AppLocale;

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="flex flex-col gap-6 sm:gap-8">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            id="hero-title"
            className="text-[2.5rem] leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            <span className="block">{t("titleLine1")}</span>
            <span className="block">{t("titleLine2")}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed sm:text-xl">{t("body")}</p>
          <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <EmailCta size="lg" />
            <Button asChild variant="outline" size="lg">
              <Link href={sectionHref(locale, "services")}>
                {t("secondaryCta")}
                <ArrowDown aria-hidden />
              </Link>
            </Button>
          </div>
          <p className="flex items-start gap-2.5 text-base text-muted-foreground">
            <Languages aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-green-strong" />
            {tc("serviceLanguages")}
          </p>
        </div>

        <div className="reveal mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <div className="relative flex aspect-square flex-col items-center justify-center gap-6 rounded-[2rem] bg-surface-tint p-8 sm:p-12">
            <LogoMark className="w-3/4" />
            <p className="text-center text-base font-semibold text-heading sm:text-lg">
              {tc("slogan")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
