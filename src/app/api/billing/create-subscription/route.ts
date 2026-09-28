import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, billingCycle } = body;

    // Simulate Razorpay Subscription ID generation
    const subscriptionId = `sub_test_${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    return NextResponse.json({
      subscriptionId,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_key_id",
      plan,
      billingCycle
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
