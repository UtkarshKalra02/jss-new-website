"use client";

import { company } from "@/content/company";
import { telHref, whatsappHref } from "@/lib/contact";

/**
 * Persistent mobile conversion rail. The strategy document's point about
 * responding inside five minutes only works if the buyer can reach a person
 * in one tap — so call and WhatsApp stay reachable on every mobile screen.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink-800 bg-ink-950 lg:hidden">
      <a
        href={telHref}
        className="flex items-center justify-center gap-2 py-4 text-[15px] font-medium text-paper-100"
        aria-label={`Call ${company.name}`}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M2.5 4.2c0-.9.7-1.7 1.6-1.7h2c.7 0 1.3.5 1.5 1.2l.6 2.3c.2.6 0 1.3-.5 1.7l-1 .8a11 11 0 0 0 4.8 4.8l.8-1c.4-.5 1.1-.7 1.7-.5l2.3.6c.7.2 1.2.8 1.2 1.5v2c0 .9-.8 1.6-1.7 1.6A14.7 14.7 0 0 1 2.5 4.2Z" />
        </svg>
        Call now
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-l border-ink-800 py-4 text-[15px] font-medium text-paper-100"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-6.6-5.8c-.5-.9-.5-1.7-.4-2.3.1-.5.6-1.1 1-1.3.2-.1.6-.1.8 0 .2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.2-.3.3-.1.6a8.8 8.8 0 0 0 3.6 3c.3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.2.5.4 0 .2 0 .8-.2 1.2Z" />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
