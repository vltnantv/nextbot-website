'use client'

import { useEffect } from 'react'

export function ScrollAnimator() {
  useEffect(() => {
    // Animate hero elements immediately on mount
    document.querySelectorAll('.animate-on-scroll.hero-animate').forEach(el => {
      el.classList.add('animate-in')
    })

    // IntersectionObserver for all other scroll-animated elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.animate-on-scroll:not(.hero-animate)').forEach(el => {
      observer.observe(el)
    })

    // Fallback: force all elements visible after 2 seconds
    const fallback = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate-in')
      })
    }, 2000)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return null
}
