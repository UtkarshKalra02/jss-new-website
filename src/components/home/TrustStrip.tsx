import { namedClients } from "@/content/clients";
import { Container } from "@/components/ui/Container";

/**
 * Client wall.
 *
 * Rendered greyscale at reduced opacity: these logos carry six different brand
 * palettes between them, and showing them in full colour would pull the page
 * apart. Greyscale is also the convention a procurement lead expects, so it
 * reads as a supplier's client list rather than as advertising.
 *
 * Plain <img> rather than next/image on purpose — every file here is 1–3KB
 * except one, and serving the SVG through the optimiser would mean turning on
 * `dangerouslyAllowSVG`, which is not worth it for a 1KB vector.
 */
export function TrustStrip() {
  return (
    <section className="border-b border-paper-300 bg-paper-50 py-14 sm:py-16">
      <Container>
        <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
          Producing packaging for
        </p>

        <ul className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {namedClients.map((c) => (
            <li key={c.name} className="flex items-center justify-center">
              {c.logo ? (
                <img
                  src={c.logo}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  loading="lazy"
                  decoding="async"
                  style={{ maxHeight: c.maxH, opacity: c.opacity ?? 0.55 }}
                  className="w-auto max-w-full object-contain grayscale transition-opacity duration-300 hover:!opacity-90"
                />
              ) : (
                /* No official mark yet — set in type at a matching weight so the
                   row still reads as one wall rather than a gap. */
                <span className="text-[17px] font-medium tracking-[-0.01em] text-ink-500 transition-colors duration-300 hover:text-ink-800">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] leading-relaxed text-ink-600">
          Alongside a long list of regional cosmetic, personal care and FMCG
          brands running recurring monthly volume.
        </p>
      </Container>
    </section>
  );
}
