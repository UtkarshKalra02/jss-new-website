/**
 * SINGLE SOURCE OF TRUTH FOR COMPANY FACTS.
 *
 * Every claim rendered anywhere on this website resolves from this file.
 * Nothing here is invented: each value below is either published on the
 * company's existing website or was confirmed directly by the owner.
 *
 * Anything the company has not yet confirmed lives in `PENDING` at the
 * bottom of this file. Fill a value in there and it appears on the site
 * automatically — no component edits required.
 */

export const company = {
  name: "JSS The Print Zone",
  legalName: "JSS The Print Zone",
  tagline: "Offset printing & packaging manufacturing",
  foundedYearsText: "20+ years",

  /**
   * The phone number is deliberately NEVER rendered as visible text anywhere on
   * the site — the owner asked that it not appear openly. It exists here only to
   * build `tel:` and WhatsApp links behind word-labelled controls ("Call us",
   * "WhatsApp"). Do not print `phone` into JSX, and do not reintroduce it into
   * structured data.
   */
  phone: "+91 98912 58552",
  phoneHref: "+919891258552",
  whatsapp: "919891258552",
  email: "jssgraphics@gmail.com",

  address: {
    street: "39, DSIDC Sheds, Scheme-1",
    locality: "Okhla Industrial Area, Phase-II",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110020",
    country: "IN",
    countryName: "India",
  },

  instagram: "https://www.instagram.com/jss_the_print_zone/",

  /** Response commitment shown to buyers. Keep this promise operationally true. */
  responseSla: "within 24 hours",
  responseSlaShort: "24-hour response",

  /** Confirmed certification. */
  certifications: [
    {
      name: "ISO 9001",
      description:
        "Certified quality management system governing how jobs are planned, produced, inspected and released.",
    },
  ],
} as const;

/**
 * The canonical origin for this site.
 *
 * Canonical URLs, Open Graph URLs, the sitemap and the JSON-LD graph all derive
 * from this. If it does not match the domain the site is actually served from,
 * Google sees canonicals pointing at another host and the pages compete with
 * themselves.
 *
 * It reads from NEXT_PUBLIC_SITE_URL so a domain change is a Vercel environment
 * variable and a redeploy, not a code edit. Set it with the protocol and no
 * trailing slash, e.g. https://jsstheprintzone.com
 */
function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "https://jsstheprintzone.com";
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

/**
 * ── PENDING CONFIRMATION ────────────────────────────────────────────────
 * These are the highest-value trust signals a serious FMCG or D2C buyer
 * looks for, and they are currently absent from the site.
 *
 * Set `enabled: true` and supply real values once confirmed. Until then the
 * corresponding UI blocks do not render, so no unverified claim can ship.
 */
type Pending<T> = { enabled: boolean; value: T };

export const PENDING: {
  monthlyCapacity: Pending<string>;
  standardLeadTime: Pending<string>;
  typicalMoq: Pending<string>;
  facilitySize: Pending<string>;
  namedClients: Pending<string[]>;
  testimonials: Pending<
    { quote: string; person: string; role: string; company: string }[]
  >;
  caseStudies: { enabled: boolean };
} = {
  /** e.g. { enabled: true, value: "3.5 lakh cartons / month" } */
  monthlyCapacity: { enabled: false, value: "" },
  /** e.g. { enabled: true, value: "12–15 working days from artwork approval" } */
  standardLeadTime: { enabled: false, value: "" },
  /** e.g. { enabled: true, value: "5,000 pcs" } */
  typicalMoq: { enabled: false, value: "" },
  /** e.g. { enabled: true, value: "18,000 sq ft" } */
  facilitySize: { enabled: false, value: "" },
  /** Named client references, with written permission to publish. */
  namedClients: { enabled: false, value: [] as string[] },
  /** Attributed testimonials only. Never publish an unattributed quote. */
  testimonials: {
    enabled: false,
    value: [],
  },
  /** Case studies. Add entries and flip to true when a customer approves one. */
  caseStudies: { enabled: false },
};
