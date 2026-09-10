import Image from "next/image";
import Link from "next/link";
import { capabilities } from "@/content/capabilities";
import { Section, SectionHead } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";

export function CapabilitySection() {
  return (
    <Section tone="ink">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              tone="dark"
              eyebrow="Manufacturing"
              title={
                <>
                  Everything that touches
                  <br className="hidden sm:block" /> your carton happens here.
                </>
              }
              lede="Printing, structural design, die-cutting, lamination, foiling, embossing, window patching, folding and gluing all run in the company's own facility in Okhla Phase-II. Nothing critical is sent out."
            />
            <div className="mt-9 overflow-hidden rounded-sm">
              <Image
                src="/images/facility/offset-press.jpg"
                alt="Four-colour Heidelberg offset press line at the JSS The Print Zone facility"
                width={640}
                height={480}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 440px"
                className="h-auto w-full object-cover"
              />
            </div>
            <Link
              href="/manufacturing"
              className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-400 transition-opacity hover:opacity-75"
            >
              Full manufacturing capability
              <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {capabilities.map((c) => (
              <li key={c.title} className="reveal rule-dark py-9 last:pb-0">
                <h3 className="text-[22px] font-semibold text-paper-100">{c.title}</h3>
                <p className="mt-3.5 max-w-xl text-[16px] leading-relaxed text-ink-400">
                  {c.body}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[14px] leading-relaxed text-paper-300">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-accent-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
