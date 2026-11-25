/**
 * Inquiry field rules shared by the client form (usability checks) and the server (authoritative Zod schema).
 * Kept dependency-free so the client bundle does not ship Zod.
 */

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 120,
  descriptionMax: 500,
  minFillMs: 3000,
} as const;

/** Accepts Indian mobile/landline formats: optional +91 or leading 0, spaces, hyphens, brackets. */
export function normalisePhone(raw: string) {
  return raw.replace(/[\s\-().]/g, "");
}

export const PHONE_PATTERN = /^(?:\+?91|0)?[1-9]\d{9}$/;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

export type InquiryField = "name" | "phone" | "email" | "preferredCallbackWindow" | "matterCategory" | "briefDescription" | "consent";

export type FieldErrors = Partial<Record<InquiryField, string>>;

export const MESSAGES = {
  name: "Please enter your name (at least 2 characters).",
  phone: "Please enter a valid 10-digit phone number, e.g. 98765 43210.",
  email: "Please enter a valid email address, or leave it blank.",
  description: `Please keep the description under ${LIMITS.descriptionMax} characters.`,
  consent: "Please confirm you agree to be contacted about this request.",
  choice: "Please choose one of the listed options.",
} as const;
