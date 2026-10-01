import { DayStrip } from '@/components/home/DayStrip'
import { Faq } from '@/components/home/Faq'
import { FinalCta } from '@/components/home/FinalCta'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { Pilot } from '@/components/home/Pilot'
import { Pricing } from '@/components/home/Pricing'
import { Problem } from '@/components/home/Problem'
import { Products } from '@/components/home/Products'
import { TryIt } from '@/components/home/TryIt'

// Homepage - design/homepage-mockup.html (approved mockup; reference only, not imported).
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <Products />
      <DayStrip />
      <TryIt />
      <Pricing />
      <Pilot />
      <Faq />
      <FinalCta />
    </>
  )
}
