import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Button";
import { telHref } from "@/lib/contact";

/**
 * Above the fold, a buyer must resolve four things in about five seconds:
 * what this company makes, who it makes it for, whether it is credible,
 * and what to do next. Everything else waits.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-paper-100">
      <div className="absolute inset-0">
        <Image
          src="/images/facility/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={72}
          className="object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/55" />
        <div className="grid-field-dark absolute inset-0" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[calc(100svh-72px)] flex-col justify-center py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
              Okhla Phase-II, New Delhi
              <span className="mx-2.5 text-ink-600">/</span>
              ISO 9001 certified
              <span className="mx-2.5 text-ink-600">/</span>
              {company.foundedYearsText}
            </p>

            <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
              Packaging that holds
              <br className="hidden sm:block" /> its standard on the
              <br className="hidden sm:block" />{" "}
              <span className="text-accent-400">fourth reprint.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-paper-300 sm:text-[19px]">
              JSS The Print Zone manufactures offset-printed monocartons, rigid
              boxes, corrugated packaging, sleeves and labels for FMCG, cosmetic,
              pharmaceutical and D2C brands — printed, die-cut, laminated and
              finished under one roof in New Delhi.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/request-a-quote"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-accent-500 px-7 py-[1.125rem] text-[16px] font-medium text-white transition-colors hover:bg-accent-600"
              >
                Request a Quotation
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/packaging"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-white/25 px-7 py-[1.125rem] text-[16px] font-medium text-paper-100 transition-colors hover:border-paper-100 hover:bg-paper-100 hover:text-ink-900"
              >
                See packaging formats
              </Link>
            </div>

            <p className="mt-7 text-[14px] text-ink-400">
              Prefer to talk it through?{" "}
              <a
                href={telHref}
                className="text-paper-200 underline decoration-ink-600 underline-offset-4 transition-colors hover:decoration-accent-500"
              >
                Call us
              </a>
              <span className="mx-2 text-ink-600">·</span>
              Enquiries answered {company.responseSla}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
