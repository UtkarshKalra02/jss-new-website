"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The marketing header, footer and mobile call bar make no sense on the
 * owner's dashboard — and the sticky call bar would sit on top of the lead
 * list on a phone — so the site chrome hides itself under /admin.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
