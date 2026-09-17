import type { Fields } from "@/lib/rfq";

/**
 * Browser-side reporting to /api/leads. Fire-and-forget: `keepalive` lets the
 * request finish even though the page is about to navigate to WhatsApp, a
 * mail client or the thank-you page, and every failure is swallowed — a
 * tracking hiccup must never stand between a buyer and the phone.
 */
function post(body: unknown) {
  try {
    void fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

function currentPage() {
  if (typeof window === "undefined") return "";
  return window.location.pathname + window.location.search;
}

export function trackLead(fields: Fields, channel: "whatsapp" | "email") {
  post({ kind: "lead", fields, channel, sourcePage: currentPage() });
}

export function trackClick(channel: "call" | "whatsapp") {
  post({ kind: "click", channel, page: currentPage() });
}
