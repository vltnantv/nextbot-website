import { ChatCard, EndBlock, FaqList, Lines, ProductHero, Section, type FaqItem } from './blocks'
import type { ChatLine } from '@/components/motion/Typing'
import { Reveal } from '@/components/motion/Reveal'
import { CTA } from '@/lib/site-nav'

// One skeleton for every industry page (copy/branshove.md): начало, проблем, подпис (in place of
// „Как помагаме“, copy/UNIQUE.md), пример, въпроси, край. Text comes word for word from the page file.
export function IndustryPage({
  eyebrow,
  title,
  lead,
  text,
  problems,
  signatureTitle,
  signature,
  example,
  faq,
  endTitle,
}: {
  eyebrow: string
  title: string
  lead: string
  text: string
  problems: string[]
  signatureTitle: string
  signature: React.ReactNode
  example: ChatLine[]
  faq?: FaqItem[]
  endTitle: string
}) {
  return (
    <>
      <ProductHero eyebrow={eyebrow} title={title} lead={lead} text={text} primary={CTA} />

      <Section title="Проблемът" deep>
        <Lines items={problems} />
      </Section>

      <Section title={signatureTitle}>
        <Reveal>{signature}</Reveal>
      </Section>

      <Section title="Пример (илюстрация)" deep>
        <ChatCard lines={example} />
      </Section>

      {faq && (
        <Section title="Въпроси" narrow>
          <FaqList items={faq} />
        </Section>
      )}

      <EndBlock title={endTitle} primary={CTA} />
    </>
  )
}
