import type { Metadata } from 'next'
import { Float } from '@/components/motion/Float'
import { Reveal } from '@/components/motion/Reveal'
import { HeroChat } from '@/components/home/HeroChat'
import { CARD, H } from '@/components/home/ui'
import { Cards, EndBlock, FaqList, ProductHero, Section, Steps, TextLink } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'

// Text: copy/neo.md - word for word. Do not add numbers, reviews or features.

export const metadata: Metadata = {
  title: { absolute: 'NEO — чат асистент за вашия сайт | NextBot' },
  description: 'NEO отговаря на клиентите ви в сайта на български, записва часове и събира данните им. Настройваме го за 7 дни.',
}

const TRY = { label: 'Пробвайте бота', href: '/#demo' } // TODO step 5: chat on this page or /demo
const PRICES = '/#ceni' // TODO step 5: /ceni

const CHANNELS: { name: string; status: 'наличен' | 'скоро' }[] = [
  { name: 'Във вашия сайт', status: 'наличен' },
  { name: 'Viber', status: 'скоро' },
  { name: 'Messenger', status: 'скоро' },
  { name: 'WhatsApp', status: 'скоро' },
  { name: 'Instagram', status: 'скоро' },
]

export default function NeoPage() {
  return (
    <>
      <ProductHero
        eyebrow="NEO · Чат асистент"
        title="Клиентът пише в 22:47. NEO му отговаря веднага."
        text="NEO отговаря на въпросите на клиентите в сайта ви, записва им час и запазва данните им, за да ги потърсите. Денем и нощем, на български."
        primary={CTA}
        secondary={TRY}
        note="Настройваме го за вас до 7 дни. Без годишен договор."
      />

      <Section title="Какво прави" deep>
        <Cards
          items={[
            { title: 'Отговаря на въпроси.', text: 'За цени, работно време, адрес, услуги. Отговорите идват от вашия сайт и вашите документи, не от общи познания.' },
            { title: 'Записва час или оглед.', text: 'Предлага свободни часове и записва избрания. Вие виждате всичко на едно място.' },
            { title: 'Събира данните.', text: 'Име, телефон и какво търси клиентът. Ако ботът не знае отговора, не измисля, а казва, че ще се обадите вие, и записва данните.' },
          ]}
        />
      </Section>

      <Section title="Как изглежда разговор">
        <Reveal className="flex flex-col items-center gap-4">
          <Float className="w-full max-w-[420px]" duration={6}>
            <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgba(31,29,26,.04),0_24px_60px_rgba(31,29,26,.10)]">
              <HeroChat
                timeLabel={null}
                doneLabel={null}
                lines={[
                  { who: 'u', text: 'Здравейте, колко струва почистване на зъби?' },
                  { who: 'b', text: 'Здравейте! Почистването е 80 €. Искате ли да запазя час?' },
                  { who: 'u', text: 'Да, за четвъртък следобед.' },
                  { who: 'b', text: 'В четвъртък има свободно в 15:00 и 16:30. Кой ви е удобен?' },
                ]}
              />
            </div>
          </Float>
          <p className="m-0 text-center text-[14px] text-stone">Примерът е илюстрация. Цените и часовете се вземат от вашия бизнес.</p>
        </Reveal>
      </Section>

      <Section title="Къде работи" deep>
        <Reveal className="flex flex-col gap-6">
          <ul className={`${CARD} m-0 flex list-none flex-col divide-y divide-line rounded-card p-0`}>
            {CHANNELS.map((c) => (
              <li key={c.name} className="flex items-center justify-between gap-4 px-6 py-4">
                <span className={`${H} text-[19px]`}>{c.name}</span>
                <span
                  className={
                    c.status === 'наличен'
                      ? 'rounded-full bg-ink px-3 py-1 text-[13px] text-cream'
                      : 'rounded-full bg-cream-deep px-3 py-1 text-[13px] text-stone'
                  }
                >
                  {c.status === 'наличен' ? 'Наличен' : 'Скоро'}
                </span>
              </li>
            ))}
          </ul>
          <p className="m-0 text-stone">Започваме със сайта. Другите канали ги добавяме, когато са проверени и работят добре.</p>
        </Reveal>
      </Section>

      <Section title="Как започваме">
        <Steps
          items={[
            { title: 'Разговор, 15 минути.', text: 'Разказвате как работите и какво питат клиентите ви най-често.' },
            { title: 'Настройка, до 7 дни.', text: 'Учим бота от сайта и документите ви и го слагаме на сайта.' },
            { title: 'Работи.', text: 'Всяка седмица получавате отчет: колко запитвания са дошли и колко часове са записани.' },
          ]}
        />
      </Section>

      <Section title="Въпроси" deep narrow>
        <FaqList
          items={[
            {
              q: 'Ще звучи ли като робот?',
              a: 'Пише кратко и на нормален български. Вие определяте тона: по-официален или по-свободен. Преди да започне да отговаря на клиенти, го пробвате и поправяме каквото не ви хареса.',
            },
            { q: 'Какво става, ако не знае отговора?', a: 'Не измисля. Казва, че ще се свържете с клиента, и записва името и телефона му.' },
            // [ПРОВЕРИ] - not shown until checked (copy/neo.md):
            // { q: 'Къде са данните на клиентите ми?', a: 'Разговорите се обработват от нашите доставчици, включително OpenAI. Подробности има в политиката за поверителност.' },
            // [ПРОВЕРИ: регионът на Supabase, преди да напишеш „в ЕС“]
            {
              q: 'Трябва ли да сменям сайта си?',
              a: (
                <>
                  Не. NEO се слага на сайта, който имате. Ако сайтът е остарял, вижте <TextLink href="/izrabotka-na-sait">WEB</TextLink>.
                </>
              ),
            },
            {
              q: 'Колко струва?',
              a: (
                <>
                  NEO е включен в пакетите Старт, Растеж и Про. <TextLink href={PRICES}>Вижте цените</TextLink>.
                </>
              ),
            },
            { q: 'Мога ли да спра?', a: 'Да, по всяко време. Няма годишен договор.' },
          ]}
        />
      </Section>

      <EndBlock title="Пробвайте как би отговорил на вашите клиенти." primary={CTA} secondary={TRY} />
    </>
  )
}
