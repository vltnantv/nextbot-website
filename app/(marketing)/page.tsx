import { Faq } from '@/components/home/Faq'
import { FinalCta } from '@/components/home/FinalCta'
import { Hero } from '@/components/home/Hero'
import { Pricing } from '@/components/home/Pricing'
import { CoreSection, HowWeStart, Industries, MoreProducts, NeoSection, PilotLine } from '@/components/home/Sections'

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
