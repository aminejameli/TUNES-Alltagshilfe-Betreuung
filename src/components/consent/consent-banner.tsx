"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { readConsent, saveConsent, subscribeConsentOpen } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { useConsent } from "./use-consent";

/**
 * Consent banner. "Accept all" and "Necessary only" are equally prominent, as German
 * supervisory authorities require; optional tags stay off until a choice is saved.
 */
export function ConsentBanner() {
  const t = useTranslations("Consent");
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribeConsentOpen(() => {
        const stored = readConsent();
        setAnalytics(stored?.analytics ?? false);
        setMarketing(stored?.marketing ?? false);
        setReopened(true);
        setShowDetails(true);
      }),
    [],
  );

  const open = consent !== "unknown" && (consent === null || reopened);

  // Move focus into the banner when it is re-opened from the footer.
  useEffect(() => {
    if (open && reopened) panelRef.current?.focus();
  }, [open, reopened]);

  if (!open) return null;

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setReopened(false);
    setShowDetails(false);
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-50 p-3 outline-none sm:p-4"
    >
      <div className="mx-auto max-h-[85dvh] max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-6">
        <h2 id={titleId} className="text-lg font-bold text-heading">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("body")}{" "}
          <Link href="/datenschutz" className="font-semibold text-heading underline underline-offset-4">
            {t("privacyLink")}
          </Link>
        </p>

        {showDetails && (
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">{t("detailsLegend")}</legend>
            <ConsentToggle label={t("necessaryLabel")} description={t("necessaryDescription")} checked disabled />
            <ConsentToggle
              label={t("analyticsLabel")}
              description={t("analyticsDescription")}
              checked={analytics}
              onChange={setAnalytics}
            />
            <ConsentToggle
              label={t("marketingLabel")}
              description={t("marketingDescription")}
              checked={marketing}
              onChange={setMarketing}
            />
          </fieldset>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button onClick={() => decide({ analytics: true, marketing: true })}>{t("acceptAll")}</Button>
          <Button onClick={() => decide({ analytics: false, marketing: false })}>{t("necessaryOnly")}</Button>
          {showDetails ? (
            <Button variant="outline" onClick={() => decide({ analytics, marketing })}>
              {t("saveSelection")}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setShowDetails(true)}>
              {t("settings")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-primary disabled:opacity-60"
      />
      <label htmlFor={id} className="text-sm sm:text-base">
        <span className="block font-semibold text-heading">{label}</span>
        <span className="block text-muted-foreground">{description}</span>
      </label>
    </div>
  );
}
