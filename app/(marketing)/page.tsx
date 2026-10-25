import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Calculator } from '@/components/home/Calculator'
import { CompanyHero } from '@/components/home/CompanyHero'
import { Development } from '@/components/home/Development'
import { Faq } from '@/components/home/Faq'
import { FinalCta } from '@/components/home/FinalCta'
import { HowWeWork } from '@/components/home/HowWeWork'
import { Industries } from '@/components/home/Industries'
import { Playground } from '@/components/home/Playground'
import { Pricing } from '@/components/home/Pricing'
import { Principles } from '@/components/home/Principles'
import { Products } from '@/components/home/Products'

export const metadata: Metadata = pageMeta({
  title: 'NextBot — Софтуер за бизнеса: готови продукти и разработка по поръчка',
  description:
    'Софтуерна компания от София. CORE за клиенти и продажби, NEO асистент за запитвания, ECHO напомняния, плюс сайтове, системи и приложения по поръчка.',
  path: '/',
})

// Homepage after REBUILD-PLAN.md §4: a software company with two lines - ready products and development
// to order. The aura sits only behind the shelf, the playground, the calculator and the final block.
export default function HomePage() {
  return (
    <>
      <CompanyHero />
      <Products />
      <Playground />
      <Calculator />
      <Development />
      <HowWeWork />
      <Principles />
      <Industries />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  )
}
