'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { VIEWPORT } from '@/lib/motion'
import { ExampleTag } from './ExampleTag'

// WEB signature (copy/UNIQUE.md „Плъзгач преди/след“): two made-up mockups on top of each other. Left - a
// crowded site with tiny text and no chat; right - a clean site with NEO in the corner. The handle is dragged
// (mouse, finger) or moved with the arrow keys. Mockups are shapes only: no real brands, no invented text.

const clamp = (v: number) => Math.min(100, Math.max(0, v))

function Before() {
  const bar = (w: string, c = 'bg-[#9A9A9A]') => <span className={`block h-[5px] rounded-[1px] ${c}`} style={{ width: w }} />
  return (
    <div className="absolute inset-0 flex flex-col gap-2 bg-[#EDEDE8] p-3 sm:p-4">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#1E3F8F] to-[#3A6BD1] px-2 py-2">
        <span className="h-5 w-5 rounded-full bg-[#F2C300]" />
        {bar('22%', 'bg-white/90')}
        <span className="ml-auto flex gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="block h-[4px] w-4 bg-white/70 sm:w-6" />
          ))}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-[#D9372A] px-2 py-1">{bar('70%', 'bg-white/80')}</div>
      <div className="grid flex-1 grid-cols-[1fr_2fr_1fr] gap-2">
        <div className="flex flex-col gap-1.5 bg-white p-2">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i}>{bar(`${60 + ((i * 17) % 35)}%`, 'bg-[#3A6BD1]/70')}</span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 bg-white p-2">
          <span className="mb-1 block h-16 bg-[#C9C9C2] sm:h-24" />
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i}>{bar(`${70 + ((i * 13) % 30)}%`)}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2 bg-white p-2">
          <span className="block h-10 bg-[#F2C300]" />
          <span className="block h-10 bg-[#8FBF3F]" />
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{bar(`${50 + ((i * 23) % 45)}%`)}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-1 bg-[#333] px-2 py-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="block h-[4px] flex-1 bg-white/40" />
        ))}
      </div>
    </div>
  )
}

function After() {
  return (
    <div className="absolute inset-0 flex flex-col bg-cream p-4 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="h-3 w-20 rounded-full bg-ink" />
        <span className="ml-auto hidden gap-4 sm:flex">
          <span className="h-2 w-10 rounded-full bg-stone/50" />
          <span className="h-2 w-10 rounded-full bg-stone/50" />
          <span className="h-2 w-10 rounded-full bg-stone/50" />
        </span>
        <span className="ml-auto h-7 w-20 rounded-full bg-ink sm:ml-4" />
      </div>
      <div className="mt-[8%] grid flex-1 grid-cols-[1.2fr_1fr] gap-[6%]">
        <div className="flex flex-col gap-3">
          <span className="h-5 w-[90%] rounded-full bg-ink sm:h-7" />
          <span className="h-5 w-[70%] rounded-full bg-ink sm:h-7" />
          <span className="mt-2 h-2.5 w-[85%] rounded-full bg-stone/40" />
          <span className="h-2.5 w-[60%] rounded-full bg-stone/40" />
          <span className="mt-3 h-9 w-32 rounded-full bg-ink" />
        </div>
        <span className="rounded-[18px] bg-[#E9DCC8]" />
      </div>
      {/* NEO in the corner */}
      <div className="absolute bottom-3 right-3 flex w-[42%] max-w-[220px] flex-col gap-2 rounded-[16px] border border-line bg-white p-3 shadow-[0_12px_32px_rgba(31,29,26,.12)] sm:bottom-5 sm:right-5">
        <span className="flex items-center gap-1.5 text-[12px] font-semibold">
          <span className="h-2 w-2 rounded-full bg-online" /> NEO
        </span>
        <span className="h-2 w-[80%] rounded-full bg-cream-deep" />
        <span className="h-2 w-[55%] self-end rounded-full bg-ink/80" />
      </div>
    </div>
  )
}

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduce = useReducedMotion()
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const touched = useRef(false)

  // one gentle hint that the handle moves, the first time it is seen
  useEffect(() => {
    if (!inView || reduce || touched.current) return
    const controls = animate(50, [50, 38, 62, 50], { duration: 1.8, ease: 'easeInOut', delay: 0.4, onUpdate: (v) => !touched.current && setPos(v) })
    return () => controls.stop()
  }, [inView, reduce])

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (r) setPos(clamp(((clientX - r.left) / r.width) * 100))
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-[24px] border border-line shadow-[0_24px_60px_rgba(31,29,26,.10)] [touch-action:pan-y] sm:aspect-[16/9]"
        onPointerDown={(e) => {
          touched.current = true
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          fromPointer(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Before />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <After />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[13px] text-cream">Преди</span>
        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[13px] text-ink shadow-soft">След</span>

        {/* handle: a full-width layer moved with transform, the line sits at its left edge */}
        <div className="pointer-events-none absolute inset-0" style={{ transform: `translateX(${pos}%)` }}>
          <span className="absolute inset-y-0 left-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(31,29,26,.15)]" />
          <button
            type="button"
            role="slider"
            aria-label="Преди и след"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault()
                touched.current = true
                setPos((p) => clamp(p + (e.key === 'ArrowLeft' ? -5 : 5)))
              }
            }}
            className="pointer-events-auto absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-[15px] text-ink shadow-[0_6px_18px_rgba(31,29,26,.18)]"
          >
            <span aria-hidden="true">‹ ›</span>
          </button>
        </div>
      </div>
      <ExampleTag>Илюстрация</ExampleTag>
    </div>
  )
}
