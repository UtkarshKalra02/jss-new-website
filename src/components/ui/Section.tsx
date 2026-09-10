import { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  id,
  tone = "paper",
  className = "",
  size = "default",
}: {
  children: ReactNode;
  id?: string;
  tone?: "paper" | "white" | "ink";
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const tones = {
    paper: "bg-paper-100 text-ink-900",
    white: "bg-paper-50 text-ink-900",
    ink: "bg-ink-950 text-paper-200",
  };
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <Container size={size}>{children}</Container>
    </section>
  );
}

/** Section header: eyebrow + heading + optional lede, with a hairline above. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const rule = tone === "dark" ? "rule-dark" : "rule";
  const ledeColor = tone === "dark" ? "text-ink-400" : "text-ink-600";
  const eyebrowColor = tone === "dark" ? "text-ink-400" : "text-ink-500";
  return (
    <div className={`${rule} pt-6 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`font-mono text-[11px] font-medium uppercase tracking-[0.2em] ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="mt-5 text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 max-w-2xl text-[17px] leading-relaxed ${ledeColor} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
