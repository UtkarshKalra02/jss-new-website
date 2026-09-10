/**
 * Rigid & luxury packaging — treated as a distinct business segment, not as one
 * more entry in the packaging formats list.
 *
 * The buyer is different (brand and marketing teams rather than procurement),
 * the decision criteria are different (finish, feel and unboxing rather than
 * unit cost), and the price point is different. It gets its own route, its own
 * navigation entry and its own homepage section for that reason.
 */

export const rigidSegment = {
  slug: "rigid-boxes",
  name: "Rigid & Luxury Boxes",
  navLabel: "Rigid & Luxury",
  seoTitle: "Rigid Box Manufacturer in Delhi NCR | Luxury Packaging Boxes",
  metaDescription:
    "Rigid box manufacturer in Delhi NCR. Premium set-up boxes for perfume, beauty, gifting and jewellery — greyboard construction, printed wraps, foil stamping, embossing and fitted inserts, made in-house in New Delhi.",

  eyebrow: "A separate segment",
  headline: "Rigid boxes are not a bigger carton. They are a different business.",
  standfirst:
    "A folding carton is bought on cost per unit. A rigid box is bought on how the product feels in the customer's hands. Different buyer, different criteria, different production discipline — which is why we run it as its own segment rather than as an option on a quotation.",

  images: {
    /** Used on the homepage split. Deliberately a light, high-key shot: it sits
     *  directly beside a near-black copy panel, and a dark image there reads as
     *  an empty void rather than as photography. */
    segment: {
      src: "/images/rigid/stack.jpg",
      alt: "Stacked rigid boxes with a blind-debossed brand mark",
    },
    hero: {
      src: "/images/rigid/hero.jpg",
      alt: "Premium rigid gift box with foil detailing and ribbon closure",
    },
    stack: {
      src: "/images/rigid/segment.jpg",
      alt: "An open rigid box with a fitted interior holding a perfume bottle",
    },
    detail: {
      src: "/images/rigid/edge-detail.jpg",
      alt: "Close detail of wrapped rigid box edges and corner construction",
    },
    unboxing: {
      src: "/images/rigid/unboxing.jpg",
      alt: "Rigid box opened to reveal a wrapped product and fitted interior",
    },
  },

  /** What actually separates a good rigid box from a bad one. */
  differentiators: [
    {
      title: "Corner and wrap are where it shows",
      body:
        "A rigid box is greyboard, cornered and then wrapped in a separately printed paper. If the wrap tension is wrong, the corners lift and the box reads as cheap within a week of sitting on a shelf. This is the part that cannot be rushed and cannot be subcontracted.",
    },
    {
      title: "The interior is half the product",
      body:
        "Foam, paperboard platforms, moulded pulp or fabric-lined trays — a product that sits still and lifts out cleanly is the whole reason a brand pays for rigid in the first place.",
    },
    {
      title: "Decoration runs on the same floor",
      body:
        "Hot foil, blind and registered embossing, debossing, soft-touch lamination and spot UV all happen here rather than at three different job workers. Registration between foil and print is exactly where multi-vendor rigid jobs fall apart.",
    },
    {
      title: "It has to survive the courier",
      body:
        "Rigid construction absorbs transit handling far better than a folding carton. For fragile, high-value SKUs shipped direct to consumers, the reduction in damage claims usually outweighs the unit-cost difference on its own.",
    },
  ],

  constructions: [
    { label: "Lid & base", detail: "The classic two-piece set-up box. Deep or shallow, with or without a collar." },
    { label: "Magnetic closure", detail: "Book-style box with concealed magnets — the standard for premium gifting and PR kits." },
    { label: "Drawer / slide", detail: "An inner tray that slides from a printed outer sleeve." },
    { label: "Hinged lid", detail: "Attached lid with a defined opening angle, for display-at-point-of-use products." },
    { label: "Collapsible", detail: "Ships flat and assembles with magnets, where storage and freight cost matter." },
  ],

  finishes: [
    "Hot foil stamping in metallic and pigment foils",
    "Blind and registered embossing, and debossing",
    "Matte, gloss and soft-touch lamination",
    "Spot UV and texture coatings",
    "Specialty and textured wrap papers",
    "Ribbon pulls, magnets and closure hardware",
  ],

  applications: [
    "Perfume, fragrance and premium skincare",
    "Festive, corporate and employee gifting",
    "Jewellery, watches and accessories",
    "Premium spirits and gourmet food",
    "D2C launch, PR and influencer seeding kits",
    "Limited editions and collector packaging",
  ],

  industries: ["Cosmetics & Personal Care", "Luxury & Gifting", "D2C Brands", "Retail & Lifestyle"],

  specPrompts: [
    "Internal dimensions and the weight of the product",
    "Closure style — magnetic, lid-and-base, drawer, hinged",
    "Wrap finish, and any foil or emboss detailing",
    "Insert requirement, and whether the product is fragile",
    "Order quantity and the date it has to land",
  ],
};
