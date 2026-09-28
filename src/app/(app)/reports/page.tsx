"use client";

import React from "react";
import { BarChart3, Download, TrendingUp, DollarSign } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100">
            Financial Reports & Per-Property P&L
          </h1>
          <p className="text-sm text-slate-400">
            Income vs expense analytics, vacancy trends, and tax export reports (Pro Tier)
          </p>
        </div>

        <button 
          onClick={() => alert("Downloading PDF Financial Summary")}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-transform flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Export P&L PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg">
          <div className="text-xs text-slate-400 font-medium">YTD Gross Revenue</div>
          <div className="font-heading font-extrabold text-2xl text-emerald-400 mt-1">₹28,45,000</div>
          <div className="text-[11px] text-emerald-300 mt-1">+12% vs last year</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Property Expenses (Maintenance)</div>
          <div className="font-heading font-extrabold text-2xl text-rose-400 mt-1">₹2,10,000</div>
          <div className="text-[11px] text-slate-400 mt-1">Plumbing, painting, tax</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Net Operating Income</div>
          <div className="font-heading font-extrabold text-2xl text-teal-300 mt-1">₹26,35,000</div>
          <div className="text-[11px] text-teal-400 mt-1">92.6% Net Profit Margin</div>
        </div>
      </div>
    </div>
  );
}
