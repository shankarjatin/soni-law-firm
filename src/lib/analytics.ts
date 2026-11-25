/**
 * Privacy-safe analytics events (PRD §14). Platform is pending approval, so this forwards to `gtag`
 * only if one has been installed. Never pass names, phone numbers, emails, messages or field values.
 */

type EventMap = {
  contact_click: { channel: "phone" | "email" | "whatsapp" };
  callback_form_start: Record<string, never>;
  callback_form_submit_success: Record<string, never>;
  callback_form_submit_error: { category: "validation" | "rate_limit" | "server" | "network" };
};

type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function track<K extends keyof EventMap>(name: K, params?: EventMap[K]) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params as Record<string, string> | undefined);
}
