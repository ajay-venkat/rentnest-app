-- seed.sql: Realistic Seed Data for Indian Landlords (Tamil Nadu Focus)

-- Note: Seed data inserts standard properties and mock records for testing.
insert into plan_limits (plan, max_units, whatsapp_reminders, verification_workflow, reports)
values
  ('free', 2, false, false, false),
  ('starter', 10, true, false, false),
  ('pro', 50, true, true, true),
  ('business', null, true, true, true)
on conflict (plan) do update set
  max_units = excluded.max_units,
  whatsapp_reminders = excluded.whatsapp_reminders,
  verification_workflow = excluded.verification_workflow,
  reports = excluded.reports;
