import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMeta } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "Industries Served | FMCG, Cosmetics, Pharma & D2C Packaging",
  description:
    "Packaging manufactured for FMCG, cosmetics and personal care, pharmaceutical, D2C and e-commerce, retail and industrial clients across Delhi NCR and India.",
  path: "/industries",
});

export default function IndustriesPage() {
  const bySlug = new Map(products.map((p) => [p.name, p.slug]));

  return (
    <>
      <section className="bg-ink-950 py-16 text-paper-100 sm:py-20">
        <Container>
          <Eyebrow tone="dark">Industries served</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
            The same carton is a different problem in every category.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-400">
            A pharmaceutical buyer is protecting a regulatory position. A D2C
            founder is protecting an unboxing moment. An FMCG procurement head is
            protecting a launch date. These are the requirements we work against.
          </p>
        </Container>
      </section>

      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <div className="space-y-px">
            {industries.map((ind, i) => (
              <article
                key={ind.slug}
                id={ind.slug}
                className="reveal scroll-mt-28 grid gap-8 border-t border-paper-300 py-12 last:border-b lg:grid-cols-12 lg:gap-16"
              >
                <div className="lg:col-span-5">
                  <span className="font-mono text-[12px] tabular-nums text-accent-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-[26px] font-semibold leading-snug">{ind.name}</h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-600">{ind.brief}</p>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                    What matters most in this category
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {ind.whatMatters.map((w) => (
                      <li key={w} className="flex gap-3.5 text-[16px] leading-relaxed text-ink-700">
                        <span className="mt-[11px] h-px w-4 shrink-0 bg-accent-500" />
                        {w}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                    Formats most used
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ind.formats.map((f) => {
                      const slug = bySlug.get(f);
                      return (
                        <li key={f}>
                          {slug ? (
                            <Link
                              href={`/packaging/${slug}`}
                              className="inline-flex items-center gap-1.5 rounded-sm border border-paper-400 px-3.5 py-2 text-[14px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                            >
                              {f}
                              <ArrowIcon className="h-3 w-3" />
                            </Link>
                          ) : (
                            <span className="inline-block rounded-sm border border-paper-400 px-3.5 py-2 text-[14px] text-ink-700">
                              {f}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Working in a category not listed here?"
        body="Most paper-based packaging problems come down to the same variables — board, structure, print and finish. Describe the product and we will tell you what it needs."
      />
    </>
  );
}
