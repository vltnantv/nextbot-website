import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VoiceflowWidget } from "@/components/VoiceflowWidget";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextBot",
  description: "NextBot",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      telephone: "+359-88-123-4567",
      contactType: "Sales",
      availableLanguage: ["Bulgarian", "English"],
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Nextbot AI Assistant",
    description:
      "24/7 AI асистент за хотели с 30-дневен безплатен пилот",
    brand: {
      "@type": "Brand",
      name: "Nextbot",
    },
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "BGN",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "299",
        priceCurrency: "BGN",
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

      <body className={`${inter.className} overflow-x-hidden`}>
        <Header />
        <main>{children}</main>
        <Footer />     
          {/* <VoiceflowWidget /> */}   
           </body>
              </html>
                     );
                       }
