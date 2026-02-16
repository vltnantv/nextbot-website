import { Hero } from '@/components/sections/homepage/Hero'
import { PlatformOverview } from '@/components/sections/homepage/PlatformOverview'
import { Products } from '@/components/sections/homepage/Products'
import { HowItWorks } from '@/components/sections/homepage/HowItWorks'
import { UseCasesSection } from '@/components/sections/homepage/UseCasesSection'
import { TechnologySection } from '@/components/sections/homepage/TechnologySection'
import { CaseStudy } from '@/components/sections/homepage/CaseStudy'
import { Implementation } from '@/components/sections/homepage/Implementation'
import { CTASection } from '@/components/sections/homepage/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformOverview />
      <Products />
      <HowItWorks />
      <UseCasesSection />
      <TechnologySection />
      <CaseStudy />
      <Implementation />
      <CTASection />
    </>
  )
}
