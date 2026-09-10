import type { Metadata } from "next";
import Image from "next/image";
import { capabilities, processSteps } from "@/content/capabilities";
import { PENDING, company } from "@/content/company";
import { manufacturingMetrics } from "@/content/positioning";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, SectionHead } from "@/components/ui/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Manufacturing & Capabilities | In-House Printing and Converting",
  description:
    "Inside the JSS The Print Zone facility in Okhla Phase-II, New Delhi: Heidelberg offset printing, structural design, die-cutting, lamination, foiling, embossing and window patching, all in-house.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  /* Capacity and lead time come from src/content/positioning.ts so the figure
     shown here cannot drift from the one on the homepage. Facility size is
     still unconfirmed and lives in company.ts's PENDING block. */
  const facts = [
    ...manufacturingMetrics.map((m) => ({ label: m.label, value: m.value })),
    ...(PENDING.facilitySize.enabled && PENDING.facilitySize.value
      ? [{ label: "Facility", value: PENDING.facilitySize.value }]
      : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-paper-100">
        <div className="absolute inset-0">
          <Image
            src="/images/facility/die-cut-lamination.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/50" />
        </div>
        <Container className="relative">
          <div className="py-20 sm:py-28">
            <Eyebrow tone="dark">Manufacturing &amp; capabilities</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
              Print, cut, laminate, foil, patch and glue — all in one building.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-400">
              The reason packaging schedules slip is almost never the printing. It
              is the work that leaves the building — lamination sent to one job
              worker, foiling to another, die-cutting to a third. At JSS The Print
              Zone all of it runs on the same floor in Okhla Phase-II, {company.address.city}.
            </p>
            {facts.length > 0 && (
              <dl className="mt-12 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="bg-ink-950 p-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
                      {f.label}
                    </dt>
                    <dd className="mt-2 text-2xl font-semibold text-paper-100">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <SectionHead
          eyebrow="Capabilities"
          title="What runs on the floor"
          lede="Described in terms of what it means for your job, rather than as a list of machine names."
        />
        <div className="mt-14 space-y-px">
          {capabilities.map((c, i) => (
            <article
              key={c.title}
              className="reveal grid gap-8 border-t border-paper-300 py-12 last:border-b lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-5">
                {c.image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-200">
                    <Image
                      src={c.image}
                      alt={c.imageAlt ?? ""}
                      fill
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-7">
                <span className="font-mono text-[12px] tabular-nums text-accent-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-[26px] font-semibold leading-snug">{c.title}</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-600">
                  {c.body}
                </p>
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
                      <span className="mt-[10px] h-px w-3.5 shrink-0 bg-accent-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <SectionHead
          tone="dark"
          eyebrow="Order process"
          title="Six stages, each with a gate"
          lede="Nothing moves to the next stage until the previous one is signed off. That is what makes a delivery date something we can commit to rather than estimate."
        />
        <ol className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <li key={s.step} className="reveal bg-ink-950 p-8">
              <span className="font-mono text-[12px] tabular-nums text-accent-400">
                {s.step}
              </span>
              <h3 className="mt-4 text-[19px] font-semibold text-paper-100">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Want to see the floor before you commit?"
        body="Buyers placing recurring volume are welcome to visit the facility in Okhla Phase-II. Call ahead and we will arrange a time that works."
      />
    </>
  );
}
