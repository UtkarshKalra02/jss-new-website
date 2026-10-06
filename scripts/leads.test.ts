/**
 * Lead → sheet-row mapping checks for src/lib/leads.ts. Run with:  npm test
 */
import assert from "node:assert/strict";
import { LEAD_COLUMNS, LEAD_HEADER, leadFromFields, newLeadId, rowFromLead } from "@/lib/leads";
import { emptyFields } from "@/lib/rfq";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
}

const fixedNow = new Date("2026-09-17T06:30:00.000Z");

const lead = leadFromFields(
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

console.log("\nLead → sheet row");

check("fields are trimmed, the lead starts as New, and the time is the submission time", () => {
  assert.equal(lead.name, "Priya Sharma");
  assert.equal(lead.status, "New");
  assert.equal(lead.receivedAt, fixedNow.toISOString());
  assert.equal(lead.internalNotes, "");
});

check("the row has one cell per header, in header order", () => {
  const row = rowFromLead(lead);
  assert.equal(row.length, LEAD_HEADER.length);
  assert.equal(row[LEAD_HEADER.indexOf("ID")], "L260917-TEST");
  assert.equal(row[LEAD_HEADER.indexOf("Company")], "Acme Personal Care Pvt Ltd");
  assert.equal(row[LEAD_HEADER.indexOf("Sent via")], "whatsapp");
  assert.equal(row[LEAD_HEADER.indexOf("Internal notes")], "");
});

check("the dashboard's header names are the ones the site writes", () => {
  // Dashboard.html addresses cells by these names; renaming one silently breaks it.
  for (const h of ["ID", "Received (UTC)", "Status", "Phone", "Email", "Product", "Internal notes"]) {
    assert.ok(LEAD_HEADER.includes(h), `missing header ${h}`);
  }
  assert.equal(new Set(LEAD_COLUMNS.map((c) => c.key)).size, LEAD_COLUMNS.length);
});

check("ids carry the date and are unique across calls", () => {
  const a = newLeadId(fixedNow);
  const b = newLeadId(fixedNow);
  assert.match(a, /^L260917-[A-Z0-9]{4}$/);
  assert.notEqual(a, b);
});

console.log(`\n${passed} checks passed.\n`);
