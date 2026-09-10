import type { Metadata } from "next";
import { company, PENDING } from "@/content/company";
import { faqs } from "@/content/objections";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, SectionHead } from "@/components/ui/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMeta, faqSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Quality & Compliance | ISO 9001 Certified Packaging Manufacturer",
  description:
    "How quality is controlled at JSS The Print Zone: an ISO 9001 certified quality management system, in-process checks, sample approval before production and specification records held for repeat orders.",
  path: "/quality",
});

const controls = [
  {
    stage: "Incoming material",
    detail:
      "Board and substrate are checked against the approved specification before a job is scheduled, because a substitution caught at this stage costs nothing and one caught at dispatch costs the whole run.",
  },
  {
    stage: "Pre-press & artwork",
    detail:
      "Artwork is checked against the dieline for cut, crease, glue and bleed areas. Statutory panels, barcodes and batch fields are verified before plates are made.",
  },
  {
    stage: "Sample approval",
    detail:
      "A physical sample is produced and signed off before production begins. Everything that follows is measured against that approved sample rather than against a screen proof.",
  },
  {
    stage: "In-process checks",
    detail:
      "Colour, registration and finish are checked through the run rather than only at the end, so a drift is caught while it is still a few hundred sheets and not the whole order.",
  },
  {
    stage: "Conversion & assembly",
    detail:
      "Die-cut accuracy, squaring, pop-open behaviour, glue integrity and patch adhesion are checked on the converting floor.",
  },
  {
    stage: "Final inspection & release",
    detail:
      "Output is inspected against the approved sample and the job specification before packing. Release is a documented step, not an assumption.",
  },
];

export default function QualityPage() {
  return (
    <>
      <section className="bg-ink-950 py-16 text-paper-100 sm:py-20">
        <Container>
          <Eyebrow tone="dark">Quality &amp; compliance</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
            A certification is only worth what the process behind it does.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-400">
            {company.name} operates an ISO 9001 certified quality management
            system. What that means in practice is set out below — the checks a
            job actually passes through, from incoming board to release.
          </p>

          <div className="mt-12 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2">
            {company.certifications.map((c) => (
              <div key={c.name} className="bg-ink-950 p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
                  Certified
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-paper-100">{c.name}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-400">
                  {c.description}
                </p>
              </div>
            ))}
            <div className="bg-ink-950 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Documentation
              </p>
              <h2 className="mt-4 text-[21px] font-semibold text-paper-100">
                Certificates on request
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-400">
                Copies of certification, GST registration and company
                documentation are provided to buyers during vendor onboarding.
                Ask and we will send them.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <SectionHead
          eyebrow="Quality control"
          title="Where a job is checked"
          lede="Six control points, each one placed where a defect is still cheap to fix."
        />
        <ol className="mt-14">
          {controls.map((c, i) => (
            <li
              key={c.stage}
              className="reveal grid gap-4 border-t border-paper-300 py-8 last:border-b sm:grid-cols-12 sm:gap-10"
            >
              <div className="sm:col-span-4">
                <span className="font-mono text-[12px] tabular-nums text-accent-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[20px] font-semibold leading-snug">{c.stage}</h3>
              </div>
              <p className="text-[16px] leading-relaxed text-ink-600 sm:col-span-8">
                {c.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Repeat orders"
              title="The specification outlives the person who approved it."
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-[17px] leading-relaxed text-ink-700">
              The most common quality failure in packaging is not a bad first
              order — it is a fourth order that does not match the first. It
              happens when the specification lived in someone&rsquo;s memory, and
              that person moved on.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-700">
              Board grade, GSM, ink and Pantone references, finishing sequence and
              the approved sample are recorded per SKU and held on file. A reprint
              months later is produced against that record, so the pack that
              arrives matches the one already on shelf.
            </p>
            {!PENDING.monthlyCapacity.enabled && (
              <p className="mt-8 border-l-2 border-paper-400 pl-5 text-[15px] leading-relaxed text-ink-500">
                Capacity figures, lead times and minimum order quantities vary by
                format and finish. We confirm these against your actual
                specification rather than publishing a generic number that would
                not hold for your job.
              </p>
            )}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Need our documentation for vendor onboarding?"
        body="Certification copies, GST registration and company details are shared as part of the onboarding process. Tell us what your procurement team needs."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs.filter((f) => /certif|quality|sample/i.test(f.q)))),
        }}
      />
    </>
  );
}
