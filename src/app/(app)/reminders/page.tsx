"use client";

import React, { useState } from "react";
import { Bell, MessageCircle, Mail, Send, CheckCheck } from "lucide-react";

export default function RemindersPage() {
  const [template, setTemplate] = useState("pre_due");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-100">
          Automated Reminders & Dispatch Engine
        </h1>
        <p className="text-sm text-slate-400">
          Multi-channel notification setup (WhatsApp Cloud API, Deep-link queue, Email fallbacks)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
          <h2 className="font-heading font-bold text-lg text-slate-100">Notification Channels Config</h2>
          
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-bold text-sm text-slate-100">WhatsApp Deep-Links (Zero-cost)</div>
                  <div className="text-xs text-slate-400">Generates 1-tap wa.me link queue for instant sending</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Active</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="font-bold text-sm text-slate-100">Resend Email Delivery</div>
                  <div className="text-xs text-slate-400">Sends formal HTML receipts & rent due notices</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Active</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
          <h2 className="font-heading font-bold text-lg text-slate-100">WhatsApp Template Simulator</h2>
          
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs leading-relaxed space-y-2 text-slate-200">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>RentNest WhatsApp Verified Bot</span>
              <CheckCheck className="w-4 h-4 ml-auto" />
            </div>
            <p>
              Hi Ramesh Kumar, your rent payment of ₹14,000 for Flat 101 - Sri Lakshmi Towers is due on 05 Oct 2026. Please remit via UPI: 9840123456@okicici. Thank you!
            </p>
          </div>

          <button 
            onClick={() => alert("WhatsApp reminder dispatched!")}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Test Dispatch WhatsApp Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
