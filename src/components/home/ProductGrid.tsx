import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { Section, SectionHead } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";

export function ProductGrid() {
  return (
    <Section tone="white" id="packaging">
      <SectionHead
        eyebrow="Packaging solutions"
        title="Six formats, one production floor."
        lede="Every format below is printed, cut, finished and assembled in the same facility. Each has its own page covering applications, customisation and the specifications we need in order to quote. Rigid and luxury boxes are handled as a separate segment."
      />

      <div className="mt-14 grid gap-px border border-paper-300 bg-paper-300 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/packaging/${p.slug}`}
            className="reveal group flex flex-col bg-paper-50 transition-colors duration-300 hover:bg-paper-100"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-200">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="text-[21px] font-semibold leading-snug">{p.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-600">
                {p.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500 transition-colors group-hover:text-accent-500">
                View format
                <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}

        <div className="reveal flex flex-col justify-between bg-ink-950 p-7 text-paper-200 lg:col-span-3 lg:flex-row lg:items-end lg:gap-10 lg:p-9">
          <div className="lg:max-w-lg">
            <h3 className="text-[21px] font-semibold leading-snug text-paper-100 lg:text-[26px]">
              Something not on this list?
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-400">
              Most enquiries that start as &ldquo;custom&rdquo; turn out to be a
              variation on a standard structure. Send the product dimensions and
              we will tell you what it should be.
            </p>
          </div>
          <Link
            href="/request-a-quote"
            className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-sm border border-white/25 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-100 transition-colors hover:bg-paper-100 hover:text-ink-900 lg:mt-0"
          >
            Describe your requirement
            <ArrowIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
