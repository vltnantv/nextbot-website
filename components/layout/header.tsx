'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { LanguageToggle } from '@/components/LanguageToggle'

export function Header() {
  const { lang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const navigation = {
    products: {
      label: lang === 'bg' ? 'Продукти' : 'Products',
      items: [
        {
          name: 'Neo',
          href: '/neo',
          description: lang === 'bg' ? 'AI асистент за твоя бизнес' : 'AI assistant for your business',
          badge: lang === 'bg' ? 'Ново' : 'New',
          available: true
        },
        {
          name: 'Aria',
          href: '#',
          description: null, // Remove description
          badge: lang === 'bg' ? 'Очаквайте' : 'Coming Soon',
          available: false
        },
        {
          name: 'Nova',
          href: '#',
          description: null, // Remove description
          badge: lang === 'bg' ? 'Очаквайте' : 'Coming Soon',
          available: false
        }
      ]
    },
    main: [
      // Remove "Neo" from here - only in Products submenu
      {
        name: lang === 'bg' ? 'Демо' : 'Demo',
        href: '/demo'
      },
      {
        name: lang === 'bg' ? 'За нас' : 'About',
        href: '/about'
      }
    ]
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-black dark:text-white z-50"
          onClick={() => setMenuOpen(false)}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
          </svg>
          <span className="font-semibold text-lg sm:text-xl">Nextbot</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Products dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">
              {navigation.products.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-2 min-w-[280px]">
                {navigation.products.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.available ? item.href : '#'}
                    className={`block px-4 py-3 rounded-xl transition-colors ${
                      item.available
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-900'
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={(e) => !item.available && e.preventDefault()}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-black dark:text-white">
                        {item.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.available
                          ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Other nav items */}
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center -mr-2 z-50"
            aria-label="Menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`} />
              <span className={`w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white dark:bg-black pt-14 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Products section */}
            <div className="mb-8">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between w-full text-lg font-semibold text-black dark:text-white mb-4"
              >
                {navigation.products.label}
                <svg
                  className={`w-5 h-5 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsOpen && (
                <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-800">
                  {navigation.products.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.available ? item.href : '#'}
                      onClick={(e) => {
                        if (!item.available) {
                          e.preventDefault()
                        } else {
                          setMenuOpen(false)
                        }
                      }}
                      className={`block py-3 ${
                        item.available ? '' : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-black dark:text-white">
                          {item.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.available
                            ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      {/* Only show description for available products */}
                      {item.description && item.available && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Main navigation items */}
            <div className="space-y-1 border-t border-gray-200 dark:border-gray-800 pt-8">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-lg font-semibold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
