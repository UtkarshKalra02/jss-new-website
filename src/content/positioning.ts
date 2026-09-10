/**
 * Positioning numbers — the single source for every figure on the site.
 *
 * Structure taken from the "Company Positioning — Find these numbers"
 * worksheet (Week 2 deck, p18). That sheet lists 25 metrics, most written for
 * other industries; these are the subset that moves a packaging buyer.
 *
 * All values below were confirmed by the owner. A metric renders only when
 * `enabled` is true and it has a value, so nothing unverified can reach a page.
 *
 * `home` and `manufacturing` control placement. Keeping capacity and lead time
 * here rather than in company.ts's PENDING block means one figure has one home
 * and the two pages cannot drift apart.
 */

export type Metric = {
  key: string;
  /** Displayed as-is. The count-up parses the digits out of it. */
  value: string;
  label: string;
  /** One line of context — keeps a bare number from reading as a boast. */
  note?: string;
  enabled: boolean;
  /** Show in the homepage "By the numbers" band. */
  home?: boolean;
  /** Show in the Manufacturing page spec strip. */
  manufacturing?: boolean;
  worksheetItem?: number;
};

export const positioning: Metric[] = [
  {
    key: "repeat-clients",
    value: "70%",
    label: "Repeat clients",
    note: "Customers who reorder rather than re-tender — the site's claim about the fourth reprint, in one number.",
    enabled: true,
    home: true,
    worksheetItem: 8,
  },
  {
    key: "monthly-capacity",
    value: "5 Lakh",
    label: "Cartons per month",
    note: "Current production capacity across the Okhla Phase-II floor.",
    enabled: true,
    home: true,
    manufacturing: true,
    worksheetItem: 15,
  },
  {
    key: "average-delivery",
    value: "14 days",
    label: "Average delivery",
    note: "From approved sample to dispatch.",
    enabled: true,
    home: true,
    manufacturing: true,
    worksheetItem: 23,
  },
  {
    key: "cartons-produced",
    value: "2 crore+",
    label: "Cartons produced",
    note: "Cumulative units since the business was established.",
    enabled: true,
    home: true,
    worksheetItem: 15,
  },
  {
    key: "client-value",
    // Deliberately descriptive rather than causal. "Revenue we generated for
    // clients" invites a procurement head to point out that JSS printed the
    // carton, not the product. This states the same figure defensibly.
    value: "₹500 cr+",
    label: "Client product shipped",
    note: "Value of customer product that has gone to market in JSS packaging.",
    enabled: true,
    home: true,
    worksheetItem: 3,
  },
  {
    key: "cities",
    value: "10+",
    label: "Cities supplied",
    note: "Finished packaging delivered across India, not only Delhi NCR.",
    enabled: true,
    home: true,
    worksheetItem: 7,
  },
  {
    key: "years",
    // Already carried by the hero eyebrow and the About page, so it stays out
    // of the band rather than repeating.
    value: "20+",
    label: "Years in offset printing",
    enabled: true,
    home: false,
    worksheetItem: 1,
  },
  {
    key: "brands-served",
    // Reads better as a line beneath the client logos than as a tile.
    value: "20+",
    label: "Brands served",
    enabled: true,
    home: false,
    worksheetItem: 5,
  },
];

const live = positioning.filter((m) => m.enabled && m.value);

export const homeMetrics = live.filter((m) => m.home);
export const manufacturingMetrics = live.filter((m) => m.manufacturing);

export function metric(key: string) {
  return live.find((m) => m.key === key);
}

/** One statistic alone reads as thin rather than confident. */
export const showPositioningBand = homeMetrics.length >= 3;
