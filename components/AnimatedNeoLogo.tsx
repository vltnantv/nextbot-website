'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedNeoLogo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth < 1024
    setIsMobile(mobile)

    if (mobile) return // Skip mouse tracking on mobile

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: 1000 }}>
      {/* Glow behind logo — extends downward, no hard edge (desktop only) */}
      {!isMobile && (
        <motion.div
          className="absolute w-[400px] h-[600px] translate-y-[100px] bg-gradient-to-b from-purple-500/10 via-purple-500/15 to-transparent dark:from-purple-500/20 dark:via-purple-500/25 dark:to-transparent rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Neo text with bubble glass effect */}
      <motion.div
        className="relative"
        animate={isMobile ? {} : {
          rotateX: [0, 5, 0, -5, 0],
          rotateY: [0, -5, 0, 5, 0],
          rotateZ: [0, 2, 0, -2, 0],
        }}
        transition={isMobile ? {} : {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={isMobile ? {} : {
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <svg
          viewBox="0 0 400 200"
          className="w-full h-auto max-w-md"
          style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))' }}
        >
          <defs>
            {/* Gradient for glass effect */}
            <linearGradient id="neoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#A78BFA', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
            </linearGradient>

            {/* Glass reflection gradient */}
            <linearGradient id="glassReflection" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
            </linearGradient>

            {/* Filter for bubble glass effect */}
            <filter id="bubbleGlass">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shadow */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="140"
            fontWeight="900"
            fill="rgba(0,0,0,0.3)"
            style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}
          >
            Neo
          </text>

          {/* Main text with gradient */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="140"
            fontWeight="900"
            fill="url(#neoGradient)"
            filter="url(#bubbleGlass)"
            style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}
          >
            Neo
          </text>

          {/* Glass reflection overlay */}
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="140"
            fontWeight="900"
            fill="url(#glassReflection)"
            opacity="0.6"
            style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}
          >
            Neo
          </text>
        </svg>

        {/* Floating particles around logo (desktop only) */}
        {!isMobile && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos((i / 12) * Math.PI * 2) * 150],
              y: [0, Math.sin((i / 12) * Math.PI * 2) * 150],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Subtitle */}
      {isMobile ? (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-600 font-semibold tracking-wider">
            AI ASSISTANT
          </p>
        </div>
      ) : (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <p className="text-sm text-gray-400 dark:text-gray-600 font-semibold tracking-wider">
            AI ASSISTANT
          </p>
        </motion.div>
      )}
    </div>
  )
}
