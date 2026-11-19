// Server-only module (uses node:crypto and the CAPI token). Never import it from client code.
import { createHash } from "node:crypto";

/**
 * Meta Conversions API (server-side events). Personal data is normalised and SHA-256 hashed
 * as Meta requires; nothing about the person's care situation is ever sent.
 */
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v24.0";

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export function hashEmail(email?: string | null) {
  const v = email?.trim().toLowerCase();
  return v ? sha256(v) : undefined;
}

/** Digits only, with country code. German numbers written as 0151… become 49151…. */
export function hashPhone(phone?: string | null) {
  let digits = phone?.replace(/\D/g, "") ?? "";
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `49${digits.slice(1)}`;
  return digits.length >= 8 ? sha256(digits) : undefined;
}

export function hashName(name?: string | null) {
  const v = name?.trim().toLowerCase().normalize("NFC");
  return v ? sha256(v) : undefined;
}

export type CapiUserData = {
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  external_id?: string[];
  fbp?: string;
  fbc?: string;
  client_user_agent?: string;
};

export type CapiEvent = {
  event_name: "Schedule" | "Lead" | "Contact";
  event_time: number;
  event_id: string;
  action_source: "website";
  event_source_url?: string;
  user_data: CapiUserData;
};

export function capiConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN);
}

export async function sendCapiEvent(event: CapiEvent) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) throw new Error("Meta CAPI is not configured");

  const body: Record<string, unknown> = { data: [event], access_token: token };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  // Token goes in the body, not the URL, so it never shows up in request logs.
  const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(`Meta CAPI ${response.status}: ${JSON.stringify(result).slice(0, 500)}`);
  }
  return result;
}
