import type { Metadata } from "next";
import { company } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mailHref, telHref, fullAddress } from "@/lib/contact";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How JSS The Print Zone handles the information you send through the website, WhatsApp or email.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="bg-paper-100 py-16 sm:py-20">
      <Container size="narrow">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold leading-tight">Privacy Policy</h1>
        <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-500">
          Applies to jsstheprintzone.com
        </p>

        <div className="mt-12 space-y-9 text-[16px] leading-relaxed text-ink-700">
          <section>
            <h2 className="text-xl font-semibold text-ink-900">What we collect</h2>
            <p className="mt-3">
              When you use the quotation form on this website, the details you
              enter — company name, contact person, phone number, email address
              and the description of your packaging requirement — are composed
              into a message that you send to us directly through WhatsApp or your
              own email client. The website does not store a copy on a server of
              its own.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">How we use it</h2>
            <p className="mt-3">
              We use the information solely to respond to your enquiry, prepare a
              quotation, and where relevant maintain a record of your job
              specification so repeat orders can be produced to the same standard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">What we do not do</h2>
            <p className="mt-3">
              We do not sell, rent or share your enquiry details with third
              parties for marketing purposes. We do not add you to a mailing list
              because you requested a quotation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Third-party services</h2>
            <p className="mt-3">
              If you choose to contact us via WhatsApp, your message is
              transmitted through WhatsApp and is subject to their privacy terms.
              If you email us, the message is handled by our email provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Retention</h2>
            <p className="mt-3">
              Enquiry correspondence and job specifications are retained for as
              long as they are commercially relevant — typically for the duration
              of the working relationship — so that repeat orders can be matched
              to the original approved standard. You may ask us to delete your
              details at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Your rights</h2>
            <p className="mt-3">
              You can ask what information we hold about you, ask us to correct
              it, or ask us to delete it. Write to{" "}
              <a
                href={mailHref}
                className="break-all font-mono text-ink-900 underline decoration-paper-400 underline-offset-4 hover:decoration-accent-500"
              >
                {company.email}
              </a>{" "}
              and we will action the request.
            </p>
          </section>

          <section className="rule pt-8">
            <h2 className="text-xl font-semibold text-ink-900">Contact</h2>
            <p className="mt-3">
              {company.legalName}
              <br />
              {fullAddress}
              <br />
              <a href={mailHref} className="font-mono hover:text-ink-900">
                {company.email}
              </a>
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
