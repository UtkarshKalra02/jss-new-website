import { processSteps } from "@/content/capabilities";
import { Section, SectionHead } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <Section tone="paper">
      <SectionHead
        eyebrow="How an order runs"
        title="From enquiry to repeat order."
        lede="Most packaging risk sits in the gaps between stages. This is the sequence every job follows, and what has to be signed off before the next step starts."
      />

      <ol className="mt-14 grid gap-px border border-paper-300 bg-paper-300 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((s) => (
          <li key={s.step} className="reveal bg-paper-100 p-8">
            <span className="font-mono text-[12px] tabular-nums text-accent-500">
              {s.step}
            </span>
            <h3 className="mt-4 text-[19px] font-semibold leading-snug">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
