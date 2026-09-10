export type Industry = {
  slug: string;
  name: string;
  brief: string;
  whatMatters: string[];
  formats: string[];
};

export const industries: Industry[] = [
  {
    slug: "cosmetics-personal-care",
    name: "Cosmetics & Personal Care",
    brief:
      "Colour accuracy and finish quality are the category. A shade that drifts between production runs is visible on shelf next to the previous batch.",
    whatMatters: [
      "Brand colour held to the same standard across repeat runs",
      "Premium finishes — soft-touch, foil, emboss — executed cleanly at volume",
      "Structures that protect glass, pumps and droppers in transit",
      "Ingredient and statutory panels laid out legibly at small point sizes",
    ],
    formats: ["Monocartons", "Rigid Boxes", "Window Boxes", "Printed Labels"],
  },
  {
    slug: "fmcg-food",
    name: "FMCG & Food",
    brief:
      "High volume, tight schedules and unforgiving retail calendars. The supplier's job is to be predictable, not just capable.",
    whatMatters: [
      "Consistent output across long, repeating production runs",
      "Dimensional accuracy so packs run on automated packing lines",
      "Coordinated primary carton and master shipper specifications",
      "Delivery dates that hold against promotional launch windows",
    ],
    formats: ["Monocartons", "Corrugated Boxes", "Printed Sleeves", "Display & Counter Boxes"],
  },
  {
    slug: "pharmaceutical-nutraceutical",
    name: "Pharmaceutical & Nutraceutical",
    brief:
      "Documentation and traceability sit alongside print quality. Every panel carries regulatory weight.",
    whatMatters: [
      "Accurate reproduction of statutory and dosage information",
      "Batch, barcode and coding panels that scan reliably",
      "Controlled artwork versioning and approval records",
      "Consistent board specification for automated cartoning",
    ],
    formats: ["Monocartons", "Printed Labels", "Corrugated Boxes"],
  },
  {
    slug: "d2c-ecommerce",
    name: "D2C & E-commerce",
    brief:
      "The pack is the only physical touchpoint the brand has. It also has to survive a courier network built for speed, not care.",
    whatMatters: [
      "Unboxing quality that justifies a direct-to-consumer price point",
      "Transit-rated outer packaging that keeps damage claims down",
      "Ability to run smaller, more frequent quantities as demand moves",
      "Brand-grade print on the shipper, not just the primary pack",
    ],
    formats: ["Rigid Boxes", "Corrugated Boxes", "Monocartons", "Printed Sleeves"],
  },
  {
    slug: "retail-lifestyle",
    name: "Retail & Lifestyle",
    brief:
      "Wide SKU counts, frequent seasonal refreshes and packaging that has to work as merchandising.",
    whatMatters: [
      "Cost-efficient routes to many variants from a shared base pack",
      "Retail-ready formats that get placed rather than stored",
      "Finish options that hold a premium position at accessible price points",
      "Turnaround that keeps pace with seasonal calendars",
    ],
    formats: ["Printed Sleeves", "Display & Counter Boxes", "Window Boxes", "Rigid Boxes"],
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    brief:
      "Protection, identification and repeatable supply matter more than shelf appeal.",
    whatMatters: [
      "Corrugated specified against real stacking and handling loads",
      "Clear part, batch and handling identification",
      "Scheduled supply against production planning, not one-off orders",
      "Inserts and partitions that stop component movement in transit",
    ],
    formats: ["Corrugated Boxes", "Printed Labels", "Monocartons"],
  },
];
