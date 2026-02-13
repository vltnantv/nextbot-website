'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { t, translations } from '@/lib/translations'
import { motion, AnimatePresence } from 'framer-motion'

export function PricingCalculator() {
  const { lang } = useLanguage()
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [isAnnual, setIsAnnual] = useState(false)

  const basePrice = 120
  const addonsData = translations[lang].pricing.addons.categories

  // Define mutually exclusive groups
  const exclusiveGroups: Record<string, string[]> = {
    languages: ['lang_de', 'lang_ru', 'lang_fr', 'lang_all'],
    volume: ['conv1000', 'conv2500', 'unlimited'],
  }

  // Smart toggle with mutual exclusivity
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId)
      }

      let newSelection = [...prev, addonId]

      // Remove other items from the same exclusive group
      Object.values(exclusiveGroups).forEach((group) => {
        if (group.includes(addonId)) {
          newSelection = newSelection.filter(
            (id) => id === addonId || !group.includes(id)
          )
        }
      })

      return newSelection
    })
  }

  // Check if an addon should be disabled
  const isAddonDisabled = (addonId: string): boolean => {
    if (
      selectedAddons.includes('lang_all') &&
      ['lang_de', 'lang_ru', 'lang_fr'].includes(addonId)
    ) {
      return true
    }
    if (
      selectedAddons.includes('unlimited') &&
      ['conv1000', 'conv2500'].includes(addonId)
    ) {
      return true
    }
    return false
  }

  // Calculate total
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    for (const category of addonsData) {
      const addon = (category.items as any[]).find(
        (item: any) => item.id === addonId
      )
      if (addon) return sum + addon.price
    }
    return sum
  }, 0)

  const monthlyTotal = basePrice + addonsTotal
  const annualTotal = monthlyTotal * 10
  const savings = monthlyTotal * 2

  return (
    <section
      id="calculator"
      className="py-32 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            {t(lang, 'pricing.calculator.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t(lang, 'pricing.calculator.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Addon selection (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {addonsData.map((category: any, catIndex: number) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {category.name}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {category.items.map((addon: any) => {
                    const isSelected = selectedAddons.includes(addon.id)
                    const disabled = isAddonDisabled(addon.id)

                    return (
                      <motion.button
                        key={addon.id}
                        onClick={() => !disabled && toggleAddon(addon.id)}
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                        disabled={disabled}
                        className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                          disabled
                            ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900'
                            : isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        {/* Checkbox */}
                        <div
                          className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Popular badge */}
                        {addon.popular && !disabled && (
                          <span className="absolute top-4 left-4 px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                            {lang === 'bg' ? 'Популярно' : 'Popular'}
                          </span>
                        )}

                        {/* Disabled label */}
                        {disabled && (
                          <span className="absolute top-4 left-4 px-2 py-1 rounded-full bg-gray-400 dark:bg-gray-600 text-white text-xs font-semibold">
                            {lang === 'bg'
                              ? 'Включено в друга опция'
                              : 'Included in other option'}
                          </span>
                        )}

                        {/* Content */}
                        <div className="pr-8">
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            {addon.name}
                          </div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            +€{addon.price}
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                              {lang === 'bg' ? '/м' : '/mo'}
                            </span>
                          </div>
                          {addon.note && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {addon.note}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Price summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-100 rounded-3xl p-8 text-white dark:text-black shadow-2xl"
              >
                <h3 className="text-xl font-bold mb-6">
                  {lang === 'bg' ? 'Твоята цена' : 'Your price'}
                </h3>

                {/* Base */}
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10 dark:border-black/10">
                  <span className="text-sm opacity-70">Neo Base</span>
                  <span className="font-semibold">€{basePrice}</span>
                </div>

                {/* Selected addons */}
                <AnimatePresence>
                  {selectedAddons.map((addonId) => {
                    let addonInfo: any = null
                    for (const cat of addonsData) {
                      const found = (cat.items as any[]).find(
                        (item: any) => item.id === addonId
                      )
                      if (found) {
                        addonInfo = found
                        break
                      }
                    }
                    if (!addonInfo) return null

                    return (
                      <motion.div
                        key={addonId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between items-center mb-3 pb-3 border-b border-white/10 dark:border-black/10"
                      >
                        <span className="text-sm opacity-70">
                          {addonInfo.name}
                        </span>
                        <span className="font-semibold">
                          +€{addonInfo.price}
                        </span>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-white/20 dark:border-black/20">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm opacity-70">
                      {lang === 'bg' ? 'Месечно' : 'Monthly'}
                    </span>
                    <motion.span
                      key={monthlyTotal}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold"
                    >
                      €{monthlyTotal}
                    </motion.span>
                  </div>
                </div>

                {/* Annual toggle */}
                <div className="mt-6 p-4 rounded-xl bg-white/10 dark:bg-black/10">
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-6 rounded-full transition-all ${
                          isAnnual ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full m-0.5"
                          animate={{ x: isAnnual ? 24 : 0 }}
                        />
                      </div>
                      <span className="text-sm">
                        {lang === 'bg' ? 'Годишно' : 'Annual'}
                      </span>
                    </div>
                    {isAnnual && (
                      <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                        {lang === 'bg' ? 'Спести' : 'Save'} €{savings}
                      </span>
                    )}
                  </button>

                  {isAnnual && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-white/10 dark:border-black/10 text-center"
                    >
                      <div className="text-2xl font-bold">€{annualTotal}</div>
                      <div className="text-xs opacity-70">
                        {lang === 'bg'
                          ? '/година (2 месеца безплатни)'
                          : '/year (2 months free)'}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* CTA */}
                <button className="w-full mt-6 px-6 py-4 rounded-full bg-white dark:bg-black text-black dark:text-white font-semibold hover:scale-105 transition-transform shadow-lg">
                  {t(lang, 'pricing.calculator.cta')}
                </button>

                <p className="text-xs opacity-60 text-center mt-4">
                  {lang === 'bg'
                    ? '30 дни безплатно • Без кредитна карта'
                    : '30 days free • No credit card'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
