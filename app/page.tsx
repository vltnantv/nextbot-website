import Script from "next/script";
import { NeoHero } from "@/components/sections/NeoHero";
import { WhatIsNeo } from "@/components/sections/WhatIsNeo";
import { FinalCTA } from "@/components/sections/FinalCTA";

// ---------------------------------------------------------------------------
// Nextbot Neo - Homepage
// ---------------------------------------------------------------------------

const neoSchemaData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Nextbot Neo",
  description: "AI асистент за твоя бизнес. Отговаря на клиентите 24/7 навсякъде.",
  brand: {
    "@type": "Brand",
    name: "Nextbot",
  },
  offers: {
    "@type": "Offer",
    price: "199",
    priceCurrency: "BGN",
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data - Product Schema */}
      <Script
        id="neo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neoSchemaData) }}
      />

      {/* ══════════════════════════════════════════
          1. HERO - Neo Full Viewport with Floating Icons
          ══════════════════════════════════════════ */}
      <NeoHero />

      {/* ══════════════════════════════════════════
          2. WHAT IS NEO - 3 Column Explanation
          ══════════════════════════════════════════ */}
      <WhatIsNeo />

      {/* ══════════════════════════════════════════
          3. FINAL CTA - Neo Gradient
          ══════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
