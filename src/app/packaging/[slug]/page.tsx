import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { products, getProduct } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Button";
import { RfqForm } from "@/components/rfq/RfqForm";
import { company } from "@/content/company";
import { telHref, whatsappHref } from "@/lib/contact";
import { pageMeta, productSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    ...pageMeta({
      title: product.seoTitle,
      description: product.metaDescription,
      path: `/packaging/${product.slug}`,
    }),
    title: product.seoTitle,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* Above the fold: what it is, who it is for, and the way forward. */}
      <section className="bg-ink-950 text-paper-100">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <nav aria-label="Breadcrumb">
                <Link
                  href="/packaging"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-paper-300"
                >
                  ← Packaging solutions
                </Link>
              </nav>
              <h1 className="mt-7 text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-paper-300">
                {product.summary}
              </p>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-400">
                {product.whatItIs}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enquire"
                  className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-accent-500 px-7 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
                >
                  Quote this format
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={whatsappHref(
                    `Hello JSS The Print Zone — I'd like to discuss ${product.name.toLowerCase()}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-white/25 px-7 py-4 text-[15px] font-medium text-paper-100 transition-colors hover:bg-paper-100 hover:text-ink-900"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Applications + customisation */}
      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="rule pt-6">
                <Eyebrow>Typical applications</Eyebrow>
                <h2 className="mt-5 text-3xl font-semibold leading-tight">
                  Where this format is used
                </h2>
              </div>
              <ul className="mt-8 space-y-3.5">
                {product.applications.map((a) => (
                  <li key={a} className="flex gap-3.5 text-[16px] leading-relaxed text-ink-700">
                    <span className="mt-[11px] h-px w-4 shrink-0 bg-accent-500" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-500">
                Industries: {product.industries.join(" · ")}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rule pt-6">
                <Eyebrow>Customisation</Eyebrow>
                <h2 className="mt-5 text-3xl font-semibold leading-tight">
                  What you can specify
                </h2>
              </div>
              <dl className="mt-8">
                {product.customisation.map((c) => (
                  <div
                    key={c.label}
                    className="grid gap-2 border-t border-paper-300 py-5 sm:grid-cols-4 sm:gap-6"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500 sm:pt-1">
                      {c.label}
                    </dt>
                    <dd className="text-[16px] leading-relaxed text-ink-700 sm:col-span-3">
                      {c.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Why it matters commercially */}
      <section className="grid-field-dark bg-ink-950 py-16 text-paper-100 sm:py-20">
        <Container>
          <div className="rule-dark pt-6">
            <Eyebrow tone="dark">Why the specification matters</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight sm:text-[2.4rem]">
              What this decision actually costs you if it goes wrong
            </h2>
          </div>
          <div className="mt-12 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-3">
            {product.buyerValue.map((b) => (
              <div key={b.heading} className="reveal bg-ink-950 p-8">
                <h3 className="text-[19px] font-semibold leading-snug text-paper-100">
                  {b.heading}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-400">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Next step, with the form right here so there is no extra hop */}
      <section className="bg-paper-50 py-16 sm:py-20" id="enquire">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rule pt-6">
                  <Eyebrow>Next step</Eyebrow>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight">
                    Send us the specification
                  </h2>
                </div>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-600">
                  For {product.name.toLowerCase()}, these are the details that let
                  us quote in one round rather than three:
                </p>
                <ul className="mt-6 space-y-3">
                  {product.specPrompts.map((s) => (
                    <li
                      key={s}
                      className="flex gap-3.5 text-[15px] leading-relaxed text-ink-700"
                    >
                      <span className="mt-[10px] h-px w-4 shrink-0 bg-accent-500" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[15px] leading-relaxed text-ink-600">
                  Do not have all of it? Send what you have — most first enquiries
                  arrive incomplete, and working the gaps out is part of the job.
                </p>
                <p className="mt-6 text-[15px] text-ink-600">
                  Or{" "}
                  <a
                    href={telHref}
                    className="text-ink-900 underline decoration-paper-400 underline-offset-4 hover:decoration-accent-500"
                  >
                    call us
                  </a>{" "}
                  and talk it through.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Suspense fallback={null}>
                <RfqForm presetProduct={product.name} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      {/* Related formats */}
      <section className="bg-paper-100 py-16">
        <Container>
          <div className="rule pt-6">
            <Eyebrow>Also manufactured here</Eyebrow>
          </div>
          <ul className="mt-8 grid gap-px border border-paper-300 bg-paper-300 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/packaging/${o.slug}`}
                  className="group flex h-full flex-col justify-between bg-paper-50 p-7 transition-colors hover:bg-paper-100"
                >
                  <div>
                    <h3 className="text-[19px] font-semibold">{o.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                      {o.summary}
                    </p>
                  </div>
                  <ArrowIcon className="mt-7 text-ink-500 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productSchema({
              name: product.name,
              metaDescription: product.metaDescription,
              path: `/packaging/${product.slug}`,
              image: product.image,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Packaging Solutions", path: "/packaging" },
              { name: product.name, path: `/packaging/${product.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
