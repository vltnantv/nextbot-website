'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  INDUSTRIES,
  CHANNELS,
  MODULES,
  VOLUME_TIERS,
  VOICE_TIERS,
  calculateTotal,
  type PlatformConfig,
  type Industry,
  type Channel,
  type Module,
} from '@/lib/pricingEngine'

const STEP_COUNT = 5

const STEP_META = [
  { icon: '🏢', bg: 'Индустрия', en: 'Industry', descBg: 'Изберете вашата индустрия за оптимални настройки', descEn: 'Select your industry for optimal presets' },
  { icon: '📱', bg: 'Канали', en: 'Channels', descBg: 'Къде да комуникира Neo с клиентите ви?', descEn: 'Where should Neo communicate with your customers?' },
  { icon: '🧩', bg: 'Модули', en: 'Modules', descBg: 'Кои функционалности ви трябват?', descEn: 'Which capabilities do you need?' },
  { icon: '📊', bg: 'Обем', en: 'Volume', descBg: 'Настройте обем и мащаб', descEn: 'Configure volume and scale' },
  { icon: '✅', bg: 'Преглед', en: 'Review', descBg: 'Вашата конфигурация', descEn: 'Your configuration summary' },
]

export function PricingCalculator() {
  const { lang } = useLanguage()
  const l = useCallback((bg: string, en: string) => (lang === 'bg' ? bg : en), [lang])

  const [currentStep, setCurrentStep] = useState(0)
  const [swipeDir, setSwipeDir] = useState(1) // 1 = forward, -1 = back
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['website_chat'])
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [conversationTier, setConversationTier] = useState('vol_500')
  const [voiceTier, setVoiceTier] = useState('voice_0')
  const [locations, setLocations] = useState(1)
  const [operators, setOperators] = useState(1)

  // Restore saved config on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('neo-config')
      if (saved) {
        const c = JSON.parse(saved)
        if (c.industry) setSelectedIndustry(c.industry)
        if (c.channels) setSelectedChannels(c.channels)
        if (c.modules) setSelectedModules(c.modules)
        if (c.conversationTier) setConversationTier(c.conversationTier)
        if (c.voiceTier) setVoiceTier(c.voiceTier)
        if (c.locations) setLocations(c.locations)
        if (c.operators) setOperators(c.operators)
        setCurrentStep(4)
        sessionStorage.removeItem('neo-config')
        setTimeout(() => {
          document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } catch {}
  }, [])

  // Save config before navigating to /book-demo
  const saveConfig = useCallback(() => {
    sessionStorage.setItem('neo-config', JSON.stringify({
      industry: selectedIndustry,
      channels: selectedChannels,
      modules: selectedModules,
      conversationTier,
      voiceTier,
      locations,
      operators,
    }))
  }, [selectedIndustry, selectedChannels, selectedModules, conversationTier, voiceTier, locations, operators])

  const config: PlatformConfig = useMemo(
    () => ({
      industry: selectedIndustry,
      channels: selectedChannels,
      modules: selectedModules,
      conversationTier,
      voiceTier,
      locations,
      operators,
    }),
    [selectedIndustry, selectedChannels, selectedModules, conversationTier, voiceTier, locations, operators]
  )

  const pricing = useMemo(() => calculateTotal(config), [config])

  // Industry selection presets
  const selectIndustry = (id: string) => {
    if (selectedIndustry === id) {
      setSelectedIndustry(null)
      return
    }
    setSelectedIndustry(id)
    const industry = INDUSTRIES.find((i) => i.id === id)
    if (industry) {
      const channels = industry.recommendedChannels.includes('website_chat')
        ? industry.recommendedChannels
        : ['website_chat', ...industry.recommendedChannels]
      setSelectedChannels(channels)
      setSelectedModules(industry.recommendedModules)
    }
  }

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  // Shared checkbox UI
  const Checkbox = ({ checked }: { checked: boolean }) => (
    <div
      className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
      }`}
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  )

  // ─── Step renderers ──────────────────────────────────────────────────────

  const renderIndustry = () => (
    <div className="space-y-2">
      {INDUSTRIES.map((ind) => {
        const isSelected = selectedIndustry === ind.id
        return (
          <motion.button
            key={ind.id}
            onClick={() => selectIndustry(ind.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all text-left ${
              isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md shadow-blue-500/10'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <span className="text-2xl">{ind.icon}</span>
            <span className="font-semibold text-gray-900 dark:text-white flex-1">
              {ind.name[lang]}
            </span>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )

  const renderChannels = () => (
    <div className="grid sm:grid-cols-2 gap-4">
      {CHANNELS.map((ch) => {
        const isSelected = selectedChannels.includes(ch.id)
        const isLocked = ch.id === 'website_chat'
        return (
          <motion.button
            key={ch.id}
            onClick={() => !isLocked && toggleChannel(ch.id)}
            whileHover={!isLocked ? { scale: 1.02 } : {}}
            whileTap={!isLocked ? { scale: 0.98 } : {}}
            className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
              isLocked
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 cursor-default'
                : isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-500/10'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
            }`}
          >
            {isLocked ? (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">
                {l('Включен', 'Included')}
              </span>
            ) : (
              <Checkbox checked={isSelected} />
            )}
            {isLocked ? (
              <Image src="/logo-icon.png" alt="Neo" width={40} height={40} className="mb-3" />
            ) : (
              <div className="text-3xl mb-3">{ch.icon}</div>
            )}
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              {ch.name[lang]}
            </div>
            {!isLocked && (
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                +€{ch.price}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  /{l('м', 'mo')}
                </span>
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )

  const renderModules = () => (
    <div className="grid sm:grid-cols-2 gap-4">
      {MODULES.map((mod) => {
        const isSelected = selectedModules.includes(mod.id)
        return (
          <motion.button
            key={mod.id}
            onClick={() => toggleModule(mod.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
              isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-500/10'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
            }`}
          >
            <Checkbox checked={isSelected} />
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              {mod.name[lang]}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {mod.description[lang]}
            </p>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              +€{mod.price}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                /{l('м', 'mo')}
              </span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )

  const renderVolume = () => (
    <div className="space-y-8">
      {/* Conversation tier */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {l('Разговори на месец', 'Conversations per month')}
        </h4>
        <div className="grid sm:grid-cols-3 gap-3">
          {VOLUME_TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setConversationTier(tier.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                conversationTier === tier.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                {tier.label[lang]}
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                {tier.price === 0 ? l('Включено', 'Included') : `+€${tier.price}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Voice tier */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {l('Гласови минути на месец', 'Voice minutes per month')}
        </h4>
        <div className="grid sm:grid-cols-3 gap-3">
          {VOICE_TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setVoiceTier(tier.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                voiceTier === tier.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                {tier.label[lang]}
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                {tier.price === 0 ? l('Включено', 'Included') : `+€${tier.price}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Locations & Operators */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {l('Брой локации', 'Number of locations')}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocations((v) => Math.max(1, v - 1))}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center">
              {locations}
            </span>
            <button
              onClick={() => setLocations((v) => Math.min(50, v + 1))}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {l('Първата е включена. +€25/допълнителна', '1st included. +€25/extra')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {l('Брой оператори', 'Number of operators')}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOperators((v) => Math.max(1, v - 1))}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center">
              {operators}
            </span>
            <button
              onClick={() => setOperators((v) => Math.min(50, v + 1))}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {l('Първите 2 са включени. +€10/допълнителен', 'First 2 included. +€10/extra')}
          </p>
        </div>
      </div>
    </div>
  )

  const renderReview = () => {
    const industry = INDUSTRIES.find((i) => i.id === selectedIndustry)
    const selChannels = CHANNELS.filter((c) => selectedChannels.includes(c.id))
    const selModules = MODULES.filter((m) => selectedModules.includes(m.id))
    const volTier = VOLUME_TIERS.find((v) => v.id === conversationTier)
    const voTier = VOICE_TIERS.find((v) => v.id === voiceTier)

    return (
      <div className="space-y-6">
        {/* Industry */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {l('Индустрия', 'Industry')}
          </div>
          <div className="text-gray-900 dark:text-white font-medium">
            {industry ? `${industry.icon} ${industry.name[lang]}` : l('Не е избрана', 'Not selected')}
          </div>
        </div>

        {/* Channels */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {l('Канали', 'Channels')} ({selChannels.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selChannels.length > 0 ? (
              selChannels.map((ch) => (
                <span
                  key={ch.id}
                  className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                >
                  {ch.icon} {ch.name[lang]}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">{l('Няма избрани', 'None selected')}</span>
            )}
          </div>
        </div>

        {/* Modules */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {l('Модули', 'Modules')} ({selModules.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selModules.length > 0 ? (
              selModules.map((mod) => (
                <span
                  key={mod.id}
                  className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                >
                  {mod.name[lang]}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">{l('Няма избрани', 'None selected')}</span>
            )}
          </div>
        </div>

        {/* Volume */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {l('Обем & мащаб', 'Volume & scale')}
          </div>
          <div className="text-gray-900 dark:text-white text-sm space-y-1">
            <div>{l('Разговори:', 'Conversations:')} {volTier?.label[lang]}</div>
            <div>{l('Гласови минути:', 'Voice minutes:')} {voTier?.label[lang]}</div>
            <div>{l('Локации:', 'Locations:')} {locations}</div>
            <div>{l('Оператори:', 'Operators:')} {operators}</div>
          </div>
        </div>

        {/* ROI framing */}
        {pricing.savingsVsEmployee > 0 && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <div className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
              💡 {l('Спестявания', 'Savings')}
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              {l(
                `Спестявате €${pricing.savingsVsEmployee}/м спрямо средна заплата за служител (€1,280/м). Neo работи 24/7 без болнични и отпуски.`,
                `You save €${pricing.savingsVsEmployee}/mo compared to an average employee salary (€1,280/mo). Neo works 24/7 with no sick days or vacations.`
              )}
            </p>
          </div>
        )}
      </div>
    )
  }

  const stepRenderers = [renderIndustry, renderChannels, renderModules, renderVolume, renderReview]

  return (
    <section
      id="calculator"
      className="relative py-32 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-black"
    >
      <div className="relative z-20 max-w-7xl mx-auto px-6">
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
          {/* Left: Steps + Content (2 columns) */}
          <div className="lg:col-span-2">
            {/* Step progress indicator */}
            <div className="flex items-center gap-1 mb-8 overflow-hidden">
              {STEP_META.map((step, i) => {
                const isActive = i === currentStep
                const isCompleted = i < currentStep

                return (
                  <motion.button
                    key={i}
                    onClick={() => { setSwipeDir(i > currentStep ? 1 : -1); setCurrentStep(i) }}
                    animate={{
                      flex: isActive ? 2 : 0.6,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap overflow-hidden ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : isCompleted
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, width: isActive ? 'auto' : 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {lang === 'bg' ? step.bg : step.en}
                    </motion.span>
                    {!isActive && (
                      <span className="text-xs">{i + 1}</span>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait" custom={swipeDir}>
              <motion.div
                key={currentStep}
                custom={swipeDir}
                variants={{
                  enter: (d: number) => ({
                    x: d > 0 ? 80 : -80,
                    opacity: 0,
                    scale: 0.98,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  },
                  exit: (d: number) => ({
                    x: d > 0 ? -80 : 80,
                    opacity: 0,
                    scale: 0.98,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 35,
                  mass: 0.6,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                style={{ touchAction: 'pan-y' }}
                onDragEnd={(_e, info) => {
                  const swipe = Math.abs(info.offset.x) * Math.abs(info.velocity.x)
                  if (swipe > 100) {
                    if (info.offset.x < 0 && currentStep < STEP_COUNT - 1) {
                      setSwipeDir(1)
                      setCurrentStep((s) => s + 1)
                    } else if (info.offset.x > 0 && currentStep > 0) {
                      setSwipeDir(-1)
                      setCurrentStep((s) => s - 1)
                    }
                  }
                }}
              >
                {stepRenderers[currentStep]()}

                {/* Step navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => { setSwipeDir(-1); setCurrentStep((s) => Math.max(0, s - 1)) }}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                      currentStep === 0
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {l('← Назад', '← Back')}
                  </button>

                  {currentStep < STEP_COUNT - 1 && (
                    <div className="flex items-center gap-4">
                      {currentStep === 0 && (
                        <button
                          onClick={() => { setSelectedIndustry(null); setSwipeDir(1); setCurrentStep(1) }}
                          className="px-6 py-3 rounded-full text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          {l('Пропусни', 'Skip')}
                        </button>
                      )}
                      <button
                        onClick={() => { setSwipeDir(1); setCurrentStep((s) => Math.min(STEP_COUNT - 1, s + 1)) }}
                        className="px-6 py-3 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                      >
                        {l('Следваща стъпка →', 'Next step →')}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
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
                  {l('Вашата цена', 'Your price')}
                </h3>

                {/* Breakdown */}
                <AnimatePresence>
                  {pricing.breakdown.map((item, i) => (
                    <motion.div
                      key={item.label[lang]}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center mb-3 pb-3 border-b border-white/10 dark:border-black/10"
                    >
                      <span className="text-sm opacity-70">{item.label[lang]}</span>
                      <span className="font-semibold">€{item.amount}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-white/20 dark:border-black/20">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm opacity-70">
                      {l('Месечно', 'Monthly')}
                    </span>
                    <motion.span
                      key={pricing.monthly}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold"
                    >
                      €{pricing.monthly}
                    </motion.span>
                  </div>

                </div>

                {/* Value framing */}
                {pricing.savingsVsEmployee > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                    <p className="text-xs text-green-300 dark:text-green-700 leading-relaxed">
                      {l(
                        `Спестявате €${pricing.savingsVsEmployee}/м спрямо средна заплата (€1,280/м)`,
                        `Save €${pricing.savingsVsEmployee}/mo vs avg salary (€1,280/mo)`
                      )}
                    </p>
                  </div>
                )}

                {/* Industry + counts summary */}
                <div className="mt-4 space-y-1 text-xs opacity-60">
                  {selectedIndustry && (
                    <div>
                      {l('Индустрия:', 'Industry:')} {INDUSTRIES.find((i) => i.id === selectedIndustry)?.name[lang]}
                    </div>
                  )}
                  <div>{l('Канали:', 'Channels:')} {selectedChannels.length}</div>
                  <div>{l('Модули:', 'Modules:')} {selectedModules.length}</div>
                </div>

                {/* CTA */}
                <a
                  href="/book-demo"
                  onClick={(e) => {
                    e.preventDefault()
                    try { saveConfig() } catch {}
                    window.location.href = '/book-demo'
                  }}
                  className="block w-full mt-6 px-6 py-4 rounded-full bg-white dark:bg-black text-black dark:text-white font-semibold hover:scale-105 transition-transform shadow-lg text-center cursor-pointer"
                >
                  {l('Започни с тази конфигурация', 'Start with this configuration')}
                </a>

                <p className="text-xs opacity-60 text-center mt-4">
                  {l(
                    'Setup за 2-3 дни • Поддръжка на български',
                    'Setup in 2-3 days • Bulgarian support'
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
