// Run: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { addDays, callState, daysBetween, isIsoDay, isStage, positionBetween, relativeDay, todayIso, todayList, type CrmLead } from '../lib/crm'

test('today in Bulgaria, not in UTC', () => {
  // 23:30 UTC on 1 Oct is already 2 Oct in Sofia (UTC+3 in summer time)
  assert.equal(todayIso(new Date('2026-10-01T23:30:00Z')), '2026-10-02')
  assert.equal(todayIso(new Date('2026-10-01T20:00:00Z')), '2026-10-01')
})

test('day arithmetic across months', () => {
  assert.equal(addDays('2026-10-02', 30), '2026-11-01')
  assert.equal(addDays('2026-12-31', 1), '2027-01-01')
  assert.equal(daysBetween('2026-10-02', '2026-10-05'), 3)
  assert.equal(daysBetween('2026-10-05', '2026-10-02'), -3)
})

test('relative labels as in the demo', () => {
  const t = '2026-10-02'
  assert.equal(relativeDay('2026-10-02', t), 'днес')
  assert.equal(relativeDay('2026-10-03', t), 'утре')
  assert.equal(relativeDay('2026-10-01', t), 'вчера')
  assert.equal(relativeDay('2026-10-05', t), 'след 3 дни')
  assert.equal(relativeDay('2026-09-30', t), 'преди 2 дни')
})

test('call state', () => {
  const t = '2026-10-02'
  assert.equal(callState(null, t), 'none')
  assert.equal(callState('2026-10-01', t), 'late')
  assert.equal(callState('2026-10-02', t), 'today')
  assert.equal(callState('2026-10-03', t), 'later')
})

test('validators', () => {
  assert.ok(isIsoDay('2026-10-02'))
  assert.ok(!isIsoDay('02.10.2026'))
  assert.ok(!isIsoDay('2026-13-45'))
  assert.ok(isStage('not_now'))
  assert.ok(!isStage('lost'))
})

const lead = (over: Partial<CrmLead>): CrmLead => ({
  id: Math.random().toString(36).slice(2), name: 'X', phone: null, email: null, website: null, address: null,
  category: null, rating: null, review_count: null, status: 'new', next_call_at: null, last_contact_at: null,
  stage_changed_at: null, position: 0, created_at: '2026-10-01T10:00:00Z', ...over,
})

test('„Днес“ groups: late (oldest first), today, new without a date', () => {
  const t = '2026-10-02'
  const out = todayList([
    lead({ name: 'late2', next_call_at: '2026-10-01', status: 'called' }),
    lead({ name: 'late5', next_call_at: '2026-09-27', status: 'offer' }),
    lead({ name: 'today', next_call_at: '2026-10-02', status: 'meeting' }),
    lead({ name: 'later', next_call_at: '2026-10-09', status: 'called' }),
    lead({ name: 'fresh', status: 'new', rating: 4.9 }),
    lead({ name: 'client', status: 'client' }),
    lead({ name: 'notnow', status: 'not_now' }),
  ], t)
  assert.deepEqual(out.late.map((l) => l.name), ['late5', 'late2'])
  assert.deepEqual(out.due.map((l) => l.name), ['today'])
  assert.deepEqual(out.fresh.map((l) => l.name), ['fresh'])
})

test('positions between neighbours', () => {
  assert.equal(positionBetween(null, null), 0)
  assert.equal(positionBetween(null, 4), 3)
  assert.equal(positionBetween(4, null), 5)
  assert.equal(positionBetween(1, 2), 1.5)
})
