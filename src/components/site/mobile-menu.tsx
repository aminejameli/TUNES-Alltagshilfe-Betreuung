"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { LanguageSwitcher } from "./language-switcher";

type Item = { label: string; href: { pathname: "/"; hash: string } };

export function MobileMenu({
  items,
  emailHref,
  emailLabel,
}: {
  items: Item[];
  emailHref: string;
  emailLabel: string;
}) {
  const t = useTranslations("Nav");
  const tp = useTranslations("Preferences");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pending = useRef<Item["href"] | null>(null);

  function onItemClick(event: MouseEvent<HTMLAnchorElement>, href: Item["href"]) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    // Navigate once the dialog has released its scroll lock, otherwise the jump is swallowed.
    event.preventDefault();
    pending.current = href;
    setOpen(false);
  }

  function onCloseAutoFocus(event: Event) {
    const href = pending.current;
    if (!href) return;
    event.preventDefault();
    pending.current = null;
    router.push(href);
    requestAnimationFrame(() => {
      const target = document.getElementById(href.hash);
      target?.scrollIntoView({ block: "start" });
      target?.focus({ preventScroll: true });
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label={open ? t("menuClose") : t("menuOpen")}>
          <Menu aria-hidden className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel={t("menuClose")}
        onCloseAutoFocus={onCloseAutoFocus}
        className="w-full max-w-sm gap-0 overflow-y-auto bg-background p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-xl font-semibold text-heading">{t("menuTitle")}</SheetTitle>
          <SheetDescription className="sr-only">{t("menuDescription")}</SheetDescription>
        </SheetHeader>
        <nav aria-label={t("label")} className="px-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href.hash}>
                <Link
                  href={item.href}
                  onClick={(event) => onItemClick(event, item.href)}
                  className="flex min-h-13 items-center rounded-lg px-3 text-lg font-medium text-heading hover:bg-surface-tint"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 flex flex-col gap-6 border-t border-border px-6 py-6">
          <Button asChild size="lg" className="w-full">
            <a href={emailHref}>{emailLabel}</a>
          </Button>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">{tp("language")}</p>
            <LanguageSwitcher size="lg" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">{tp("theme")}</p>
            <ThemeSwitcher showLabels className="w-full" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
