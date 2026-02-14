'use client'

import { useLanguage } from '@/lib/i18n'

interface CalendlyButtonProps {
  variant?: 'default' | 'outline'
  size?: 'default' | 'lg'
  className?: string
}

export function CalendlyButton({
  variant = 'default',
  size = 'default',
  className = ''
}: CalendlyButtonProps) {
  const { lang } = useLanguage()

  const openCalendly = () => {
    // Open Calendly in a new window
    window.open('https://calendly.com/valentinantov/neo-demo-call', '_blank')
  }

  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full touch-manipulation'

  const variantStyles = {
    default: 'bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-white text-white hover:bg-white/10'
  }

  const sizeStyles = {
    default: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  }

  return (
    <button
      onClick={openCalendly}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {lang === 'bg' ? 'Запази demo' : 'Book demo'}
    </button>
  )
}
