import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Reveal } from '@/components/motion/Reveal'
import { OfferCards } from '@/components/home/parts'
import { DEVELOPMENT_OFFERS, STEPS } from '@/components/home/offers'
import { EndBlock, FaqList, ProductHero, Section, Steps } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'
import { DEV_OFFER_DAYS, STUDIO_FROM, WEB_OFFERS, eur } from '@/lib/prices'

// REBUILD-PLAN.md §5.1: the second line of the company - sites, systems and apps to order. The cards and steps
// are the same texts as on the homepage (components/home/offers.ts). Prices from lib/prices.ts.

export const metadata: Metadata = pageMeta({
  title: 'Разработка по поръчка: сайтове, системи и приложения | NextBot',
  description:
    'Сайтове и онлайн магазини, вътрешни системи и мобилни приложения по мярка. Писмено предложение с обхват, срок и цена до 2 дни след 15-минутен разговор.',
  path: '/razrabotka',
})

const web = WEB_OFFERS.map((o) => (o.from !== null ? `${o.name} от ${eur(o.from)}` : `${o.name} ${eur(o.monthly!)}/месец`)).join(', ')

export default function DevelopmentPage() {
  return (
    <>
      <ProductHero
        eyebrow="Разработка по поръчка"
        title="Когато нищо готово не пасва, го изграждаме за вас."
        lead="Започваме от вашия процес, не от технологията."
        text="Сайтове и онлайн магазини, вътрешни системи за това, което днес правите в Excel и на хартия, мобилни приложения за екипа на терен. Същите хора, които правят продуктите ни."
        primary={CTA}
        secondary={{ label: 'Вижте продуктите', href: '/#produkti' }}
      />

      <Section title="Какво правим" deep>
        <OfferCards items={DEVELOPMENT_OFFERS} />
      </Section>

      <Section title="Как работим">
        <Steps items={STEPS.map((s) => ({ title: s.title, text: `${s.when}. ${s.text}` }))} />
      </Section>

      <Section title="Цена" deep>
        <Reveal>
          <p className="m-0 max-w-[720px] text-[19px]">
            Писмено предложение до {DEV_OFFER_DAYS} дни след 15-минутен разговор: обхват, срок, цена. Сайтовете имат ориентировъчни цени: {web}. Системите
            започват от {eur(STUDIO_FROM)}.
          </p>
        </Reveal>
      </Section>

      <Section title="Въпроси" narrow>
        <FaqList
          items={[
            { q: 'Кой притежава кода?', a: 'Вие. Записано е в договора.' },
            { q: 'Можете ли да поемете съществуващ проект?', a: 'Да, след кратък преглед на кода. Казваме честно какво бихме запазили и какво не.' },
            { q: 'Какво става след пускането?', a: 'Поддръжка по договаряне: следим, оправяме, развиваме, и ви пращаме отчет какво е направено.' },
          ]}
        />
      </Section>

      <EndBlock title="Разкажете ни какво ви отнема време." primary={CTA} />
    </>
  )
}
