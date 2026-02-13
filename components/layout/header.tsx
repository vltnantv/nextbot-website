'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { LanguageToggle } from '@/components/LanguageToggle'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <span className="font-semibold text-lg">Nextbot</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/neo" className="text-sm text-gray-300 hover:text-white transition">
              {t(lang, 'nav.neo')}
            </Link>
            <Link href="/about" className="text-sm text-gray-300 hover:text-white transition">
              {t(lang, 'nav.about')}
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <LanguageToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-5 h-5 flex items-center justify-center text-white"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black transition-transform duration-300 ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: '48px' }}
      >
        <nav className="h-full overflow-y-auto">
          <ul className="px-6 py-4">
            <li>
              <Link
                href="/neo"
                className="block py-4 text-2xl font-semibold text-white border-b border-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                {t(lang, 'nav.neo')}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-4 text-2xl font-semibold text-white border-b border-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                {t(lang, 'nav.about')}
              </Link>
            </li>

            {/* Product Categories */}
            <li className="mt-8">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                {t(lang, 'productMenu.title')}
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/neo" className="block py-3" onClick={() => setMenuOpen(false)}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{t(lang, 'productMenu.neo.name')}</span>
                      <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                        {t(lang, 'common.new')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t(lang, 'productMenu.neo.tagline')}</p>
                  </Link>
                </li>
                <li>
                  <div className="block py-3 opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{t(lang, 'productMenu.aria.name')}</span>
                      <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
                        {t(lang, 'common.comingSoon')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t(lang, 'productMenu.aria.tagline')}</p>
                  </div>
                </li>
                <li>
                  <div className="block py-3 opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{t(lang, 'productMenu.nova.name')}</span>
                      <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
                        {t(lang, 'common.comingSoon')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t(lang, 'productMenu.nova.tagline')}</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
