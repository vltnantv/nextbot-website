import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Faq } from '@/components/home/Faq'
import { FinalCta } from '@/components/home/FinalCta'
import { Hero } from '@/components/home/Hero'
import { Pricing } from '@/components/home/Pricing'
import { CoreSection, HowWeStart, Industries, MoreProducts, NeoSection, PilotLine } from '@/components/home/Sections'

// No „Мета“ in copy/ for the homepage: the title is the h1, the description is the hero paragraph (both approved).
export const metadata: Metadata = pageMeta({
  title: 'NextBot — Всеки клиент получава отговор. Веднага.',
  description: 'NextBot отговаря на запитвания в сайта ви, записва клиентите и ви напомня кога да се обадите. Денем и нощем, на български.',
  path: '/',
})

// Homepage - copy/DESIGN-REFRESH.md §4 (it wins over MOTION.md for look and layout): ten sections,
// the product in the centre, hairline rows instead of cards, a plain cream background.
export default function HomePage() {
  return (
    <>
      <Hero />
      <PilotLine />
      <NeoSection />
      <CoreSection />
      <MoreProducts />
      <Industries />
      <HowWeStart />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  )
}
