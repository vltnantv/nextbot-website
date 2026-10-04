// Runs after every `npm run build` (package.json "postbuild"), so also on every Vercel deploy.
// Fails the build - and with it the deploy - if the built site could contain lead data from CORE.
//
// 1. CORE_LOCAL must never be set on Vercel.
// 2. Nothing under /vatreshno or /api/vatreshno may be pre-rendered (static pages carry their data in the build).
// 3. If the Supabase keys are available (only on Valentin's computer, from .env.local), every lead name, phone and
//    email is searched for in the build output. On Vercel there are no such keys and this step is skipped.
//
// Run by hand: node scripts/check-build-no-leads.mjs

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import nextEnv from '@next/env'

const ROOT = process.cwd()
const OUT = join(ROOT, '.next')
const problems = []
const say = (m) => console.log(`[проверка за лийдове] ${m}`)

if (!existsSync(OUT)) {
  console.error('[проверка за лийдове] няма .next - пуснете първо `npm run build`')
  process.exit(1)
}

// the same env files Next.js reads (.env.local etc.)
nextEnv.loadEnvConfig(ROOT)

// 1. CORE_LOCAL on Vercel
if (process.env.VERCEL && process.env.CORE_LOCAL) problems.push('CORE_LOCAL е зададено във Vercel. Махнете го от Environment Variables.')

// 2. pre-rendered internal routes
const manifest = JSON.parse(readFileSync(join(OUT, 'prerender-manifest.json'), 'utf8'))
for (const route of Object.keys(manifest.routes ?? {})) {
  if (/^\/(api\/)?vatreshno(\/|$)/.test(route)) problems.push(`Вътрешният адрес ${route} е сглобен като статичен (с данни вътре).`)
}

// all build files except the cache (text files only)
const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === 'cache') continue
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) walk(p)
    else if (/\.(html|rsc|body|json|js|txt|meta)$/.test(name) && s.size < 20_000_000) files.push(p)
  }
}
walk(OUT)
for (const f of files) {
  if (/[\\/]server[\\/]app[\\/]\(local\)[\\/]vatreshno.*\.(html|rsc|body)$/.test(f)) problems.push(`Има сглобена вътрешна страница: ${f.replace(ROOT + '/', '')}`)
}

// 3. lead data in the build output (only where the keys are)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (url && key) {
  const needles = new Set()
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${url}/rest/v1/leads?select=name,phone,phone_normalized,email&offset=${from}&limit=1000`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    if (!res.ok) {
      problems.push(`Не мога да прочета лийдовете за сравнение (HTTP ${res.status}). Проверката не е пълна.`)
      break
    }
    const rows = await res.json()
    for (const r of rows) {
      for (const v of [r.name, r.phone, r.phone_normalized, r.email]) if (typeof v === 'string' && v.trim().length >= 8) needles.add(v.trim())
    }
    if (rows.length < 1000) break
  }
  // values that are written in the site's own source code (e.g. old test leads named „Demo Visitor“) did not
  // come from the database - they are not a leak, skip them
  const source = []
  const readSrc = (dir) => {
    if (!existsSync(dir)) return
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) readSrc(p)
      else if (/\.(tsx?|jsx?|mjs|json|md)$/.test(name)) source.push(readFileSync(p, 'utf8'))
    }
  }
  for (const d of ['app', 'components', 'lib', 'copy']) readSrc(join(ROOT, d))
  const code = source.join('\n')
  let skipped = 0
  for (const n of [...needles]) if (code.includes(n)) (needles.delete(n), skipped++)
  if (skipped) say(`${skipped} стойности са написани и в кода на сайта (не идват от базата) - пропускам ги`)

  // also the \u-escaped form, as it can appear inside JS bundles
  const escaped = (s) => s.replace(/[^\x00-\x7f]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)
  const list = [...needles].flatMap((n) => [n, escaped(n)]).filter((v, i, a) => a.indexOf(v) === i)
  let hits = 0
  for (const f of files) {
    const text = readFileSync(f, 'utf8')
    for (const n of list) {
      if (text.includes(n)) {
        hits++
        if (hits <= 5) problems.push(`Данни на лийд в ${f.replace(ROOT + '/', '')}: „${n.slice(0, 40)}“`)
      }
    }
  }
  say(`сравних ${needles.size} имена, телефони и имейли с ${files.length} файла от build-а`)
} else {
  say('няма ключове за Supabase (така е във Vercel) - пропускам сравнението с лийдовете, проверките 1 и 2 са направени')
}

if (problems.length) {
  console.error('\n[проверка за лийдове] СПРЯНО. Сглобеният сайт може да съдържа данни на лийдове:')
  for (const p of problems) console.error(' - ' + p)
  process.exit(1)
}
say(`OK: няма данни на лийдове в сглобения сайт (${files.length} файла проверени)`)
