export type Capability = {
  title: string;
  body: string;
  points: string[];
  image?: string;
  imageAlt?: string;
};

/**
 * Every capability below is drawn from the equipment and processes the company
 * already publishes. No machine counts, speeds, sheet sizes or tonnage are
 * claimed, because those have not been confirmed.
 */
export const capabilities: Capability[] = [
  {
    title: "Offset Printing",
    body:
      "Sheet-fed offset on Heidelberg presses running 2, 4 and 6 colour work. Offset remains the right process for packaging at volume because it holds fine detail, small type and solid colour areas consistently across a long run — which is what makes a fourth reprint match the first.",
    points: [
      "Heidelberg presses in 2C, 4C and 6C configurations",
      "Process colour plus dedicated Pantone stations for brand shades",
      "Colour standards recorded per SKU and held for repeat orders",
      "Printing on paperboard, art paper and litho stock for lamination",
    ],
    image: "/images/facility/offset-press.jpg",
    imageAlt:
      "Four-colour Heidelberg offset press line at the JSS The Print Zone facility in Okhla, New Delhi",
  },
  {
    title: "Structural Design & Dielines",
    body:
      "Packaging fails structurally more often than it fails visually. Dielines are developed against your product dimensions, fill weight and packing method, then physically sampled so the structure is proven before a plate is made.",
    points: [
      "Dieline development and adaptation from your product specification",
      "Structural sampling before production commitment",
      "Artwork placement checked against cut, crease and glue areas",
      "Material and GSM recommendations for the intended use",
    ],
    image: "/images/facility/structural-design.jpg",
    imageAlt: "A die-cut paperboard carton structure being checked by hand",
  },
  {
    title: "Die-Cutting, Folding & Gluing",
    body:
      "Cutting and creasing run in-house. Keeping conversion under the same roof as printing removes the handoffs where registration drifts and schedules slip when work is sent to outside job workers.",
    points: [
      "In-house die-cutting and creasing",
      "Folding and gluing to the specified structure",
      "Window patching applied on the same floor",
      "Consistent squaring and pop-open behaviour checked through the run",
    ],
    image: "/images/facility/die-cut-lamination.jpg",
    imageAlt: "In-house die-cutting and lamination line",
  },
  {
    title: "Lamination & Premium Finishing",
    body:
      "Finishing is where a pack earns its price point. Matte, gloss and soft-touch lamination, spot UV, hot foil stamping, embossing and debossing are all executed internally rather than subcontracted.",
    points: [
      "Matte, gloss and soft-touch lamination",
      "Spot UV and texture coatings",
      "Hot foil stamping in metallic and pigment foils",
      "Embossing and debossing, blind or registered to print",
    ],
    image: "/images/facility/finishing.jpg",
    imageAlt: "Copper foil stamping on a dark textured board, produced at JSS The Print Zone",
  },
];

/** Reads as a process, because that is what a buyer is actually evaluating. */
export const processSteps = [
  {
    step: "01",
    title: "Requirement & specification",
    body: "We work through dimensions, board, print, finish and volume until the specification is unambiguous. Where a requirement is still open, we advise on the trade-off rather than quoting around it.",
  },
  {
    step: "02",
    title: "Dieline & artwork preparation",
    body: "The structure is drawn or adapted, and artwork is checked against cut, crease, glue and bleed areas before anything moves forward.",
  },
  {
    step: "03",
    title: "Sample & approval",
    body: "A physical sample is produced so the structure and finish can be assessed in hand, not on screen. Production begins only against a signed approval.",
  },
  {
    step: "04",
    title: "Production",
    body: "Offset printing, die-cutting, finishing, patching and gluing run in sequence in-house, with in-process checks at each stage under the ISO 9001 quality system.",
  },
  {
    step: "05",
    title: "Inspection & dispatch",
    body: "Output is inspected against the approved sample before packing. Consignments are packed for transit and dispatched to your schedule.",
  },
  {
    step: "06",
    title: "Repeat orders",
    body: "Board, ink and finishing specifications stay on file, so a reprint months later matches the pack already in market instead of restarting the conversation.",
  },
];
