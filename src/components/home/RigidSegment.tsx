import Image from "next/image";
import Link from "next/link";
import { rigidSegment as r } from "@/content/rigid";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Button";

/**
 * Rigid and luxury packaging gets a full-bleed, editorial section of its own
 * rather than a card in the formats grid. The visual break is the point: this
 * is a different segment, sold to a different buyer, and the page should say so
 * before a word is read.
 */
export function RigidSegment() {
  return (
    <section className="bg-ink-950 text-paper-100">
      <div className="grid lg:grid-cols-2">
        {/* Image half — full bleed to the edge of the viewport. */}
        <div className="relative order-1 min-h-[340px] lg:order-none lg:min-h-[720px]">
          <Image
            src={r.images.segment.src}
            alt={r.images.segment.alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-950/60" />
        </div>

        {/* Copy half */}
        <div className="order-2 flex items-center px-5 py-20 sm:px-8 sm:py-24 lg:order-none lg:px-14 xl:px-20">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent-400">
              {r.eyebrow}
            </p>
            <h2 className="mt-6 text-[2rem] font-semibold leading-[1.08] sm:text-[2.6rem]">
              {r.headline}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-400">
              {r.standfirst}
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {r.constructions.slice(0, 4).map((c) => (
                <li
                  key={c.label}
                  className="flex gap-3 text-[15px] leading-relaxed text-paper-300"
                >
                  <span className="mt-[10px] h-px w-3.5 shrink-0 bg-accent-400" />
                  {c.label}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/rigid-boxes"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-accent-500 px-7 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
              >
                Explore rigid &amp; luxury
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/rigid-boxes#enquire"
                className="inline-flex items-center justify-center rounded-sm border border-white/25 px-7 py-4 text-[15px] font-medium text-paper-100 transition-colors hover:bg-paper-100 hover:text-ink-900"
              >
                Quote a rigid box
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
