import { objections } from "@/content/objections";
import { Section, SectionHead } from "@/components/ui/Section";

/**
 * Direct application of the strategy document's "Looking for ___ but worried
 * about ___" template. Naming the buyer's fear before answering it is what
 * makes the answer land.
 */
export function ObjectionSection() {
  return (
    <Section tone="paper">
      <SectionHead
        eyebrow="Straight answers"
        title="Looking for a packaging manufacturer, but…"
        lede="Everyone evaluating a supplier is carrying at least one of these. Here they are, answered without the sales layer."
      />

      <div className="mt-14 grid gap-px border border-paper-300 bg-paper-300 md:grid-cols-2">
        {objections.map((o) => (
          <div key={o.fear} className="reveal bg-paper-100 p-8">
            <h3 className="flex gap-3.5 text-[17px] font-semibold leading-snug text-ink-900">
              <span className="mt-[9px] h-px w-4 shrink-0 bg-accent-500" />
              {o.fear}
            </h3>
            <p className="mt-4 pl-[30px] text-[15px] leading-relaxed text-ink-600">
              {o.answer}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
