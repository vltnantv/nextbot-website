'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { DrawLine } from '@/components/motion/DrawLine'
import { EASE } from '@/lib/motion'
import { CTA } from '@/lib/site-nav'
import { BTN_PRIMARY } from '@/components/home/ui'
import { INPUT } from '@/components/forms/fields'
import { saveNote } from '@/components/forms/note'
import { ExampleTag } from './ExampleTag'

// STUDIO signature (copy/UNIQUE.md „Избор на задача“): five chips; choosing one draws a simple 3-step scheme
// of how it would look after automation. „Друго“ opens a field and the „Запазете разговор“ button
// (what was typed goes to the /razgovor form as a note). Schemes are illustrations: „Примерна схема“.

const TASKS: { label: string; steps?: [string, string, string] }[] = [
  { label: 'Преписвам запитвания в таблица', steps: ['Запитване от сайта', 'Влиза само', 'Таблицата на екипа'] },
  { label: 'Пиша едни и същи оферти', steps: ['Клиентът попълва калкулатор', 'Офертата се сглобява сама', 'Отива при клиента'] },
  { label: 'Ръчно пращам отчети', steps: ['Данните от програмите', 'Отчетът се събира сам', 'Всеки петък по имейл'] },
  { label: 'Вързвам две програми', steps: ['Първата програма', 'Данните минават сами', 'Втората програма'] },
  { label: 'Друго' },
]

export function TaskPicker() {
  const reduce = useReducedMotion()
  const [picked, setPicked] = useState<string | null>(null)
  const [other, setOther] = useState('')
  const task = TASKS.find((t) => t.label === picked)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Какво ви отнема време?">
        {TASKS.map((t) => {
          const on = t.label === picked
          return (
            <button
              key={t.label}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPicked(t.label)}
              className={`min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] font-medium transition-colors ${
                on ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-ink hover:border-ink'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="min-h-[220px]">
        <AnimatePresence mode="wait" initial={false}>
          {task?.steps && (
            <motion.div
              key={task.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex flex-col gap-5"
            >
              <ExampleTag>Примерна схема</ExampleTag>
              <ol className="m-0 flex list-none flex-col items-stretch gap-3 p-0 min-[800px]:flex-row min-[800px]:items-center">
                {task.steps.map((s, i) => (
                  <li key={s} className="flex flex-col items-stretch gap-3 min-[800px]:flex-1 min-[800px]:flex-row min-[800px]:items-center">
                    <motion.span
                      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.5 }}
                      className={`flex-1 rounded-card border px-5 py-4 text-[16px] font-medium shadow-soft ${i === 1 ? 'border-ink bg-ink text-cream' : 'border-line bg-white'}`}
                    >
                      <span className="mb-1 block text-[13px] font-normal opacity-70">{i + 1}</span>
                      {s}
                    </motion.span>
                    {i < 2 && <DrawLine arrow className="hidden h-3 w-10 shrink-0 min-[800px]:block" delay={i * 0.5 + 0.2} />}
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
          {picked === 'Друго' && (
            <motion.div
              key="other"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex max-w-[620px] flex-col gap-4"
            >
              <textarea
                aria-label="Какво ви отнема време?"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                rows={3}
                className={INPUT}
              />
              <Link href={CTA.href} onClick={() => saveNote(other)} className={`${BTN_PRIMARY} btn-shine self-start px-[26px] py-[15px] text-[16px]`}>
                {CTA.label}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
