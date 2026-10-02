// Phone numbers to one format (E.164, e.g. +359885930101) so the same number written differently
// („088 593 0101“, „+359 88 593 0101“, „00359885930101“) is recognised as the same client.
//
// Bulgarian national numbers (without the leading 0) are 8 or 9 digits: mobiles 87/88/89/98 + 7 digits,
// Sofia 2 + 7 digits, other towns area code + subscriber = 8-9 digits, 700/800 numbers 8 digits.
// Foreign numbers are kept as they are (+ and 8-15 digits).

export type NormalizedPhone = { e164: string; country: 'BG' | 'other' }

const BG_NATIONAL = /^[2-9]\d{7,8}$/

function bg(national: string): NormalizedPhone | null {
  return BG_NATIONAL.test(national) ? { e164: `+359${national}`, country: 'BG' } : null
}

/** Normalizes a phone number; null when it is empty or not a valid number. */
export function normalizePhone(raw: string | null | undefined): NormalizedPhone | null {
  if (!raw) return null
  const text = raw.trim()
  if (!text) return null
  const digits = text.replace(/\D/g, '')
  if (!digits) return null

  // international: +… or 00…
  const intl = text.startsWith('+') ? digits : digits.startsWith('00') ? digits.slice(2) : null
  if (intl !== null) {
    if (intl.startsWith('359')) return bg(intl.slice(3))
    return intl.length >= 8 && intl.length <= 15 ? { e164: `+${intl}`, country: 'other' } : null
  }

  // 359… written without +
  if (digits.startsWith('359') && digits.length >= 11) return bg(digits.slice(3))
  // national with trunk 0: 088…, 02…, 052…
  if (digits.startsWith('0')) return bg(digits.slice(1))
  // national without the 0: 885930101
  return bg(digits)
}

/** For display only: +359885930101 → „+359 88 593 0101“, +35924231234 → „+359 2 423 1234“. Others unchanged. */
export function formatPhone(e164: string | null | undefined): string {
  if (!e164) return ''
  const m = /^\+359(\d+)$/.exec(e164)
  if (!m) return e164
  const n = m[1]
  if (n.startsWith('2') && n.length === 8) return `+359 2 ${n.slice(1, 4)} ${n.slice(4)}` // Sofia
  if (/^(8[7-9]|98)/.test(n) && n.length === 9) return `+359 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}` // mobile
  if (n.length === 8) return `+359 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}` // e.g. Plovdiv 32, Varna 52
  return `+359 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`
}
