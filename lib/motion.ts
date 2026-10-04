// Shared motion values for the whole site (copy/MOTION.md). Every animated component reads from here.
// Rules: animate only transform and opacity; everything stops with prefers-reduced-motion;
// content must be visible without JavaScript.

/** Easing for every animation */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Float-in: opacity 0→1, y 24→0, 700 ms */
export const REVEAL = { y: 24, duration: 0.7 }

/** Children appear one after another, 80 ms apart */
export const STAGGER = 0.08

/** Spring for cards and buttons */
export const SPRING = { type: 'spring' as const, stiffness: 260, damping: 24 }

/** Show on scroll: once, when the element is 80 px inside the viewport */
export const VIEWPORT = { once: true, margin: '-80px' as const }

/** Headline word by word: mask + y 100%→0, 60 ms between words */
export const WORDS = { stagger: 0.06, duration: 0.7 }

/** Gentle float for chat bubbles and blobs: 6 px, 6–8 s, endless */
export const FLOAT = { distance: 6, minDuration: 6, maxDuration: 8 }

/** Card tilt toward the cursor (mouse only) */
export const TILT = { maxDeg: 4, lift: 4 }

/** Primary button following the cursor (mouse only) */
export const MAGNETIC = { max: 6 }

/** Line / path drawing itself: pathLength 0→1 */
export const DRAW = { duration: 1.2 }

/** Chat example: one message after another with „пише…“ */
export const TYPING = { typingMs: 1100, pauseMs: 700 }

/** Industries strip */
export const MARQUEE_SECONDS = 60

/** Background blobs: blur 80–120 px, drift 20–30 s, parallax 40–80 px */
export const BLOBS = { parallax: [40, 80] as const }

/** Header turns matte after this much scroll */
export const HEADER_MATTE_AFTER = 24

/** Dropdown menus: opacity + y 8→0, 180 ms */
export const DROPDOWN = { y: 8, duration: 0.18 }

/** Accordion height, 250 ms */
export const ACCORDION = { duration: 0.25 }

/** Page transition: short fade and 12 px slide, 250 ms */
export const PAGE = { y: 12, duration: 0.25 }

/** Final call: title and button scale 0.98→1 */
export const FINAL_SCALE = 0.98

/** Media query for devices with a real mouse (Tilt, Magnetic) */
export const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

/** DESIGN-REFRESH.md §6 (homepage): sections fade in with 12 px, 500 ms, once; the h1 words are faster */
export const REVEAL_SOFT = { y: 12, duration: 0.5 }
export const WORDS_FAST = { stagger: 0.035, duration: 0.5 }
