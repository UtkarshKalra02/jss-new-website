import type { Metadata } from "next";
import { company } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { telHref, mailHref, whatsappHref, mapsHref, fullAddress } from "@/lib/contact";
import { pageMeta } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "Contact | Packaging Manufacturer in Okhla, New Delhi",
  description:
    "Contact JSS The Print Zone — printing and packaging manufacturer at 39, DSIDC Sheds, Okhla Phase-II, New Delhi 110020. Call or message on WhatsApp for a packaging quotation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-950 py-16 text-paper-100 sm:py-20">
        <Container>
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h1 className="mt-6 max-w-2xl text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
            Reach a person, not a queue.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-400">
            Enquiries are answered {company.responseSla}. If it is urgent, calling
            will always be faster than a form.
          </p>
        </Container>
      </section>

      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <div className="grid gap-px border border-paper-300 bg-paper-300 md:grid-cols-3">
            <a
              href={telHref}
              className="group bg-paper-50 p-8 transition-colors hover:bg-paper-100"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Call
              </p>
              <p className="mt-4 text-[22px] font-semibold text-ink-900">Call us</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Monday to Saturday, business hours. Tap to dial.
              </p>
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-paper-50 p-8 transition-colors hover:bg-paper-100"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                WhatsApp
              </p>
              <p className="mt-4 text-[22px] font-semibold text-ink-900">Start a chat</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Best for sending reference images, artwork or a dieline.
              </p>
            </a>
            <a
              href={mailHref}
              className="group bg-paper-50 p-8 transition-colors hover:bg-paper-100"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Email
              </p>
              <p className="mt-4 break-all font-mono text-[17px] text-ink-900">
                {company.email}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                For formal RFQs, tenders and vendor onboarding.
              </p>
            </a>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="rule pt-6">
                <Eyebrow>Facility &amp; office</Eyebrow>
                <h2 className="mt-5 text-3xl font-semibold leading-tight">
                  Okhla Industrial Area, Phase-II
                </h2>
              </div>
              <address className="mt-6 not-italic">
                <p className="text-[18px] leading-relaxed text-ink-700">
                  {company.name}
                  <br />
                  {company.address.street}
                  <br />
                  {company.address.locality}
                  <br />
                  {company.address.city} {company.address.postalCode}
                  <br />
                  {company.address.countryName}
                </p>
              </address>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-500 transition-opacity hover:opacity-75"
              >
                Get directions
                <ArrowIcon className="h-3 w-3" />
              </a>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-sm border border-paper-300 bg-paper-50 p-8">
                <h2 className="text-[21px] font-semibold">Have a specification ready?</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-600">
                  Send it through the quotation form and it reaches us with the
                  dimensions, quantity and finish already attached — which usually
                  saves a full round of back-and-forth.
                </p>
                <Link
                  href="/request-a-quote"
                  className="mt-7 inline-flex items-center gap-2.5 rounded-sm bg-accent-500 px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
                >
                  Request a Quotation
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
