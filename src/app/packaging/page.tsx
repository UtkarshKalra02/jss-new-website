import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/site/CtaBand";
import { ArrowIcon } from "@/components/ui/Button";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Packaging Solutions | Custom Paper Packaging Manufacturer",
  description:
    "Custom packaging manufactured in Delhi NCR: monocartons, rigid boxes, corrugated boxes, printed sleeves, window patch boxes, display units and printed labels — printed and finished in-house.",
  path: "/packaging",
});

export default function PackagingIndexPage() {
  return (
    <>
      <section className="bg-ink-950 py-16 text-paper-100 sm:py-20">
        <Container>
          <Eyebrow tone="dark">Packaging solutions</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
            Custom paper-based packaging, made in New Delhi.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-400">
            Six core formats, all printed, die-cut, laminated, finished and
            assembled in the company&rsquo;s own facility. Each page below covers
            what the format is, where it is used, what can be customised and what
            we need in order to quote it. Rigid and luxury boxes are a separate
            segment with{" "}
            <Link
              href="/rigid-boxes"
              className="text-paper-100 underline decoration-ink-600 underline-offset-4 transition-colors hover:decoration-accent-500"
            >
              their own page
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <ul className="space-y-px">
            {products.map((p, i) => (
              <li key={p.slug} className="reveal border-t border-paper-300 last:border-b">
                <Link
                  href={`/packaging/${p.slug}`}
                  className="group grid gap-6 py-8 sm:grid-cols-12 sm:gap-10"
                >
                  <div className="sm:col-span-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-200">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        loading={i < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 100vw, 240px"
                        className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-7">
                    <h2 className="text-[22px] font-semibold leading-snug transition-colors group-hover:text-accent-500">
                      {p.name}
                    </h2>
                    <p className="mt-3 text-[16px] leading-relaxed text-ink-600">
                      {p.summary}
                    </p>
                    <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-500">
                      {p.industries.join(" · ")}
                    </p>
                  </div>
                  <div className="flex items-start sm:col-span-2 sm:justify-end">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500 transition-colors group-hover:text-accent-500">
                      Detail
                      <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Rigid is a separate segment — signalled here rather than listed above. */}
      <section className="bg-paper-50 pb-16 sm:pb-20">
        <Container>
          <Link
            href="/rigid-boxes"
            className="group grid gap-8 overflow-hidden rounded-sm bg-ink-950 text-paper-100 sm:grid-cols-12"
          >
            <div className="relative min-h-[220px] sm:col-span-5 sm:min-h-[300px]">
              <Image
                src="/images/rigid/hero.jpg"
                alt="Premium rigid gift box with foil detailing"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:col-span-7 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-400">
                A separate segment
              </p>
              <h2 className="mt-4 text-[26px] font-semibold leading-snug sm:text-[30px]">
                Rigid &amp; Luxury Boxes
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-400">
                Different buyer, different criteria, different production
                discipline. Set-up boxes for perfume, beauty, gifting and
                jewellery — with construction, wrap and finishing handled as
                their own line of work.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-100">
                Explore the segment
                <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Packaging Solutions", path: "/packaging" },
            ])
          ),
        }}
      />
    </>
  );
}
