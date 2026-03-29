import { Hero } from '@/components/sections/homepage/Hero'
import { Products } from '@/components/sections/homepage/Products'
import { HowItWorks } from '@/components/sections/homepage/HowItWorks'
import { CTASection } from '@/components/sections/homepage/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <HowItWorks />
      <CTASection />
    </>
  )
}
