"use client";

import React, { useState } from "react";
import { Check, Sparkles, Shield, Zap } from "lucide-react";

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    { name: "Free", units: "1–2 Units", price: "₹0", features: ["Up to 2 Units", "Manual Rent Ledger", "Basic Email Alerts", "Standard Agreement Storage"], cta: "Current Plan" },
    { name: "Starter", units: "Up to 10 Units", price: billingCycle === "annual" ? "₹199" : "₹249", features: ["Up to 10 Units", "Automated WhatsApp Reminders", "Agreement Renewal Alerts (30/15/7d)", "Digital Receipt Generator", "1-Click Rent Hike Calculator"], cta: "Upgrade to Starter", popular: true },
    { name: "Pro", units: "Up to 50 Units", price: billingCycle === "annual" ? "₹639" : "₹799", features: ["Up to 50 Units", "Everything in Starter", "Tenant Verification Vault (Police KYC)", "Per-Property P&L Financial Ledger", "UPI Auto-Pay Collection Gateway"], cta: "Upgrade to Pro" },
    { name: "Business", units: "50+ Units", price: "Custom", features: ["Unlimited Units", "Dedicated WhatsApp API Token", "Custom Legal e-Stamp Integration", "GST Tax & Tally Export"], cta: "Contact Sales" }
  ];

  const handleRazorpayCheckout = (planName: string) => {
    if (planName === "Free") return;
    setLoadingPlan(planName);
    setTimeout(() => {
      setLoadingPlan(null);
      alert(`🎉 Payment Successful via Razorpay (Test Mode)! Upgraded to ${planName} Plan (${billingCycle})`);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
          SCALABLE LANDLORD PRICING
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-slate-100 flex items-center justify-center gap-2">
          Choose Your RentNest Landlord Plan <Zap className="w-6 h-6 text-amber-400" />
        </h1>
        <p className="text-sm text-slate-400">
          Scale your rental portfolio seamlessly. Upgrade anytime with instant Razorpay activation.
        </p>

        <div className="pt-4 flex justify-center">
          <div className="p-1 rounded-full bg-slate-900 border border-slate-800 flex items-center">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingCycle === "monthly" ? "bg-emerald-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingCycle === "annual" ? "bg-emerald-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Annual (20% OFF) 🎁
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl bg-slate-900/75 border backdrop-blur-md shadow-lg flex flex-col justify-between relative transition-all ${
              p.popular ? "border-emerald-500 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 shadow-emerald-500/10" : "border-slate-800 hover:border-slate-700"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                MOST POPULAR
              </span>
            )}

            <div>
              <h3 className="font-heading font-extrabold text-xl text-slate-100">{p.name}</h3>
              <div className="text-xs text-teal-400 font-semibold mt-1">{p.units}</div>

              <div className="font-heading font-extrabold text-3xl text-slate-100 mt-4">
                {p.price}
                {p.price !== "Custom" && <span className="text-xs font-normal text-slate-400">/mo</span>}
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleRazorpayCheckout(p.name)}
              disabled={loadingPlan === p.name}
              className={`mt-8 w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5 ${
                p.popular
                  ? "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              }`}
            >
              {loadingPlan === p.name ? (
                <span>Processing Razorpay...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{p.cta}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
