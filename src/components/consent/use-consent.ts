"use client";

import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent, type ConsentState } from "@/lib/consent";

/** "unknown" during SSR and hydration; `null` once we know the visitor has not chosen yet. */
export function useConsent(): ConsentState | null | "unknown" {
  return useSyncExternalStore<ConsentState | null | "unknown">(subscribeConsent, readConsent, () => "unknown");
}
