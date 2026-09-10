import { faqs } from "@/content/objections";
import { Section, SectionHead } from "@/components/ui/Section";

export function FaqSection({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <Section tone="paper" id="faq">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              eyebrow="Before you enquire"
              title="Questions we get asked first."
            />
          </div>
        </div>
        <div className="lg:col-span-8">
          <dl>
            {items.map((f) => (
              <div key={f.q} className="reveal border-t border-paper-300 py-7 last:border-b">
                <dt className="text-[17px] font-semibold leading-snug">{f.q}</dt>
                <dd className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
