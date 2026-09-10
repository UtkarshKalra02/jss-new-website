import { company } from "@/content/company";

export const telHref = `tel:${company.phoneHref}`;
export const mailHref = `mailto:${company.email}`;

/** Prefilled WhatsApp deep link. Keeps the 5-minute response path open. */
export function whatsappHref(message?: string) {
  const text = message ?? defaultWhatsappMessage();
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsappMessage(context?: string) {
  return context
    ? `Hello JSS The Print Zone — I'd like to discuss a packaging requirement for ${context}.`
    : "Hello JSS The Print Zone — I'd like to discuss a packaging requirement.";
}

export const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.city} ${company.address.postalCode}`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.name}, ${fullAddress}`
)}`;
