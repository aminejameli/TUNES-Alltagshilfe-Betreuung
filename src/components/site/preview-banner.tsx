import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

export function PreviewBanner() {
  const t = useTranslations("Common");
  return (
    <aside aria-label={t("previewLabel")} className="bg-[#fdf3d8] text-[#4d3a00] dark:bg-[#33290d] dark:text-[#f6e3b0]">
      <p className="mx-auto flex max-w-7xl items-start gap-2.5 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
        {t("previewBanner")}
      </p>
    </aside>
  );
}
