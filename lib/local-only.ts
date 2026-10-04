// The internal CORE app (/vatreshno/… and /api/vatreshno/…) with Valentin's real lead data.
// It exists only where CORE_LOCAL=1 is set - that is only in .env.local on Valentin's computer, never in
// Vercel. Everywhere else every page and API under /vatreshno answers 404 (middleware.ts + these checks).

export function coreEnabled(): boolean {
  return process.env.CORE_LOCAL === '1'
}
