import { ReactNode } from "react";

/** Small mono label. The site's structural signature — used once per section. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-ink-400" : "text-ink-500";
  return (
    <p
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.2em] ${color} ${className}`}
    >
      {children}
    </p>
  );
}
