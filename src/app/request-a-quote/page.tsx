import type { Metadata } from "next";
import { Suspense } from "react";
import { RfqForm } from "@/components/rfq/RfqForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company } from "@/content/company";
import { telHref, mailHref, whatsappHref, mapsHref, fullAddress } from "@/lib/contact";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Request a Packaging Quotation",
  description:
    "Request a quotation from JSS The Print Zone for monocartons, rigid boxes, corrugated boxes, sleeves, window boxes or printed labels. Enquiries answered within 24 hours.",
  path: "/request-a-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <section className="bg-ink-950 pb-16 pt-16 text-paper-100 sm:pb-20 sm:pt-20">
        <Container>
          <Eyebrow tone="dark">Request a quotation</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
            Tell us what you need to pack.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-400">
            Four fields are all we need to start. If you already have dimensions,
            board specifications and quantity, add them and we can usually quote
            in a single round.
          </p>
        </Container>
      </section>

      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Suspense fallback={null}>
                <RfqForm />
              </Suspense>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-sm border border-paper-300 bg-paper-50 p-6 sm:p-8">
                  <h2 className="text-[19px] font-semibold">
                    Would rather just talk?
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    A five-minute call usually settles more than a form does —
                    especially if the specification is still open.
                  </p>
                  <div className="mt-6 space-y-3">
                    <a
                      href={telHref}
                      className="flex items-center justify-between gap-4 rounded-sm border border-paper-300 bg-paper-100 px-5 py-4 transition-colors hover:border-ink-900"
                    >
                      <span className="text-[14px] text-ink-600">Phone</span>
                      <span className="text-[15px] font-medium text-ink-900">
                        Call us
                      </span>
                    </a>
                    <a
                      href={whatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 rounded-sm border border-paper-300 bg-paper-100 px-5 py-4 transition-colors hover:border-ink-900"
                    >
                      <span className="text-[14px] text-ink-600">WhatsApp</span>
                      <span className="font-mono text-[15px] text-ink-900">
                        Start a chat
                      </span>
                    </a>
                    <a
                      href={mailHref}
                      className="flex items-center justify-between gap-4 rounded-sm border border-paper-300 bg-paper-100 px-5 py-4 transition-colors hover:border-ink-900"
                    >
                      <span className="shrink-0 text-[14px] text-ink-600">Email</span>
                      <span className="min-w-0 break-all text-right font-mono text-[13px] text-ink-900">
                        {company.email}
                      </span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 rounded-sm border border-paper-300 p-6 sm:p-8">
                  <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
                    Visit the facility
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    Buyers placing recurring volume are welcome to see the floor
                    before committing. Call ahead and we will arrange a time.
                  </p>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 block text-[15px] leading-relaxed text-ink-900 underline decoration-paper-400 underline-offset-4 transition-colors hover:decoration-accent-500"
                  >
                    {fullAddress}
                  </a>
                </div>

                <p className="mt-6 text-[14px] leading-relaxed text-ink-500">
                  We reply {company.responseSla}. If your requirement is urgent,
                  call rather than wait on the form.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
