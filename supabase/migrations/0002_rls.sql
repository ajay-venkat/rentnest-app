-- 0002_rls.sql: Row Level Security Policies for RentNest

alter table profiles enable row level security;
alter table properties enable row level security;
alter table units enable row level security;
alter table tenants enable row level security;
alter table leases enable row level security;
alter table rent_charges enable row level security;
alter table payments enable row level security;
alter table verification_items enable row level security;
alter table reminder_settings enable row level security;
alter table reminder_log enable row level security;
alter table expenses enable row level security;
alter table plan_limits enable row level security;

-- Profiles Policy
create policy "Users can view and update their own profile"
  on profiles for all
  using (id = auth.uid())
  with check (id = auth.uid());

-- Plan Limits Policy (read only for all authenticated users)
create policy "Authenticated users can view plan limits"
  on plan_limits for select
  to authenticated
  using (true);

-- Domain Tables Policies
create policy "Owners manage their properties" on properties
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage their units" on units
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage their tenants" on tenants
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage their leases" on leases
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage their rent charges" on rent_charges
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage their payments" on payments
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage tenant verification items" on verification_items
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage reminder settings" on reminder_settings
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners view reminder logs" on reminder_log
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners manage expenses" on expenses
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
