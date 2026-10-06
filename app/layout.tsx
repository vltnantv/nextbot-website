import { COMPANY } from "@/lib/company";
import type { Metadata, Viewport } from "next";
import { Geologica, Onest } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ScrollObserver } from "@/components/ScrollObserver";
import { HydrationMark } from "@/components/motion/HydrationMark";
import "@/styles/tokens.css";
import "./globals.css";

// BRAND.md: Geologica 600 for headings, Onest 400/500 for text, Cyrillic subset.
const geologica = Geologica({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"], // 500: industries strip in the homepage mockup
  variable: "--font-geologica",
  display: "swap",
  // Next has no fallback metrics for Geologica; use a plain system fallback instead of a warning
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const onest = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FAF7F2",
};

export const metadata: Metadata = {
  title: {
    default: "NextBot — Всеки клиент получава отговор. Веднага.",
    template: "%s | NextBot",
  },
  description:
    "NextBot отговаря на запитвания в сайта ви, записва клиентите и ви напомня кога да се обадите. Денем и нощем, на български.",
  metadataBase: new URL("https://www.nextbot.me"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // pages set their own (lib/seo.ts pageMeta); this is the fallback
  openGraph: {
    title: "NextBot — Всеки клиент получава отговор. Веднага.",
    description: "NextBot отговаря на запитвания в сайта ви, записва клиентите и ви напомня кога да се обадите. Денем и нощем, на български.",
    url: "https://www.nextbot.me",
    siteName: "NextBot",
    locale: "bg_BG",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NextBot — Всеки клиент получава отговор. Веднага." }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextBot — Всеки клиент получава отговор. Веднага.",
    description: "NextBot отговаря на запитвания в сайта ви, записва клиентите и ви напомня кога да се обадите. Денем и нощем, на български.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={`${geologica.variable} ${onest.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light" />
        {/* Marks that JavaScript runs, so sections may start hidden and float in (see globals.css).
            Without JS nothing is hidden. Safety net: if React has not started within 4 s
            (slow network, blocked or failed bundle), drop the class so nothing stays invisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__nbReady)document.documentElement.classList.remove('js')},4000)",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // schema.org Organization: name, site, phone, email - no company name, ЕИК or address yet
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NextBot",
              url: "https://www.nextbot.me",
              logo: "https://www.nextbot.me/logo-icon.png",
              telephone: COMPANY.phone.replace(/\s/g, ""),
              email: COMPANY.email,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: COMPANY.phone.replace(/\s/g, ""),
                email: COMPANY.email,
                contactType: "customer service",
                availableLanguage: ["bg"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${onest.className} bg-cream text-ink antialiased`}
      >
        <HydrationMark />
        <ScrollObserver />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
