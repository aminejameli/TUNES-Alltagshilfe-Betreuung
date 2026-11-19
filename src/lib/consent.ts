/**
 * Visitor consent for optional tags (TDDDG § 25, DSGVO Art. 6 (1) a).
 * Nothing optional may load before the visitor has chosen; "necessary" needs no consent.
 */
export type ConsentChoice = { analytics: boolean; marketing: boolean };
export type ConsentState = ConsentChoice & { v: 1; ts: number };

export const CONSENT_STORAGE_KEY = "tunes-consent";
const CHANGE_EVENT = "tunes-consent-change";
const OPEN_EVENT = "tunes-consent-open";

/** Cookies set by the optional tags; removed when consent is withdrawn. */
const TRACKING_COOKIE_PREFIXES = ["_fbp", "_fbc", "_ga", "_gid", "_gcl"];

let cachedRaw: string | null | undefined;
let cachedState: ConsentState | null = null;

function parse(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (value.v !== 1 || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") {
      return null;
    }
    return { v: 1, ts: Number(value.ts) || 0, analytics: value.analytics, marketing: value.marketing };
  } catch {
    return null;
  }
}

/** Stable snapshot for useSyncExternalStore: the same object until the stored value changes. */
export function readConsent(): ConsentState | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedState = parse(raw);
  }
  return cachedState;
}

function clearTrackingCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name || !TRACKING_COOKIE_PREFIXES.some((p) => name.startsWith(p))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function saveConsent(choice: ConsentChoice) {
  const previous = readConsent();
  const state: ConsentState = { v: 1, ts: Date.now(), ...choice };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private mode): the choice holds for this page view only.
    cachedRaw = JSON.stringify(state);
    cachedState = state;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));

  // Loaded scripts cannot be unloaded: on withdrawal, delete their cookies and start a clean page.
  const withdrawn =
    (previous?.analytics && !choice.analytics) || (previous?.marketing && !choice.marketing);
  if (withdrawn) {
    clearTrackingCookies();
    location.reload();
  }
}

export function subscribeConsent(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) callback();
  };
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

/** Re-opens the banner (footer link "Cookie-Einstellungen"). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeConsentOpen(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}
