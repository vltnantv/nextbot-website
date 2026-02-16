'use client'

import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'

const copy = {
  en: {
    tagline: 'AI infrastructure that generates revenue and automates operations.',
    cols: [
      {
        title: 'Products',
        links: [
          { name: 'Neo', href: '/neo' },
          { name: 'Aria', href: '/aria' },
          { name: 'Custom Solutions', href: '/book-demo' },
        ],
      },
      {
        title: 'Company',
        links: [
          { name: 'About', href: '/about' },
          { name: 'Contact', href: 'mailto:info@nextbot.me' },
          { name: 'Book a Call', href: '/book-demo' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { name: 'Documentation', href: '/documentation' },
          { name: 'API Reference', href: '/api-docs' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { name: 'Privacy Policy', href: '/legal' },
          { name: 'Terms of Service', href: '/legal?tab=terms' },
          { name: 'GDPR', href: '/legal?tab=gdpr' },
        ],
      },
    ],
    contact: { email: 'info@nextbot.me', phone: '+359 894 288 119' },
    copyright: '2026 Nextbot EOOD. All rights reserved.',
    reg: 'UIC: 207218192',
    vat: 'VAT: BG207218192',
    location: 'Sofia, Bulgaria',
    compliance: ['GDPR', 'SOC 2', 'ISO 27001'],
  },
  bg: {
    tagline: 'AI инфраструктура, която генерира приходи и автоматизира операции.',
    cols: [
      {
        title: 'Продукти',
        links: [
          { name: 'Neo', href: '/neo' },
          { name: 'Aria', href: '/aria' },
          { name: 'Персонализирани решения', href: '/book-demo' },
        ],
      },
      {
        title: 'Компания',
        links: [
          { name: 'За нас', href: '/about' },
          { name: 'Контакт', href: 'mailto:info@nextbot.me' },
          { name: 'Запази обаждане', href: '/book-demo' },
        ],
      },
      {
        title: 'Ресурси',
        links: [
          { name: 'Документация', href: '/documentation' },
          { name: 'API', href: '/api-docs' },
        ],
      },
      {
        title: 'Правна информация',
        links: [
          { name: 'Поверителност', href: '/legal' },
          { name: 'Условия', href: '/legal?tab=terms' },
          { name: 'GDPR', href: '/legal?tab=gdpr' },
        ],
      },
    ],
    contact: { email: 'info@nextbot.me', phone: '+359 894 288 119' },
    copyright: '2026 Nextbot EOOD. Всички права запазени.',
    reg: 'ЕИК: 207218192',
    vat: 'ДДС: BG207218192',
    location: 'София, България',
    compliance: ['GDPR', 'SOC 2', 'ISO 27001'],
  },
}

export function Footer() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <footer className="border-t border-white/[0.04] bg-[#09090b]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Main */}
        <div className="py-14 sm:py-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image src="/logo-icon.png" alt="NextBot" width={22} height={22} className="invert brightness-0" />
              <span className="text-[0.85rem] font-semibold text-white tracking-tight">NextBot</span>
            </Link>
            <p className="text-[0.8rem] text-zinc-600 leading-relaxed max-w-[240px] mb-5">{t.tagline}</p>
            <div className="space-y-1">
              <a href={`mailto:${t.contact.email}`} className="block text-[0.78rem] text-zinc-700 hover:text-zinc-400 transition-colors">{t.contact.email}</a>
              <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="block text-[0.78rem] text-zinc-700 hover:text-zinc-400 transition-colors">{t.contact.phone}</a>
            </div>
          </div>

          {/* Columns */}
          {t.cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.65rem] text-zinc-600 uppercase tracking-[0.15em] font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[0.78rem] text-zinc-700 hover:text-zinc-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.03] py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem] text-zinc-700">
            <span>{t.copyright}</span>
            <span>{t.reg}</span>
            <span>{t.vat}</span>
            <span>{t.location}</span>
          </div>
          <div className="flex items-center gap-4">
            {t.compliance.map((c) => (
              <span key={c} className="text-[0.62rem] text-zinc-800 font-medium uppercase tracking-wider">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
