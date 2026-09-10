/**
 * Named clients, confirmed by the owner.
 *
 * Logos are the companies' own official marks, taken from their own websites
 * (see `source` on each entry). They are shown for identification — the normal
 * B2B client-wall use — but publishing a customer's mark is usually something
 * the customer should sign off on, and some brand guidelines restrict it.
 * Removing one is a single line here; nothing else references them.
 *
 * `maxH` is the display height in px. It is set per logo rather than shared,
 * because a 6:1 wordmark and a 1:1 badge at the same height look wrong next to
 * each other — these values balance them optically, not mathematically.
 */
export type Client = {
  name: string;
  sector: string;
  /** Path under /public. Omit when we do not have an official mark. */
  logo?: string;
  /** Intrinsic pixel size of the asset, so the browser reserves the space. */
  width?: number;
  height?: number;
  /** Rendered height in px. */
  maxH?: number;
  /**
   * Resting opacity in the greyscale wall. Set per logo because the marks are
   * not equally dark: measured mean luminance runs from ~0 (Revlon, solid
   * black) to 83 (GearUp, orange). At a single shared opacity the pale ones
   * vanish next to the black ones, so each is nudged until the row reads as
   * one even weight. Tune by eye — the numbers below are a starting point, not
   * a formula.
   */
  opacity?: number;
  source?: string;
};

export const namedClients: Client[] = [
  {
    name: "Revlon",
    sector: "Global cosmetics",
    logo: "/images/clients/revlon.svg",
    width: 518,
    height: 85,
    maxH: 24,
    opacity: 0.52,
    source: "revlon.com",
  },
  {
    name: "Nicobar",
    sector: "Lifestyle & D2C",
    logo: "/images/clients/nicobar.png",
    width: 202,
    height: 31,
    maxH: 20,
    opacity: 0.58,
    source: "nicobar.com",
  },
  {
    name: "Coloressence",
    sector: "Colour cosmetics",
    // Coloressence publish only a white-on-transparent mark; it is flattened to
    // ink here so it is visible on a light background. Same artwork, one colour.
    logo: "/images/clients/coloressence.png",
    width: 190,
    height: 40,
    maxH: 26,
    opacity: 0.55,
    source: "coloressence.com",
  },
  {
    name: "Multani Pharmaceuticals",
    sector: "Pharmaceutical & ayurvedic",
    logo: "/images/clients/multani.png",
    width: 408,
    height: 160,
    maxH: 42,
    opacity: 0.68,
    source: "multani.org",
  },
  {
    name: "Fifth Sense",
    sector: "Fragrance & personal care",
    logo: "/images/clients/fifthsense.svg",
    width: 216,
    height: 19,
    maxH: 17,
    opacity: 0.62,
    source: "itsfifthsense.com",
  },
  {
    name: "GearUp",
    sector: "Electrical & LED",
    logo: "/images/clients/gearup.png",
    width: 192,
    height: 64,
    maxH: 36,
    opacity: 0.72,
    source: "Gear-Up Electric Pvt. Ltd., Faridabad",
  },
];

