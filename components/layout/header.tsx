'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LanguageToggle } from '@/components/LanguageToggle'

const nav = {
  en: {
    products: 'Products',
    process: 'Process',
    results: 'Results',
    about: 'About',
    cta: 'Book a Call',
    neo: { name: 'Neo', desc: 'AI sales & support automation', badge: 'Live' },
    aria: { name: 'Aria', desc: 'Voice AI for inbound calls', badge: 'Coming Soon' },
  },
  bg: {
    products: 'Продукти',
    process: 'Процес',
    results: 'Резултати',
    about: 'За нас',
    cta: 'Запази обаждане',
    neo: { name: 'Neo', desc: 'AI за продажби и поддръжка', badge: 'Live' },
    aria: { name: 'Aria', desc: 'Гласов AI за входящи обаждания', badge: 'Скоро' },
  },
}

export function Header() {
  const { lang } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const t = nav[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setProductsOpen(false)
  }, [pathname])

  const openProducts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setProductsOpen(true)
  }
  const closeProducts = () => {
    timeoutRef.current = setTimeout(() => setProductsOpen(false), 150)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1100px] mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-50" onClick={() => setMenuOpen(false)}>
            <Image src="/logo-icon.png" alt="NextBot" width={26} height={26} className="invert brightness-0" />
            <span className="text-[0.95rem] font-semibold text-white tracking-tight">NextBot</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            <div className="relative" onMouseEnter={openProducts} onMouseLeave={closeProducts}>
              <button className="text-[0.8rem] text-zinc-500 hover:text-zinc-300 transition-colors font-medium flex items-center gap-1">
                {t.products}
                <svg className={`w-3 h-3 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${productsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-1.5 min-w-[260px] shadow-2xl shadow-black/40">
                  <Link href="/neo" className="flex flex-col px-3.5 py-3 rounded-lg hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.8rem] font-medium text-white">{t.neo.name}</span>
                      <span className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400/80">{t.neo.badge}</span>
                    </div>
                    <span className="text-[0.7rem] text-zinc-600 mt-0.5">{t.neo.desc}</span>
                  </Link>
                  <Link href="/aria" className="flex flex-col px-3.5 py-3 rounded-lg hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.8rem] font-medium text-white">{t.aria.name}</span>
                      <span className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.15)]">{t.aria.badge}</span>
                    </div>
                    <span className="text-[0.7rem] text-zinc-600 mt-0.5">{t.aria.desc}</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/#how-it-works" className="text-[0.8rem] text-zinc-500 hover:text-zinc-300 transition-colors font-medium">{t.process}</Link>
            <Link href="/about" className="text-[0.8rem] text-zinc-500 hover:text-zinc-300 transition-colors font-medium">{t.about}</Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 relative z-50">
            <LanguageToggle />
            <Link
              href="/book-demo"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-white text-zinc-950 text-[0.78rem] font-medium rounded-md hover:bg-zinc-200 transition-colors"
            >
              {t.cta}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center" aria-label="Menu">
              <div className="relative w-4 h-4 flex items-center justify-center">
                <span className={`absolute block h-px w-full bg-white transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
                <span className={`absolute block h-px w-full bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`absolute block h-px w-full bg-white transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#09090b] z-40 lg:hidden pt-[60px]">
          <nav className="px-5 py-10 space-y-0">
            <Link href="/neo" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-5 border-b border-white/[0.04]">
              <span className="text-xl font-medium text-white">Neo</span>
              <span className="text-xs text-emerald-400/80">{t.neo.badge}</span>
            </Link>
            <Link href="/aria" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-5 border-b border-white/[0.04]">
              <span className="text-xl font-medium text-white">Aria</span>
              <span className="text-xs text-amber-400/80">{t.aria.badge}</span>
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-5 text-xl font-medium text-white border-b border-white/[0.04]">{t.about}</Link>
            <div className="pt-8">
              <Link href="/book-demo" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-4 bg-white text-zinc-950 font-medium rounded-lg">{t.cta}</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
