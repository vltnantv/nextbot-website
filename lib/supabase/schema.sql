-- ══════════════════════════════════════════════
-- NextBot SaaS Platform — Database Schema
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ── Tenants (white-label support) ──
create table tenants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  primary_color text default '#007AFF',
  domain text unique,
  created_at timestamptz default now()
);

-- ── Users ──
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  role text not null default 'member' check (role in ('admin', 'member', 'viewer')),
  avatar_url text,
  tenant_id uuid references tenants(id) on delete set null,
  created_at timestamptz default now()
);

-- ── Bots ──
create table bots (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null default 'Neo',
  welcome_message text default 'Здравейте! Как мога да ви помогна?',
  tone text default 'professional' check (tone in ('professional', 'friendly', 'casual')),
  language text default 'bg' check (language in ('bg', 'en', 'de', 'ru')),
  industry text default 'hotel' check (industry in ('hotel', 'restaurant', 'dental', 'realestate', 'education', 'ecommerce', 'services', 'custom')),
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ── Knowledge Base ──
create table knowledge (
  id uuid primary key default uuid_generate_v4(),
  bot_id uuid not null references bots(id) on delete cascade,
  type text not null default 'text' check (type in ('text', 'faq', 'url', 'file')),
  title text not null,
  content text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- ── Conversations ──
create table conversations (
  id uuid primary key default uuid_generate_v4(),
  bot_id uuid not null references bots(id) on delete cascade,
  channel text not null default 'web' check (channel in ('whatsapp', 'messenger', 'instagram', 'web', 'email')),
  customer_name text not null default 'Visitor',
  customer_email text,
  customer_phone text,
  status text default 'active' check (status in ('active', 'waiting', 'resolved', 'archived')),
  lead_detected boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Messages ──
create table messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now()
);

-- ── Leads ──
create table leads (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  source text default 'web' check (source in ('whatsapp', 'messenger', 'instagram', 'web', 'email')),
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes text,
  conversation_id uuid references conversations(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Bookings ──
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  date date not null,
  time_slot text not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamptz default now()
);

-- ── Automations ──
create table automations (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  trigger text not null,
  actions jsonb not null default '[]',
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ── Channel Configs ──
create table channel_configs (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  channel text not null check (channel in ('whatsapp', 'messenger', 'instagram', 'web', 'email')),
  is_enabled boolean default false,
  config jsonb default '{}',
  created_at timestamptz default now(),
  unique(tenant_id, channel)
);

-- ── Settings ──
create table settings (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  key text not null,
  value text not null,
  updated_at timestamptz default now(),
  unique(tenant_id, key)
);

-- ── Indexes ──
create index idx_messages_conversation on messages(conversation_id, created_at);
create index idx_conversations_bot on conversations(bot_id, created_at desc);
create index idx_leads_tenant on leads(tenant_id, created_at desc);
create index idx_leads_status on leads(tenant_id, status);
create index idx_bookings_tenant_date on bookings(tenant_id, date);
create index idx_knowledge_bot on knowledge(bot_id);

-- ── RLS Policies ──
alter table tenants enable row level security;
alter table users enable row level security;
alter table bots enable row level security;
alter table knowledge enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table leads enable row level security;
alter table bookings enable row level security;
alter table automations enable row level security;
alter table channel_configs enable row level security;
alter table settings enable row level security;

-- Users can read their own profile
create policy "Users read own profile" on users
  for select using (auth.uid() = id);

-- Users can read their tenant's data
create policy "Tenant members read bots" on bots
  for all using (tenant_id in (select tenant_id from users where id = auth.uid()));

create policy "Tenant members manage knowledge" on knowledge
  for all using (bot_id in (select id from bots where tenant_id in (select tenant_id from users where id = auth.uid())));

create policy "Tenant members manage conversations" on conversations
  for all using (bot_id in (select id from bots where tenant_id in (select tenant_id from users where id = auth.uid())));

create policy "Tenant members read messages" on messages
  for all using (conversation_id in (select id from conversations where bot_id in (select id from bots where tenant_id in (select tenant_id from users where id = auth.uid()))));

create policy "Tenant members manage leads" on leads
  for all using (tenant_id in (select tenant_id from users where id = auth.uid()));

create policy "Tenant members manage bookings" on bookings
  for all using (tenant_id in (select tenant_id from users where id = auth.uid()));

create policy "Tenant members manage automations" on automations
  for all using (tenant_id in (select tenant_id from users where id = auth.uid()));

create policy "Tenant members manage channels" on channel_configs
  for all using (tenant_id in (select tenant_id from users where id = auth.uid()));

create policy "Tenant members manage settings" on settings
  for all using (tenant_id in (select tenant_id from users where id = auth.uid()));

-- Allow public inserts for conversations and messages (chatbot usage)
create policy "Public can create conversations" on conversations
  for insert with check (true);

create policy "Public can insert messages" on messages
  for insert with check (true);

create policy "Public can read bot conversations" on conversations
  for select using (true);

create policy "Public can read messages" on messages
  for select using (true);

-- ── Seed Data ──
insert into tenants (id, name, primary_color) values
  ('00000000-0000-0000-0000-000000000001', 'NextBot Demo', '#007AFF');

insert into bots (id, tenant_id, name, industry, welcome_message) values
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'Neo', 'hotel', 'Здравейте! Аз съм Neo, вашият AI асистент. Как мога да ви помогна? 😊');

-- Sample knowledge
insert into knowledge (bot_id, type, title, content) values
  ('00000000-0000-0000-0000-000000000010', 'faq', 'Работно време', 'Рецепцията работи 24/7. Ресторантът: 07:00-22:00. SPA: 08:00-22:00.'),
  ('00000000-0000-0000-0000-000000000010', 'faq', 'Стаи и цени', 'Single: от 80лв, Double: от 120лв, Family: от 170лв, Suite: от 250лв. Всички с балкон, WiFi, климатик.'),
  ('00000000-0000-0000-0000-000000000010', 'faq', 'Паркинг', 'Безплатен охраняем паркинг с 50 места и 4 ел. зарядни станции.'),
  ('00000000-0000-0000-0000-000000000010', 'text', 'За хотела', 'Хотел Therme е 4-звезден хотел в Банско с SPA център, ресторант и конферентни зали. Разполага с 80 стаи и апартаменти.');

-- Sample leads
insert into leads (tenant_id, name, email, phone, source, status, notes) values
  ('00000000-0000-0000-0000-000000000001', 'Иван Петров', 'ivan.petrov@email.com', '+359888123456', 'whatsapp', 'qualified', 'Интересува се от фамилна стая за юли'),
  ('00000000-0000-0000-0000-000000000001', 'Maria Schmidt', 'maria.s@email.de', '+491234567890', 'messenger', 'contacted', 'SPA packages inquiry'),
  ('00000000-0000-0000-0000-000000000001', 'John Smith', 'john@company.com', '+441234567890', 'web', 'new', 'Corporate retreat for 12 people'),
  ('00000000-0000-0000-0000-000000000001', 'Анна Иванова', 'anna@mail.ru', '+79001234567', 'instagram', 'converted', 'Редовен гост, VIP');

-- Sample bookings
insert into bookings (tenant_id, customer_name, customer_email, date, time_slot, status) values
  ('00000000-0000-0000-0000-000000000001', 'Иван Петров', 'ivan.petrov@email.com', '2026-03-15', '14:00', 'confirmed'),
  ('00000000-0000-0000-0000-000000000001', 'Maria Schmidt', 'maria.s@email.de', '2026-03-22', '14:00', 'pending'),
  ('00000000-0000-0000-0000-000000000001', 'John Smith', 'john@company.com', '2026-04-10', '10:00', 'confirmed');

-- Sample automations
insert into automations (tenant_id, name, trigger, actions, is_active) values
  ('00000000-0000-0000-0000-000000000001', 'New Booking Confirmation', 'booking.created', '[{"type":"send_email","config":{"template":"booking_confirmation"}},{"type":"notify_human","config":{"channel":"slack"}}]', true),
  ('00000000-0000-0000-0000-000000000001', 'Lead Capture', 'conversation.lead_detected', '[{"type":"create_lead","config":{}},{"type":"send_email","config":{"template":"lead_welcome"}}]', true),
  ('00000000-0000-0000-0000-000000000001', 'Check-in Reminder', 'booking.24h_before', '[{"type":"send_sms","config":{"template":"checkin_reminder"}},{"type":"send_email","config":{"template":"checkin_info"}}]', true);

-- Channel configs
insert into channel_configs (tenant_id, channel, is_enabled) values
  ('00000000-0000-0000-0000-000000000001', 'web', true),
  ('00000000-0000-0000-0000-000000000001', 'whatsapp', true),
  ('00000000-0000-0000-0000-000000000001', 'messenger', true),
  ('00000000-0000-0000-0000-000000000001', 'instagram', false),
  ('00000000-0000-0000-0000-000000000001', 'email', true);
