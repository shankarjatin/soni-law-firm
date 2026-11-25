import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "light" | "ghost-dark";

const withArrow: Variant[] = ["primary", "light"];

export function LinkButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={`btn btn-${variant} ${className}`} {...props}>
      <span>{children}</span>
      {withArrow.includes(variant) && <ArrowBadge />}
    </Link>
  );
}

export function ArrowBadge() {
  return (
    <span className="btn-arrow" aria-hidden="true">
      <ArrowUpRight className="size-4" strokeWidth={1.75} />
    </span>
  );
}
