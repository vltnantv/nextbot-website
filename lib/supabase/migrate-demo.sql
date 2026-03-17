-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- Creates tables needed for the demo-live page persistence

-- Conversations table
create table if not exists conversations (
  id uuid primary key default extensions.uuid_generate_v4(),
  channel text not null default 'web',
  customer_name text not null default 'Visitor',
  customer_email text,
  customer_phone text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages table
create table if not exists messages (
  id uuid primary key default extensions.uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

-- Leads table
create table if not exists leads (
  id uuid primary key default extensions.uuid_generate_v4(),
  name text not null,
  email text,
  phone text,
  source text default 'web',
  status text default 'new',
  notes text,
  conversation_id uuid references conversations(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Knowledge table
create table if not exists knowledge (
  id uuid primary key default extensions.uuid_generate_v4(),
  bot_id uuid,
  type text default 'text',
  title text not null,
  content text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_messages_conversation on messages(conversation_id, created_at);
create index if not exists idx_leads_created on leads(created_at desc);
create index if not exists idx_knowledge_bot on knowledge(bot_id);

-- Allow public access for demo (no auth required)
alter table conversations enable row level security;
alter table messages enable row level security;
alter table leads enable row level security;
alter table knowledge enable row level security;

-- Public policies for demo usage
create policy "Public insert conversations" on conversations for insert with check (true);
create policy "Public read conversations" on conversations for select using (true);
create policy "Public insert messages" on messages for insert with check (true);
create policy "Public read messages" on messages for select using (true);
create policy "Public insert leads" on leads for insert with check (true);
create policy "Public read leads" on leads for select using (true);
create policy "Public insert knowledge" on knowledge for insert with check (true);
create policy "Public read knowledge" on knowledge for select using (true);
