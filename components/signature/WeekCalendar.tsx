'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EASE } from '@/lib/motion'
import { ExampleTag } from './ExampleTag'

// Clinics signature (copy/UNIQUE.md „Календар“): a week grid with a few empty slots. „Пратете напомняне“
// fills the empty slots one by one. Illustration only (labelled „Илюстрация“); cells carry no names.

const DAYS = ['Пон', 'Вт', 'Ср', 'Чет', 'Пет']
const HOURS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
// empty slots as [day, hour] indexes
const EMPTY = new Set(['0-2', '1-4', '2-1', '2-5', '3-0', '4-3', '4-5'])

export function WeekCalendar() {
  const reduce = useReducedMotion()
  const [filled, setFilled] = useState(false)

  let order = 0
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ExampleTag>Илюстрация</ExampleTag>
        <button
          type="button"
          onClick={() => setFilled(true)}
          disabled={filled}
          className="min-h-11 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-cream transition-opacity disabled:opacity-40"
        >
          Пратете напомняне
        </button>
      </div>
      <div className="overflow-x-auto rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
        <table className="w-full min-w-[440px] border-separate border-spacing-1.5 text-[13px]">
          <thead>
            <tr>
              <th className="w-14" />
              {DAYS.map((d) => (
                <th key={d} scope="col" className="pb-2 font-medium text-stone">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((h, hi) => (
              <tr key={h}>
                <th scope="row" className="pr-2 text-left font-normal tabular-nums text-stone">
                  {h}
                </th>
                {DAYS.map((d, di) => {
                  const empty = EMPTY.has(`${di}-${hi}`)
                  const delay = empty ? order++ * 0.18 : 0
                  return (
                    <td key={d} className="relative h-10 rounded-[8px] p-0">
                      {empty ? (
                        <>
                          <span className="absolute inset-0 rounded-[8px] border-2 border-dashed border-line" />
                          <motion.span
                            className="absolute inset-0 rounded-[8px] bg-online"
                            initial={false}
                            animate={filled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: filled ? delay : 0 }}
                          />
                        </>
                      ) : (
                        <span className="absolute inset-0 rounded-[8px] bg-cream-deep" />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
