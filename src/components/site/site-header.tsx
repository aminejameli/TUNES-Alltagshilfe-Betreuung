import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { buildMailto } from "@/lib/mailto";
import { Logo } from "@/components/brand/logo";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { EmailCta } from "./email-cta";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { navSections, sectionHref } from "./nav-items";

export function SiteHeader() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const tp = useTranslations("Preferences");
  const items = navSections.map((key) => ({ label: t(key), href: sectionHref(locale, key) }));

  return (
    <>
      <aside aria-label={tp("label")} className="hidden border-b border-border bg-surface lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-1.5">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Languages aria-hidden className="size-4 text-accent-green-strong" />
            {tc("serviceLanguages")}
          </p>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </aside>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-(--header-height) max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={tc("homeLink")}
            className="-m-1 shrink-0 rounded-md p-1"
          >
            <Logo className="w-[150px] min-[360px]:w-[176px] sm:w-[200px]" />
          </Link>

          <nav aria-label={t("label")} className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {items.map((item) => (
                <li key={item.href.hash}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-heading underline-offset-8 hover:underline hover:decoration-accent-green hover:decoration-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <EmailCta className="hidden sm:inline-flex" />
            <EmailCta className="sm:hidden" iconOnly />
            <div className="lg:hidden">
              <MobileMenu
                items={items}
                emailHref={buildMailto(tc("emailSubject"))}
                emailLabel={tc("emailCta")}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
