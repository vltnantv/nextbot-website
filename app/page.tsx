import { AppleHero } from '@/components/sections/AppleHero'
import { ProblemSection } from '@/components/sections/homepage/ProblemSection'
import { NeoReveal } from '@/components/sections/homepage/NeoReveal'
import { UseCases } from '@/components/sections/homepage/UseCases'
import { SocialProof } from '@/components/sections/homepage/SocialProof'
import { HomepageCTA } from '@/components/sections/homepage/HomepageCTA'
import { HomepageBackground } from '@/components/sections/homepage/HomepageBackground'

function SectionBlend({ color = 'blue' }: { color?: 'blue' | 'purple' | 'cyan' }) {
  const colors = {
    blue: 'bg-blue-500/[0.04]',
    purple: 'bg-purple-500/[0.04]',
    cyan: 'bg-cyan-500/[0.03]',
  }
  return (
    <div className="relative h-24 sm:h-32 pointer-events-none">
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[200%] ${colors[color]} rounded-full blur-[80px]`} />
    </div>
  )
}

export default function HomePage() {
  return (
    <HomepageBackground>
      <main>
        <AppleHero />
        <SectionBlend color="blue" />
        <ProblemSection />
        <SectionBlend color="purple" />
        <NeoReveal />
        <SectionBlend color="cyan" />
        <UseCases />
        <SectionBlend color="purple" />
        <SocialProof />
        <HomepageCTA />
      </main>
    </HomepageBackground>
  )
}
