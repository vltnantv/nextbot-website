'use client'

import { useEffect, useRef } from 'react'

export function HomepageBackground({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    class Blob {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string

      constructor(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.radius = Math.random() * 280 + 140
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        const colors = [
          'rgba(96, 165, 250, 0.12)',
          'rgba(167, 139, 250, 0.10)',
          'rgba(139, 92, 246, 0.10)',
          'rgba(6, 182, 212, 0.08)',
          'rgba(59, 130, 246, 0.10)',
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(w: number, h: number) {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -this.radius) this.x = w + this.radius
        if (this.x > w + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = h + this.radius
        if (this.y > h + this.radius) this.y = -this.radius
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const blobs: Blob[] = []
    for (let i = 0; i < 6; i++) {
      blobs.push(new Blob(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      blobs.forEach((b) => {
        b.update(canvas.width, canvas.height)
        b.draw(ctx)
      })
      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener('resize', setCanvasSize)
  }, [])

  return (
    <div className="relative bg-[#0c0c14]">
      {/* Absolute dark background with animated liquid glass blobs */}
      <div className="absolute inset-0 z-0">
        {/* Liquid glass canvas */}
        <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: 'blur(90px)' }} />

        {/* Mesh gradient overlays (subtle on dark) */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/10" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-indigo-600/10" />
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Ultra-smooth fade to black */}
      <div
        className="absolute inset-x-0 top-0 z-[1] pointer-events-none"
        style={{
          height: '100%',
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            transparent 15%,
            rgba(0,0,0,0.02) 20%,
            rgba(0,0,0,0.05) 25%,
            rgba(0,0,0,0.08) 30%,
            rgba(0,0,0,0.12) 35%,
            rgba(0,0,0,0.18) 40%,
            rgba(0,0,0,0.25) 45%,
            rgba(0,0,0,0.35) 50%,
            rgba(0,0,0,0.45) 55%,
            rgba(0,0,0,0.55) 60%,
            rgba(0,0,0,0.65) 65%,
            rgba(0,0,0,0.75) 70%,
            rgba(0,0,0,0.83) 75%,
            rgba(0,0,0,0.90) 80%,
            rgba(0,0,0,0.95) 90%,
            rgb(0,0,0) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
