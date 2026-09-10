import { company } from "@/content/company";

export type Fields = {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  productType: string;
  requirement: string;
  quantity: string;
  dimensions: string;
  timeline: string;
  notes: string;
  /** Honeypot — bots fill it, humans never see it. */
  website: string;
};

export type Errors = Partial<Record<keyof Fields, string>>;

export const emptyFields: Fields = {
  name: "",
  companyName: "",
  phone: "",
  email: "",
  productType: "",
  requirement: "",
  quantity: "",
  dimensions: "",
  timeline: "",
  notes: "",
  website: "",
};

const PHONE_RE = /^[+]?\d[\d\s\-()]{7,17}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Only four things are genuinely required: who you are, which company, one way
 * to reach you, and what the product is. Everything else is optional, because a
 * form that demands a GSM figure from a founder who does not have one yet is a
 * form that loses the enquiry.
 */
export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (f.companyName.trim().length < 2)
    e.companyName = "Please enter your company name.";

  const hasPhone = f.phone.trim().length > 0;
  const hasEmail = f.email.trim().length > 0;
  if (!hasPhone && !hasEmail) {
    e.phone = "Give us at least one way to reach you — phone or email.";
  } else {
    if (hasPhone && !PHONE_RE.test(f.phone.trim()))
      e.phone = "That does not look like a valid phone number.";
    if (hasEmail && !EMAIL_RE.test(f.email.trim()))
      e.email = "That does not look like a valid email address.";
  }

  if (!f.productType) e.productType = "Select the closest packaging format.";
  if (f.requirement.trim().length < 10)
    e.requirement = "Tell us a little about the product — a sentence is enough.";
  return e;
}

/** Human-readable enquiry, used for both the WhatsApp and email bodies. */
export function composeMessage(f: Fields) {
  const line = (label: string, value: string) =>
    value.trim() ? `${label}: ${value.trim()}\n` : "";

  return (
    `New packaging enquiry — ${company.name}\n\n` +
    line("Company", f.companyName) +
    line("Contact person", f.name) +
    line("Phone", f.phone) +
    line("Email", f.email) +
    `\nPackaging format: ${f.productType}\n` +
    `\nRequirement:\n${f.requirement.trim()}\n` +
    (f.quantity || f.dimensions || f.timeline || f.notes
      ? `\n— Specifications —\n` +
        line("Approximate quantity", f.quantity) +
        line("Dimensions / specifications", f.dimensions) +
        line("Timeline", f.timeline) +
        line("Other information", f.notes)
      : "")
  );
}

export function whatsappSendUrl(f: Fields) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(composeMessage(f))}`;
}

export function mailtoSendUrl(f: Fields) {
  const subject = `Packaging enquiry — ${f.companyName.trim()} (${f.productType})`;
  return `mailto:${company.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(composeMessage(f))}`;
}
