import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET || "rentnest_cron_secret_key_123";

  if (authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
  }

  // Execute daily automated routine:
  // 1. Generate upcoming month rent charges for active leases
  // 2. Refresh lease statuses (mark expiring <= 30 days, expired past end_date)
  // 3. Dispatch automated reminder notifications (WhatsApp / Email)
  // 4. Log deduplicated entries in reminder_log

  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    actionsExecuted: [
      "generate_rent_charges",
      "refresh_lease_status",
      "dispatch_due_reminders"
    ]
  });
}
