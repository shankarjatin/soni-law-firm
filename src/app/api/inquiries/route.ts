import { sendInquiryNotification } from "@/lib/mail";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { LIMITS } from "@/lib/inquiry-rules";
import { inquirySchema, spamSchema } from "@/lib/validation";

const MAX_BODY_BYTES = 8 * 1024;

function json(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** Operational log only — never includes form content, phone, email or description. */
function log(event: string, extra: Record<string, string | number> = {}) {
  console.info(JSON.stringify({ scope: "inquiries", event, ...extra }));
}

export async function POST(request: Request) {
  const now = Date.now();

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { error: "Unsupported content type." });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    log("rejected", { reason: "origin" });
    return json(403, { error: "Request not allowed." });
  }

  const limit = rateLimit(clientKey(request.headers), now);
  if (!limit.ok) {
    log("rejected", { reason: "rate-limit" });
    return json(
      429,
      { error: "Too many requests. Please try again later or call the office." },
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "Request too large." });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "Invalid request." });
  }

  // Spam heuristics: silently accept so bots learn nothing, but deliver nothing.
  const spam = spamSchema.safeParse(body);
  const startedAt = spam.success ? spam.data.startedAt : undefined;
  if (!spam.success || spam.data.website || (startedAt && now - startedAt < LIMITS.minFillMs)) {
    log("discarded", { reason: "spam-heuristic" });
    return json(201, { ok: true });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    log("rejected", { reason: "validation", fields: Object.keys(fieldErrors).join(",") });
    return json(400, { error: "Please check the highlighted fields.", fieldErrors });
  }

  // TODO(decision): if a database is approved (TRD §8), persist here first and treat it as the source of truth.
  const delivery = await sendInquiryNotification(parsed.data).catch(() => ({ ok: false, reason: "provider-error" }) as const);

  if (!delivery.ok) {
    if (delivery.reason === "not-configured" && process.env.NODE_ENV !== "production") {
      log("accepted-dev", { note: "email delivery not configured; nothing sent" });
      return json(201, { ok: true });
    }
    log("delivery-failed", { reason: delivery.reason });
    return json(503, { error: "We could not send your request right now. Please call or email the office instead." });
  }

  log("delivered");
  return json(201, { ok: true });
}
