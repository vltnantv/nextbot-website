'use client'

import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import Link from 'next/link'

export function AppleHero() {
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 pb-32">
        <h1 className="mb-6 select-none">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-semibold leading-[1.05] tracking-tight text-white">
            {t(lang, 'hero.headline1')}
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-semibold leading-[1.05] tracking-tight text-white mt-1">
            {t(lang, 'hero.headline2')}
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[1.05] tracking-tight mt-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient-x">
              {t(lang, 'hero.headline3')}
            </span>
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto font-medium">
          {lang === 'bg'
            ? 'Nextbot Neo отговаря на клиентите ти 24/7. Навсякъде. На всеки език.'
            : 'Nextbot Neo answers your customers 24/7. Everywhere. In any language.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/neo"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t(lang, 'hero.cta')}
          </Link>
          <Link
            href="/neo"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full text-blue-400 hover:underline decoration-2 underline-offset-4"
          >
            {t(lang, 'hero.learnMore')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            {lang === 'bg' ? 'Скролни' : 'Scroll'}
          </span>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </section>
  )
}
