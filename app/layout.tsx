import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { ChatWidget } from "@/components/chat/chat-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { practiceAreas } from "@/lib/practice-areas";
import { regions } from "@/lib/regions";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "California Employment Lawyers | No Win, No Fee | Employment Law Assist",
    template: "%s | Employment Law Assist",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/images/office-wide.jpg", width: 2000, height: 1334, alt: "The Employment Law Assist office in Woodland Hills" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/icon.png", apple: "/images/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0e2a23",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.legalName,
  url: site.url,
  image: `${site.url}/images/office-wide.jpg`,
  logo: `${site.url}/images/icon.png`,
  telephone: site.phone.e164,
  email: site.email,
  priceRange: "Free consultation, contingency fee",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "US",
  },
  areaServed: [{ "@type": "State", name: "California" }, ...regions.map((r) => ({ "@type": "Place", name: r.name }))],
  knowsAbout: practiceAreas.map((p) => p.name),
  knowsLanguage: ["en", "es"],
  founder: { "@type": "Person", name: "Kasim Idrees", jobTitle: "Founder and Managing Attorney" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll reveals can start hidden without risking invisible content. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatWidget />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DJR8FRQKLH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DJR8FRQKLH');`}
        </Script>
        <Script src="https://web3forms.com/client/script.js" strategy="afterInteractive" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
