'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const { lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  const footerData = translations[lang].footer as any

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribing(true)

    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubscribed(true)
    setEmail('')
    setSubscribing(false)

    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800/50">
      {/* Stats bar */}
      <div className="border-b border-gray-200 dark:border-gray-800/50 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <div className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-0.5">
                {footerData.stats.customers}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                {footerData.stats.customersLabel}
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-0.5">
                {footerData.stats.messages}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                {footerData.stats.messagesLabel}
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-0.5">
                {footerData.stats.uptime}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                {footerData.stats.uptimeLabel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
        {/* Top row: Logo + Contact + Social */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-5 pb-3 sm:pb-5 border-b border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="Nextbot" width={28} height={28} className="dark:invert dark:brightness-0" />
              <span className="text-base font-bold text-gray-900 dark:text-white">Nextbot</span>
            </Link>
            <div className="flex sm:hidden gap-1.5">
              {footerData.social.items.map((social: any) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                  title={social.followers || social.name}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <a href={`mailto:${footerData.contact.email}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {footerData.contact.email}
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <a href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {footerData.contact.phone}
            </a>
          </div>

          <div className="hidden sm:flex gap-1.5">
            {footerData.social.items.map((social: any) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                title={social.followers || social.name}
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Links row */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-4">

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
              {footerData.products.title}
            </h3>
            <ul className="space-y-1.5">
              {footerData.products.items.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
              {footerData.company.title}
            </h3>
            <ul className="space-y-1.5">
              {footerData.company.items.map((item: any) => (
                <li key={item.name}>
                  {item.disabled ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-400 dark:text-gray-600 cursor-default">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-px rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 text-[10px] font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
              {footerData.resources?.title || 'Resources'}
            </h3>
            <ul className="space-y-1.5">
              {footerData.resources?.items.map((item: any) => (
                <li key={item.name}>
                  {item.disabled ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-400 dark:text-gray-600 cursor-default">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-px rounded bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
              {footerData.legal.title}
            </h3>
            <ul className="space-y-1.5">
              {footerData.legal.items.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
              {footerData.certifications?.title}
            </h3>
            <div className="space-y-1.5">
              {footerData.certifications?.items.map((cert: any) => (
                <div key={cert.name} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-xs">{cert.icon}</span>
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 sm:gap-x-3 gap-y-0">
              <p>{footerData.copyright}</p>
              <p>{footerData.bulstat}</p>
              <p>{footerData.vat}</p>
            </div>
            <p className="flex items-center gap-1">
              {footerData.madeWith} <span className="text-red-500">❤️</span> {footerData.madeIn}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social icon component
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    )
  }

  return icons[name] || null
}
