'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimateIn({ children, className = '', delay = 0 }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => setTimeout(() => setIsVisible(true), delay)

    // Primary: IntersectionObserver with sensitive threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)

    // Fallback: force visible after 2s to prevent permanently hidden elements
    const fallback = setTimeout(() => setIsVisible(true), 2000 + delay)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  )
}
