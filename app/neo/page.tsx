import { NeoHero } from '@/components/sections/neo/NeoHero'
import { NeoCTA } from '@/components/sections/neo/NeoCTA'
import dynamic from 'next/dynamic'

const ScrollExperience = dynamic(
  () => import('@/components/sections/neo/ScrollExperience').then(mod => mod.ScrollExperience),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
)

const PricingScroll = dynamic(
  () => import('@/components/sections/neo/PricingScroll').then(mod => mod.PricingScroll),
  { ssr: false, loading: () => <div className="min-h-[120vh]" /> }
)

const PricingCalculator = dynamic(
  () => import('@/components/sections/neo/PricingCalculator').then(mod => mod.PricingCalculator),
  { ssr: false }
)

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
