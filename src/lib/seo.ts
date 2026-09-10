import type { Metadata } from "next";
import { company, siteUrl } from "@/content/company";

export function pageMeta({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: company.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Organization + LocalBusiness graph. Only confirmed facts are emitted. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    url: siteUrl,
    email: company.email,
    image: `${siteUrl}/images/facility/offset-press.jpg`,
    logo: `${siteUrl}/images/brand/logo.png`,
    description:
      "Offset printing and packaging manufacturer in New Delhi producing monocartons, rigid boxes, corrugated boxes, sleeves, window boxes and printed labels for FMCG, cosmetics, pharmaceutical and D2C brands.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.street}, ${company.address.locality}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [company.instagram],
    hasCredential: company.certifications.map((c) => c.name),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function productSchema(p: {
  name: string;
  metaDescription: string;
  /** Site-relative page path, e.g. "/packaging/monocartons". */
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.name} — Custom Manufactured`,
    description: p.metaDescription,
    image: `${siteUrl}${p.image}`,
    url: `${siteUrl}${p.path}`,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
