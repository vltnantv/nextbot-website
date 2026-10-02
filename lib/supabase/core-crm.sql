-- CORE: stages, „Днес“ (next call date) and lead history.
-- Run once in Supabase → SQL Editor, AFTER import-google-maps.sql. Safe to run again.
-- Supabase runs the whole script as one transaction: if any line fails, nothing is changed.

-- 1. Stages: Нов, Звънях, Среща, Оферта, Клиент, Не сега
alter table leads drop constraint if exists leads_status_check;

-- old values from the previous dashboard → new stages; anything unknown becomes „Нов“
update leads set status = case status
    when 'contacted' then 'called'
    when 'qualified' then 'meeting'
    when 'converted' then 'client'
    when 'lost'      then 'not_now'
    else status
  end
where status in ('contacted', 'qualified', 'converted', 'lost');

update leads set status = 'new'
where status is null or status not in ('new', 'called', 'meeting', 'offer', 'client', 'not_now');

alter table leads alter column status set default 'new';
alter table leads alter column status set not null;
alter table leads add constraint leads_status_check
  check (status in ('new', 'called', 'meeting', 'offer', 'client', 'not_now'));

-- 2. Fields for the board and „Днес“
alter table leads add column if not exists next_call_at date;                       -- day only, no time
alter table leads add column if not exists last_contact_at timestamptz;             -- last „Звънях“
alter table leads add column if not exists stage_changed_at timestamptz default now();
alter table leads add column if not exists position double precision default 0;     -- order inside a column

update leads set stage_changed_at = coalesce(updated_at, created_at, now()) where stage_changed_at is null;

create index if not exists idx_leads_stage_position on leads (status, position);
create index if not exists idx_leads_next_call on leads (next_call_at) where next_call_at is not null;

-- 3. History of every lead: notes, calls, stage changes, next call date, import
create table if not exists lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  type text not null check (type in ('created', 'import', 'note', 'call', 'stage', 'next_call')),
  body text,                 -- note text, call result, reason for „Не сега“
  from_status text,          -- for type = 'stage'
  to_status text,
  next_call_at date,         -- for type = 'call' / 'next_call'
  created_at timestamptz not null default now()
);

create index if not exists idx_lead_events_lead on lead_events (lead_id, created_at desc);

alter table lead_events enable row level security;
-- no policies on purpose: only the server (service role key) can read or write it

-- 4. Start the history of the leads that already exist (once per lead)
insert into lead_events (lead_id, type, body, created_at)
select l.id,
       case when l.source = 'google_maps' then 'import' else 'created' end,
       case when l.source = 'google_maps' then 'Внесен от Google Maps' else null end,
       coalesce(l.created_at, now())
from leads l
where not exists (select 1 from lead_events e where e.lead_id = l.id and e.type in ('created', 'import'));
