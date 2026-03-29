import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: "NextBot — AI Platform for Business Automation",
    template: "%s | NextBot",
  },
  description:
    "NextBot builds AI infrastructure that captures, qualifies, and converts leads automatically. Enterprise-grade AI systems for sales, customer communication, and operations.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NextBot — AI Systems That Generate Revenue",
    description:
      "AI platform that automates customer communication, lead qualification, and business operations.",
    url: "https://www.nextbot.me",
    siteName: "NextBot",
    images: [
      {
        url: "https://www.nextbot.me/logo-icon.png",
        width: 512,
        height: 512,
        alt: "NextBot Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NextBot — AI Systems That Generate Revenue",
    description:
      "AI platform that automates customer communication, lead qualification, and business operations.",
    images: ["https://www.nextbot.me/logo-icon.png"],
  },
  robots: { index: true, follow: true },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NextBot",
              legalName: "Nextbot EOOD",
              url: "https://www.nextbot.me",
              logo: "https://www.nextbot.me/logo-icon.png",
              description: "AI platform that automates customer communication and business operations.",
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
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
