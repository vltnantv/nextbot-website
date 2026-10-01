import type { Metadata } from 'next'
import Link from 'next/link'
import { DrawLine } from '@/components/motion/DrawLine'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { TodayScreen } from '@/components/signature/TodayScreen'
import { Arrow } from '@/components/home/Arrow'
import { CARD, H } from '@/components/home/ui'
import { EndBlock, FaqList, ProductHero, Section, TextLink } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'

// Text: copy/core.md - word for word. Status: built on the existing dashboard, so the page talks about
// the pilot programme, not „buy now“.

export const metadata: Metadata = {
  title: { absolute: 'CORE — всички ваши клиенти на едно място | NextBot' },
  description: 'CORE пази клиентите, етапите и напомнянията за обаждане в една проста система на български. Без таблици и тетрадки.',
}

const PRICES = '/ceni'

// „Сайт и NEO → CORE → ECHO (повторни клиенти и отзиви)“
const FLOW = ['Сайт и NEO', 'CORE', 'ECHO (повторни клиенти и отзиви)']

const AUDIENCE = [
  { label: 'автокъщи и сервизи', href: '/za/avtokashti' },
  { label: 'клиники и салони', href: '/za/kliniki' },
  { label: 'агенции за имоти', href: '/za/imoti' },
]

export default function CorePage() {
  return (
    <>
      <ProductHero
        eyebrow="CORE · Система за клиенти"
        // h1 and subtitle: copy/UNIQUE.md („Вашето утро“); the text: copy/core.md
        // (copy/core.md h1 was: Всички клиенти на едно място. И кога да се обадите на всеки.)
        title="Отваряте и знаете на кого да се обадите."
        lead="Без тетрадки. Без „къде го записах?“"
        text="CORE замества тетрадките, таблиците и бележките. Записва всяко запитване, пази историята и ви напомня кого да потърсите днес."
        primary={CTA}
        secondary={{ label: 'Вижте как изглежда', href: '#vasheto-utro' }}
        note="В момента го въвеждаме при първите бизнеси от пилотната програма."
      />

      <Section title="Проблемът" deep>
        <Stagger as="ul" className="m-0 flex list-none flex-col gap-4 p-0">
            {[
              'Клиент каза „ще помисля“ и никой не му се обади.',
              'Данните са в три тетрадки, две таблици и един телефон.',
              'Когато колега е в отпуск, никой не знае докъде е стигнал разговорът.',
            ].map((line) => (
              <li key={line} className="border-l-2 border-ink/80 pl-5 text-[20px] leading-snug">
                {line}
              </li>
            ))}
        </Stagger>
      </Section>

      {/* Signature (copy/UNIQUE.md „Екранът Днес“) in place of the shared „Какво прави“ block */}
      <Section id="vasheto-utro" title="Вашето утро">
        <Reveal>
          <TodayScreen />
        </Reveal>
      </Section>

      <Section title="Свързан е с останалото" deep>
        <Reveal className="flex flex-col gap-8">
          <p className="m-0 max-w-[640px] text-[19px]">Запитванията от NEO и сайта влизат в CORE автоматично. Не ги преписвате.</p>
          {/* Сайт и NEO → CORE → ECHO: the arrows draw themselves one after another */}
          <ol className="m-0 flex list-none flex-wrap items-center gap-3 p-0" aria-label="Схема">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={`${CARD} rounded-full px-5 py-2.5 ${step === 'CORE' ? `${H} border-ink text-[17px]` : 'text-[16px]'}`}>{step}</span>
                {i < FLOW.length - 1 && (
                  <DrawLine arrow className="h-3 w-12" delay={0.3 + i * 1.2} />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section title="За кого е">
        <Stagger as="ul" className="m-0 flex list-none flex-col gap-3 p-0">
            {AUDIENCE.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className={`group ${H} inline-flex items-center gap-2 text-[22px] text-ink no-underline`}>
                  {a.label} <Arrow />
                </Link>
              </li>
            ))}
        </Stagger>
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
