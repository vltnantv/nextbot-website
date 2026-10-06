import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Reveal } from '@/components/motion/Reveal'
import { TaskPicker } from '@/components/signature/TaskPicker'
import { StudioFlow } from '@/components/visuals/StudioFlow'
import { Cards, EndBlock, FaqList, Lines, ProductHero, Section } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'
import { STUDIO_FROM, eur } from '@/lib/prices'

// Text: copy/aria-studio.md (/studio) - word for word; h1 and subtitle from copy/UNIQUE.md
// („Какво ви отнема време?“). The price comes from lib/prices.ts.

export const metadata: Metadata = pageMeta({ title: 'STUDIO — автоматизации и програми по поръчка | NextBot', description: `Имате нещо специфично? Свързваме програми, автоматизираме рутинна работа и правим софтуер по нужда. От ${eur(STUDIO_FROM)} на проект.`, path: '/studio' })

export default function StudioPage() {
  return (
    <>
      <ProductHero
        eyebrow="STUDIO · По поръчка"
        // (copy/aria-studio.md h1 was: Имате нещо специфично? Ще го направим.)
        title="Какво ви отнема най-много време?"
        lead="Кажете ни. Ще го направим по-кратко."
        text="Когато готовите продукти не ви стигат, правим автоматизации, връзки между програмите ви и малък софтуер точно по ваша нужда."
        primary={CTA}
        secondary={{ label: 'Вижте примери', href: '#primeri' }}
      />

      <Section title="С какво помагаме" deep>
        <Cards
          items={[
            { title: 'Връзки между програми.', text: 'Данните стигат от една система в друга без ръчно преписване.' },
            { title: 'Автоматизация на рутина.', text: 'Оферти, потвърждения, отчети и напомняния се изпращат сами.' },
            { title: 'Малки програми по нужда.', text: 'Вътрешен инструмент, табло, форма или калкулатор, направени за вашия процес.' },
          ]}
        />
      </Section>

      <Section id="primeri" title="Примери">
        {/* „като типове задачи, не като клиенти“ */}
        <Lines
          items={[
            'Запитване от сайта влиза направо в таблицата на екипа.',
            'Всеки петък шефът получава отчет по имейл без да го пише никой.',
            'Калкулатор за оферта, който клиентът попълва сам.',
          ]}
        />
        {/* copy/VISUALS.md: an example automation as a scheme */}
        <Reveal className="mt-4 flex flex-col gap-2">
          <span className="text-[14px] text-stone">Примерна автоматизация.</span>
          <StudioFlow />
        </Reveal>
      </Section>

      {/* Signature (copy/UNIQUE.md „Избор на задача“) in place of the shared „Как работим“ block
          (copy/aria-studio.md, 4 steps: Разговор / Предложение / Изработка / Предаване). */}
      <Section title="Какво ви отнема време?" deep>
        <Reveal>
          <TaskPicker />
        </Reveal>
      </Section>

      <Section title="Цена">
        <Reveal>
          <p className="m-0 max-w-[640px] text-[19px]">
            <span className="font-display text-[28px] font-semibold tracking-[-0.02em]">От {eur(STUDIO_FROM)} на проект.</span>{' '}
            Точната цена зависи от задачата и я знаете преди да започнем.
          </p>
        </Reveal>
      </Section>

      <Section title="Въпроси" deep narrow>
        <FaqList
          items={[
            { q: 'Колко време отнема?', a: 'Малките задачи — от няколко дни, по-големите — седмици. Казваме срока в предложението.' },
            { q: 'Кой притежава програмата?', a: 'Вие. Уточняваме го в договора.' },
            { q: 'Какво става, ако нещо спре?', a: 'Предлагаме поддръжка след предаването, по договаряне.' },
          ]}
        />
      </Section>

      <EndBlock title="Разкажете ни какво ви отнема време." primary={CTA} />
    </>
  )
}
