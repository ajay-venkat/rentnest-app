-- 0003_functions_triggers.sql: Database Triggers & Stored Functions for RentNest

-- 1. Handle New User Signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, language, plan)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Landlord'),
    new.phone,
    'en',
    'free'
  )
  on conflict (id) do nothing;

  insert into public.reminder_settings (owner_id)
  values (new.id)
  on conflict (owner_id) do nothing;

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Enforce Unit Limit per Subscription Plan
create or replace function public.enforce_unit_limit()
returns trigger
language plpgsql
security definer
as $$
declare
  v_current_count int;
  v_user_plan text;
  v_max_allowed int;
begin
  select plan into v_user_plan from profiles where id = new.owner_id;
  if v_user_plan is null then
    v_user_plan := 'free';
  end if;

  select max_units into v_max_allowed from plan_limits where plan = v_user_plan;

  if v_max_allowed is not null then
    select count(*) into v_current_count from units where owner_id = new.owner_id;
    if v_current_count >= v_max_allowed then
      raise exception 'PLAN_LIMIT_UNITS: You have reached the maximum allowed units (% units) for your % plan. Please upgrade to add more units.', v_max_allowed, v_user_plan;
    end if;
  end if;

  return new;
end;
$$;

create or replace trigger check_unit_limit_before_insert
  before insert on units
  for each row execute function public.enforce_unit_limit();

-- 3. Sync Unit Status on Lease changes
create or replace function public.sync_unit_status()
returns trigger
language plpgsql
security definer
as $$
begin
  if (TG_OP = 'INSERT' or TG_OP = 'UPDATE') then
    if new.status in ('active', 'expiring') then
      update units set status = 'occupied' where id = new.unit_id;
    elsif new.status in ('expired', 'terminated', 'renewed') then
      update units set status = 'vacant' where id = new.unit_id;
    end if;
  end if;
  return new;
end;
$$;

create or replace trigger sync_unit_status_on_lease
  after insert or update on leases
  for each row execute function public.sync_unit_status();

-- 4. Recompute Rent Charge Status on Payment Insert/Delete
create or replace function public.refresh_charge_status()
returns trigger
language plpgsql
security definer
as $$
declare
  v_target_charge_id uuid;
  v_total_paid numeric(12,2);
  v_charge_amount numeric(12,2);
  v_due_date date;
begin
  if (TG_OP = 'DELETE') then
    v_target_charge_id := old.charge_id;
  else
    v_target_charge_id := new.charge_id;
  end if;

  select coalesce(sum(amount), 0) into v_total_paid from payments where charge_id = v_target_charge_id;
  select amount, due_date into v_charge_amount, v_due_date from rent_charges where id = v_target_charge_id;

  update rent_charges
  set amount_paid = v_total_paid,
      status = case
        when v_total_paid >= v_charge_amount then 'paid'::charge_status
        when v_total_paid > 0 then 'partial'::charge_status
        when v_due_date < current_date then 'overdue'::charge_status
        else 'pending'::charge_status
      end
  where id = v_target_charge_id;

  return null;
end;
$$;

create or replace trigger refresh_charge_status_trigger
  after insert or delete or update on payments
  for each row execute function public.refresh_charge_status();
