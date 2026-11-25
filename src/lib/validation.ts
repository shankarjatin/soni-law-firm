import "server-only";
import { z } from "zod";
import { practiceAreas } from "@/content/practice-areas";
import { callbackWindows } from "@/content/site";
import { CONTROL_CHARS, EMAIL_PATTERN, LIMITS, MESSAGES, PHONE_PATTERN, normalisePhone } from "./inquiry-rules";

const matterValues: [string, ...string[]] = ["unsure", ...practiceAreas.map((p) => p.slug)];
const windowValues = callbackWindows.map((w) => w.value) as [string, ...string[]];

const cleanText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .refine((v) => !CONTROL_CHARS.test(v), message);

/** Authoritative server-side schema. Unknown keys are stripped. */
export const inquirySchema = z.object({
  name: cleanText(LIMITS.nameMax, MESSAGES.name).pipe(z.string().min(LIMITS.nameMin, MESSAGES.name)),
  phone: z
    .string()
    .transform(normalisePhone)
    .refine((v) => PHONE_PATTERN.test(v), MESSAGES.phone),
  email: z
    .string()
    .trim()
    .max(LIMITS.emailMax, MESSAGES.email)
    .refine((v) => v === "" || EMAIL_PATTERN.test(v), MESSAGES.email)
    .optional()
    .transform((v) => v || undefined),
  preferredCallbackWindow: z
    .enum([...windowValues, ""], MESSAGES.choice)
    .optional()
    .transform((v) => v || undefined),
  matterCategory: z
    .enum([...matterValues, ""], MESSAGES.choice)
    .optional()
    .transform((v) => v || undefined),
  briefDescription: cleanText(LIMITS.descriptionMax, MESSAGES.description)
    .optional()
    .transform((v) => v || undefined),
  consent: z.literal(true, MESSAGES.consent),
});

/** Spam signals travel alongside the form but are never stored. */
export const spamSchema = z.object({
  website: z.string().optional(), // honeypot — must stay empty
  startedAt: z.number().optional(), // epoch ms when the form was first touched
});

export type Inquiry = z.infer<typeof inquirySchema>;
