import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "NextBot — AI Systems That Generate Revenue | Enterprise AI Automation",
  description:
    "NextBot builds AI infrastructure that captures, qualifies, and converts leads automatically. Increase lead conversion by 30%+ with intelligent automation. Enterprise-grade AI systems for sales, customer communication, and operations.",
  keywords:
    "AI automation, enterprise AI, lead generation AI, AI sales system, revenue automation, AI infrastructure, lead conversion, business AI, AI customer communication",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "NextBot — AI Systems That Generate Revenue",
    description:
      "Enterprise AI infrastructure for lead capture, qualification, and conversion automation. Book a strategy call.",
    url: "https://nextbot.me",
    siteName: "NextBot",
    images: [
      {
        url: "https://nextbot.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextBot — Enterprise AI Infrastructure",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextBot — AI Systems That Generate Revenue",
    description:
      "Enterprise AI infrastructure for lead capture, qualification, and conversion automation.",
    images: ["https://nextbot.me/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NextBot",
    legalName: "Nextbot EOOD",
    description:
      "Enterprise AI automation partner. We build AI systems that generate revenue and automate business operations.",
    url: "https://nextbot.me",
    logo: "https://nextbot.me/logo.png",
    foundingDate: "2024",
    founder: { "@type": "Person", name: "Valentin Antov" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sofia",
      addressCountry: "BG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+359-894-288-119",
      email: "info@nextbot.me",
      contactType: "Sales",
      availableLanguage: ["Bulgarian", "English"],
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Revenue Automation",
    provider: { "@type": "Organization", name: "NextBot" },
    description:
      "Custom AI systems for lead capture, qualification, and conversion automation. Enterprise-grade infrastructure.",
    areaServed: "EU",
    serviceType: "AI Automation",
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className={`${inter.className} bg-[#09090b] text-zinc-50 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
