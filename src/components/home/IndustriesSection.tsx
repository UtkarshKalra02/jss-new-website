import Link from "next/link";
import { industries } from "@/content/industries";
import { Section, SectionHead } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";

export function IndustriesSection() {
  return (
    <Section tone="white">
      <SectionHead
        eyebrow="Industries served"
        title="Different categories fail in different ways."
        lede="What a pharmaceutical buyer needs from a carton is not what a D2C founder needs from one. These are the requirements we work against most often."
      />

      <div className="mt-14 grid gap-px border border-paper-300 bg-paper-300 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => (
          <div key={ind.slug} className="reveal flex flex-col bg-paper-50 p-8">
            <h3 className="text-[19px] font-semibold leading-snug">{ind.name}</h3>
            <p className="mt-3.5 flex-1 text-[15px] leading-relaxed text-ink-600">
              {ind.brief}
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-500">
              {ind.formats.join(" · ")}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/industries"
        className="reveal mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-500 transition-opacity hover:opacity-75"
      >
        What each industry needs from a packaging supplier
        <ArrowIcon className="h-3 w-3" />
      </Link>
    </Section>
  );
}
