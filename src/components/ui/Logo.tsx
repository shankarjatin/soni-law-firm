import Link from "next/link";
import { site } from "@/content/site";

/**
 * Provisional typographic logo. TODO(client): replace the mark with the approved SVG logo.
 */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="currentColor" />
      <g fill="none" stroke="var(--color-canvas)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 9v21M13 30h14M11 14h18" />
        <path d="M11 14l-3.5 8h7L11 14zM29 14l-3.5 8h7L29 14z" />
      </g>
      <circle cx="20" cy="9" r="1.6" fill="var(--color-brass)" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${tone === "light" ? "text-canvas" : "text-ink"}`}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className={`size-9 ${tone === "light" ? "text-ink-soft" : "text-ink"}`} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-bold tracking-[0.14em] uppercase">{site.shortName}</span>
        <span className="mt-1 text-[0.6rem] font-medium tracking-[0.32em] uppercase opacity-70">Law Firm</span>
      </span>
    </Link>
  );
}
