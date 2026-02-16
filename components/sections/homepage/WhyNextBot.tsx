'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Why NextBot',
    headline: 'Built to be your AI infrastructure partner — not another vendor.',
    differentiators: [
      {
        title: 'Revenue-First Engineering',
        desc: 'Every system we build is measured by business impact. We optimize for closed deals and pipeline velocity — not chat sessions or ticket deflection.',
      },
      {
        title: 'Full Implementation',
        desc: 'We don\'t hand you a tool and walk away. We build, deploy, monitor, and continuously optimize your AI systems as an extension of your team.',
      },
      {
        title: 'Industry-Specific Intelligence',
        desc: 'Our AI models are informed by industry-specific data. Solar, home services, B2B — each system understands your market and speaks your customer\'s language.',
      },
      {
        title: 'Enterprise-Grade Security',
        desc: 'GDPR compliant. SOC 2 certified. All data processing within the EU. Built with the same security standards trusted by financial institutions.',
      },
      {
        title: 'Measurable ROI in 30 Days',
        desc: 'We set clear performance benchmarks before deployment. If your metrics don\'t improve within the first 30 days, you don\'t pay.',
      },
      {
        title: 'Zero Disruption Integration',
        desc: 'Works with your existing CRM, calendar, email, and phone systems. No platform migration. No workflow changes. Just added intelligence.',
      },
    ],
  },
  bg: {
    label: 'Защо NextBot',
    headline: 'Създаден да бъде вашият AI инфраструктурен партньор — не поредният доставчик.',
    differentiators: [
      {
        title: 'Инженеринг, фокусиран върху приходите',
        desc: 'Всяка система се измерва по бизнес въздействие. Оптимизираме за затворени сделки и скорост на pipeline — не чат сесии.',
      },
      {
        title: 'Пълно внедряване',
        desc: 'Не ви даваме инструмент и си тръгваме. Изграждаме, внедряваме, наблюдаваме и непрекъснато оптимизираме AI системите ви като разширение на екипа ви.',
      },
      {
        title: 'Индустриално-специфичен интелект',
        desc: 'AI моделите ни са информирани от индустриални данни. Соларна енергия, домашни услуги, B2B — всяка система разбира вашия пазар.',
      },
      {
        title: 'Сигурност на корпоративно ниво',
        desc: 'GDPR съответствие. SOC 2 сертификат. Цялата обработка на данни в ЕС. Изградено със стандарти, на които се доверяват финансови институции.',
      },
      {
        title: 'Измерим ROI за 30 дни',
        desc: 'Задаваме ясни бенчмаркове преди внедряване. Ако метриките ви не се подобрят за 30 дни, не плащате.',
      },
      {
        title: 'Интеграция без прекъсване',
        desc: 'Работи с наличните ви CRM, календар, имейл и телефонни системи. Без миграция. Без промяна на процеси. Просто добавена интелигентност.',
      },
    ],
  },
}

export function WhyNextBot() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white text-balance">
              {t.headline}
            </h2>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.differentiators.map((d, i) => (
            <AnimateIn key={i} delay={i * 60}>
              <div className="bg-[#09090b] p-8 h-full">
                <h3 className="text-[1rem] font-medium text-white mb-3">{d.title}</h3>
                <p className="text-sm text-zinc-600 leading-[1.7]">{d.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
