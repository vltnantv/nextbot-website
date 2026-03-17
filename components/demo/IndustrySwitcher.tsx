'use client'

import { useState } from 'react'

type Industry = {
  key: string
  label: string
  icon: string
  description: string
  quickActions: string[]
  welcomeMessage: string
}

const industries: Industry[] = [
  {
    key: 'hotel',
    label: 'Hotel',
    icon: '🏨',
    description: 'Room bookings, SPA, restaurant',
    quickActions: ['Room availability', 'Book a room', 'SPA services', 'Restaurant menu'],
    welcomeMessage: 'Welcome! I\'m Neo, your hotel concierge. How may I assist you today?',
  },
  {
    key: 'restaurant',
    label: 'Restaurant',
    icon: '🍽️',
    description: 'Reservations, menu, events',
    quickActions: ['Make a reservation', 'View menu', 'Private events', 'Dietary options'],
    welcomeMessage: 'Hello! I\'m Neo, your restaurant assistant. Would you like to make a reservation or check our menu?',
  },
  {
    key: 'dental',
    label: 'Dental Clinic',
    icon: '🦷',
    description: 'Appointments, services, insurance',
    quickActions: ['Book appointment', 'Services & pricing', 'Insurance accepted', 'Emergency care'],
    welcomeMessage: 'Hi! I\'m Neo, your dental care assistant. How can I help you today?',
  },
  {
    key: 'realestate',
    label: 'Real Estate',
    icon: '🏠',
    description: 'Listings, viewings, pricing',
    quickActions: ['Browse listings', 'Schedule viewing', 'Price estimate', 'Mortgage info'],
    welcomeMessage: 'Hello! I\'m Neo, your real estate assistant. Looking to buy, sell, or rent?',
  },
  {
    key: 'ecommerce',
    label: 'E-commerce',
    icon: '🛒',
    description: 'Products, orders, shipping',
    quickActions: ['Track my order', 'Product recommendations', 'Return policy', 'Size guide'],
    welcomeMessage: 'Hi there! I\'m Neo, your shopping assistant. How can I help you find what you need?',
  },
  {
    key: 'education',
    label: 'Education',
    icon: '🎓',
    description: 'Enrollment, courses, tuition',
    quickActions: ['Course catalog', 'Enrollment info', 'Tuition fees', 'Campus tour'],
    welcomeMessage: 'Welcome! I\'m Neo, your enrollment advisor. How can I assist you?',
  },
]

type IndustrySwitcherProps = {
  selected: string
  onSelect: (industry: Industry) => void
  compact?: boolean
}

export function IndustrySwitcher({ selected, onSelect, compact = false }: IndustrySwitcherProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {industries.map((ind) => (
          <button
            key={ind.key}
            onClick={() => onSelect(ind)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              selected === ind.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span className="mr-1.5">{ind.icon}</span>
            {ind.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {industries.map((ind) => (
        <button
          key={ind.key}
          onClick={() => onSelect(ind)}
          className={`p-4 rounded-xl text-left transition-all border ${
            selected === ind.key
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border hover:border-primary/30 hover:bg-muted/50'
          }`}
        >
          <span className="text-2xl">{ind.icon}</span>
          <div className="mt-2">
            <div className="text-sm font-semibold">{ind.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{ind.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

export { industries }
export type { Industry }
