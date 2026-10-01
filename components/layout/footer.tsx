'use client'

import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'
import { Logo } from "@/components/brand/Logo";

const copy = {
  en: {
    tagline: 'AI products that replace repetitive work.',
    links: [
      { name: 'NEO', href: '/neo' },
      { name: 'About', href: '/about' },
      { name: 'Book a Call', href: '/book-demo' },
      { name: 'Privacy Policy', href: '/legal' },
      { name: 'Terms', href: '/legal?tab=terms' },
    ],
    contact: { email: 'info@nextbot.me', phone: '+359 894 288 119' },
    copyright: '2026 Nextbot EOOD. All rights reserved.',
    reg: 'UIC: 207218192',
    vat: 'VAT: BG207218192',
    location: 'Sofia, Bulgaria',
    compliance: ['GDPR Ready'],
  },
  bg: {
    tagline: 'AI продукти, които заместват повтарящата се работа.',
    links: [
      { name: 'NEO', href: '/neo' },
      { name: 'За нас', href: '/about' },
      { name: 'Запази обаждане', href: '/book-demo' },
      { name: 'Поверителност', href: '/legal' },
      { name: 'Условия', href: '/legal?tab=terms' },
    ],
    contact: { email: 'info@nextbot.me', phone: '+359 894 288 119' },
    copyright: '2026 Nextbot EOOD. Всички права запазени.',
    reg: 'ЕИК: 207218192',
    vat: 'ДДС: BG207218192',
    location: 'София, България',
    compliance: ['GDPR Ready'],
  },
}

export function Footer() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <footer className="border-t border-nb-border bg-nb-bg">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Main */}
        <div className="py-14 sm:py-20 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="nextbot — начало">
              <Logo className="text-white" size={18} />
            </Link>
            <p className="text-[0.8rem] text-nb-text-secondary leading-relaxed max-w-[280px] mb-5">{t.tagline}</p>
            <div className="space-y-1">
              <a href={`mailto:${t.contact.email}`} className="block text-[0.78rem] text-nb-text-muted hover:text-nb-accent transition-colors">{t.contact.email}</a>
              <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="block text-[0.78rem] text-nb-text-muted hover:text-nb-accent transition-colors">{t.contact.phone}</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <ul className="space-y-2.5">
              {t.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[0.78rem] text-nb-text-muted hover:text-nb-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-nb-border py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem] text-nb-text-muted">
            <span>{t.copyright}</span>
            <span>{t.reg}</span>
            <span>{t.vat}</span>
            <span>{t.location}</span>
          </div>
          <div className="flex items-center gap-4">
            {t.compliance.map((c) => (
              <span key={c} className="text-[0.62rem] text-nb-text-muted font-medium uppercase tracking-wider">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
