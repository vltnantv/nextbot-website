import { NeoHero } from '@/components/sections/neo/NeoHero'
import { ScrollExperience } from '@/components/sections/neo/ScrollExperience'
import { PricingScroll } from '@/components/sections/neo/PricingScroll'
import { PricingCalculator } from '@/components/sections/neo/PricingCalculator'

export const metadata = {
  title: 'Nextbot Neo - AI Assistant',
  description: 'AI assistant that never sleeps.',
}

export default function NeoPage() {
  return (
    <main>
      <NeoHero />
      <ScrollExperience />
      <PricingScroll />
      <PricingCalculator />
    </main>
  )
}
