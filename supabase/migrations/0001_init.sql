-- 0001_init.sql: Core Database Schema for RentNest
create extension if not exists pgcrypto;

create type unit_status   as enum ('vacant','occupied');
create type lease_status  as enum ('draft','active','expiring','expired','terminated','renewed');
create type charge_status as enum ('pending','partial','paid','overdue');
create type pay_mode      as enum ('upi','cash','bank','cheque','other');
create type verify_status as enum ('not_started','pending','verified','rejected');

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  business_name text,
  language text not null default 'en',
  plan text not null default 'free',
  plan_status text not null default 'active',
  razorpay_customer_id text,
  razorpay_subscription_id text,
  plan_renews_at timestamptz,
  created_at timestamptz not null default now()
);

create table plan_limits (
  plan text primary key,
  max_units int,            -- null = unlimited
  whatsapp_reminders boolean not null default false,
  verification_workflow boolean not null default false,
  reports boolean not null default false
);

insert into plan_limits values
 ('free', 2, false, false, false),
 ('starter', 10, true, false, false),
 ('pro', 50, true, true, true),
 ('business', null, true, true, true)
 on conflict (plan) do nothing;

create table properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  name text not null,
  property_type text,
  address_line text,
  city text,
  state text default 'Tamil Nadu',
  pincode text,
  photo_path text,
  notes text,
  created_at timestamptz not null default now()
);

create table units (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  label text not null,
  rent_amount numeric(12,2) not null default 0,
  deposit_amount numeric(12,2) not null default 0,
  status unit_status not null default 'vacant',
  created_at timestamptz not null default now(),
  unique (property_id, label)
);

create table tenants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  full_name text not null,
  phone text not null,
  email text,
  whatsapp_opt_in boolean not null default true,
  photo_path text,
  id_type text,
  id_last4 text,   -- NEVER store full Aadhaar/PAN numbers for privacy & DPDP compliance
  occupation text,
  employer text,
  emergency_name text,
  emergency_phone text,
  notes text,
  created_at timestamptz not null default now()
);

create table leases (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  unit_id uuid not null references units(id) on delete restrict,
  tenant_id uuid not null references tenants(id) on delete restrict,
  start_date date not null,
  end_date date not null,
  rent_amount numeric(12,2) not null,
  deposit_amount numeric(12,2) not null default 0,
  due_day int not null default 5 check (due_day between 1 and 28),
  lock_in_months int not null default 0,
  escalation_percent numeric(5,2) not null default 5,
  status lease_status not null default 'active',
  agreement_path text,
  signed_path text,
  renewed_from uuid references leases(id),
  terminated_on date,
  created_at timestamptz not null default now(),
  check (end_date > start_date)
);

create unique index if not exists one_active_lease_per_unit on leases(unit_id) where status in ('active','expiring');

create table rent_charges (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  lease_id uuid not null references leases(id) on delete cascade,
  period date not null,
  due_date date not null,
  amount numeric(12,2) not null,
  amount_paid numeric(12,2) not null default 0,
  status charge_status not null default 'pending',
  unique (lease_id, period)
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  charge_id uuid not null references rent_charges(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  paid_on date not null default current_date,
  mode pay_mode not null default 'upi',
  reference text,
  receipt_no text unique,
  created_at timestamptz not null default now()
);

create table verification_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  kind text not null check (kind in ('photo','id_proof','address_proof','employer','police_verification')),
  status verify_status not null default 'not_started',
  document_path text,
  notes text,
  updated_at timestamptz not null default now(),
  unique (tenant_id, kind)
);

create table reminder_settings (
  owner_id uuid primary key default auth.uid() references profiles(id) on delete cascade,
  rent_due_days_before int[] not null default '{3,1}',
  rent_overdue_days_after int[] not null default '{1,3,7}',
  lease_expiry_days_before int[] not null default '{30,15,7}',
  channels text[] not null default '{whatsapp_link,email}',
  template_rent_due text not null default 'Hi {{tenant}}, your rent of ₹{{amount}} for {{unit}} is due on {{due_date}}. Pay via UPI: {{upi_id}}. Thank you!',
  template_rent_overdue text not null default 'Hi {{tenant}}, your rent of ₹{{amount}} for {{unit}} was due on {{due_date}} and is still pending. Kindly pay at the earliest.',
  template_lease_expiry text not null default 'Hi {{tenant}}, your rental agreement for {{unit}} ends on {{end_date}}. Let us discuss the renewal.',
  upi_id text,
  enabled boolean not null default true
);

create table reminder_log (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  kind text not null,
  target_id uuid not null,
  channel text not null,
  status text not null,
  error text,
  message text,
  dedupe_key text not null unique,
  created_at timestamptz not null default now()
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  category text not null,
  amount numeric(12,2) not null check (amount > 0),
  spent_on date not null default current_date,
  note text
);
