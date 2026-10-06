import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCallBar } from "@/components/site/MobileCallBar";
import { RevealProvider } from "@/components/ui/Reveal";
import { company, siteUrl } from "@/content/company";
import { organizationSchema } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0b12",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "JSS The Print Zone | Printing & Packaging Manufacturer in Delhi NCR",
    template: `%s | ${company.name}`,
  },
  description:
    "Offset printing and packaging manufacturer in New Delhi. Monocartons, rigid boxes, corrugated boxes, sleeves, window boxes and labels for FMCG, cosmetic, pharmaceutical and D2C brands. ISO 9001 certified, in-house production.",
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-paper-100"
        >
          Skip to content
        </a>
        <RevealProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </body>
    </html>
  );
}
