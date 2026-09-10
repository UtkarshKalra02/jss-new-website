"use client";

import { useEffect, useRef } from "react";

/**
 * Odometer-style count-up, triggered once when the element scrolls into view.
 *
 * Three things this deliberately does NOT do:
 *
 * 1. It does not render "0" and count upward from there. The final value is
 *    server-rendered into the DOM; JS only overwrites it while animating. A
 *    crawler, a screen reader, or anyone with JS disabled sees the real figure.
 *    Count-ups that start from zero in the markup ship a page whose numbers
 *    read as nothing.
 * 2. It does not animate the whole string. "₹500 cr+" would flash as "₹0 cr+";
 *    only the digits move, and the prefix and suffix stay put.
 * 3. It does not run for anyone who has asked their system to reduce motion.
 * 4. It can never strand a wrong number on screen. requestAnimationFrame stops
 *    firing when the page is not being painted — a background tab, a throttled
 *    window — so an animation interrupted halfway would otherwise leave
 *    "₹65 cr+" sitting where "₹500 cr+" belongs, permanently. A watchdog timer
 *    and a visibilitychange handler both force the final value.
 *
 * No dependency — about 40 lines of requestAnimationFrame.
 */

/** Splits "₹500 cr+" into "₹" / 500 / " cr+". */
function parse(value: string) {
  const m = value.match(/^(\D*)([\d][\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const digits = Number(m[2].replace(/,/g, ""));
  if (!Number.isFinite(digits)) return null;
  return { prefix: m[1], target: digits, suffix: m[3], raw: m[2] };
}

const DURATION = 900;

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parts = parse(value);
    if (!parts) return; // Nothing numeric to animate — leave the text alone.

    // Preserve the author's own formatting (grouping, decimals).
    const decimals = parts.raw.includes(".") ? parts.raw.split(".")[1].length : 0;
    const grouped = parts.raw.includes(",");
    const render = (n: number) => {
      const fixed = n.toFixed(decimals);
      const shown = grouped ? Number(fixed).toLocaleString("en-IN") : fixed;
      el.textContent = `${parts.prefix}${shown}${parts.suffix}`;
    };

    let raf = 0;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    let started = false;
    let done = false;

    /** Land on the authored string and stop everything. Safe to call twice. */
    const settle = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      clearTimeout(watchdog);
      document.removeEventListener("visibilitychange", onHide);
      el.textContent = value;
    };

    function onHide() {
      if (document.hidden) settle();
    }

    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        if (done) return;
        const p = Math.min((now - t0) / DURATION, 1);
        // Ease-out cubic: quick off the mark, decelerating into the figure.
        const eased = 1 - Math.pow(1 - p, 3);
        if (p < 1) {
          render(parts.target * eased);
          raf = requestAnimationFrame(step);
        } else {
          settle();
        }
      };
      raf = requestAnimationFrame(step);

      // If rAF never completes — throttled tab, backgrounded window — this
      // guarantees the real figure is what remains on screen.
      watchdog = setTimeout(settle, DURATION + 500);
      document.addEventListener("visibilitychange", onHide);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            observer.disconnect();
            render(0);
            run();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(watchdog);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [value]);

  // Server-rendered as the real value.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
