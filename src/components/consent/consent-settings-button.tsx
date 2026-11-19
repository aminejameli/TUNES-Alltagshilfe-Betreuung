"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer link that re-opens the consent banner so visitors can change or withdraw consent. */
export function ConsentSettingsButton({ className, label }: { className?: string; label: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {label}
    </button>
  );
}
