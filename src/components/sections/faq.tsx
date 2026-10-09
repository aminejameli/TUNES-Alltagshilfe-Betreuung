import { useLocale, useTranslations } from "next-intl";
import { sectionIds, type AppLocale } from "@/i18n/routing";
import { buildMailto } from "@/lib/mailto";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EmailCta } from "@/components/site/email-cta";
import { SectionHeading } from "./section-heading";

export const faqKeys = ["services", "enquire", "relatives", "languages", "costs", "funding"] as const;

export function Faq() {
  const t = useTranslations("Faq");
  const tc = useTranslations("Common");
  const locale = useLocale() as AppLocale;
  const mailto = buildMailto(tc("emailSubject"));

  return (
    <section id={sectionIds[locale].faq} aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          <SectionHeading id="faq-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
          <EmailCta variant="outline" size="lg" className="self-start" />
        </div>

        <Accordion type="multiple" className="border-t border-border">
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="text-lg text-heading sm:text-xl">
                {t(`items.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl text-lg leading-relaxed">
                <p>
                  {t.rich(`items.${key}.answer`, {
                    email: (chunks) => (
                      <a
                        href={mailto}
                        className="font-semibold break-words text-heading underline underline-offset-4 hover:decoration-2"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
