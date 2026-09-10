import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { siteUrl } from "@/content/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/packaging", priority: 0.9, freq: "monthly" },
    { path: "/rigid-boxes", priority: 0.9, freq: "monthly" },
    { path: "/request-a-quote", priority: 0.9, freq: "monthly" },
    { path: "/manufacturing", priority: 0.8, freq: "monthly" },
    { path: "/industries", priority: 0.8, freq: "monthly" },
    { path: "/quality", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${siteUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...products.map((p) => ({
      url: `${siteUrl}/packaging/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
