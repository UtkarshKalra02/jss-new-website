import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, SectionHead } from "@/components/ui/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqSection } from "@/components/home/FaqSection";
import { faqs } from "@/content/objections";
import { pageMeta, faqSchema } from "@/lib/seo";
import { mapsHref, fullAddress } from "@/lib/contact";
import { ArrowIcon } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "About JSS The Print Zone | Printing & Packaging Company, New Delhi",
  description:
    "JSS The Print Zone is an offset printing and packaging manufacturer based in Okhla Phase-II, New Delhi, with over 20 years in printing and in-house packaging production.",
  path: "/about",
});

const principles = [
  {
    title: "Specify before you quote",
    body: "A number without a stated board grade, colour count and finish is not a quotation, it is a guess. We put the specification on paper first so the price means something and the comparison is fair.",
  },
  {
    title: "Keep the work in the building",
    body: "Printing, die-cutting, lamination, foiling, patching and gluing all run here. Fewer handoffs is not a marketing line — it is the single biggest determinant of whether a delivery date holds.",
  },
  {
    title: "Record it, so the reprint matches",
    body: "Specifications and approved samples are held per SKU. The pack you approve is the standard the fourth order is produced against.",
  },
  {
    title: "Answer the phone",
    body: "Enquiries reach a person who can actually quote the job. No ticket queue, no callback window that quietly expires.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-950 py-16 text-paper-100 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow tone="dark">The company</Eyebrow>
              <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
                Twenty years of putting ink on board, properly.
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-400">
                JSS The Print Zone is an offset printing and packaging
                manufacturer based in Okhla Phase-II, New Delhi. The business has
                spent {company.foundedYearsText} in printing and has built out a
                facility where structural design, printing, converting and premium
                finishing all happen under one roof.
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-400">
                The work is B2B and largely recurring: monocartons, rigid boxes,
                corrugated packaging, sleeves, window boxes and labels for brands
                in cosmetics, personal care, FMCG, pharmaceutical and D2C
                categories — the kind of customer who needs the fortieth order to
                look exactly like the first.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="/images/facility/custom-design.jpg"
                  alt="Packaging design and production at JSS The Print Zone"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <SectionHead
          eyebrow="How we work"
          title="Four things we do not compromise on"
          lede="Not values in the abstract — the four operating decisions that determine whether a packaging supplier is worth keeping."
        />
        <div className="mt-14 grid gap-px border border-paper-300 bg-paper-300 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="reveal bg-paper-100 p-8">
              <span className="font-mono text-[12px] tabular-nums text-accent-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[21px] font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3.5 text-[16px] leading-relaxed text-ink-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead
              tone="dark"
              eyebrow="Where we are"
              title="Okhla Phase-II, New Delhi"
              lede="Delhi NCR's industrial belt, which keeps us close to the brand teams, converters and logistics networks our customers already work with."
            />
          </div>
          <div className="lg:col-span-7">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-sm border border-ink-800 p-8 transition-colors hover:border-ink-600"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Facility &amp; office
              </p>
              <p className="mt-4 text-[19px] leading-relaxed text-paper-100">
                {fullAddress}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-400">
                Open in maps
                <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            <p className="mt-8 text-[15px] leading-relaxed text-ink-500">
              If you want to speak to an existing customer before placing volume,{" "}
              <Link
                href="/request-a-quote"
                className="text-paper-300 underline decoration-ink-600 underline-offset-4 hover:decoration-accent-500"
              >
                ask us
              </Link>{" "}
              and we will arrange a reference.
            </p>
          </div>
        </div>
      </Section>

      <FaqSection />
      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
    </>
  );
}
