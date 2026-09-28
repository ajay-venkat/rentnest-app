"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Clock, Upload, FileText } from "lucide-react";

export default function VerificationPage() {
  const items = [
    { tenant: "Ramesh Kumar", unit: "Flat 101 - Sri Lakshmi Towers", aadhaar: "Verified (Aadhaar)", police: "Verified", employer: "Salary Slip Uploaded" },
    { tenant: "Santhosh Raj", unit: "Flat 102 - Sri Lakshmi Towers", aadhaar: "Verified (PAN)", police: "Verified", employer: "ITR Copy Uploaded" },
    { tenant: "Karthik Subramanian", unit: "Flat 103 - Sri Lakshmi Towers", aadhaar: "Verified (Aadhaar)", police: "Pending Clearance", employer: "Offer Letter Uploaded" },
    { tenant: "Dr. Arvind Swamy", unit: "Villa 01 - Green Meadows", aadhaar: "Verified (Passport)", police: "Verified", employer: "Medical Registration Validated" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-100">
          Tenant Verification & Police Clearance Vault
        </h1>
        <p className="text-sm text-slate-400">
          Aadhaar/PAN KYC document checklist, employment proof, and police verification status
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200 border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="p-3.5">Tenant & Unit</th>
                <th className="p-3.5">ID Proof (Aadhaar/PAN)</th>
                <th className="p-3.5">Employment Document</th>
                <th className="p-3.5">Police Verification</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-slate-100">{item.tenant}</div>
                    <div className="text-slate-400 text-[11px]">{item.unit}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> {item.aadhaar}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <FileText className="w-3 h-3" /> {item.employer}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      item.police === "Verified" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}>
                      {item.police === "Verified" ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.police}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button 
                      onClick={() => alert(`Police verification application triggered for ${item.tenant}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                    >
                      Trigger Police KYC
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
