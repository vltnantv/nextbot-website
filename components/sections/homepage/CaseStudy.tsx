'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Case Studies',
    dental: {
      badge: 'Coming Soon',
      industry: 'Dental Clinics',
      headline: 'Dental practice pilot launching soon.',
      note: "We're onboarding our first dental clinic partners. Results will be published here.",
    },
  },
  bg: {
    label: 'Казуси',
    dental: {
      badge: 'Coming Soon',
      industry: 'Дентални клиники',
      headline: 'Пилотна програма за дентални практики стартира скоро.',
      note: 'Набираме първите ни партньори дентални клиники. Резултатите ще бъдат публикувани тук.',
    },
  },
}

export function CaseStudy() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-nb-border">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-nb-text-muted uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
        </AnimateIn>

        {/* Dental case study placeholder */}
        <AnimateIn delay={100}>
          <div className="p-8 sm:p-10 rounded-2xl border border-nb-border relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm text-nb-text-secondary font-medium">{t.dental.industry}</span>
              <span className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-nb-text-muted/10 text-nb-text-muted">
                {t.dental.badge}
              </span>
            </div>
            <h3 className="text-[1.15rem] sm:text-[1.35rem] font-medium text-nb-navy mb-6 max-w-2xl leading-[1.4]">
              {t.dental.headline}
            </h3>
            <p className="text-sm text-nb-text-muted">{t.dental.note}</p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
