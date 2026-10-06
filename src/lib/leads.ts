/**
 * How a quote-form submission becomes a row in the leads Google Sheet.
 *
 * Pure functions only — no I/O — so the mapping can be tested with `npm test`
 * without touching Google.
 *
 * The sheet is the source of truth and the dashboard lives in the sheet's own
 * Apps Script (docs/apps-script/). Column order below IS the sheet's column
 * order, and the dashboard addresses cells by these header names — change a
 * header here and in docs/apps-script/Dashboard.html together.
 */
import type { Fields } from "@/lib/rfq";

export type LeadChannel = "whatsapp" | "email";

export type Lead = {
  id: string;
  /** ISO 8601, UTC. The dashboard converts to IST for display. */
  receivedAt: string;
  /** Always "New" from the website; the owner moves it along in the dashboard. */
  status: "New";
  name: string;
  companyName: string;
  phone: string;
  email: string;
  productType: string;
  requirement: string;
  quantity: string;
  dimensions: string;
  timeline: string;
  /** What the buyer typed into "Other information". */
  notes: string;
  channel: LeadChannel;
  /** Path the form was submitted from, e.g. /request-a-quote?product=Rigid+boxes */
  sourcePage: string;
  /** The team's own follow-up notes, edited from the dashboard or the sheet. */
  internalNotes: string;
};

export const LEADS_TAB = "Leads";
export const CLICKS_TAB = "Clicks";

/** Header row of the Leads tab. Order matters — see the file comment. */
export const LEAD_COLUMNS: { key: keyof Lead; header: string }[] = [
  { key: "id", header: "ID" },
  { key: "receivedAt", header: "Received (UTC)" },
  { key: "status", header: "Status" },
  { key: "name", header: "Contact person" },
  { key: "companyName", header: "Company" },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email" },
  { key: "productType", header: "Product" },
  { key: "requirement", header: "Requirement" },
  { key: "quantity", header: "Quantity" },
  { key: "dimensions", header: "Dimensions / specs" },
  { key: "timeline", header: "Timeline" },
  { key: "notes", header: "Buyer's notes" },
  { key: "channel", header: "Sent via" },
  { key: "sourcePage", header: "Source page" },
  { key: "internalNotes", header: "Internal notes" },
];

export const LEAD_HEADER = LEAD_COLUMNS.map((c) => c.header);

/** Header row of the Clicks tab — one row per Call / WhatsApp tap. */
export const CLICK_HEADER = ["Clicked (UTC)", "Channel", "Page"];

export function newLeadId(now = new Date()) {
  const stamp = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `L${stamp}-${rand}`;
}

export function leadFromFields(
  f: Fields,
  meta: { channel: LeadChannel; sourcePage: string; now?: Date; id?: string }
): Lead {
  const now = meta.now ?? new Date();
  return {
    id: meta.id ?? newLeadId(now),
    receivedAt: now.toISOString(),
    status: "New",
    name: f.name.trim(),
    companyName: f.companyName.trim(),
    phone: f.phone.trim(),
    email: f.email.trim(),
    productType: f.productType,
    requirement: f.requirement.trim(),
    quantity: f.quantity.trim(),
    dimensions: f.dimensions.trim(),
    timeline: f.timeline.trim(),
    notes: f.notes.trim(),
    channel: meta.channel,
    sourcePage: meta.sourcePage,
    internalNotes: "",
  };
}

export function rowFromLead(lead: Lead): string[] {
  return LEAD_COLUMNS.map((c) => lead[c.key] ?? "");
}
