import "server-only";
import { practiceAreas } from "@/content/practice-areas";
import { callbackWindows, site } from "@/content/site";
import type { Inquiry } from "./validation";

/**
 * Sends the inquiry notification via Resend's HTTP API (no SDK dependency).
 * Provider is provisional — see TRD §2. Swap this function to change provider.
 */

export type MailResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

export async function sendInquiryNotification(inquiry: Inquiry): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) return { ok: false, reason: "not-configured" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      // Generic subject: no names or legal facts in subject lines.
      subject: `New callback request — ${site.name} website`,
      html: renderHtml(inquiry),
      text: renderText(inquiry),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  return res.ok ? { ok: true } : { ok: false, reason: "provider-error" };
}

function rows(inquiry: Inquiry): [string, string][] {
  const matter = practiceAreas.find((p) => p.slug === inquiry.matterCategory)?.name;
  const window = callbackWindows.find((w) => w.value === inquiry.preferredCallbackWindow)?.label;
  return [
    ["Name", inquiry.name],
    ["Phone", inquiry.phone],
    ["Email", inquiry.email ?? "—"],
    ["Preferred time", window ?? "Any"],
    ["Matter", matter ?? (inquiry.matterCategory === "unsure" ? "Not sure" : "—")],
    ["Brief description", inquiry.briefDescription ?? "—"],
  ];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderHtml(inquiry: Inquiry) {
  const body = rows(inquiry)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111"><p>A callback was requested through the website. The visitor consented to be contacted about this request.</p><table>${body}</table></div>`;
}

function renderText(inquiry: Inquiry) {
  return [
    "A callback was requested through the website.",
    "",
    ...rows(inquiry).map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
}
