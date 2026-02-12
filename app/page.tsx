import Script from "next/script";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

// ---------------------------------------------------------------------------
// Structured Data - FAQ Schema
// ---------------------------------------------------------------------------

const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Какво точно прави AI асистентът?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI асистентът отговаря на въпросите на вашите гости или клиенти - автоматично, 24 часа в денонощието. Когато гост пише 'Имате ли свободни стаи за 15 юни?', ботът отговаря веднага с наличност, цени и опция за резервация.",
      },
    },
    {
      "@type": "Question",
      name: "Наистина ли е безплатно в началото?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, напълно. 30 дни, реален бот, реални гости, нула разходи. Не искаме кредитна карта дори.",
      },
    },
    {
      "@type": "Question",
      name: "Мога ли да спра по всяко време?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Без дълги договори, без неустойки. 30-дневно предизвестие и спираме. Всичките ви данни ви се изпращат в Excel/CSV.",
      },
    },
    {
      "@type": "Question",
      name: "Трябва ли да сменям сайта или системите си?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Не. Добавяме само един малък код в сайта ви (като Google Analytics - копирате и поставяте). Отнема 5 минути, не изисква програмист.",
      },
    },
    {
      "@type": "Question",
      name: "Безопасни ли са данните на гостите ни?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. GDPR fully compliant - следваме всички европейски изисквания за защита на данни. Данните са криптирани и се съхраняват на европейски сървъри.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Home Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      {/* Structured Data - FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* ══════════════════════════════════════════
          1. HERO - Full Viewport
          ══════════════════════════════════════════ */}
      <Hero />

      {/* ══════════════════════════════════════════
          2. FEATURES - White Background
          ══════════════════════════════════════════ */}
      <Features />

      {/* ══════════════════════════════════════════
          3. SOCIAL PROOF - Mixed Backgrounds
          ══════════════════════════════════════════ */}
      <SocialProof />

      {/* ══════════════════════════════════════════
          4. PRICING - White Background with Calculator
          ══════════════════════════════════════════ */}
      <Pricing />

      {/* ══════════════════════════════════════════
          5. FAQ - White Background
          ══════════════════════════════════════════ */}
      <FAQ />

      {/* ══════════════════════════════════════════
          6. FINAL CTA - Dark Gradient
          ══════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
