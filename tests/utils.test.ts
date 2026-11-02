// Run: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { plural } from '../lib/utils'

test('numbers agree with words', () => {
  assert.equal(plural(1, 'закъснял', 'закъснели'), '1 закъснял')
  assert.equal(plural(2, 'закъснял', 'закъснели'), '2 закъснели')
  assert.equal(plural(0, 'закъснял', 'закъснели'), '0 закъснели')
  assert.equal(plural(64, 'отзив', 'отзива'), '64 отзива')
})
