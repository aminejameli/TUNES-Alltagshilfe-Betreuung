"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { readConsent } from "@/lib/consent";
import { pushDataLayer, readCookie, trackMeta } from "@/lib/tracking";
import { readPreference, resolveTheme } from "@/components/theme/theme-store";

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[] };
type CalGlobal = CalApi & { loaded?: boolean; ns?: Record<string, CalApi> };

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

const NAMESPACE = "kennenlernen";
const EMBED_SRC = "https://app.cal.com/embed/embed.js";
/** Booking UIDs already tracked in this tab, so a re-mount never counts a booking twice. */
const trackedBookings = new Set<string>();

/** Cal.com's official loader snippet, typed. Queues calls until embed.js has loaded. */
function ensureCal(): CalGlobal {
  if (window.Cal) return window.Cal;
  const cal = function (...args: unknown[]) {
    const self = window.Cal!;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement("script");
      script.src = EMBED_SRC;
      document.head.appendChild(script);
      self.loaded = true;
    }
    if (args[0] === "init") {
      const api = function (...apiArgs: unknown[]) {
        api.q!.push(apiArgs);
      } as CalApi;
      api.q = [];
      const namespace = args[1];
      if (typeof namespace === "string") {
        const ns = (self.ns ??= {});
        ns[namespace] = ns[namespace] || api;
        ns[namespace].q!.push(args);
        self.q!.push(["initNamespace", namespace]);
      } else {
        self.q!.push(args);
      }
      return;
    }
    self.q!.push(args);
  } as CalGlobal;
  window.Cal = cal;
  return cal;
}

type BookingSuccessDetail = { data?: { uid?: string; booking?: { uid?: string } } };

/**
 * Inline Cal.com booker. With marketing consent it hands Meta's browser IDs to Cal.com
 * as booking metadata, so the webhook → Conversions API event matches this visitor.
 */
export function CalEmbed() {
  const t = useTranslations("Booking");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const Cal = ensureCal();
    if (!Cal.ns?.[NAMESPACE]) Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    const ns = Cal.ns![NAMESPACE]!;

    const consent = readConsent();
    const config: Record<string, string> = {
      layout: "month_view",
      theme: resolveTheme(readPreference()),
      "metadata[lang]": locale,
    };
    if (consent?.marketing) {
      config["metadata[consent]"] = "marketing";
      config["metadata[page]"] = location.href.split("?")[0]!;
      config["metadata[ua]"] = navigator.userAgent.slice(0, 400);
      const fbp = readCookie("_fbp");
      const fbc = readCookie("_fbc");
      if (fbp) config["metadata[fbp]"] = fbp;
      if (fbc) config["metadata[fbc]"] = fbc;
    }

    element.replaceChildren();
    ns("inline", { elementOrSelector: element, calLink: siteConfig.calLink, config });
    ns("ui", { hideEventTypeDetails: false, layout: "month_view" });

    const onBooked = (event: { detail?: BookingSuccessDetail }) => {
      const uid = event.detail?.data?.uid ?? event.detail?.data?.booking?.uid;
      if (!uid || trackedBookings.has(uid)) return;
      trackedBookings.add(uid);
      setBooked(true);
      // Same event_id as the server-side CAPI event (Cal booking UID) → Meta deduplicates.
      trackMeta("Schedule", {}, uid);
      pushDataLayer({ event: "booking_confirmed" });
    };
    ns("on", { action: "bookingSuccessfulV2", callback: onBooked });

    trackMeta("ViewContent", { content_name: "booking_page" });

    return () => ns("off", { action: "bookingSuccessfulV2", callback: onBooked });
  }, [locale]);

  return (
    <div className="space-y-4">
      {booked && (
        <p
          role="status"
          className="flex items-start gap-2.5 rounded-xl bg-accent-green/15 p-4 text-base font-semibold text-heading"
        >
          <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-green-strong" />
          {t("success")}
        </p>
      )}
      {/* Cal.com owns this element's children; the loading text is CSS-only so React never touches them. */}
      <div
        ref={containerRef}
        data-loading={t("loading")}
        className="min-h-[640px] w-full overflow-hidden rounded-2xl border border-border bg-surface empty:p-6 empty:text-muted-foreground empty:before:content-[attr(data-loading)]"
      />
      <p className="text-sm text-muted-foreground">
        <a
          href={siteConfig.calcomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-heading underline underline-offset-4"
        >
          {t("fallback")}
        </a>
      </p>
    </div>
  );
}
