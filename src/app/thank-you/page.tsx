import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company } from "@/content/company";
import { telHref, whatsappHref } from "@/lib/contact";
import { products } from "@/content/products";
import { ArrowIcon } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Enquiry Received",
  description: "Thank you — your packaging enquiry has been received.",
  robots: { index: false, follow: true },
};

/**
 * Thank-you page per the strategy document: confirm receipt, state the
 * response commitment explicitly, and give an immediate alternative channel
 * so an urgent buyer is never left waiting on a queue.
 */
export default function ThankYouPage() {
  return (
    <>
      <section className="bg-ink-950 py-24 text-paper-100 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow tone="dark">Enquiry received</Eyebrow>
            <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
              Thank you — we have your requirement.
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-400">
              A member of the team will review the specification and come back to
              you <strong className="font-medium text-paper-200">{company.responseSla}</strong> with
              a quotation, or with the questions we need answered before we can
              quote accurately.
            </p>

            <div className="rule-dark mt-10 pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Need an answer sooner?
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center rounded-sm bg-accent-500 px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
                >
                  Call us
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-white/25 px-6 py-4 text-[15px] font-medium text-paper-100 transition-colors hover:bg-paper-100 hover:text-ink-900"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-100 py-20">
        <Container>
          <div className="rule pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
              While you wait
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Other packaging formats</h2>
          </div>
          <ul className="mt-8 grid gap-px border border-paper-300 bg-paper-300 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/packaging/${p.slug}`}
                  className="group flex h-full flex-col justify-between bg-paper-50 p-6 transition-colors hover:bg-paper-100"
                >
                  <span className="text-[17px] font-semibold">{p.name}</span>
                  <ArrowIcon className="mt-8 text-ink-500 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
