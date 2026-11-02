// Run: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { clientIp, createRateLimiter } from '../lib/rate-limit'

test('allows up to the limit in the window, then blocks', () => {
  let now = 1_000_000
  const limit = createRateLimiter({ limit: 3, windowMs: 60_000, now: () => now })
  assert.equal(limit('1.1.1.1').ok, true)
  assert.equal(limit('1.1.1.1').ok, true)
  assert.equal(limit('1.1.1.1').ok, true)
  const blocked = limit('1.1.1.1')
  assert.equal(blocked.ok, false)
  assert.ok(blocked.retryAfterSec > 0 && blocked.retryAfterSec <= 60)
  // another IP is counted on its own
  assert.equal(limit('2.2.2.2').ok, true)
  // after the window the first IP may send again
  now += 60_001
  assert.equal(limit('1.1.1.1').ok, true)
})

test('client IP: x-real-ip first, then the first x-forwarded-for entry', () => {
  assert.equal(clientIp(new Headers({ 'x-real-ip': '9.9.9.9', 'x-forwarded-for': '1.1.1.1' })), '9.9.9.9')
  assert.equal(clientIp(new Headers({ 'x-forwarded-for': '1.1.1.1, 10.0.0.1' })), '1.1.1.1')
  assert.equal(clientIp(new Headers()), 'unknown')
})
