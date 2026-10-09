"use client";

import { useSyncExternalStore, type KeyboardEvent } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  readPreference,
  setPreference,
  subscribe,
  type ThemePreference,
} from "./theme-store";

const options: { value: ThemePreference; icon: typeof Sun; labelKey: "themeLight" | "themeDark" | "themeSystem" }[] = [
  { value: "light", icon: Sun, labelKey: "themeLight" },
  { value: "dark", icon: Moon, labelKey: "themeDark" },
  { value: "system", icon: Monitor, labelKey: "themeSystem" },
];

export function ThemeSwitcher({
  showLabels = false,
  className,
}: {
  showLabels?: boolean;
  className?: string;
}) {
  const t = useTranslations("Preferences");
  // The server can't know the stored preference; it renders "system" and the client corrects it.
  const preference = useSyncExternalStore(subscribe, readPreference, () => "system" as const);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = options.findIndex((o) => o.value === preference);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    else return;
    event.preventDefault();
    setPreference(options[next].value);
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]");
    buttons[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={t("theme")}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1",
        className,
      )}
    >
      {options.map(({ value, icon: Icon, labelKey }) => {
        const checked = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            title={showLabels ? undefined : t(labelKey)}
            onClick={() => setPreference(value)}
            className={cn(
              "inline-flex min-h-9 min-w-9 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-heading",
              showLabels && "min-h-11 flex-1 px-4",
              checked && "bg-primary text-primary-foreground hover:text-primary-foreground",
            )}
          >
            <Icon aria-hidden className="size-4" />
            <span className={cn(!showLabels && "sr-only")}>{t(labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
}
