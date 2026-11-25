"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { ArrowBadge } from "@/components/ui/LinkButton";
import { isActive } from "./NavLinks";

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Close the menu after navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass inline-flex size-12 items-center justify-center rounded-full lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Menu className="size-5" strokeWidth={1.75} />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-0 text-ink backdrop:bg-ink/40 open:animate-rise lg:hidden"
      >
        <div className="flex h-full flex-col px-5 pt-5 pb-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Menu</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-12 items-center justify-center rounded-full bg-surface shadow-soft"
              aria-label="Close menu"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="display flex min-h-16 items-center justify-between py-4 text-[2rem] aria-[current=page]:text-brass-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/contact#callback" className="btn btn-primary w-full justify-between">
            <span>Request a callback</span>
            <ArrowBadge />
          </Link>
        </div>
      </dialog>
    </>
  );
}
