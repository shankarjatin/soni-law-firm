"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { ArrowBadge } from "@/components/ui/LinkButton";
import { ContactLink } from "@/components/ui/ContactLink";
import { practiceAreas } from "@/content/practice-areas";
import { callbackWindows, site } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  CONTROL_CHARS,
  EMAIL_PATTERN,
  LIMITS,
  MESSAGES,
  PHONE_PATTERN,
  normalisePhone,
  type FieldErrors,
  type InquiryField,
} from "@/lib/inquiry-rules";

type Values = {
  name: string;
  phone: string;
  email: string;
  preferredCallbackWindow: string;
  /** null = untouched, so the ?matter= pre-selection applies. */
  matterCategory: string | null;
  briefDescription: string;
  consent: boolean;
};

const initial: Values = {
  name: "",
  phone: "",
  email: "",
  preferredCallbackWindow: "",
  matterCategory: null,
  briefDescription: "",
  consent: false,
};

const fieldOrder: InquiryField[] = ["name", "phone", "email", "matterCategory", "briefDescription", "consent"];

function validate(field: InquiryField, v: Values): string | undefined {
  switch (field) {
    case "name": {
      const s = v.name.trim();
      return s.length < LIMITS.nameMin || s.length > LIMITS.nameMax || CONTROL_CHARS.test(s) ? MESSAGES.name : undefined;
    }
    case "phone":
      return PHONE_PATTERN.test(normalisePhone(v.phone)) ? undefined : MESSAGES.phone;
    case "email":
      return v.email.trim() && !EMAIL_PATTERN.test(v.email.trim()) ? MESSAGES.email : undefined;
    case "briefDescription":
      return v.briefDescription.length > LIMITS.descriptionMax ? MESSAGES.description : undefined;
    case "consent":
      return v.consent ? undefined : MESSAGES.consent;
    default:
      return undefined;
  }
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readMatterFromUrl() {
  const matter = new URLSearchParams(window.location.search).get("matter") ?? "";
  return practiceAreas.some((p) => p.slug === matter) ? matter : "";
}

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

export function InquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Pre-select a practice area from ?matter=slug (links from practice-area pages). Server snapshot is "".
  const matterFromUrl = useSyncExternalStore(subscribeToUrl, readMatterFromUrl, () => "");
  const matterCategory = values.matterCategory ?? matterFromUrl;

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  function onFirstInteraction() {
    if (startedAt.current === null) {
      startedAt.current = Date.now();
      track("callback_form_start");
    }
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // Clear an error as soon as the field becomes valid.
    if (errors[key as InquiryField] && !validate(key as InquiryField, next)) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function onBlur(field: InquiryField) {
    setErrors((e) => ({ ...e, [field]: validate(field, values) }));
  }

  function focusField(field: string) {
    formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const nextErrors: FieldErrors = {};
    for (const field of fieldOrder) nextErrors[field] = validate(field, values);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((f) => nextErrors[f]);
    if (firstInvalid) {
      focusField(firstInvalid);
      track("callback_form_submit_error", { category: "validation" });
      return;
    }

    setStatus({ kind: "submitting" });
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, matterCategory, website: honeypot, startedAt: startedAt.current ?? undefined }),
      });

      if (res.status === 201) {
        setStatus({ kind: "success" });
        setValues(initial);
        track("callback_form_submit_success");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: FieldErrors };
      if (res.status === 400 && data.fieldErrors) {
        setErrors(data.fieldErrors);
        const first = fieldOrder.find((f) => data.fieldErrors?.[f]);
        if (first) focusField(first);
      }
      track("callback_form_submit_error", { category: res.status === 429 ? "rate_limit" : res.status === 400 ? "validation" : "server" });
      setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
    } catch {
      track("callback_form_submit_error", { category: "network" });
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <CheckCircle2 className="size-10 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h3 ref={successRef} tabIndex={-1} className="display text-3xl outline-none">
          Request received.
        </h3>
        <p className="max-w-[50ch] leading-relaxed text-muted">
          Thank you. The office will try to call you back, usually within working hours. A callback at a specific time
          cannot be guaranteed, and this request does not by itself create an advocate–client relationship.
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="btn btn-secondary">
          Send another request
        </button>
      </div>
    );
  }

  const hints: Partial<Record<InquiryField, string>> = {
    phone: "Used only to call you back about this request.",
    briefDescription: "One or two lines is enough. Please don’t include confidential details, documents or case papers.",
  };

  const f = (name: InquiryField) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [errors[name] ? `${id}-${name}-error` : null, hints[name] ? `${id}-${name}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined,
    onBlur: () => onBlur(name),
  });

  const inputClass =
    "w-full min-h-12 rounded-2xl border border-line bg-canvas px-4 py-3 text-base text-ink transition-colors duration-200 placeholder:text-muted/70 hover:border-ink/30 focus:border-ink focus:outline-none aria-[invalid=true]:border-error";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onFocus={onFirstInteraction} className="relative flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" required htmlFor={`${id}-name`} error={errors.name} errorId={`${id}-name-error`}>
          <input {...f("name")} type="text" autoComplete="name" required value={values.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </Field>
        <Field
          label="Phone number"
          required
          htmlFor={`${id}-phone`}
          error={errors.phone}
          errorId={`${id}-phone-error`}
          hint={hints.phone}
          hintId={`${id}-phone-hint`}
        >
          <input
            {...f("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="98765 43210"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" optional htmlFor={`${id}-email`} error={errors.email} errorId={`${id}-email-error`}>
          <input {...f("email")} type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Legal matter" optional htmlFor={`${id}-matterCategory`} error={errors.matterCategory} errorId={`${id}-matterCategory-error`}>
          <select {...f("matterCategory")} value={matterCategory} onChange={(e) => update("matterCategory", e.target.value)} className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23111%22 stroke-width=%221.75%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}>
            <option value="">Select an area</option>
            {practiceAreas.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
            <option value="unsure">Not sure</option>
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium">
          Preferred callback time <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {[{ value: "", label: "Any time" }, ...callbackWindows].map((w) => (
            <label
              key={w.value || "any"}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-canvas px-4 text-sm transition-colors duration-200 hover:border-ink/40 has-checked:border-ink has-checked:bg-ink has-checked:text-canvas has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
            >
              <input
                type="radio"
                name="preferredCallbackWindow"
                value={w.value}
                checked={values.preferredCallbackWindow === w.value}
                onChange={() => update("preferredCallbackWindow", w.value)}
                className="sr-only"
              />
              {w.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        label="Brief description"
        optional
        htmlFor={`${id}-briefDescription`}
        error={errors.briefDescription}
        errorId={`${id}-briefDescription-error`}
        hint={hints.briefDescription}
        hintId={`${id}-briefDescription-hint`}
        counter={`${values.briefDescription.length}/${LIMITS.descriptionMax}`}
      >
        <textarea
          {...f("briefDescription")}
          rows={3}
          maxLength={LIMITS.descriptionMax}
          value={values.briefDescription}
          onChange={(e) => update("briefDescription", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed">
          <input
            {...f("consent")}
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-ink"
          />
          <span>
            I agree to be contacted about this request and have read the{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4">
              privacy policy
            </Link>
            . I understand this does not create an advocate–client relationship.
            <span className="text-error" aria-hidden="true">
              {" "}
              *
            </span>
          </span>
        </label>
        <FieldError id={`${id}-consent-error`} message={errors.consent} />
      </div>

      <div aria-live="polite">
        {status.kind === "error" && (
          <div role="alert" className="flex gap-3 rounded-2xl border border-error/30 bg-error/5 p-4 text-sm leading-relaxed">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-error" strokeWidth={1.75} aria-hidden="true" />
            <p>
              {status.message} You can also call{" "}
              <ContactLink kind="phone" value={site.contact.phone} className="font-medium underline underline-offset-4" /> or
              email <ContactLink kind="email" value={site.contact.email} className="font-medium underline underline-offset-4" />.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          <span className="text-error">*</span> Required
        </p>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status.kind === "submitting"} aria-busy={status.kind === "submitting"}>
          <span>{status.kind === "submitting" ? "Sending…" : "Request a callback"}</span>
          {status.kind === "submitting" ? (
            <span className="btn-arrow">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            </span>
          ) : (
            <ArrowBadge />
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  hint,
  hintId,
  error,
  errorId,
  counter,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId: string;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
          {required && (
            <span className="text-error" aria-hidden="true">
              {" "}
              *
            </span>
          )}
          {optional && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        {counter && <span className="text-xs text-muted tabular-nums">{counter}</span>}
      </div>
      {children}
      {hint && (
        <p id={hintId} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-error">
      <TriangleAlert className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      {message}
    </p>
  );
}
