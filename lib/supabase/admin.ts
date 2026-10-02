import { createClient } from '@supabase/supabase-js'

/** Server-only Supabase client with the service role key from .env.local; null when the keys are missing. */
export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null
}

/** Bulgarian message for database errors the import can run into. */
export function dbErrorMessage(error: { code?: string; message?: string } | null | undefined): string {
  if (!error) return 'Неизвестна грешка в базата.'
  // undefined column / table: the SQL for the import has not been run yet
  if (error.code === '42703' || error.code === '42P01' || /does not exist|could not find/i.test(error.message ?? '')) {
    return `Базата още не е подготвена. Пуснете lib/supabase/import-google-maps.sql в Supabase → SQL Editor. (${error.message ?? error.code})`
  }
  // Supabase answered with an HTML error page (Cloudflare 52x): the project is still starting after a pause
  if (/<!DOCTYPE|<html|\b52[0-9]\b/i.test(error.message ?? '')) {
    return 'Supabase още се стартира (след пауза отнема няколко минути). Опреснете страницата след малко.'
  }
  // network: the project URL does not answer (a free Supabase project is paused after a week without use)
  if (/fetch failed|ENOTFOUND|ECONNREFUSED|network/i.test(error.message ?? '')) {
    return 'Supabase не отговаря. Проверете в supabase.com дали проектът не е на пауза (безплатните се спират след седмица без ползване).'
  }
  return `Грешка в базата: ${error.message ?? error.code}`
}
