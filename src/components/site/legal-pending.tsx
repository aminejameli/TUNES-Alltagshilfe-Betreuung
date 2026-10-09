import { ArrowLeft, ClipboardList } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/** Preview-only placeholder for legal pages until verified, approved texts are supplied. */
export function LegalPending({ page }: { page: "impressum" | "privacy" }) {
  const t = useTranslations("Legal");
  const required = t.raw(`${page}.required`) as string[];

  return (
    <section aria-labelledby="legal-title" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="inline-flex rounded-full bg-[#fdf3d8] px-3 py-1 text-sm font-semibold text-[#4d3a00] dark:bg-[#33290d] dark:text-[#f6e3b0]">
        {t("pendingBadge")}
      </p>
      <h1 id="legal-title" className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {t(`${page}.title`)}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{t("pendingIntro")}</p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="flex items-center gap-2.5 text-xl font-bold">
          <ClipboardList aria-hidden className="size-5 text-accent-green-strong" />
          {t("requiredHeading")}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-lg marker:text-accent-green-strong">
          {required.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <Button asChild variant="outline" size="lg" className="mt-10">
        <Link href="/">
          <ArrowLeft aria-hidden />
          {t("backHome")}
        </Link>
      </Button>
    </section>
  );
}
