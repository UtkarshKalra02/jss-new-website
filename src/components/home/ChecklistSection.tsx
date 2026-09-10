import { vendorChecklist } from "@/content/objections";
import { Section, SectionHead } from "@/components/ui/Section";

/**
 * The secondary offer. A buyer who is still comparing suppliers is not ready
 * for the quotation CTA — this gives them something genuinely useful and
 * positions JSS as the party confident enough to hand over the criteria.
 * Presented inline rather than as an exit-intent popup, which would undercut
 * the credibility this section is meant to build.
 */
export function ChecklistSection() {
  return (
    <Section tone="white">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              eyebrow="Not ready to enquire yet"
              title={vendorChecklist.title}
              lede={vendorChecklist.intro}
            />
            <p className="mt-8 border-l-2 border-accent-500 pl-5 text-[15px] leading-relaxed text-ink-700">
              We would rather you ask these of every supplier on your list than
              take our word for anything. If our answers do not hold up against
              someone else&rsquo;s, we have not earned the order.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="space-y-px">
            {vendorChecklist.items.map((item, i) => (
              <li
                key={item.q}
                className="reveal border-t border-paper-300 py-7 last:border-b"
              >
                <div className="flex gap-5 sm:gap-7">
                  <span className="font-mono text-[12px] tabular-nums text-ink-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold leading-snug">
                      &ldquo;{item.q}&rdquo;
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
                      {item.why}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
