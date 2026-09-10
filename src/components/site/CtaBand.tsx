import { company } from "@/content/company";
import { telHref, whatsappHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Button";
import Link from "next/link";

/**
 * The recurring conversion block. One primary CTA (quotation), with direct
 * human channels beside it rather than competing CTAs.
 */
export function CtaBand({
  title = "Send us your packaging requirement.",
  body = "Share your format, dimensions and quantity — or just describe the product. We will come back with a specification and a quotation.",
  context,
}: {
  title?: string;
  body?: string;
  /** Product or page context, prefilled into the WhatsApp message. */
  context?: string;
}) {
  return (
    <section className="grid-field-dark bg-ink-950 py-20 text-paper-100 sm:py-24">
      <Container>
        <div className="rule-dark grid gap-10 pt-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">{title}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-400">{body}</p>
          </div>

          <div className="lg:col-span-5">
            <Link
              href="/request-a-quote"
              className="inline-flex w-full items-center justify-between gap-3 rounded-sm bg-accent-500 px-6 py-5 text-[16px] font-medium text-white transition-colors hover:bg-accent-600"
            >
              Request a Quotation
              <ArrowIcon className="h-4 w-4" />
            </Link>

            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-500">
              Or reach a person directly
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <a
                href={telHref}
                className="rounded-sm border border-white/20 px-5 py-4 text-center text-[15px] font-medium transition-colors hover:border-paper-100 hover:bg-paper-100 hover:text-ink-900"
              >
                Call us
              </a>
              <a
                href={whatsappHref(
                  context
                    ? `Hello JSS The Print Zone — I'd like to discuss ${context}.`
                    : undefined
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-white/20 px-5 py-4 text-center text-[15px] font-medium transition-colors hover:border-paper-100 hover:bg-paper-100 hover:text-ink-900"
              >
                WhatsApp
              </a>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
              Enquiries are answered {company.responseSla}, by a person who can
              actually quote your job.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
