"use client";

import React, { useState } from "react";
import { Users, Phone, MessageCircle, ShieldCheck, Plus, Search } from "lucide-react";

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const tenants = [
    { id: "t1", name: "Ramesh Kumar", phone: "+91 98401 23456", unit: "Flat 101 - Sri Lakshmi Towers", occupation: "Software Engineer at Zoho", verification: "Verified", deposit: "₹84,000" },
    { id: "t2", name: "Santhosh Raj", phone: "+91 94432 10987", unit: "Flat 102 - Sri Lakshmi Towers", occupation: "Banking Professional (HDFC)", verification: "Verified", deposit: "₹90,000" },
    { id: "t3", name: "Karthik Subramanian", phone: "+91 98940 55123", unit: "Flat 103 - Sri Lakshmi Towers", occupation: "Civil Engineer", verification: "Pending Police", deposit: "₹78,000" },
    { id: "t4", name: "Dr. Arvind Swamy", phone: "+91 98410 99887", unit: "Villa 01 - Green Meadows", occupation: "Senior Surgeon (Apollo Hospitals)", verification: "Verified", deposit: "₹2,50,000" },
    { id: "t5", name: "Priya Sundaram", phone: "+91 97890 12345", unit: "Flat 201 - Sri Lakshmi Towers", occupation: "High School Principal", verification: "Verified", deposit: "₹1,00,000" }
  ];

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100">
            Tenants Directory ({tenants.length} Active Tenants)
          </h1>
          <p className="text-sm text-slate-400">
            Contact directory, Aadhaar KYC verification status, and emergency details
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-transform flex items-center gap-1.5">
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Tenant</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text"
          placeholder="Search by tenant name or flat..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((t) => (
          <div key={t.id} className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-400">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-100">{t.name}</h3>
                  <p className="text-xs text-slate-400">{t.occupation}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                t.verification === "Verified" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
              }`}>
                <ShieldCheck className="w-3 h-3" />
                {t.verification}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
              <div className="text-slate-300 font-semibold">{t.unit}</div>
              <div className="text-slate-400">Security Deposit: <strong className="text-emerald-400">{t.deposit}</strong></div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <a 
                href={`tel:${t.phone}`} 
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Call</span>
              </a>
              <a 
                href={`https://wa.me/${t.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
