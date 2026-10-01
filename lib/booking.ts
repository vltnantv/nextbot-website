// Times offered on /razgovor (copy/UNIQUE.md „Часове“). Set by Valentin, 01.10.2026:
// Monday-Friday, 10:00-18:00, 30-minute slots (the last call starts at 17:30).
const START = 10 * 60
const END = 18 * 60
const STEP = 30

export const CALL_TIMES: string[] = Array.from({ length: (END - START) / STEP }, (_, i) => {
  const m = START + i * STEP
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
})

/** How many working days ahead are offered (Monday-Friday) */
export const CALL_DAYS = 5
