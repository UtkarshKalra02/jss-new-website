import "server-only";
import { script } from "@/lib/leads-sheet";
import { CLICKS_TAB, CLICK_HEADER, LEADS_TAB, LEAD_HEADER, rowFromLead, type Lead } from "@/lib/leads";

/**
 * The website only ever appends. Reading, filtering and status changes all
 * happen in the dashboard that lives inside the sheet's Apps Script.
 */

export async function saveLead(lead: Lead) {
  await script("append", { tab: LEADS_TAB, header: LEAD_HEADER, row: rowFromLead(lead) });
}

export async function recordClick(channel: "call" | "whatsapp", page: string) {
  await script("append", {
    tab: CLICKS_TAB,
    header: CLICK_HEADER,
    row: [new Date().toISOString(), channel, page],
  });
}
