import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { BeforeAfter } from '@/components/signature/BeforeAfter'
import { WebCalc } from '@/components/signature/WebCalc'
import { Tilt } from '@/components/motion/Tilt'
import { Arrow } from '@/components/home/Arrow'
import { BTN_PRIMARY, BTN_SECONDARY, CARD, H } from '@/components/home/ui'
import { Cards, EndBlock, FaqList, ProductHero, Section } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'
import { WEB_OFFERS, WEB_RULES, eur } from '@/lib/prices'

// Text: copy/web.md - word for word. Prices come from lib/prices.ts (the copy has them only for reference).
// No made-up examples, reviews or „clients who already have us“; a gallery only once there are real sites.

const offer = (name: string) => {
  const o = WEB_OFFERS.find((w) => w.name === name)
  if (!o) throw new Error(`WEB offer missing in lib/prices.ts: ${name}`)
  return o
}
const card = offer('Визитка')
const business = offer('Бизнес сайт')
const shop = offer('Онлайн магазин')
const support = offer('Поддръжка')

export const metadata: Metadata = {
  title: { absolute: 'Изработка на сайт за малък бизнес | NextBot' },
  description: `Бърз и модерен сайт на български с чат асистент от първия ден. Визитка от ${eur(card.from!)}, бизнес сайт от ${eur(business.from!)}, онлайн магазин от ${eur(shop.from!)}.`,
}

const PACKAGES = '/ceni'

// Bullet points per offer, as in copy/web.md
const OFFERS = [
  { o: card, points: ['1 страница', 'Контакти, карта и форма за запитване', 'Мобилна версия', 'До 7 дни'] },
  { o: business, points: ['До 6 страници', 'Услуги, цени, галерия', 'Основно SEO', 'До 14 дни'] },
  { o: shop, points: ['Продукти и количка', 'Плащане и доставка', 'До 30 дни'] },
]

export default function WebPage() {
  return (
    <>
      <ProductHero
        eyebrow="WEB · Изработка на уебсайт"
        // h1 and subtitle: copy/UNIQUE.md („Преди и след“); the text: copy/web.md
        // (copy/web.md h1 was: Сайт, който отговаря на клиентите ви.)
        title="От сайт, който стои, към сайт, който отговаря."
        lead="Същият бизнес. Друго впечатление."
        text="Правим бърз и модерен сайт на български за вашия бизнес. С чат асистент NEO от първия ден, хостинг и домейн, и човек, на когото можете да се обадите."
        primary={CTA}
        secondary={{ label: 'Вижте цените', href: '#ceni' }}
        note="Първият месец с NEO е безплатен."
      />

      <Section title="Какво получавате" deep>
        <Cards
          cols={4}
          items={[
            { title: 'Модерен вид и бързо зареждане.', text: 'Чист сайт, който изглежда добре на телефон и на компютър.' },
            { title: 'NEO вграден.', text: 'Клиентът пита в сайта и получава отговор, дори когато вие не сте на телефона.' },
            { title: 'Хостинг, домейн, сигурност.', text: 'Всичко е уредено. Не се занимавате с технически неща.' },
            { title: 'Човек за поддръжка.', text: 'Промени по текстове и цени правим ние.' },
          ]}
        />
      </Section>

      <Section id="ceni" title="Цени">
        <Stagger className="grid items-stretch gap-5 min-[900px]:grid-cols-3">
          {OFFERS.map(({ o, points }) => (
            <Tilt
              key={o.name}
              className={`flex flex-col gap-[18px] bg-white p-[30px] ${o.popular ? 'edge-glow border-2 border-transparent' : 'border border-line'}`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className={`${H} text-[20px]`}>{o.name}</span>
                {o.popular && <span className="rounded-full bg-ink px-2.5 py-[3px] text-[12px] text-cream">Най-често избиран</span>}
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-[15px] text-stone">от</span>
                <span className={`${H} text-[42px]`}>{eur(o.from!)}</span>
              </span>
              <ul className="m-0 flex list-disc flex-col gap-1.5 pl-[18px] text-[15px]">
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link href={CTA.href} className={`mt-auto px-5 py-[13px] text-center ${o.popular ? BTN_PRIMARY : BTN_SECONDARY}`}>
                {CTA.label}
              </Link>
            </Tilt>
          ))}
        </Stagger>
        <Reveal>
          <div className={`${CARD} rounded-card px-7 py-6`}>
            <span className="font-semibold">
              Поддръжка {eur(support.monthly!)}/месец.
            </span>{' '}
            <span className="text-stone">Хостинг, сигурност, резервни копия и до 1 час промени на месец.</span>
          </div>
        </Reveal>
        {/* second element (copy/UNIQUE.md „Калкулатор на сайт“) */}
        <Reveal>
          <WebCalc />
        </Reveal>
        <p className="m-0 text-[14px] text-stone">
          Цените са без ДДС. Точната цена зависи от това, какво ви трябва. На разговора ще ви кажем, преди да започнем.
        </p>
      </Section>

      {/* Signature (copy/UNIQUE.md „Плъзгач преди/след“) in place of the shared „Как работим“ block */}
      <Section title="Преди и след" deep>
        <Reveal>
          <BeforeAfter />
        </Reveal>
      </Section>

      <Section title="Сайт + пакет Растеж">
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <p className="m-0 max-w-[640px] text-[19px]">
            Ако ползвате и пакет Растеж, изработката на бизнес сайт е с {WEB_RULES.growthDiscountPercent}% отстъпка.
          </p>
          <Link href={PACKAGES} className="group inline-flex items-center gap-1.5 text-[16px] font-medium text-ink">
            Вижте пакетите <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section title="Въпроси" deep narrow>
        <FaqList
          items={[
            {
              q: 'Колко време отнема?',
              a: 'Визитката — до 7 дни, бизнес сайтът — до 14, магазинът — до 30. Времето зависи и от това колко бързо ни дадете текстовете и снимките.',
            },
            { q: 'Кой пише текстовете?', a: 'Ако нямате, ги подготвяме заедно на разговора. Вие ги одобрявате.' },
            { q: 'Мой ли е сайтът?', a: 'Да. Домейнът е на ваше име.' },
            {
              q: 'Какво става, ако искам промени по-късно?',
              a: 'Поддръжката включва до 1 час промени на месец. По-големите промени се уговарят отделно.',
            },
            { q: 'Нужна ли е поддръжка?', a: 'Не е задължителна, но без нея сами ще се грижите за хостинга и сигурността.' },
            { q: 'Мога ли да имам само сайт, без NEO?', a: 'Да. NEO е безплатен първия месец и после решавате сами.' },
          ]}
        />
      </Section>

      <EndBlock title="Нов сайт, който работи и нощем." primary={CTA} />
    </>
  )
}
