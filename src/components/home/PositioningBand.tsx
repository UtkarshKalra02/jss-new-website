import { homeMetrics, showPositioningBand } from "@/content/positioning";
import { CountUp } from "@/components/ui/CountUp";
import { Container } from "@/components/ui/Container";

/**
 * Positioning numbers, placed third — directly under the client logo wall.
 *
 * The strategy document puts figures in the "results" slot, after the solution
 * has been argued. That ordering assumes the page is read linearly, which it is
 * not: sitting seventh, this block was below the point most visitors ever
 * reach. Here it forms a credibility escalation with what precedes it — what
 * JSS does, who it does it for, at what scale — and gives a reader a reason to
 * keep going before the problem narrative starts.
 *
 * Renders nothing until at least three metrics are confirmed. See
 * src/content/positioning.ts.
 */
export function PositioningBand() {
  if (!showPositioningBand) return null;

  /**
   * How many metrics get confirmed is not known in advance, and a grid with a
   * fixed column count leaves visible empty cells whenever the count does not
   * divide evenly. Pick the column count that divides cleanly, and if none
   * does, let the final metric stretch across the remainder.
   */
  const n = homeMetrics.length;
  const cols = n % 3 === 0 ? 3 : n % 2 === 0 ? 2 : 3;
  const lastSpan = n % cols === 0 ? 1 : cols - (n % cols) + 1;
  const colClass = cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  const spanClass =
    lastSpan === 3 ? "lg:col-span-3" : lastSpan === 2 ? "lg:col-span-2" : "";

  return (
    <section className="grid-field-dark bg-ink-950 py-20 text-paper-100 sm:py-24">
      <Container>
        <div className="rule-dark pt-6">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-400">
            By the numbers
          </p>
        </div>

        <dl className={`mt-12 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 ${colClass}`}>
          {homeMetrics.map((m, i) => (
            <div
              key={m.label}
              className={`reveal bg-ink-950 p-8 ${i === n - 1 ? spanClass : ""}`}
            >
              <dd className="text-[2.6rem] font-semibold leading-none tracking-[-0.03em] text-paper-100">
                <CountUp value={m.value} />
              </dd>
              <dt className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-400">
                {m.label}
              </dt>
              {m.note && (
                <p className="mt-3 text-[15px] leading-relaxed text-ink-400">{m.note}</p>
              )}
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
