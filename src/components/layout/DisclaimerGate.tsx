"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

const STORAGE_KEY = "slf-disclaimer-accepted-v1";

/**
 * First-visit disclaimer customary for Indian advocates' websites (Bar Council of India rules).
 * Page content is server-rendered underneath, so crawlers and no-JS visitors still get the full page.
 * TODO(lawyer-review): approve wording. Open decision: gate vs inline-only (see INSTRUCTIONS.md).
 */
export function DisclaimerGate() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let accepted = false;
    try {
      accepted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage blocked: show the notice each visit.
    }
    if (!accepted && !ref.current?.open) ref.current?.showModal();
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore — acceptance applies to this page view.
    }
    ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-body"
      // Escape must not dismiss without agreeing.
      onCancel={(e) => e.preventDefault()}
      className="m-auto w-[min(36rem,calc(100%-2.5rem))] rounded-card bg-surface p-0 text-ink shadow-lift backdrop:bg-ink/55 backdrop:backdrop-blur-sm open:animate-rise"
    >
      <div className="flex flex-col gap-5 p-7 sm:p-9">
        <p className="eyebrow">Disclaimer</p>
        <h2 id="disclaimer-title" className="display text-3xl">
          Before you continue
        </h2>
        <div id="disclaimer-body" className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-muted">
          <p>
            The Bar Council of India does not permit advocates to solicit work or advertise. By clicking “I agree”, you
            confirm that:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>you are seeking information about {site.name} on your own accord;</li>
            <li>there has been no advertisement, solicitation or inducement by the firm or its members;</li>
            <li>information on this website is general, is not legal advice, and does not create an advocate–client relationship.</li>
          </ul>
        </div>
        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/disclaimer" onClick={accept} className="link-underline text-sm text-muted hover:text-ink">
            Read the full disclaimer
          </Link>
          <button type="button" onClick={accept} className="btn btn-primary pr-6" autoFocus>
            I agree
          </button>
        </div>
      </div>
    </dialog>
  );
}
