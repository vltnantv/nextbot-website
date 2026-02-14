import { NeoHero } from '@/components/sections/neo/NeoHero'
import { ScrollExperience } from '@/components/sections/neo/ScrollExperience'
import { PricingScroll } from '@/components/sections/neo/PricingScroll'
import { PricingCalculator } from '@/components/sections/neo/PricingCalculator'
import { NeoCTA } from '@/components/sections/neo/NeoCTA'

export const metadata = {
  title: 'Nextbot Neo - AI Assistant',
  description: 'AI assistant that never sleeps.',
}

export default function NeoPage() {
  return (
    <main>
      <div className="bg-white dark:bg-black">
        <NeoHero />
        <ScrollExperience />
      </div>
      <PricingScroll />
      <PricingCalculator />
      <NeoCTA />
    </main>
  )
}
