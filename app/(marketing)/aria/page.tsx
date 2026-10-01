import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/Reveal'
import { WaitlistForm } from '@/components/forms/WaitlistForm'
import { RingingPhone } from '@/components/signature/RingingPhone'
import { FaqList, ProductHero, Section } from '@/components/page/blocks'

// Text: copy/aria-studio.md (/aria) - word for word; h1 and subtitle from copy/UNIQUE.md („Телефонът звъни“).
// Not available yet: no „buy“, a waiting list instead. No demo recording until there is a real one.

export const metadata: Metadata = {
  title: { absolute: 'ARIA — гласов асистент, който вдига телефона | NextBot' },
  description: 'ARIA вдига, когато вие не можете, отговаря на български и записва час. Скоро. Запишете се в списъка.',
}

export default function AriaPage() {
  return (
    <>
      <ProductHero
        eyebrow="ARIA · Гласов асистент · Скоро"
        // (copy/aria-studio.md h1 was: Телефонът звъни, а вие сте заети. ARIA вдига.)
        title="Телефонът звъни. Вие сте с клиент."
        lead="ARIA вдига и ви оставя бележка."
        text="ARIA отговаря на обажданията на български, записва час и ви оставя бележка кой се е обаждал и защо."
        primary={{ label: 'Запишете се в списъка', href: '#spisak' }}
        note="Ще ви пишем, когато е готов. Първите от списъка го пробват преди всички."
      />

      {/* Signature (copy/UNIQUE.md „Звънящ телефон“) in place of the shared „Какво прави“ block
          (copy/aria-studio.md „Какво ще прави“); the waiting list form is under it. */}
      <Section deep>
        <div className="grid items-center gap-12 min-[900px]:grid-cols-2">
          <Reveal>
            <RingingPhone />
          </Reveal>
          <Reveal id="spisak" className="scroll-mt-28">
            <WaitlistForm />
          </Reveal>
        </div>
      </Section>

      <Section title="Въпроси" narrow>
        <FaqList
          items={[
            { q: 'Кога ще е готов?', a: 'Още не знаем точна дата. Ще пишем на хората от списъка първи.' },
            { q: 'Ще е ли на български?', a: 'Да.' },
            { q: 'Колко ще струва?', a: 'Включен е в пакет Про. Цената за останалите уточняваме при старта.' },
          ]}
        />
      </Section>
    </>
  )
}
