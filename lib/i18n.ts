// The marketing site is Bulgarian only (BRAND.md). The language is fixed, so every page is
// rendered in Bulgarian on the server - no browser detection and no switching after load.
// Kept as a tiny shim because older sections still call useLanguage(); they go away in steps 4-5.

export type Language = 'bg'

export function useLanguage(): { lang: Language } {
  return { lang: 'bg' }
}
