-- CORE: import from Google Maps (gosom/google-maps-scraper) + „Не ми звънете“ list.
-- Run once in Supabase → SQL Editor. Safe to run again (everything is "if not exists" / "if exists").

-- 1. Extra lead fields from Google Maps
alter table leads add column if not exists phone_normalized text;   -- +359… (lib/phone.ts)
alter table leads add column if not exists address text;
alter table leads add column if not exists website text;
alter table leads add column if not exists rating numeric(2,1);
alter table leads add column if not exists review_count integer;
alter table leads add column if not exists category text;

-- one lead per phone number
create unique index if not exists leads_phone_normalized_key on leads (phone_normalized) where phone_normalized is not null;

-- 2. Allow source 'google_maps' (the full schema has a check on source; the demo schema has none)
alter table leads drop constraint if exists leads_source_check;
alter table leads add constraint leads_source_check
  check (source in ('whatsapp', 'messenger', 'instagram', 'web', 'email', 'google_maps')) not valid;
-- „not valid“: existing rows are not re-checked (the demo schema allowed any source)

-- 3. „Не ми звънете“: numbers that must never be imported (or called) again
create table if not exists do_not_call (
  phone text primary key,              -- +359… (normalized)
  reason text,
  created_at timestamptz default now()
);
alter table do_not_call enable row level security;
-- no policies on purpose: only the server (service role key) can read or write it

-- 4. Close public access to leads. The demo schema (migrate-demo.sql) let anyone with the public key read
--    and insert leads. The site writes leads only from the server, which is not affected by this.
drop policy if exists "Public read leads" on leads;
drop policy if exists "Public insert leads" on leads;
