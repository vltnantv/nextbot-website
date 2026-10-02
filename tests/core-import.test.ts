// Run: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizePhone } from '../lib/phone'
import { classify, firstEmail, toCandidate } from '../lib/core-import'

test('Bulgarian mobile in the formats Google Maps and people use', () => {
  for (const raw of ['088 593 0101', '0885930101', '+359 88 593 0101', '+359885930101', '00359885930101', '359885930101', '(088) 593-01-01', '885930101']) {
    assert.equal(normalizePhone(raw)?.e164, '+359885930101', raw)
  }
})

test('Bulgarian landlines', () => {
  assert.equal(normalizePhone('02 423 1234')?.e164, '+35924231234') // Sofia
  assert.equal(normalizePhone('032 96 1234')?.e164, '+35932961234') // Plovdiv
  assert.equal(normalizePhone('052 601 234')?.e164, '+35952601234') // Varna
  assert.equal(normalizePhone('0700 12 345')?.e164, '+35970012345')
})

test('foreign numbers are kept', () => {
  assert.deepEqual(normalizePhone('+44 20 7946 0958'), { e164: '+442079460958', country: 'other' })
  assert.equal(normalizePhone('0049 30 1234567')?.e164, '+49301234567')
})

test('invalid or empty numbers', () => {
  for (const raw of ['', '   ', null, undefined, '12345', '088 59', '+359 1234', 'няма', '0012']) {
    assert.equal(normalizePhone(raw as string), null, String(raw))
  }
})

test('first email from the emails column', () => {
  assert.equal(firstEmail('Info@Hotel.bg, sales@hotel.bg'), 'info@hotel.bg')
  assert.equal(firstEmail(''), null)
  assert.equal(firstEmail('not-an-email'), null)
})

test('candidate mapping', () => {
  const c = toCandidate({ title: ' Hotel Orbita ', phone: '088 593 0101', review_rating: '4.100000', review_count: '535', website: 'http://hotelorbita.com/', emails: '' })
  assert.equal(c.name, 'Hotel Orbita')
  assert.equal(c.phone, '+359885930101')
  assert.equal(c.rating, 4.1)
  assert.equal(c.reviewCount, 535)
  assert.equal(c.email, null)
})

test('classify: duplicates by phone, existing, blocked, no phone', () => {
  const rows = [
    { title: 'A', phone: '088 593 0101' },
    { title: 'A again', phone: '+359885930101' }, // same phone, other format
    { title: 'B', phone: '02 423 1234' }, // already in CORE
    { title: 'C', phone: '0899 111 222' }, // on the do-not-call list
    { title: 'D', phone: '' },
    { title: 'E', phone: '123' },
    { title: '', phone: '0888 000 111' },
  ]
  const out = classify(rows, new Set(['+35924231234']), new Set(['+359899111222']))
  assert.deepEqual(
    out.map((r) => r.status),
    ['new', 'duplicate', 'exists', 'blocked', 'no_phone', 'invalid_phone', 'no_name'],
  )
})
