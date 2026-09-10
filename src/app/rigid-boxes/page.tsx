import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { rigidSegment as r } from "@/content/rigid";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, SectionHead } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { RfqForm } from "@/components/rfq/RfqForm";
import { telHref, whatsappHref } from "@/lib/contact";
import { pageMeta, productSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: r.seoTitle,
    description: r.metaDescription,
    path: "/rigid-boxes",
    image: r.images.hero.src,
  }),
  title: r.seoTitle,
};

export default function RigidBoxesPage() {
  return (
    <>
      {/* Hero. A split rather than a washed-out background image: for a luxury
          segment the product has to be legible, not atmospheric. */}
      <section className="bg-ink-950 text-paper-100">
        <div className="grid lg:grid-cols-12">
          <div className="flex items-center px-5 py-16 sm:px-8 sm:py-20 lg:col-span-7 lg:py-28 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pr-14">
            <div className="max-w-xl">
              <Eyebrow tone="dark">{r.eyebrow}</Eyebrow>
              <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] sm:text-[3.2rem]">
                {r.name}
              </h1>
              <p className="mt-6 text-[19px] leading-relaxed text-paper-300">
                {r.headline}
              </p>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-400">
                {r.standfirst}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enquire"
                  className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-accent-500 px-7 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
                >
                  Quote a rigid box
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={whatsappHref(
                    "Hello JSS The Print Zone — I'd like to discuss rigid / luxury boxes."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-white/25 px-7 py-4 text-[15px] font-medium text-paper-100 transition-colors hover:bg-paper-100 hover:text-ink-900"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:col-span-5 lg:min-h-[620px]">
            <Image
              src={r.images.hero.src}
              alt={r.images.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              quality={80}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* What separates good rigid from bad rigid */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                eyebrow="Where rigid boxes fail"
                title="Four things that decide whether a rigid box feels expensive."
              />
              <div className="mt-9 overflow-hidden rounded-sm">
                <Image
                  src={r.images.detail.src}
                  alt={r.images.detail.alt}
                  width={640}
                  height={853}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-px">
              {r.differentiators.map((d, i) => (
                <li
                  key={d.title}
                  className="reveal border-t border-paper-300 py-8 last:border-b"
                >
                  <div className="flex gap-6 sm:gap-9">
                    <span className="font-mono text-[12px] tabular-nums text-accent-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold leading-snug">{d.title}</h3>
                      <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-ink-600">
                        {d.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Constructions + finishes */}
      <Section tone="ink">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <SectionHead
              tone="dark"
              eyebrow="Constructions"
              title="Pick the box the product actually needs."
            />
            <dl className="mt-10">
              {r.constructions.map((c) => (
                <div
                  key={c.label}
                  className="reveal grid gap-2 border-t border-ink-800 py-5 last:border-b sm:grid-cols-4 sm:gap-6"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-400 sm:pt-1">
                    {c.label}
                  </dt>
                  <dd className="text-[16px] leading-relaxed text-paper-300 sm:col-span-3">
                    {c.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-sm">
              <Image
                src={r.images.stack.src}
                alt={r.images.stack.alt}
                width={640}
                height={853}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 420px"
                className="h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-9 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
              Finishing, all in-house
            </h3>
            <ul className="mt-5 space-y-2.5">
              {r.finishes.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-paper-300">
                  <span className="mt-[10px] h-px w-3.5 shrink-0 bg-accent-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Applications */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Where it is used"
              title="The categories that pay for rigid."
              lede="If the pack is part of what the customer is buying, rigid earns its cost back. If it is purely a carrier, a folding carton is the honest answer and we will tell you so."
            />
            <Link
              href="/packaging"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-500 transition-opacity hover:opacity-75"
            >
              See the other packaging formats
              <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px border border-paper-300 bg-paper-300 sm:grid-cols-2">
              {r.applications.map((a) => (
                <li
                  key={a}
                  className="reveal bg-paper-50 p-6 text-[16px] leading-relaxed text-ink-700"
                >
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-8 overflow-hidden rounded-sm">
              <Image
                src={r.images.unboxing.src}
                alt={r.images.unboxing.alt}
                width={900}
                height={600}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 640px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Enquiry */}
      <section className="bg-paper-100 py-16 sm:py-20" id="enquire">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rule pt-6">
                  <Eyebrow>Next step</Eyebrow>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight">
                    Send us the brief
                  </h2>
                </div>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-600">
                  For a rigid box, these are the details that let us quote in one
                  round rather than three:
                </p>
                <ul className="mt-6 space-y-3">
                  {r.specPrompts.map((s) => (
                    <li key={s} className="flex gap-3.5 text-[15px] leading-relaxed text-ink-700">
                      <span className="mt-[10px] h-px w-4 shrink-0 bg-accent-500" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[15px] leading-relaxed text-ink-600">
                  Working from a reference box or a mood board rather than a
                  specification? Send that instead — it is usually more useful.
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
                <RfqForm presetProduct={r.name} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productSchema({
              name: r.name,
              metaDescription: r.metaDescription,
              path: "/rigid-boxes",
              image: r.images.hero.src,
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
              { name: r.name, path: "/rigid-boxes" },
            ])
          ),
        }}
      />
    </>
  );
}
