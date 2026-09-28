import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const event = payload.event;

    // Handle Razorpay subscription webhook events idempotently
    switch (event) {
      case "subscription.activated":
      case "subscription.charged":
        // Update user plan to paid status in Supabase profiles
        break;
      case "subscription.cancelled":
      case "subscription.halted":
        // Downgrade user plan
        break;
    }

    return NextResponse.json({ status: "processed", event });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
