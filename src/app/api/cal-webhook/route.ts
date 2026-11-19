import { createHmac, timingSafeEqual } from "node:crypto";
import { absoluteUrl } from "@/lib/seo";
import { capiConfigured, hashEmail, hashName, hashPhone, sendCapiEvent, type CapiUserData } from "@/lib/meta-capi";

/**
 * Cal.com webhook → Meta Conversions API.
 *
 * Cal.com calls this on BOOKING_CREATED. We verify the HMAC signature, then send a
 * `Schedule` event whose event_id is the booking UID: the browser pixel fires the same
 * event with the same ID, so Meta counts the booking once (deduplication).
 * Nothing is sent unless the visitor gave marketing consent on our site (passed through
 * the embed as booking metadata).
 */

type CalAttendee = { email?: string; name?: string; phoneNumber?: string | null };
type CalResponses = Record<string, { value?: unknown } | undefined>;
type CalPayload = {
  uid?: string;
  attendees?: CalAttendee[];
  responses?: CalResponses;
  metadata?: Record<string, unknown>;
};
type CalWebhookBody = { triggerEvent?: string; createdAt?: string; payload?: CalPayload };

function validSignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature.trim(), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

const str = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

function attendeePhone(payload: CalPayload, attendee?: CalAttendee) {
  const responses = payload.responses ?? {};
  return (
    str(attendee?.phoneNumber) ??
    str(responses.attendeePhoneNumber?.value) ??
    // "Phone call" location: the attendee's number sits in the location answer.
    str((responses.location?.value as { optionValue?: unknown } | undefined)?.optionValue)?.match(/^\+?[\d\s()/-]{8,}$/)?.[0]
  );
}

function asList(value?: string) {
  return value ? [value] : undefined;
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[cal-webhook] CAL_WEBHOOK_SECRET is not set");
    return Response.json({ error: "not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  if (!validSignature(rawBody, request.headers.get("x-cal-signature-256"), secret)) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  let body: CalWebhookBody;
  try {
    body = JSON.parse(rawBody) as CalWebhookBody;
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  // Cal.com's "Ping test" and any other trigger: acknowledge, do nothing.
  const payload = body.payload;
  const uid = payload?.uid;
  if (body.triggerEvent !== "BOOKING_CREATED" || !payload || !uid) {
    return Response.json({ ok: true, skipped: body.triggerEvent ?? "unknown" });
  }

  const metadata = payload.metadata ?? {};
  if (metadata.consent !== "marketing") {
    return Response.json({ ok: true, skipped: "no-marketing-consent" });
  }
  if (!capiConfigured()) {
    console.error("[cal-webhook] Meta CAPI env vars missing; Schedule not sent", uid);
    return Response.json({ ok: true, skipped: "capi-not-configured" });
  }

  const attendee = payload.attendees?.[0];
  const nameParts = (attendee?.name ?? "").trim().split(/\s+/).filter(Boolean);
  const email = attendee?.email ?? str(payload.responses?.email?.value);

  const userData: CapiUserData = {
    em: asList(hashEmail(email)),
    ph: asList(hashPhone(attendeePhone(payload, attendee))),
    fn: asList(hashName(nameParts[0])),
    ln: asList(nameParts.length > 1 ? hashName(nameParts.at(-1)) : undefined),
    external_id: asList(hashEmail(email)),
    fbp: str(metadata.fbp),
    fbc: str(metadata.fbc),
    client_user_agent: str(metadata.ua),
  };

  try {
    const result = await sendCapiEvent({
      event_name: "Schedule",
      event_time: Math.floor(Date.now() / 1000),
      event_id: uid,
      action_source: "website",
      event_source_url: str(metadata.page) ?? absoluteUrl("/de/termin"),
      user_data: userData,
    });
    return Response.json({ ok: true, meta: result });
  } catch (error) {
    console.error("[cal-webhook] Meta CAPI failed", uid, error);
    return Response.json({ error: "capi failed" }, { status: 502 });
  }
}
