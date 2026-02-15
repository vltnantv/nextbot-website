'use client'

import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import Link from 'next/link'

export function AppleHero() {
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-20 sm:pt-24 pb-16 sm:pb-32">
        {/* Headline - responsive sizes */}
        <h1 className="mb-4 sm:mb-6 select-none">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.1] sm:leading-[1.05] tracking-tight text-white px-2">
            {t(lang, 'hero.headline1')}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.1] sm:leading-[1.05] tracking-tight text-white mt-1 sm:mt-2 px-2">
            {t(lang, 'hero.headline2')}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight mt-1 sm:mt-2 px-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient-x">
              {t(lang, 'hero.headline3')}
            </span>
          </span>
        </h1>

        {/* Subheadline - mobile optimized */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto font-medium px-4">
          {lang === 'bg'
            ? 'Nextbot Neo отговаря на клиентите ти 24/7. Навсякъде. На всеки език.'
            : 'Nextbot Neo answers your customers 24/7. Everywhere. In any language.'}
        </p>

        {/* CTAs - mobile stack */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <Link
            href="/neo"
            scroll={true}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
          >
            {t(lang, 'hero.cta')}
          </Link>
          <Link
            href="/learn-more"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-base font-semibold rounded-full text-blue-400 hover:underline decoration-2 underline-offset-4"
          >
            {t(lang, 'hero.learnMore')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator - hide on small mobile */}
      <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
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
