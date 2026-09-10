import { Section, SectionHead } from "@/components/ui/Section";

/**
 * Problem, then expansion of the problem — steps one and two of the strategy
 * document's communication framework. Written from the buyer's side of the
 * table, not the supplier's.
 */
const consequences = [
  {
    n: "01",
    title: "The colour moves between runs",
    body: "The second batch does not match the first. Both sit on the same shelf, and the newer pack is the one that looks wrong.",
  },
  {
    n: "02",
    title: "Work leaves the building",
    body: "Printing is in-house, but lamination, foiling or die-cutting goes to a job worker. Every handoff adds a day and a place for the schedule to break.",
  },
  {
    n: "03",
    title: "The structure fails on the line",
    body: "Cartons that will not square up or pop open cleanly cost more in packing-line downtime than the board saving was ever worth.",
  },
  {
    n: "04",
    title: "The cheaper quote was not comparable",
    body: "A lighter board, one less colour, subcontracted finishing. The difference does not show in the quotation — it shows in the rejects.",
  },
];

export function ProblemSection() {
  return (
    <Section tone="paper">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="reveal lg:sticky lg:top-28">
            <SectionHead
              eyebrow="Why buyers change supplier"
              title={
                <>
                  Packaging rarely fails at
                  <br className="hidden sm:block" /> the design stage.
                </>
              }
              lede="It fails four months in, on a repeat order, when the person who approved the sample has moved on and nobody wrote the specification down."
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="space-y-px">
            {consequences.map((c) => (
              <li
                key={c.n}
                className="reveal group border-t border-paper-300 py-8 last:border-b"
              >
                <div className="flex gap-6 sm:gap-10">
                  <span className="font-mono text-[12px] tabular-nums text-ink-500 transition-colors group-hover:text-accent-500">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug">{c.title}</h3>
                    <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-ink-600">
                      {c.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="reveal mt-9 max-w-lg text-[16px] leading-relaxed text-ink-700">
            Each of these traces back to the same root cause: the packaging was
            bought as a transaction rather than specified as a process. The
            sections below set out how this is run instead.
          </p>
        </div>
      </div>
    </Section>
  );
}
