import Image, { type StaticImageData } from "next/image";
import { Footprints, MessageCircleHeart, ShoppingBasket, Sparkles, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { sectionIds, type AppLocale } from "@/i18n/routing";
import { EmailCta } from "@/components/site/email-cta";
import accompanimentImage from "@/assets/images/service-accompaniment-street.jpg";
import errandsImage from "@/assets/images/service-groceries-kitchen.jpg";
import householdImage from "@/assets/images/service-household-living-room.jpg";
import companionshipImage from "@/assets/images/service-walk-companionship.jpg";
import { SectionHeading } from "./section-heading";

const services: { key: "household" | "errands" | "accompaniment" | "companionship"; icon: LucideIcon; image: StaticImageData }[] = [
  { key: "household", icon: Sparkles, image: householdImage },
  { key: "errands", icon: ShoppingBasket, image: errandsImage },
  { key: "accompaniment", icon: Footprints, image: accompanimentImage },
  { key: "companionship", icon: MessageCircleHeart, image: companionshipImage },
];

export function Services() {
  const t = useTranslations("Services");
  const tc = useTranslations("Common");
  const locale = useLocale() as AppLocale;

  return (
    <section
      id={sectionIds[locale].services}
      aria-labelledby="services-title"
      className="border-y border-border bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="services-title" title={t("title")} intro={t("intro")} />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map(({ key, icon: Icon, image }) => (
            <li
              key={key}
              className="reveal flex flex-col overflow-hidden rounded-2xl border border-border bg-background"
            >
              <figure className="relative aspect-[16/10] overflow-hidden bg-surface-tint">
                <Image
                  src={image}
                  alt={t(`items.${key}.imageAlt`)}
                  placeholder="blur"
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                  className="size-full object-cover"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                  {tc("illustrativeImage")}
                </figcaption>
              </figure>
              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                <span className="mb-1 inline-flex size-12 items-center justify-center rounded-xl bg-surface-tint">
                  <Icon aria-hidden className="size-6 text-accent-green-strong" />
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{t(`items.${key}.title`)}</h3>
                <p className="text-lg leading-relaxed">{t(`items.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-start">
          <EmailCta size="lg" label={t("cta")} />
        </div>
      </div>
    </section>
  );
}
