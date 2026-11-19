"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { readConsent } from "@/lib/consent";
import { loadGtm, loadMetaPixel, pushDataLayer, trackMeta, trackPageView } from "@/lib/tracking";
import { useConsent } from "./use-consent";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Loads GTM and the Meta Pixel only after the matching consent, and tracks site-wide events. */
export function TrackingScripts() {
  const consent = useConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (consent === "unknown" || !consent) return;
    if (consent.analytics) loadGtm(siteConfig.gtmId, consent.marketing);
    if (consent.marketing && pixelId) loadMetaPixel(pixelId);
  }, [consent]);

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  // Contact = a click on any phone or email link, wherever it sits on the page.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
      if (!link || !readConsent()) return;
      const method = link.getAttribute("href")?.startsWith("tel:") ? "phone" : "email";
      trackMeta("Contact", { content_category: method });
      pushDataLayer({ event: "contact_click", contact_method: method });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
