export type Product = {
  slug: string;
  name: string;
  /** Used in <title> and H1 contexts — carries search intent. */
  seoTitle: string;
  metaDescription: string;
  /** One line, buyer-facing. Appears on cards. */
  summary: string;
  /** "What it is" — plain definition, no puffery. */
  whatItIs: string;
  image: string;
  imageAlt: string;
  applications: string[];
  customisation: { label: string; detail: string }[];
  industries: string[];
  /** "Why it matters to the buyer" — the commercial argument. */
  buyerValue: { heading: string; body: string }[];
  /** Questions a procurement lead actually asks about this format. */
  specPrompts: string[];
};

/**
 * The general packaging formats. Rigid and luxury boxes deliberately do NOT
 * appear here — that is a separate business segment with its own content file
 * (`src/content/rigid.ts`), route and navigation entry.
 */
export const products: Product[] = [
  {
    slug: "monocartons",
    name: "Monocartons",
    seoTitle: "Monocarton Manufacturer in Delhi NCR | Printed Folding Cartons",
    metaDescription:
      "Monocarton manufacturer in Delhi NCR. Offset-printed folding cartons for cosmetics, FMCG, pharma and D2C brands — in-house printing, die-cutting, lamination and finishing.",
    summary:
      "The workhorse retail carton. Offset-printed folding cartons in a single paperboard piece, die-cut and glued to your structure.",
    whatItIs:
      "A monocarton is a folding carton cut and creased from a single sheet of paperboard, printed flat and then folded into shape. It is the default primary pack for most retail products because it ships flat, assembles fast on a line, and gives you the entire outer surface as printable brand real estate.",
    image: "/images/products/monocartons.jpg",
    imageAlt:
      "Stack of offset-printed monocartons for a personal care brand",
    applications: [
      "Skincare and colour cosmetics unit packs",
      "OTC pharmaceutical and nutraceutical cartons",
      "Packaged food, confectionery and beverage sleeves",
      "D2C subscription and refill packs",
      "Consumer electronics accessories",
    ],
    customisation: [
      { label: "Board", detail: "FBB, SBS and kraft-back grades, selected to your GSM and stiffness requirement" },
      { label: "Print", detail: "Offset in 2, 4 and 6 colour, plus dedicated Pantone stations for brand-critical shades" },
      { label: "Structure", detail: "Straight tuck, reverse tuck, crash-lock base, auto-bottom and custom dielines" },
      { label: "Finish", detail: "Matte and gloss lamination, soft-touch, spot UV, foil stamping, embossing and debossing" },
      { label: "Extras", detail: "Window patching, inserts, partitions and tamper-evident closures" },
    ],
    industries: ["Cosmetics & Personal Care", "FMCG & Food", "Pharmaceutical & Nutraceutical", "D2C Brands"],
    buyerValue: [
      {
        heading: "Shelf performance is decided at the carton",
        body: "In a crowded category the carton is the only thing a shopper touches before deciding. Board choice, finish and print consistency are what separate a pack that reads as premium from one that reads as cheap — at a difference of a few paise per unit.",
      },
      {
        heading: "Line efficiency, not just looks",
        body: "A carton that does not pop open cleanly or fails to square up costs you far more in packing-line downtime than it ever saved in board cost. Structures are proofed and physically sampled before the run.",
      },
      {
        heading: "Repeat-order colour consistency",
        body: "For a recurring SKU the risk is not the first order, it is the fourth. Standardised ink and board specifications are held on file so a reprint six months later matches the pack already on shelf.",
      },
    ],
    specPrompts: [
      "Flat size or closed dimensions (L × W × H)",
      "Board type and GSM, if already specified",
      "Number of print colours, and any Pantone references",
      "Finish required — lamination, UV, foil, emboss",
      "Annual volume and typical call-off quantity",
    ],
  },
  {
    slug: "corrugated-boxes",
    name: "Corrugated Boxes",
    seoTitle: "Corrugated Box Manufacturer in Delhi NCR | Printed Shipper Cartons",
    metaDescription:
      "Corrugated box manufacturer in Delhi NCR. Printed shippers, master cartons and e-commerce mailers in 3-ply and 5-ply, engineered for stacking strength and transit protection.",
    summary:
      "Shippers, master cartons and e-commerce mailers. Engineered for stacking strength and transit survival, printed to stay on brand.",
    whatItIs:
      "Corrugated board is a fluted paper core sandwiched between liners, which is what gives it crush resistance at low weight. It covers everything from the master carton that moves your primary packs through distribution to the branded mailer that arrives at a customer's door.",
    image: "/images/products/corrugated-boxes.jpg",
    imageAlt: "Printed corrugated shipper cartons stacked for dispatch",
    applications: [
      "Master cartons and outer shippers for distribution",
      "E-commerce mailers and subscription boxes",
      "Retail-ready and shelf-ready transit packs",
      "Industrial and component packaging",
      "Multi-unit combo and promotional packs",
    ],
    customisation: [
      { label: "Construction", detail: "3-ply and 5-ply, with flute profile selected against your stacking load" },
      { label: "Style", detail: "Regular slotted cartons, die-cut mailers, telescopic and tray formats" },
      { label: "Print", detail: "Offset-printed litho-laminated for full-colour brand work, or economical direct print" },
      { label: "Internals", detail: "Partitions, dividers, corner protection and fitted inserts" },
      { label: "Marking", detail: "Barcodes, batch panels and statutory transit information" },
    ],
    industries: ["FMCG & Food", "E-commerce & D2C", "Manufacturing & Industrial", "Pharmaceutical & Nutraceutical"],
    buyerValue: [
      {
        heading: "Damage in transit is a margin problem",
        body: "A shipper specified one grade too light shows up later as returns, replacements and a support queue. Getting flute and ply right against your actual stacking and handling profile is cheaper than absorbing the breakage.",
      },
      {
        heading: "The mailer is now a brand surface",
        body: "For D2C, the corrugated outer is the first thing the customer sees. Litho-laminated printing brings offset-grade colour to corrugated, so the shipper can carry the same brand quality as the primary pack.",
      },
      {
        heading: "One supplier across the pack hierarchy",
        body: "Sourcing the monocarton and its master carton from the same manufacturer keeps dimensions coordinated, removes the fit problems that appear when two vendors work from separate briefs, and consolidates your follow-up into one conversation.",
      },
    ],
    specPrompts: [
      "Internal dimensions, and units per carton",
      "Gross packed weight and stacking height",
      "3-ply or 5-ply, if already specified",
      "Print requirement — full colour, single colour or plain",
      "Monthly offtake and delivery location",
    ],
  },
  {
    slug: "window-boxes",
    name: "Window Boxes",
    seoTitle: "Window Patch Box Manufacturer in Delhi NCR | Cartons with Clear Windows",
    metaDescription:
      "Window patch box manufacturer in Delhi NCR. Cartons with precision die-cut windows and in-house film patching for cosmetics, food, toys, stationery and gift kits.",
    summary:
      "Cartons with a die-cut aperture and clear film patch, so the product sells itself through the pack.",
    whatItIs:
      "A window box is a carton with an aperture die-cut into a panel and a transparent film patched over it from the inside. It lets the shopper see the actual product while the pack still protects it and carries full branding and statutory information.",
    image: "/images/products/window-boxes.jpg",
    imageAlt: "White window patch boxes with die-cut apertures showing the product",
    applications: [
      "Soaps, bath and handmade personal care",
      "Confectionery, bakery and gourmet food",
      "Toys, hobby kits and stationery",
      "Combo kits and festive hampers",
      "Any product where colour, texture or fill level is the selling point",
    ],
    customisation: [
      { label: "Aperture", detail: "Any die-cut shape, including brand marks and multi-panel windows" },
      { label: "Film", detail: "PET and PVC patching, applied in-house on the same production floor" },
      { label: "Board", detail: "FBB and kraft grades, chosen for panel rigidity around the cut-out" },
      { label: "Finish", detail: "Lamination, spot UV and foiling on the surrounding panels" },
      { label: "Structure", detail: "Tuck-end, crash-lock and sleeve-plus-tray combinations" },
    ],
    industries: ["Cosmetics & Personal Care", "FMCG & Food", "Retail & Lifestyle", "D2C Brands"],
    buyerValue: [
      {
        heading: "Visibility converts at shelf",
        body: "For products bought on appearance — colour, texture, craft, fill — a window removes the shopper's last doubt without a single extra word on the pack.",
      },
      {
        heading: "Patching quality is where windows fail",
        body: "A lifting or bubbled patch reads as a defective product. Film application runs in-house rather than at a third-party job worker, which is what keeps patch quality consistent across a run.",
      },
      {
        heading: "Fewer returns from mismatch",
        body: "When the customer has already seen the product through the pack, the gap between expectation and delivery narrows — which matters most in gifting and impulse categories.",
      },
    ],
    specPrompts: [
      "Carton dimensions and window shape or position",
      "Film type, if specified",
      "Board and finish preference",
      "Whether the pack needs an insert or tray",
      "Quantity and timeline",
    ],
  },
  {
    slug: "sleeves",
    name: "Printed Sleeves",
    seoTitle: "Printed Sleeve Manufacturer in Delhi NCR | Carton & Tray Sleeves",
    metaDescription:
      "Printed packaging sleeve manufacturer in Delhi NCR. Board sleeves for trays, rigid boxes and combo packs — a low-cost way to run variants and seasonal editions.",
    summary:
      "Board sleeves that wrap a tray, box or bundle. The most economical way to run variants without retooling the pack.",
    whatItIs:
      "A sleeve is a printed band of paperboard that slides over a tray, box or grouped units. Because the sleeve carries the artwork while the base pack stays constant, it is the cheapest route to multiple SKUs, seasonal editions and promotional bundles.",
    image: "/images/products/sleeves.jpg",
    imageAlt: "Kraft paperboard sleeve and tray packaging",
    applications: [
      "Variant and flavour differentiation on a shared base pack",
      "Festive and limited-edition runs",
      "Multi-pack and combo bundling",
      "Ready meal and food tray banding",
      "Minimalist premium packaging for D2C",
    ],
    customisation: [
      { label: "Format", detail: "Full wrap, partial band, open-ended and belly-band constructions" },
      { label: "Print", detail: "Full-colour offset, or restrained single-colour work on uncoated stock" },
      { label: "Finish", detail: "Matte, soft-touch, spot UV and foil accents" },
      { label: "Board", detail: "Lightweight to heavy grades depending on grip and rigidity needed" },
      { label: "Detailing", detail: "Thumb cuts, die-cut apertures and perforated tear strips" },
    ],
    industries: ["FMCG & Food", "Cosmetics & Personal Care", "D2C Brands", "Retail & Lifestyle"],
    buyerValue: [
      {
        heading: "Run more SKUs without more tooling",
        body: "One base pack plus several printed sleeves lets you carry variants, languages or regional editions while amortising a single die across all of them.",
      },
      {
        heading: "Change the campaign, not the pack",
        body: "Seasonal and promotional artwork can move on the sleeve alone, so a campaign refresh does not mean writing off existing carton stock.",
      },
      {
        heading: "Material efficiency reads as restraint",
        body: "A sleeve uses noticeably less board than a full secondary carton. For brands making a sustainability argument, it is a reduction that customers can actually see.",
      },
    ],
    specPrompts: [
      "Dimensions of the item the sleeve will wrap",
      "Full wrap or partial band",
      "Number of artwork variants in the run",
      "Finish preference",
      "Quantity per variant",
    ],
  },
  {
    slug: "printed-labels",
    name: "Printed Labels",
    seoTitle: "Printed Label Manufacturer in Delhi NCR | Product & Bottle Labels",
    metaDescription:
      "Printed label manufacturer in Delhi NCR. Custom product labels in sheet and roll form with foil, matte, gloss and transparent finishes for bottles, jars and cartons.",
    summary:
      "Product labels in sheet or roll form, finished to sit alongside your carton without a colour mismatch.",
    whatItIs:
      "Labels carry your brand and your statutory information on containers a carton cannot wrap — bottles, jars, tubes, pouches and drums. Supplied in sheet or roll form depending on whether application is manual or on a labelling machine.",
    image: "/images/products/printed-labels.jpg",
    imageAlt: "Printed product label applied to a jar",
    applications: [
      "Bottle, jar and tube labelling for cosmetics and personal care",
      "Food and beverage front and back-of-pack labels",
      "Batch, MRP, barcode and statutory compliance panels",
      "Seals, tamper-evident closures and warranty stickers",
      "Promotional and on-pack offer labels",
    ],
    customisation: [
      { label: "Supply form", detail: "Die-cut sheets, or roll form wound to your applicator specification" },
      { label: "Material", detail: "Paper, transparent and metallised face stocks" },
      { label: "Finish", detail: "Matte, gloss, foil accents and transparent no-label-look" },
      { label: "Shape", detail: "Custom die-cut profiles and rounded-corner formats" },
      { label: "Data", detail: "Barcodes, batch panels and variable print requirements" },
    ],
    industries: ["Cosmetics & Personal Care", "FMCG & Food", "Pharmaceutical & Nutraceutical", "Manufacturing & Industrial"],
    buyerValue: [
      {
        heading: "Label and carton must match",
        body: "When labels and cartons come from two suppliers, the brand colour drifts between them and the mismatch is visible on shelf. Sourcing both together keeps one colour standard across the whole pack.",
      },
      {
        heading: "Compliance is not optional",
        body: "Statutory declarations, batch coding and barcode readability are checked as part of the job rather than left to the buyer to catch at dispatch.",
      },
      {
        heading: "Built for how you actually apply them",
        body: "Roll direction, core size and web width are set against your labelling machine, so the roll runs instead of sitting in the stores.",
      },
    ],
    specPrompts: [
      "Label size and shape",
      "Sheet or roll — and if roll, core size and wind direction",
      "Face material and finish",
      "Number of colours and any Pantone references",
      "Quantity per SKU",
    ],
  },
  {
    slug: "display-boxes",
    name: "Display & Counter Boxes",
    seoTitle: "Display Box & PDQ Manufacturer in Delhi NCR | Counter Display Units",
    metaDescription:
      "Counter display box and PDQ manufacturer in Delhi NCR. Retail-ready display units and shelf-ready packaging that ship flat and open into a merchandising unit.",
    summary:
      "Retail-ready units that ship as a carton and open into a merchandising display at the counter.",
    whatItIs:
      "A display box is packaging and point-of-sale in one structure. It travels as a sealed transit unit, then the retailer removes a panel and it becomes a filled counter or shelf display — no separate POS material and no repacking at store level.",
    image: "/images/products/display-boxes.jpg",
    imageAlt: "Retail-ready packaging merchandised on a store shelf",
    applications: [
      "Counter-top displays for impulse SKUs",
      "Shelf-ready packaging for modern trade",
      "New product launch and sampling units",
      "Promotional and combo-offer displays",
      "Pharmacy and beauty counter merchandising",
    ],
    customisation: [
      { label: "Format", detail: "Counter display units, shelf-ready trays and tear-away shippers" },
      { label: "Structure", detail: "Perforated opening lines, headers, risers and tiered platforms" },
      { label: "Print", detail: "Full-colour offset on the faces the shopper actually sees" },
      { label: "Board", detail: "Corrugated or paperboard, specified against fill weight" },
      { label: "Internals", detail: "Partitions and gravity-feed trays for facing control" },
    ],
    industries: ["FMCG & Food", "Cosmetics & Personal Care", "Retail & Lifestyle", "Pharmaceutical & Nutraceutical"],
    buyerValue: [
      {
        heading: "Wins counter space you cannot otherwise buy",
        body: "A unit that a retailer can place in seconds gets placed. One that needs assembly gets left in the back room — and that is shelf presence you have already paid for.",
      },
      {
        heading: "Cuts store-level handling cost",
        body: "Shelf-ready formats remove the unpack-and-face step entirely, which is exactly what modern trade buyers push their suppliers to deliver.",
      },
      {
        heading: "Pays for itself on impulse categories",
        body: "For low-ticket, high-frequency SKUs, position at the counter moves more volume than almost any other packaging decision.",
      },
    ],
    specPrompts: [
      "Product dimensions and units per display",
      "Counter-top or shelf-ready format",
      "Whether a printed header or riser is needed",
      "Retail channel the display is destined for",
      "Quantity and rollout schedule",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
