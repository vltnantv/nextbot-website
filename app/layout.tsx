import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: "Nextbot - AI Chatbot & Voice Assistant | Neo & Aria",
  description: "Neo AI chatbot отговаря на съобщения. Aria voice assistant отговаря на обаждания. 24/7 автоматизация на customer service.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Nextbot - AI Chatbot & Voice Assistant",
    description: "Neo AI chatbot отговаря на съобщения. Aria voice assistant отговаря на обаждания. 24/7 автоматизация.",
    url: "https://nextbot.me",
    siteName: "Nextbot",
    images: [
      {
        url: "https://nextbot.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nextbot - AI Communication Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nextbot - AI Chatbot & Voice Assistant",
    description: "Neo AI chatbot отговаря на съобщения. Aria voice assistant отговаря на обаждания. 24/7 автоматизация.",
    images: ["https://nextbot.me/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nextbot EOOD",
    description:
      "AI автоматизация за хотели и е-търговия в България",
    url: "https://nextbot.me",
    logo: "https://nextbot.me/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+359-894-288-119",
      contactType: "Sales",
      availableLanguage: ["Bulgarian", "English"],
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Nextbot AI Assistant",
    description:
      "24/7 AI асистент за хотели и бизнес",
    brand: {
      "@type": "Brand",
      name: "Nextbot",
    },
    offers: {
      "@type": "Offer",
      price: "59",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "59",
        priceCurrency: "EUR",
        unitText: "месец",
      },
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="bg" className={inter.variable}>
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Structured Data - Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      </head>

      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{Object.keys(localStorage).forEach(function(k){if(k.indexOf('voiceflow')>-1||k.indexOf('vf_')>-1)localStorage.removeItem(k)});Object.keys(sessionStorage).forEach(function(k){if(k.indexOf('voiceflow')>-1||k.indexOf('vf_')>-1)sessionStorage.removeItem(k)})}catch(e){}})(window.scrollTo(0,0));if('scrollRestoration' in history)history.scrollRestoration='manual';`,
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
              </html>
                     );
                       }
