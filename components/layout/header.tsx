'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LanguageToggle } from '@/components/LanguageToggle'

export function Header() {
  const { lang } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setProductsOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current)
    setProductsOpen(true)
  }

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => setProductsOpen(false), 200)
  }

  const simpleNavItems = [
    { name: lang === 'bg' ? 'Демо' : 'Demo', href: '/demo' },
    { name: lang === 'bg' ? 'За нас' : 'About', href: '/about' }
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-black dark:text-white relative z-50"
            onClick={() => setMenuOpen(false)}
          >
            <Image src="/logo-icon.png" alt="Nextbot" width={48} height={48} className="dark:invert dark:brightness-0" />
            <span className="font-semibold text-xl">Nextbot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                {t.productMenu.title}
                <svg className={`w-3.5 h-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[260px]">
                    {/* Neo */}
                    <Link
                      href="/neo"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{t.productMenu.neo.name}</span>
                          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                            {t.productMenu.neo.new}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.productMenu.neo.tagline}</p>
                      </div>
                    </Link>

                    {/* Aria */}
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg opacity-60 cursor-default">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{t.productMenu.aria.name}</span>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            {t.productMenu.aria.comingSoon}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.productMenu.aria.tagline}</p>
                      </div>
                    </div>

                    {/* Nova */}
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg opacity-60 cursor-default">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{t.productMenu.nova.name}</span>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            {t.productMenu.nova.comingSoon}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.productMenu.nova.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {simpleNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 relative z-50">
            <LanguageToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-black dark:bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 w-full bg-black dark:bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-black dark:bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - outside header for proper z-index layering */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 lg:hidden pt-20">
          <nav className="px-6 py-8">
            {/* Products with expandable sub-menu */}
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between py-4 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              {t.productMenu.title}
              <svg className={`w-5 h-5 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 pb-2 space-y-4">
                <Link
                  href="/neo"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{t.productMenu.neo.name}</span>
                    <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                      {t.productMenu.neo.new}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t.productMenu.neo.tagline}</p>
                </Link>
                <div className="py-2 opacity-50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{t.productMenu.aria.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      {t.productMenu.aria.comingSoon}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t.productMenu.aria.tagline}</p>
                </div>
                <div className="py-2 opacity-50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{t.productMenu.nova.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      {t.productMenu.nova.comingSoon}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t.productMenu.nova.tagline}</p>
                </div>
              </div>
            )}

            {simpleNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
