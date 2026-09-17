/**
 * Lead model and dashboard arithmetic checks — everything in src/lib/leads.ts
 * that does not need Google. Run with:  npm test
 */
import assert from "node:assert/strict";
import {
  LEAD_HEADER,
  computeStats,
  filterLeads,
  leadFromFields,
  leadFromRow,
  leadsFromSheet,
  rowFromLead,
  sortNewestFirst,
  type Lead,
} from "@/lib/leads";
import { emptyFields } from "@/lib/rfq";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
}

const fixedNow = new Date("2026-09-17T06:30:00.000Z"); // 12:00 IST, a Thursday

const base = leadFromFields(
  {
    ...emptyFields,
    name: "  Priya Sharma ",
    companyName: "Acme Personal Care Pvt Ltd",
    phone: "+91 98100 11223",
    productType: "Monocartons",
    requirement: "Face serum outer carton.",
  },
  { channel: "whatsapp", sourcePage: "/request-a-quote", now: fixedNow, id: "L260917-TEST" }
);

function at(iso: string, patch: Partial<Lead> = {}): Lead {
  return { ...base, receivedAt: iso, id: `L-${iso}`, ...patch };
}

console.log("\nLead ↔ sheet row");

check("a lead round-trips through a sheet row unchanged", () => {
  const row = rowFromLead(base);
  assert.equal(row.length, LEAD_HEADER.length);
  assert.deepEqual(leadFromRow(row), base);
});

check("fields are trimmed and the lead starts as New", () => {
  assert.equal(base.name, "Priya Sharma");
  assert.equal(base.status, "New");
  assert.equal(base.receivedAt, fixedNow.toISOString());
});

check("a row the Sheets API has trimmed still reads cleanly", () => {
  const short = rowFromLead(base).slice(0, 5); // trailing empty cells dropped
  const lead = leadFromRow(short);
  assert.equal(lead.companyName, base.companyName);
  assert.equal(lead.internalNotes, "");
  assert.equal(lead.channel, "whatsapp");
});

check("a hand-edited or blank status falls back to New", () => {
  const row = rowFromLead(base);
  row[2] = "contacted"; // wrong case
  assert.equal(leadFromRow(row).status, "New");
  row[2] = "Contacted";
  assert.equal(leadFromRow(row).status, "Contacted");
});

check("leadsFromSheet skips the header and blank rows, keeping row numbers", () => {
  const rows = [LEAD_HEADER, rowFromLead(base), [], rowFromLead(at("2026-09-16T00:00:00Z"))];
  const out = leadsFromSheet(rows);
  assert.deepEqual(
    out.map((r) => r.rowNumber),
    [2, 4]
  );
});

console.log("\nDashboard numbers (Asia/Kolkata)");

check("today / week / month boundaries follow IST, not UTC", () => {
  const leads = [
    at("2026-09-16T19:00:00Z"), // 00:30 IST Thu 17 → today
    at("2026-09-16T18:00:00Z"), // 23:30 IST Wed 16 → this week, not today
    at("2026-09-13T12:00:00Z"), // Sun 13 → last week, this month
    at("2026-08-31T12:00:00Z"), // August → older
  ];
  const s = computeStats(leads, fixedNow);
  assert.equal(s.today, 1);
  assert.equal(s.thisWeek, 2);
  assert.equal(s.thisMonth, 3);
  assert.equal(s.total, 4);
});

check("status, channel and product breakdowns add up", () => {
  const leads = [
    at("2026-09-17T01:00:00Z"),
    at("2026-09-17T02:00:00Z", { status: "Won", productType: "Rigid Boxes", channel: "email" }),
    at("2026-09-17T03:00:00Z", { status: "Contacted" }),
  ];
  const s = computeStats(leads, fixedNow);
  assert.equal(s.awaitingContact, 1);
  assert.deepEqual(s.byChannel, { whatsapp: 2, email: 1 });
  assert.deepEqual(s.byProduct, [
    { label: "Monocartons", count: 2 },
    { label: "Rigid Boxes", count: 1 },
  ]);
  assert.equal(s.byStatus.Won, 1);
});

console.log("\nFiltering and ordering");

check("search matches across name, company, phone and email, case-insensitively", () => {
  const leads = [base, at("2026-09-16T00:00:00Z", { companyName: "Zed Foods", email: "z@zed.in", phone: "" })];
  assert.equal(filterLeads(leads, { q: "acme" }).length, 1);
  assert.equal(filterLeads(leads, { q: "98100" }).length, 1);
  assert.equal(filterLeads(leads, { q: "ZED.IN" }).length, 1);
  assert.equal(filterLeads(leads, { q: "nobody" }).length, 0);
});

check("status and product filters combine", () => {
  const leads = [
    base,
    at("2026-09-16T00:00:00Z", { status: "Quoted" }),
    at("2026-09-15T00:00:00Z", { status: "Quoted", productType: "Labels" }),
  ];
  assert.equal(filterLeads(leads, { status: "Quoted" }).length, 2);
  assert.equal(filterLeads(leads, { status: "Quoted", product: "Labels" }).length, 1);
});

check("newest lead comes first regardless of sheet order", () => {
  const leads = [at("2026-09-01T00:00:00Z"), at("2026-09-17T00:00:00Z"), at("2026-09-10T00:00:00Z")];
  assert.deepEqual(
    sortNewestFirst(leads).map((l) => l.receivedAt.slice(0, 10)),
    ["2026-09-17", "2026-09-10", "2026-09-01"]
  );
});

console.log(`\n${passed} checks passed.\n`);
