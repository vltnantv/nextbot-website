'use client';

import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

export function ProductComparison() {
  const { lang } = useLanguage();

  const neo = PRODUCTS.neo;
  const aria = PRODUCTS.aria;

  const sectionTitle =
    lang === 'bg'
      ? 'Два начина за автоматизация'
      : 'Two ways to automate';

  const neoButtonText = lang === 'bg' ? 'Виж Neo' : 'See Neo';
  const ariaButtonText = lang === 'bg' ? 'Запиши се' : 'Join Waitlist';

  const liveBadge = lang === 'bg' ? 'На живо' : 'Live now';
  const comingSoonBadge = lang === 'bg' ? 'Скоро' : 'Coming Soon';

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NEO Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl border-2 border-blue-500 bg-white/5 backdrop-blur-sm p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{neo.icon}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-xs font-semibold text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                {liveBadge}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-1">{neo.name}</h3>
            <p className="text-sm text-blue-400 font-medium mb-3">
              {neo.tagline[lang]}
            </p>
            <p className="text-gray-400 text-sm mb-6 flex-grow">
              {neo.description[lang]}
            </p>

            <ul className="space-y-2 mb-8">
              {neo.channels.map(
                (channel: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {channel}
                  </li>
                )
              )}
            </ul>

            <Link
              href="/neo"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 px-6 text-sm"
            >
              {neoButtonText}
            </Link>
          </motion.div>

          {/* ARIA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl border-2 border-purple-500 bg-white/5 backdrop-blur-sm p-8 flex flex-col opacity-90"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{aria.icon}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-400">
                {comingSoonBadge}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-1">{aria.name}</h3>
            <p className="text-sm text-purple-400 font-medium mb-3">
              {aria.tagline[lang]}
            </p>
            <p className="text-gray-400 text-sm mb-6 flex-grow">
              {aria.description[lang]}
            </p>

            <ul className="space-y-2 mb-8">
              {aria.channels.map(
                (channel: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg
                      className="h-4 w-4 text-purple-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {channel}
                  </li>
                )
              )}
            </ul>

            <Link
              href="/aria"
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-white font-semibold py-3 px-6 text-sm"
            >
              {ariaButtonText}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
