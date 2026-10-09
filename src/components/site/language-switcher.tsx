"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<AppLocale, string> = { de: "Deutsch", en: "English" };

/** Links to the equivalent page in each language. Labels stay in their own language. */
export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const t = useTranslations("Preferences");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={className}>
      <ul className={cn("flex items-center gap-1", size === "lg" && "gap-2")}>
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l} className={cn(size === "lg" && "flex-1")}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-3 font-medium transition-colors",
                  size === "sm" ? "min-h-9 text-sm" : "min-h-11 w-full border border-border text-base",
                  active
                    ? "bg-surface-tint text-heading"
                    : "text-muted-foreground hover:text-heading hover:underline underline-offset-4",
                )}
              >
                {labels[l]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
