'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Leadership',
    name: 'Valentin Antov',
    role: 'Founder & CEO',
    location: 'Sofia, Bulgaria',
    bio: 'I started NextBot after seeing the same pattern in every business I consulted: companies spending aggressively on lead generation, then losing the majority of those leads to slow, manual response processes. The problem was never marketing — it was operational infrastructure.',
    bio2: 'We build AI systems that solve this at the infrastructure level. Not chatbots that frustrate customers. Not tools that require constant attention. Systems that understand context, act intelligently, and drive measurable business outcomes.',
    linkedin: 'Connect on LinkedIn',
  },
  bg: {
    label: 'Ръководство',
    name: 'Валентин Антов',
    role: 'Основател & CEO',
    location: 'София, България',
    bio: 'Създадох NextBot след като видях един и същ модел във всеки бизнес: компании, които харчат агресивно за генериране на лийдове, а после губят повечето заради бавни, ръчни процеси за отговор. Проблемът никога не беше маркетинга — беше оперативната инфраструктура.',
    bio2: 'Ние изграждаме AI системи, които решават това на инфраструктурно ниво. Не чатботове, които дразнят клиентите. Системи, които разбират контекст, действат интелигентно и водят до измерими бизнес резултати.',
    linkedin: 'Свържете се в LinkedIn',
  },
}

export function FounderSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-12">{t.label}</p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 md:gap-16 items-start">
            {/* Photo */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-zinc-900 border border-white/[0.04] flex items-center justify-center shrink-0">
              <span className="text-2xl font-semibold text-zinc-700 tracking-tight">VA</span>
            </div>

            <div>
              <h3 className="text-[1.5rem] sm:text-[1.75rem] font-semibold text-white tracking-[-0.02em]">{t.name}</h3>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className="text-zinc-400">{t.role}</span>
                <span className="text-zinc-800">&middot;</span>
                <span className="text-zinc-600">{t.location}</span>
              </div>

              <div className="mt-8 space-y-4 max-w-xl">
                <p className="text-[0.95rem] text-zinc-400 leading-[1.7]">{t.bio}</p>
                <p className="text-[0.95rem] text-zinc-400 leading-[1.7]">{t.bio2}</p>
              </div>

              <a
                href="https://linkedin.com/in/valentinantov"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                {t.linkedin}
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
