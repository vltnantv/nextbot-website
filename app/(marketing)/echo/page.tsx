import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/Reveal'
import { EchoTimeline } from '@/components/signature/EchoTimeline'
import { EchoPhone } from '@/components/visuals/EchoPhone'
import { EndBlock, FaqList, ProductHero, Section, TextLink } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'

// Text: copy/echo.md - word for word; h1 and subtitle from copy/UNIQUE.md („Пътят на един клиент“).
// No made-up numbers or reviews. Status: new - the page leads to a call, not „buy now“.

export const metadata: Metadata = {
  title: { absolute: 'ECHO — върнете клиентите, които вече имате | NextBot' },
  description: 'ECHO напомня на клиентите за час, пита за отзив в Google след покупка и връща стари клиенти с оферта.',
}

export default function EchoPage() {
  return (
    <>
      <ProductHero
        eyebrow="ECHO · Повторни клиенти и отзиви"
        // (copy/echo.md h1 was: Най-лесният нов клиент е този, който вече е бил при вас.)
        title="Клиентът не свършва с първата покупка."
        lead="ECHO е следващото съобщение."
        text="ECHO пише на клиентите в точния момент: напомня им за час, пита ги как е минало и се връща към тези, които отдавна не са идвали."
        primary={CTA}
        secondary={{ label: 'Вижте как работи', href: '#kak-raboti' }}
      />

      {/* Signature (copy/UNIQUE.md „Времева линия“) in place of the shared „Какво прави“ block
          (copy/echo.md „Три неща, които прави“). */}
      <Section id="kak-raboti" title="Пътят на един клиент" deep>
        <EchoTimeline />
      </Section>

      {/* copy/VISUALS.md: ECHO is not a program yet - the messages as the client gets them, on a phone */}
      <Section>
        <Reveal className="flex flex-col items-center gap-2">
          <span className="text-[14px] text-stone">Пример за съобщения</span>
          <EchoPhone />
        </Reveal>
      </Section>

      <Section title="Връзка с останалото" deep>
        <Reveal>
          <p className="m-0 max-w-[640px] text-[19px]">ECHO работи със списъка на клиентите в CORE. Знае кой кога е идвал и кому да пише.</p>
        </Reveal>
      </Section>

      <Section title="Въпроси" narrow>
        <FaqList
          items={[
            // [ПРОВЕРИ с юрист] - not shown until checked (copy/echo.md):
            // { q: 'Пише ли на хората без тяхно съгласие?', a: 'Съобщения се пращат само на клиенти, които са дали съгласие да получават такива. Настройваме го заедно и спазваме закона.' },
            { q: 'Мога ли да виждам какво е изпратено?', a: 'Да, всичко е в CORE.' },
            { q: 'Може ли да спре?', a: 'Да. Клиентът може да откаже по всяко време, а вие да изключите ECHO.' },
            {
              q: 'Включено ли е в цената?',
              a: (
                <>
                  ECHO е в пакет Растеж и Про. <TextLink href="/ceni">Вижте цените</TextLink>.
                </>
              ),
            },
          ]}
        />
      </Section>

      <EndBlock title="Колко от клиентите ви са идвали само веднъж?" primary={CTA} />
    </>
  )
}
