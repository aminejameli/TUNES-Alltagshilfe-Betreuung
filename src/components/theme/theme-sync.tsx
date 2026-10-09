"use client";

import { useEffect, useLayoutEffect } from "react";
import { applyTheme, readPreference, subscribe } from "./theme-store";

/**
 * Keeps <html> in sync with the stored preference: re-applies it after React's
 * development remount clears the class, and follows OS changes while on "system".
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(readPreference());
  }, []);

  useEffect(() => subscribe(() => {}), []);

  return null;
}
