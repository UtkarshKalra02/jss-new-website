import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Leads — JSS The Print Zone" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-paper-100 text-ink-900">{children}</div>;
}
