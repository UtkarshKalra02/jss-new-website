import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { RigidSegment } from "@/components/home/RigidSegment";
import { CapabilitySection } from "@/components/home/CapabilitySection";
import { PositioningBand } from "@/components/home/PositioningBand";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ObjectionSection } from "@/components/home/ObjectionSection";
import { ChecklistSection } from "@/components/home/ChecklistSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBand } from "@/components/site/CtaBand";
import { faqs } from "@/content/objections";
import { faqSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title:
      "JSS The Print Zone | Printing & Packaging Manufacturer in Delhi NCR",
    description:
      "Offset printing and packaging manufacturer in New Delhi. Monocartons, rigid boxes, corrugated boxes, sleeves, window boxes and labels for FMCG, cosmetic, pharmaceutical and D2C brands. ISO 9001 certified, in-house production.",
    path: "/",
  }),
  title:
    "Printing & Packaging Manufacturer in Delhi NCR | JSS The Print Zone",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <ProductGrid />
      <RigidSegment />
      <CapabilitySection />
      <PositioningBand />
      <ProcessSection />
      <IndustriesSection />
      <ObjectionSection />
      <ChecklistSection />
      <FaqSection limit={6} />
      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 6))) }}
      />
    </>
  );
}
