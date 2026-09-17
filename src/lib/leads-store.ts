import "server-only";
import { script } from "@/lib/leads-sheet";
import {
  CLICKS_TAB,
  CLICK_HEADER,
  LEADS_TAB,
  LEAD_COLUMNS,
  LEAD_HEADER,
  leadFromRow,
  leadsFromSheet,
  rowFromLead,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";

/** Everything that touches the sheet, in one place. */

export async function saveLead(lead: Lead) {
  await script("append", { tab: LEADS_TAB, header: LEAD_HEADER, row: rowFromLead(lead) });
}

export async function listLeads(): Promise<Lead[]> {
  const rows = await script<string[][]>("list", { tab: LEADS_TAB });
  return leadsFromSheet(rows).map((r) => r.lead);
}

const headerOf = (key: keyof Lead) => LEAD_COLUMNS.find((c) => c.key === key)!.header;

/**
 * The script finds the row by its ID at write time, so sorting or deleting
 * rows in the sheet by hand cannot make a status change land on the wrong
 * lead. Cells are addressed by header name for the same reason.
 */
export async function updateLead(
  id: string,
  patch: { status?: LeadStatus; internalNotes?: string }
): Promise<Lead | null> {
  const cells: Record<string, string> = {};
  if (patch.status !== undefined) cells[headerOf("status")] = patch.status;
  if (patch.internalNotes !== undefined) cells[headerOf("internalNotes")] = patch.internalNotes;
  const row = await script<string[] | null>("update", { tab: LEADS_TAB, id, patch: cells });
  return row ? leadFromRow(row) : null;
}

export async function recordClick(channel: "call" | "whatsapp", page: string) {
  await script("append", {
    tab: CLICKS_TAB,
    header: CLICK_HEADER,
    row: [new Date().toISOString(), channel, page],
  });
}

export async function listClicks(): Promise<{ at: string; channel: string; page: string }[]> {
  const rows = await script<string[][]>("list", { tab: CLICKS_TAB });
  return rows.slice(1).map(([at = "", channel = "", page = ""]) => ({ at, channel, page }));
}
