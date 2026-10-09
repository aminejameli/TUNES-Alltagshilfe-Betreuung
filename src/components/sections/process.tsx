import { useLocale, useTranslations } from "next-intl";
import { sectionIds, type AppLocale } from "@/i18n/routing";
import { SectionHeading } from "./section-heading";

const steps = ["contact", "discuss", "plan"] as const;

export function Process() {
  const t = useTranslations("Process");
  const locale = useLocale() as AppLocale;

  return (
    <section
      id={sectionIds[locale].process}
      aria-labelledby="process-title"
      className="bg-surface-tint py-20 text-surface-tint-foreground sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" eyebrow={t("eyebrow")} title={t("title")} />

        <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          <span
            aria-hidden
            className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-0.5 bg-heading/20 md:block"
          />
          {steps.map((key, index) => (
            <li key={key} className="reveal relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span
                aria-hidden
                className="relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground ring-8 ring-surface-tint"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2 pt-2 md:pt-0">
                <h3 className="text-2xl font-bold tracking-tight">
                  <span className="sr-only">{t("stepLabel", { number: index + 1 })}: </span>
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="max-w-xs text-lg leading-relaxed">{t(`steps.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
