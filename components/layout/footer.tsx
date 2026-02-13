'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import Link from 'next/link'

// Social SVG icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  const { lang } = useLanguage()
  const f = translations[lang].footer
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative z-10 bg-[#0a0a0a]">
      {/* Main footer */}
      <div className="max-w-[980px] mx-auto px-6">
        {/* Navigation grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-b border-black/[0.08] dark:border-white/[0.08]">
          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {f.products.title}
            </h3>
            <ul className="space-y-2">
              {f.products.items.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {f.company.title}
            </h3>
            <ul className="space-y-2">
              {f.company.items.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {f.legal.title}
            </h3>
            <ul className="space-y-2">
              {f.legal.items.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {f.contact.title}
            </h3>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li>
                <a href={`mailto:${f.contact.email}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  {f.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${f.contact.phone.replace(/\s/g, '')}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  {f.contact.phone}
                </a>
              </li>
              <li>{f.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Newsletter + Social row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-b border-black/[0.08] dark:border-white/[0.08]">
          {/* Newsletter */}
          <div className="flex-1 max-w-sm">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {f.newsletter.title}
            </h3>
            {subscribed ? (
              <p className="text-xs text-blue-600">
                {lang === 'bg' ? 'Благодарим!' : 'Thank you!'}
              </p>
            ) : (
              <>
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={f.newsletter.placeholder}
                    className="h-8 flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="h-8 px-4 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {f.newsletter.button}
                  </button>
                </form>
                <p className="text-[11px] text-gray-400 mt-1.5">{f.newsletter.note}</p>
              </>
            )}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href={f.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href={f.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href={f.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 py-5">
          <p className="text-[11px] text-gray-400">{f.copyright}</p>
          <p className="text-[11px] text-gray-400">
            {f.madeWith}{' '}
            <span className="text-red-500">&#10084;</span>{' '}
            {f.madeIn}
          </p>
        </div>
      </div>
    </footer>
  )
}
