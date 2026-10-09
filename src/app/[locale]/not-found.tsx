import { ArrowRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { EmailCta } from "@/components/site/email-cta";
import { sectionHref } from "@/components/site/nav-items";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const locale = useLocale() as AppLocale;

  return (
    <section aria-labelledby="not-found-title" className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:py-28">
      <LogoMark className="size-24" />
      <p className="mt-6 text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">404</p>
      <h1 id="not-found-title" className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 text-lg leading-relaxed">{t("body")}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Button asChild size="lg">
          <Link href="/">
            <Home aria-hidden />
            {t("home")}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={sectionHref(locale, "services")}>
            {t("services")}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
        <EmailCta variant="ghost" size="lg" />
      </div>
    </section>
  );
}
