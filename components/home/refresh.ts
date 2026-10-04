// Homepage after copy/DESIGN-REFRESH.md (sections 2-6). Only the homepage uses these; other pages keep
// components/home/ui.ts until they are refreshed too.

/** 1120 px grid, 24 px side padding */
export const WRAP = 'mx-auto w-full max-w-[1120px] px-6'

/** Vertical rhythm: 72 px between big sections on phone, 128 px on desktop */
export const SECTION = 'relative z-[1] py-9 min-[900px]:py-16'

/** Three type sizes per page: h1, h2, row titles */
export const H1 = 'font-display font-semibold text-[clamp(40px,6vw,68px)] leading-[1.05] tracking-[-0.02em] [text-wrap:balance]'
export const H2 = 'font-display font-semibold text-[clamp(30px,3.6vw,44px)] leading-[1.1] tracking-[-0.02em] [text-wrap:balance]'
export const H3 = 'font-display font-semibold text-[22px] leading-[1.25] tracking-[-0.015em]'

/** Body: Onest 18 px, 1.6, max ~62 characters */
export const TEXT = 'm-0 max-w-[62ch] text-[18px] leading-[1.6]'

/** Tag above a title: no border, small text only */
export const TAG = 'text-[14px] font-medium text-stone'

/** Main button: ink, cream text, 10 px corners */
export const BTN = 'inline-flex items-center justify-center rounded-[10px] bg-ink px-6 py-3.5 text-[16px] font-medium text-cream no-underline transition-colors hover:bg-[#35322D] hover:text-cream'

/** Secondary button for the pricing columns */
export const BTN_LINE = 'inline-flex items-center justify-center rounded-[10px] border border-line px-6 py-3.5 text-[16px] font-medium text-ink no-underline transition-colors hover:border-ink'

/** Text link with an underline */
export const LINK = 'font-medium text-ink underline decoration-[#D9D0C2] decoration-2 underline-offset-[5px] transition-colors hover:decoration-ink'

/** Hairline between rows */
export const HAIR = 'border-[#E8E1D6]'
