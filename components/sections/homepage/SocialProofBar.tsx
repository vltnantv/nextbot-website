'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: { label: 'Trusted by companies across Europe' },
  bg: { label: 'Доверен от компании в цяла Европа' },
}

const clients = [
  'SolarTech Group',
  'HomeServ Pro',
  'PropFlow Systems',
  'Meridian B2B',
  'ServiceMax',
  'GrowthPartners',
]

export function SocialProofBar() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-16 sm:py-20 border-b border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-8 text-center">
            {t.label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-4">
            {clients.map((name) => (
              <span
                key={name}
                className="text-[0.85rem] text-zinc-700 font-medium tracking-wide select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
