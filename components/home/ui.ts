// Shared classes for the homepage sections, taken from design/homepage-mockup.html.

/** .nb-wrap: max 1200 px, 24 px side padding */
export const WRAP = 'mx-auto w-full max-w-[1200px] px-6'

/** .nb-h: Geologica 600, tight letter-spacing, balanced lines */
export const H = 'font-display font-semibold tracking-[-0.02em] [text-wrap:balance]'

/** Section title: clamp(30px, 3.6vw, 44px), line-height 1.12 */
export const H2 = `${H} text-[clamp(30px,3.6vw,44px)] leading-[1.12]`

/** Small label above a section title */
export const EYEBROW = 'text-[14px] font-medium text-stone'

/** Primary button: ink pill, cream text, lifts 1 px on hover (.nb-btn) */
export const BTN_PRIMARY =
  'inline-flex items-center justify-center rounded-full bg-ink font-medium text-cream no-underline transition-transform duration-200 hover:-translate-y-px hover:text-cream motion-reduce:transition-none'

/** Secondary button: border #D9D0C2, ink text */
export const BTN_SECONDARY =
  'inline-flex items-center justify-center rounded-full border border-[#D9D0C2] font-medium text-ink no-underline transition-transform duration-200 hover:-translate-y-px motion-reduce:transition-none'

/** White card with a line border (.nb-card base) */
export const CARD = 'border border-line bg-white'
