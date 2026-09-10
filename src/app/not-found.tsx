import Link from "next/link";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { telHref, whatsappHref } from "@/lib/contact";
import { ArrowIcon } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-ink-950 py-24 text-paper-100 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow tone="dark">404 — page not found</Eyebrow>
          <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
            That page has moved. Your packaging question has not.
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-400">
            If you were looking for a specific format or a specification, tell us
            what you need and we will point you at it — or just answer the
            question directly.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref("Hello — I couldn't find what I was looking for on your website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm bg-accent-500 px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
            >
              Ask us on WhatsApp
            </a>
            <a
              href={telHref}
              className="inline-flex items-center justify-center rounded-sm border border-white/25 px-6 py-4 text-[15px] font-medium text-paper-100 transition-colors hover:bg-paper-100 hover:text-ink-900"
            >
              Call us
            </a>
          </div>

          <div className="rule-dark mt-14 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
              Or start here
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                { label: "All packaging formats", href: "/packaging" },
                { label: "Manufacturing capability", href: "/manufacturing" },
                ...products.slice(0, 4).map((p) => ({
                  label: p.name,
                  href: `/packaging/${p.slug}`,
                })),
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 py-1.5 text-[16px] text-paper-300 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowIcon className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
