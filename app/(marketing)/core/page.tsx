import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { Arrow } from '@/components/home/Arrow'
import { CARD, H } from '@/components/home/ui'
import { Cards, EndBlock, FaqList, ProductHero, Section, TextLink } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'

// Text: copy/core.md - word for word. Status: built on the existing dashboard, so the page talks about
// the pilot programme, not „buy now“.

export const metadata: Metadata = {
  title: { absolute: 'CORE — всички ваши клиенти на едно място | NextBot' },
  description: 'CORE пази клиентите, етапите и напомнянията за обаждане в една проста система на български. Без таблици и тетрадки.',
}

const PRICES = '/#ceni' // TODO step 5: /ceni

// „Сайт и NEO → CORE → ECHO (повторни клиенти и отзиви)“
const FLOW = ['Сайт и NEO', 'CORE', 'ECHO (повторни клиенти и отзиви)']

const AUDIENCE = [
  { label: 'автокъщи и сервизи', href: '/za/avtokashti' }, // TODO step 5
  { label: 'клиники и салони', href: '/za/kliniki' }, // TODO step 5
  { label: 'агенции за имоти', href: '/za/imoti' }, // TODO step 5
]

export default function CorePage() {
  return (
    <>
      <ProductHero
        eyebrow="CORE · Система за клиенти"
        title="Всички клиенти на едно място. И кога да се обадите на всеки."
        text="CORE замества тетрадките, таблиците и бележките. Записва всяко запитване, пази историята и ви напомня кого да потърсите днес."
        primary={CTA}
        secondary={{ label: 'Вижте как изглежда', href: '#kakvo-pravi' }}
        note="В момента го въвеждаме при първите бизнеси от пилотната програма."
      />

      <Section title="Проблемът" deep>
        <Reveal>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {[
              'Клиент каза „ще помисля“ и никой не му се обади.',
              'Данните са в три тетрадки, две таблици и един телефон.',
              'Когато колега е в отпуск, никой не знае докъде е стигнал разговорът.',
            ].map((line) => (
              <li key={line} className="border-l-2 border-ink/80 pl-5 text-[20px] leading-snug">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="kakvo-pravi" title="Какво прави">
        <Cards
          cols={4}
          items={[
            { title: 'Етапи.', text: 'Всеки клиент е на ясен етап: ново запитване, разговор, оферта, затворено. Виждате къде са загубите.' },
            { title: 'Напомняния.', text: 'Всяка сутрин виждате списък: на кого да се обадите днес и защо.' },
            { title: 'История.', text: 'Всичко за клиента на едно място: разговори, бележки, оферти. Всеки в екипа знае докъде е стигнало.' },
            { title: 'Отчет.', text: 'Колко запитвания са дошли, колко са станали клиенти и колко са останали без отговор.' },
          ]}
        />
      </Section>

      <Section title="Свързан е с останалото" deep>
        <Reveal className="flex flex-col gap-8">
          <p className="m-0 max-w-[640px] text-[19px]">Запитванията от NEO и сайта влизат в CORE автоматично. Не ги преписвате.</p>
          <ol className="m-0 flex list-none flex-wrap items-center gap-3 p-0" aria-label="Схема">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={`${CARD} rounded-full px-5 py-2.5 ${step === 'CORE' ? `${H} border-ink text-[17px]` : 'text-[16px]'}`}>{step}</span>
                {i < FLOW.length - 1 && (
                  <span aria-hidden="true" className="text-[20px] text-stone">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section title="За кого е">
        <Reveal>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {AUDIENCE.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className={`group ${H} inline-flex items-center gap-2 text-[22px] text-ink no-underline`}>
                  {a.label} <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section title="Въпроси" deep narrow>
        <FaqList
          items={[
            { q: 'Трябва ли да замествам програмите, които ползвам?', a: 'Не. Започваме с това, което вече имате, и прехвърляме клиентите ви.' },
            { q: 'Колко души могат да работят в системата?', a: 'В Старт — до 2, в Растеж — до 10. В Про — повече, по договаряне.' },
            { q: 'Може ли да прехвърлите клиентите ми от таблица?', a: 'Да. Прехвърляме ги при настройката.' },
            { q: 'Сложно ли е за обучение?', a: 'Показваме го на екипа ви на един разговор. Всичко е на български.' },
            // [ПРОВЕРИ] - not shown until checked (copy/core.md):
            // { q: 'Къде са данните?', a: '[ПРОВЕРИ: регионът на Supabase, преди да напишеш „в ЕС“]' },
            {
              q: 'Колко струва?',
              a: (
                <>
                  CORE е включен в пакетите Старт, Растеж и Про. <TextLink href={PRICES}>Вижте цените</TextLink>.
                </>
              ),
            },
          ]}
        />
      </Section>

      <EndBlock
        title="Колко клиенти губите, защото никой не им се обажда?"
        text="На 15-минутен разговор ще го пресметнем заедно, на вашите числа."
        primary={CTA}
      />
    </>
  )
}
