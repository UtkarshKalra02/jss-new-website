/**
 * Validation and message-composition checks for the RFQ form.
 * Run with:  npm test
 */
import assert from "node:assert/strict";
import {
  emptyFields,
  validate,
  composeMessage,
  whatsappSendUrl,
  mailtoSendUrl,
  type Fields,
} from "@/lib/rfq";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
}

const valid: Fields = {
  ...emptyFields,
  companyName: "Acme Personal Care Pvt Ltd",
  name: "Priya Sharma",
  phone: "+91 98100 11223",
  productType: "Monocartons",
  requirement: "Face serum outer carton for a 30ml glass bottle sold in modern trade.",
};

console.log("\nRFQ validation");

check("an empty form reports every required field", () => {
  const e = validate(emptyFields);
  assert.deepEqual(Object.keys(e).sort(), [
    "companyName",
    "name",
    "phone",
    "productType",
    "requirement",
  ]);
});

check("a complete enquiry passes", () => {
  assert.deepEqual(validate(valid), {});
});

check("email alone is enough — phone is not separately required", () => {
  const e = validate({ ...valid, phone: "", email: "priya@acme.co.in" });
  assert.deepEqual(e, {});
});

check("phone alone is enough", () => {
  assert.deepEqual(validate({ ...valid, email: "" }), {});
});

check("neither phone nor email is rejected", () => {
  const e = validate({ ...valid, phone: "", email: "" });
  assert.equal(e.phone, "Give us at least one way to reach you — phone or email.");
});

check("a malformed email is rejected", () => {
  assert.ok(validate({ ...valid, email: "priya@acme" }).email);
  assert.ok(validate({ ...valid, email: "not-an-email" }).email);
});

check("Indian mobile formats are accepted", () => {
  for (const p of ["9810011223", "+919810011223", "+91 98100 11223", "011-4123-4567"]) {
    assert.deepEqual(validate({ ...valid, phone: p }), {}, `rejected: ${p}`);
  }
});

check("obvious junk in the phone field is rejected", () => {
  assert.ok(validate({ ...valid, phone: "12" }).phone);
  assert.ok(validate({ ...valid, phone: "call me" }).phone);
});

check("whitespace-only input does not count as filled", () => {
  const e = validate({ ...valid, companyName: "   ", requirement: "   " });
  assert.ok(e.companyName);
  assert.ok(e.requirement);
});

console.log("\nMessage composition");

check("the message carries every supplied field", () => {
  const msg = composeMessage(valid);
  assert.match(msg, /Company: Acme Personal Care Pvt Ltd/);
  assert.match(msg, /Contact person: Priya Sharma/);
  assert.match(msg, /Phone: \+91 98100 11223/);
  assert.match(msg, /Packaging format: Monocartons/);
  assert.match(msg, /Face serum outer carton/);
});

check("empty optional fields leave no blank labels behind", () => {
  const msg = composeMessage(valid);
  assert.doesNotMatch(msg, /Email:\s*\n/);
  assert.doesNotMatch(msg, /Specifications/);
});

check("the specifications block appears only when something fills it", () => {
  const msg = composeMessage({ ...valid, quantity: "20,000 pcs", timeline: "March launch" });
  assert.match(msg, /— Specifications —/);
  assert.match(msg, /Approximate quantity: 20,000 pcs/);
  assert.match(msg, /Timeline: March launch/);
});

console.log("\nHandoff links");

check("the WhatsApp link targets the company number and encodes the body", () => {
  const url = whatsappSendUrl(valid);
  assert.match(url, /^https:\/\/wa\.me\/919891258552\?text=/);
  assert.ok(decodeURIComponent(url).includes("Acme Personal Care"));
  assert.ok(!url.includes("\n"), "newlines must be percent-encoded");
});

check("the mailto link carries a useful subject line", () => {
  const url = mailtoSendUrl(valid);
  assert.match(url, /^mailto:jssgraphics@gmail\.com\?subject=/);
  const subject = decodeURIComponent(url.split("subject=")[1].split("&body=")[0]);
  assert.equal(subject, "Packaging enquiry — Acme Personal Care Pvt Ltd (Monocartons)");
});

console.log(`\n${passed} checks passed.\n`);
