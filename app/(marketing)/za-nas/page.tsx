import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Reveal } from '@/components/motion/Reveal'
import { Promises } from '@/components/signature/Promises'
import { Cards, EndBlock, ProductHero, Section } from '@/components/page/blocks'
import { COMPANY, telHref } from '@/lib/company'
import { CTA } from '@/lib/site-nav'
import { SETUP_DAYS } from '@/lib/prices'

// Text: copy/ceni-zanas-razgovor.md (/za-nas) - word for word; h1 and subtitle from copy/UNIQUE.md
// („Какво обещаваме и какво не“). No company yet: only email and phone (Valentin, 01.10.2026).
//
// „Кой стои зад NextBot“: only „Валентин, основател“ is shown (Valentin, 01.10.2026).
//   Still not shown: „София“, the car-sales experience and the former employer. Photo: only a real one.
// [ПОТВЪРДИ] „Фирмени данни“: наименование, ЕИК, адрес - not shown until there is a company.
//
// 25.10.2026 (REBUILD-PLAN.md §5.6): a software company with two lines - ready products and development to order.
//   „София“ is now shown on purpose (the plan and the footer say „Софтуерна компания от София“).

export const metadata: Metadata = pageMeta({ title: 'За нас | NextBot', description: 'NextBot е софтуерна компания от София: готови продукти за клиенти, продажби и запитвания и разработка по поръчка. На български, с човек за поддръжка.', path: '/za-nas' })

const link = 'text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink'

export default function AboutPage() {
  return (
    <>
      <ProductHero
        // (copy h1 was: Направено в България. Поддържано от човек.)
        title="Какво обещаваме. И какво не."
        lead="Предпочитаме да сме ясни от самото начало."
        text="NextBot е софтуерна компания от София. Правим готови продукти за клиенти, продажби и запитвания и разработваме софтуер по поръчка. Работим на български и сме на телефона, когато имате въпрос."
      />

      {/* Signature (copy/UNIQUE.md „Две колони“) */}
      <Section deep>
        <Promises />
      </Section>

      <Section title="Какво правим">
        <Cards
          cols={2}
          items={[
            {
              title: 'Готови продукти.',
              text: `CORE за клиенти и продажби, NEO асистент за запитвания, ECHO за напомняния и отзиви. С цени на сайта, стартират до ${SETUP_DAYS} дни.`,
            },
            {
              title: 'Разработка по поръчка.',
              text: 'Сайтове и онлайн магазини, вътрешни системи и мобилни приложения. Цената е след разговор, в писмено предложение.',
            },
          ]}
        />
      </Section>

      <Section title="Кой стои зад NextBot" deep>
        <Reveal>
          <p className="m-0 font-display text-[24px] font-semibold tracking-[-0.02em]">Валентин, основател</p>
        </Reveal>
      </Section>

      <Section title="Как мислим">
        <Cards
          items={[
            { title: 'Просто.', text: 'Без технически думи, без сложни програми.' },
            { title: 'Честно.', text: 'Обещаваме само каквото работи. Каквото не е готово, го пишем „скоро“.' },
            { title: 'На български.', text: 'Сайт, система, поддръжка и договор.' },
          ]}
        />
      </Section>

      <Section title="Контакти" deep>
        <Reveal className="flex flex-col gap-3 text-[20px]">
          <a href={`mailto:${COMPANY.email}`} className={`${link} self-start`}>
            {COMPANY.email}
          </a>
          <a href={telHref(COMPANY.phone)} className={`${link} self-start`}>
            {COMPANY.phone}
          </a>
        </Reveal>
      </Section>

      <EndBlock title="Нека се запознаем на 15 минути." primary={CTA} />
    </>
  )
}
