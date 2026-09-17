/**
 * The lead model shared by the capture route, the dashboard and the sheet.
 *
 * Pure functions only — no I/O — so the row ↔ lead mapping and the dashboard
 * arithmetic can be tested with `npm test` without touching Google.
 *
 * The Google Sheet is the source of truth. Column order below IS the sheet's
 * column order; append new columns at the end, never in the middle, or every
 * existing row shifts under the dashboard.
 */
import type { Fields } from "@/lib/rfq";

export const LEAD_STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type LeadChannel = "whatsapp" | "email";

export type Lead = {
  id: string;
  /** ISO 8601, UTC. */
  receivedAt: string;
  status: LeadStatus;
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

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === "string" && (LEAD_STATUSES as readonly string[]).includes(v);
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

/**
 * Tolerant of hand edits: a blank or misspelt status falls back to "New" and
 * missing trailing cells (the Sheets API trims them) read as empty strings.
 */
export function leadFromRow(row: string[]): Lead {
  const cell = (i: number) => (row[i] ?? "").toString();
  const lead = {} as Record<keyof Lead, string>;
  LEAD_COLUMNS.forEach((c, i) => (lead[c.key] = cell(i)));
  return {
    ...lead,
    status: isLeadStatus(lead.status) ? lead.status : "New",
    channel: lead.channel === "email" ? "email" : "whatsapp",
  };
}

/** Sheet rows → leads, skipping the header and rows with no id (hand-added blanks). */
export function leadsFromSheet(rows: string[][]): { lead: Lead; rowNumber: number }[] {
  return rows
    .map((row, i) => ({ lead: leadFromRow(row), rowNumber: i + 1 }))
    .filter(({ lead, rowNumber }) => rowNumber > 1 && lead.id.trim().length > 0);
}

/* ── Dashboard arithmetic ─────────────────────────────────────────────── */

export type LeadStats = {
  today: number;
  thisWeek: number;
  thisMonth: number;
  awaitingContact: number;
  total: number;
  byStatus: Record<LeadStatus, number>;
  byProduct: { label: string; count: number }[];
  byChannel: Record<LeadChannel, number>;
};

/** Start of the day / week (Monday) / month in the given IANA zone. */
function startOf(unit: "day" | "week" | "month", now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const d = Number(get("day"));
  const h = Number(get("hour")) % 24;
  const mi = Number(get("minute"));
  const s = Number(get("second"));
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));

  // Milliseconds since local midnight, then step back to the unit boundary.
  const sinceMidnight = ((h * 60 + mi) * 60 + s) * 1000;
  let start = now.getTime() - sinceMidnight;
  if (unit === "week") start -= ((weekday + 6) % 7) * 86_400_000;
  if (unit === "month") start -= (d - 1) * 86_400_000;
  return start;
}

export function computeStats(
  leads: Lead[],
  now = new Date(),
  timeZone = "Asia/Kolkata"
): LeadStats {
  const day = startOf("day", now, timeZone);
  const week = startOf("week", now, timeZone);
  const month = startOf("month", now, timeZone);

  const byStatus = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<
    LeadStatus,
    number
  >;
  const byChannel: Record<LeadChannel, number> = { whatsapp: 0, email: 0 };
  const products = new Map<string, number>();

  let today = 0;
  let thisWeek = 0;
  let thisMonth = 0;

  for (const lead of leads) {
    const t = Date.parse(lead.receivedAt);
    if (!Number.isNaN(t)) {
      if (t >= day) today++;
      if (t >= week) thisWeek++;
      if (t >= month) thisMonth++;
    }
    byStatus[lead.status]++;
    byChannel[lead.channel]++;
    const p = lead.productType || "Unspecified";
    products.set(p, (products.get(p) ?? 0) + 1);
  }

  return {
    today,
    thisWeek,
    thisMonth,
    awaitingContact: byStatus.New,
    total: leads.length,
    byStatus,
    byProduct: [...products.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
    byChannel,
  };
}

export type LeadFilter = {
  status?: string;
  product?: string;
  q?: string;
};

export function filterLeads(leads: Lead[], filter: LeadFilter): Lead[] {
  const q = (filter.q ?? "").trim().toLowerCase();
  return leads.filter((l) => {
    if (filter.status && l.status !== filter.status) return false;
    if (filter.product && l.productType !== filter.product) return false;
    if (q) {
      const hay = [l.name, l.companyName, l.phone, l.email, l.requirement]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/** Newest first. Ties (same second) keep sheet order. */
export function sortNewestFirst(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt));
}
