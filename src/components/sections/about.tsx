import { Handshake, Heart, Languages, LockKeyhole, UserRound, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { sectionIds, type AppLocale } from "@/i18n/routing";
import { LogoMark } from "@/components/brand/logo";
import { SectionHeading } from "./section-heading";

const values: { key: "reliable" | "discreet" | "humane" | "individual"; icon: LucideIcon }[] = [
  { key: "reliable", icon: Handshake },
  { key: "discreet", icon: LockKeyhole },
  { key: "humane", icon: Heart },
  { key: "individual", icon: UserRound },
];

export function About() {
  const t = useTranslations("About");
  const tc = useTranslations("Common");
  const locale = useLocale() as AppLocale;

  return (
    <section id={sectionIds[locale].about} aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="flex flex-col gap-8">
          <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />
          <p className="max-w-xl text-lg leading-relaxed sm:text-xl">{t("body")}</p>
          <p className="flex items-start gap-2.5 text-base text-muted-foreground">
            <Languages aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-green-strong" />
            {tc("serviceLanguages")}
          </p>
        </div>

        <div className="reveal flex flex-col gap-6">
          <h3 className="sr-only">{t("valuesLabel")}</h3>
          <ul className="grid gap-4 min-[420px]:grid-cols-2">
            {values.map(({ key, icon: Icon }) => (
              <li
                key={key}
                className="flex min-h-24 items-center gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-tint">
                  <Icon aria-hidden className="size-6 text-accent-green-strong" />
                </span>
                <span className="text-xl font-semibold text-heading">{t(`values.${key}`)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5 rounded-2xl bg-surface-tint p-6 sm:p-8">
            <LogoMark className="size-16 shrink-0 sm:size-20" />
            <p className="text-xl leading-snug font-bold text-heading sm:text-2xl">{tc("slogan")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
