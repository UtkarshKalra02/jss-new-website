import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { telHref, mailHref, mapsHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-ink-950 pb-24 pt-20 text-paper-300 lg:pb-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/brand/logo.png"
              alt={company.name}
              width={140}
              height={44}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ink-400">
              Offset printing and paper-based packaging, manufactured in-house in
              Okhla Phase-II, New Delhi.
            </p>
            <address className="mt-8 not-italic">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[15px] leading-relaxed text-paper-300 transition-colors hover:text-white"
              >
                {company.address.street}
                <br />
                {company.address.locality}
                <br />
                {company.address.city} {company.address.postalCode}, {company.address.countryName}
              </a>
              <div className="mt-4 space-y-1">
                <a
                  href={telHref}
                  className="block py-1 text-[15px] text-paper-300 transition-colors hover:text-white"
                >
                  Call us
                </a>
                <a
                  href={mailHref}
                  className="block break-all py-1 font-mono text-[13px] text-paper-300 transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </div>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterCol title="Packaging">
              {products.map((p) => (
                <FooterLink key={p.slug} href={`/packaging/${p.slug}`}>
                  {p.name}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Industries">
              {industries.map((i) => (
                <FooterLink key={i.slug} href={`/industries#${i.slug}`}>
                  {i.name}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Company">
              <FooterLink href="/rigid-boxes">Rigid &amp; Luxury Boxes</FooterLink>
              <FooterLink href="/about">About JSS</FooterLink>
              <FooterLink href="/manufacturing">Manufacturing</FooterLink>
              <FooterLink href="/quality">Quality & Compliance</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/request-a-quote">Request a Quote</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href={company.instagram} external>
                Instagram
              </FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="brand-rule mt-16 w-full max-w-[240px]" aria-hidden="true" />

        <div className="rule-dark mt-7 flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] text-ink-500">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[12px] text-ink-500">
            GST and company registration details available on request.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
        {title}
      </h3>
      <ul className="mt-4 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "block py-1.5 text-[15px] text-paper-300 transition-colors hover:text-white";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}
