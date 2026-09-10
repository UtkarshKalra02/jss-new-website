"use client";

import { useEffect } from "react";

/**
 * Scroll reveal, ~30 lines, no dependency.
 * Marks the document so the CSS transition applies only when JS is running —
 * content is fully visible for crawlers and no-JS users.
 */
export function RevealProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    document.documentElement.setAttribute("data-reveal-ready", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const scan = () => {
      document
        .querySelectorAll(".reveal:not(.is-in)")
        .forEach((el) => observer.observe(el));
    };
    scan();

    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
