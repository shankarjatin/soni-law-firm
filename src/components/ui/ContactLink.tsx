"use client";

import { isProvided, telHref, whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";

type Kind = "phone" | "email" | "whatsapp";

/** Contact link that tracks the channel only (never the value). Renders plain text while the value is a placeholder. */
export function ContactLink({
  kind,
  value,
  className = "",
  children,
}: {
  kind: Kind;
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const label = children ?? value;
  if (!isProvided(value)) return <span className={className}>{label}</span>;

  const href = kind === "phone" ? telHref(value) : kind === "email" ? `mailto:${value}` : whatsappHref(value);
  const external = kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a href={href} className={className} onClick={() => track("contact_click", { channel: kind })} {...external}>
      {label}
    </a>
  );
}
