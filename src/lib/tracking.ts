/**
 * Client-side tag loaders. Each loader is only called after the matching consent
 * (see `TrackingScripts`); nothing here runs for visitors who declined.
 *
 * Never pass care details (Pflegegrad, diagnoses, notes) as event parameters:
 * those are special-category data (DSGVO Art. 9) and must not reach Meta or Google.
 */
import { readConsent } from "./consent";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  /** Queued calls as argument arrays (ours); fbevents.js may add its own entries. */
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    dataLayer?: unknown[];
  }
}

export type MetaStandardEvent = "PageView" | "ViewContent" | "Contact" | "Schedule";

let pixelReady = false;
let lastPageViewPath: string | null = null;
const pending: Array<[MetaStandardEvent, Record<string, unknown>, string | undefined]> = [];

/** Meta's base code, typed. Idempotent. */
function makeFbq(): Fbq {
  // Mirrors Meta's snippet: fbevents.js expects queued `arguments` objects.
  const fbq = function (...args: unknown[]) {
    // Queue arrays (not `arguments`): `args` is spread onto callMethod by our
    // own code, and Meta only ever reads queue entries to dispatch them.
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as unknown as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  return fbq;
}

export function loadMetaPixel(pixelId: string) {
  if (pixelReady || typeof window === "undefined") return;
  if (!window.fbq) {
    window.fbq = makeFbq();
    window._fbq ??= window.fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  window.fbq("init", pixelId);
  // Initialise _fbc for server-side matching: Cal.com stores it as booking metadata
  // and the webhook hands it to the Conversions API as `fbc` (Meta's official snippet
  // includes this line when the click ID exists).
  const fbc = readCookie("_fbc");
  if (fbc) {
    // Mirror of the base snippet: a second instance that only queues calls, so the
    // `set` survives fbevents.js initialising and replays the callMethod branch.
    const setFbq = makeFbq();
    setFbq("set", "fbp", readCookie("_fbp"), fbc);
  }
  pixelReady = true;
  trackPageView(location.pathname);
  for (const [event, params, eventId] of pending.splice(0)) send(event, params, eventId);
}

function send(event: MetaStandardEvent, params: Record<string, unknown>, eventId?: string) {
  window.fbq?.("track", event, params, eventId ? { eventID: eventId } : undefined);
}

/**
 * Tracks a Meta standard event, only with marketing consent. If the pixel is still loading
 * (a page's effects run before the layout's), the event waits in a short queue.
 * `eventId` must match the server-side CAPI event so Meta counts the conversion once.
 */
export function trackMeta(event: MetaStandardEvent, params: Record<string, unknown> = {}, eventId?: string) {
  if (typeof window === "undefined" || !readConsent()?.marketing) return;
  if (pixelReady) send(event, params, eventId);
  else if (pending.length < 20) pending.push([event, params, eventId]);
}

/** PageView for client-side navigations; the first one fires when the pixel initialises. */
export function trackPageView(pathname: string) {
  if (!pixelReady || pathname === lastPageViewPath) return;
  lastPageViewPath = pathname;
  send("PageView", {});
}

/** Google Tag Manager with Consent Mode v2, loaded only after analytics consent. */
let gtmLoaded = false;
export function loadGtm(gtmId: string, marketing: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const ads = marketing ? "granted" : "denied";
  const consent = {
    analytics_storage: "granted",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
  // gtag() pushes the `arguments` object; Consent Mode expects exactly that shape.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  if (gtmLoaded) {
    gtag("consent", "update", consent);
    return;
  }
  gtag("consent", "default", consent);
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
  gtmLoaded = true;
}

/** Pushes a GTM event; a no-op until GTM has loaded with consent. */
export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined" || !gtmLoaded) return;
  window.dataLayer?.push(data);
}

export function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}
