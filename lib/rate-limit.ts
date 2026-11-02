// Simple fixed-window rate limit per key (the visitor's IP), kept in the memory of the function instance.
// On Vercel several instances can run at once, so the real limit can be a few times higher - it stops
// scripts and loops, not a determined attacker. For a hard global limit add a Vercel Firewall rate-limit rule.

type Entry = { count: number; resetAt: number }

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number }

export function createRateLimiter(opts: { limit: number; windowMs: number; now?: () => number }) {
  const { limit, windowMs } = opts
  const now = opts.now ?? Date.now
  const hits = new Map<string, Entry>()

  return function check(key: string): RateLimitResult {
    const t = now()
    // drop old entries now and then, so the map does not grow forever
    if (hits.size > 10_000) hits.forEach((e, k) => { if (e.resetAt <= t) hits.delete(k) })

    const e = hits.get(key)
    if (!e || e.resetAt <= t) {
      hits.set(key, { count: 1, resetAt: t + windowMs })
      return { ok: true }
    }
    if (e.count >= limit) return { ok: false, retryAfterSec: Math.max(1, Math.ceil((e.resetAt - t) / 1000)) }
    e.count++
    return { ok: true }
  }
}

/** The visitor's IP as Vercel passes it on. */
export function clientIp(headers: Headers): string {
  const real = headers.get('x-real-ip')?.trim()
  if (real) return real
  const first = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return first || 'unknown'
}

export const HOUR = 60 * 60 * 1000
