'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@/lib/i18n'

// Scene icon configs for the animated logo
const sceneIcons = [
  { emoji: '💬', orbitEmojis: ['📱', '💻', '📧'] },
  { emoji: '🧠', orbitEmojis: ['🔍', '📊', '💡'] },
  { emoji: '⚡', orbitEmojis: ['✓', '🚀', '💨'] },
  { emoji: '🔗', orbitEmojis: ['📅', '📊', '📧'] },
  { emoji: '🌍', orbitEmojis: ['🇧🇬', '🇬🇧', '🇩🇪'] },
]

export function ScrollExperience() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeScene, setActiveScene] = useState(0)
  const [progress, setProgress] = useState(0)

  const scenes = [
    {
      title: lang === 'bg' ? 'Клиентът пита' : 'Customer asks',
      subtitle: lang === 'bg' ? 'Навсякъде, по всяко време' : 'Anywhere, anytime',
      bg: '#0a2e1a',
      glow: 'rgba(34, 197, 94, 0.3)',
    },
    {
      title: lang === 'bg' ? 'Neo разбира' : 'Neo understands',
      subtitle: lang === 'bg' ? 'Интелигентен AI, не робот' : 'Smart AI, not a robot',
      bg: '#0a1a2e',
      glow: 'rgba(59, 130, 246, 0.3)',
    },
    {
      title: lang === 'bg' ? 'Отговаря мигновено' : 'Responds instantly',
      subtitle: lang === 'bg' ? 'Под 1 секунда' : 'Under 1 second',
      bg: '#1a0a2e',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    {
      title: lang === 'bg' ? 'Автоматизира всичко' : 'Automates everything',
      subtitle: lang === 'bg' ? 'Без ръчна работа' : 'Zero manual work',
      bg: '#2e1a0a',
      glow: 'rgba(249, 115, 22, 0.3)',
    },
    {
      title: lang === 'bg' ? 'На 12+ езика' : 'In 12+ languages',
      subtitle: lang === 'bg' ? 'Автоматично разпознаване' : 'Automatic detection',
      bg: '#0a0a2e',
      glow: 'rgba(99, 102, 241, 0.3)',
    },
  ]

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollable = containerRef.current.offsetHeight - window.innerHeight
    if (scrollable <= 0) return

    const p = Math.max(0, Math.min(1, -rect.top / scrollable))
    setProgress(p)
    setActiveScene(Math.min(4, Math.floor(p * 5)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scene = scenes[activeScene]
  const icons = sceneIcons[activeScene]

  // Rotation angle based on scroll progress within current scene
  const sceneProgress = (progress * 5) % 1
  const rotation = sceneProgress * 360

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: scene.bg,
          transition: 'background 0.6s ease',
          overflow: 'hidden',
        }}
      >
        {/* Main content */}
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 64,
          }}
        >
          {/* Left: Text */}
          <div style={{ flex: 1 }}>
            <h2
              key={activeScene}
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {scene.title}
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#999', marginTop: 12 }}>
              {scene.subtitle}
            </p>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: 32 }}>
              {scenes.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 4,
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    width: i === activeScene ? 48 : 8,
                    background: i === activeScene ? '#fff' : '#444',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Animated 3D Neo Logo */}
          <div style={{ flexShrink: 0, position: 'relative', width: 320, height: 320 }}>
            {/* Background glow */}
            <div
              style={{
                position: 'absolute',
                inset: -40,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${scene.glow}, transparent 70%)`,
                transition: 'background 0.6s ease',
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            />

            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.1)',
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.1s linear',
              }}
            />

            {/* Middle ring */}
            <div
              style={{
                position: 'absolute',
                inset: 30,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.08)',
                transform: `rotate(${-rotation * 0.5}deg)`,
                transition: 'transform 0.1s linear',
              }}
            />

            {/* Orbiting icons */}
            {icons.orbitEmojis.map((emoji, i) => {
              const angle = (i * 120 + rotation) * (Math.PI / 180)
              const radius = 130
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <div
                  key={`${activeScene}-${i}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    transition: 'transform 0.1s linear',
                  }}
                >
                  {emoji}
                </div>
              )
            })}

            {/* Center: Neo logo */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 30,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <span style={{ fontSize: 56, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                  {icons.emoji}
                </span>
              </div>
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                  left: `${20 + Math.sin(i * 1.2) * 40 + 20}%`,
                  top: `${20 + Math.cos(i * 1.5) * 40 + 20}%`,
                  animation: `float-particle ${2 + i * 0.5}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {lang === 'bg' ? 'Скролни надолу' : 'Scroll down'} ↓
        </div>

        {/* Keyframe styles */}
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes float-particle {
            0% { transform: translateY(0px); opacity: 0.3; }
            100% { transform: translateY(-20px); opacity: 0.7; }
          }
        `}</style>
      </div>
    </div>
  )
}
