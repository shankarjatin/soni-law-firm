import "server-only";

/**
 * Fixed-window in-memory rate limiter.
 * Good enough for a single instance. On serverless/multi-instance hosting, swap for a shared
 * store (e.g. Upstash Redis) — tracked in INSTRUCTIONS.md.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, now: number) {
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) prune(now);
    return { ok: true as const };
  }
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false as const, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true as const };
}

function prune(now: number) {
  for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
}

/**
 * Client IP for rate limiting. Uses the first X-Forwarded-For hop, which is set by the hosting proxy
 * (Vercel and most managed hosts overwrite it). Behind an untrusted proxy, configure accordingly.
 */
export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}
