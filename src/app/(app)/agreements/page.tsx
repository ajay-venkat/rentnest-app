"use client";

import React, { useState } from "react";
import { FileText, FileCheck, Clock, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export default function AgreementsPage() {
  const [agreements, setAgreements] = useState([
    {
      id: "agr-101",
      tenant: "Ramesh Kumar",
      unit: "Flat 101 - Sri Lakshmi Towers",
      startDate: "2025-11-01",
      expiryDate: "2026-10-01",
      rent: 14000,
      deposit: 84000,
      status: "Expiring Soon",
      days: 3,
      hike: 10,
      newRent: 15400,
      stamp: "₹100 e-Stamp Complete (TN Legal)",
      police: "Verified"
    },
    {
      id: "agr-102",
      tenant: "Karthik Subramanian",
      unit: "Flat 103 - Sri Lakshmi Towers",
      startDate: "2025-10-15",
      expiryDate: "2026-09-15",
      rent: 13000,
      deposit: 78000,
      status: "Expired",
      days: -13,
      hike: 8,
      newRent: 14040,
      stamp: "Pending e-Stamp Renewal",
      police: "Pending Approval"
    },
    {
      id: "agr-103",
      tenant: "Priya Sundaram",
      unit: "Flat 201 - Sri Lakshmi Towers",
      startDate: "2026-01-01",
      expiryDate: "2026-12-01",
      rent: 16000,
      deposit: 100000,
      status: "Active",
      days: 64,
      hike: 10,
      newRent: 17600,
      stamp: "₹100 e-Stamp Complete",
      police: "Verified"
    }
  ]);

  const handleRenew = (id: string) => {
    setAgreements(prev => prev.map(agr => {
      if (agr.id === id) {
        return {
          ...agr,
          status: "Active",
          rent: agr.newRent,
          days: 335,
          expiryDate: "2027-09-01",
          stamp: "₹100 e-Stamp Renewal Generated"
        };
      }
      return agr;
    }));
    alert("🎉 Agreement renewed for 11 months with automated rent hike calculation!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100">
            Agreement Manager & 1-Click Renewal
          </h1>
          <p className="text-sm text-slate-400">
            11-month lease expirations, automated rent hike escalation, and e-Stamp paper duty status
          </p>
        </div>

        <button 
          onClick={() => alert("Draft New Agreement Wizard")}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition-transform flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Draft New Agreement</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200 border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="p-3.5">Tenant & Unit</th>
                <th className="p-3.5">Lease Expiry</th>
                <th className="p-3.5">Rent & Deposit</th>
                <th className="p-3.5">Renewal Status</th>
                <th className="p-3.5">Hike Escalation</th>
                <th className="p-3.5">Legal e-Stamp</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {agreements.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-slate-100">{item.tenant}</div>
                    <div className="text-slate-400 text-[11px]">{item.unit}</div>
                  </td>
                  <td className="p-3.5">
                    <div>Start: <span className="font-medium text-slate-300">{item.startDate}</span></div>
                    <div>Expires: <span className="font-bold text-amber-300">{item.expiryDate}</span></div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-heading font-extrabold text-sm text-slate-100">₹{item.rent.toLocaleString("en-IN")}/mo</div>
                    <div className="text-[10px] text-slate-400">Deposit: ₹{item.deposit.toLocaleString("en-IN")}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      item.status === "Active" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" :
                      item.status === "Expiring Soon" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" :
                      "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}>
                      {item.status === "Active" && <FileCheck className="w-3 h-3" />}
                      {item.status === "Expiring Soon" && <Clock className="w-3 h-3" />}
                      {item.status === "Expired" && <AlertTriangle className="w-3 h-3" />}
                      {item.status} ({item.days > 0 ? `${item.days}d left` : "Expired"})
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 inline-block">
                      <div className="text-[10px] text-indigo-300 font-bold">+{item.hike}% Hike</div>
                      <div className="font-extrabold text-xs text-emerald-400">₹{item.newRent.toLocaleString("en-IN")}</div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="text-[11px] font-semibold text-slate-200">{item.stamp}</div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{item.police}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleRenew(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-transform"
                    >
                      1-Click Renew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
