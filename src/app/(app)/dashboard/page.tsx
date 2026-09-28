"use client";

import React from "react";
import { 
  Building2, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  FileCheck
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { title: "Active Units", value: "15 Units", subtext: "3 Properties (Tirunelveli & Chennai)", icon: Building2, color: "text-indigo-400", bg: "bg-indigo-500/15" },
    { title: "Occupancy Rate", value: "87%", subtext: "13 Occupied / 2 Vacant", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/15" },
    { title: "Collected This Month", value: "₹2,27,000", subtext: "UPI & Direct NEFT", icon: DollarSign, color: "text-teal-400", bg: "bg-teal-500/15" },
    { title: "Pending Dues", value: "₹45,000", subtext: "3 Tenants Pending", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/15" },
  ];

  const pendingItems = [
    { id: "1", name: "Santhosh Raj", unit: "Flat 102 - Sri Lakshmi Towers", amount: "₹15,000", dueDate: "2026-10-05", phone: "+91 94432 10987" },
    { id: "2", name: "Karthik Subramanian", unit: "Flat 103 - Sri Lakshmi Towers", amount: "₹13,000", dueDate: "2026-09-25", phone: "+91 98940 55123", overdue: true },
    { id: "3", name: "Meenakshi Nathan", unit: "Villa 02 - Green Meadows", amount: "₹36,000", dueDate: "2026-10-05", phone: "+91 91760 44332" }
  ];

  const expiringAgreements = [
    { id: "a1", name: "Ramesh Kumar", unit: "Flat 101 - Sri Lakshmi Towers", expiry: "2026-10-01", days: 3, hike: 10, newRent: "₹15,400" },
    { id: "a2", name: "Karthik Subramanian", unit: "Flat 103 - Sri Lakshmi Towers", expiry: "2026-09-15", days: -13, hike: 8, newRent: "₹14,040", expired: true }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Alert */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-teal-400 tracking-wider uppercase">
            PORTFOLIO OVERVIEW • TAMIL NADU UNITS
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100 mt-1">
            Executive Landlord Dashboard 🏢
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            You have <strong className="text-amber-300">3 pending rent collections</strong> and <strong className="text-rose-400">2 expiring agreements</strong> this month.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/rent" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Rent Ledger</span>
          </Link>
          <Link href="/agreements" className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-transform active:scale-95 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Agreements</span>
          </Link>
        </div>
      </div>

      {/* Grid of Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg flex items-center gap-4 hover:border-slate-700 transition-all">
              <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-400">{s.title}</h3>
                <div className="font-heading font-extrabold text-2xl text-slate-100 mt-0.5">{s.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Rent Collections */}
        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-heading font-bold text-lg text-slate-100">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Pending Rent Collections</span>
            </div>
            <Link href="/rent" className="text-xs font-semibold text-emerald-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-slate-100">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.unit}</div>
                  <div className={`text-xs font-semibold mt-1 ${item.overdue ? "text-rose-400" : "text-amber-400"}`}>
                    Due Date: {item.dueDate} {item.overdue ? "(OVERDUE)" : "(Pending)"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-heading font-extrabold text-lg text-rose-400">{item.amount}</div>
                  <div className="flex gap-2 mt-2">
                    <a 
                      href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(item.name)},%20this%20is%20a%20reminder%20regarding%20rent%20due.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Remind</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement Renewal Pipeline */}
        <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-heading font-bold text-lg text-slate-100">
              <FileCheck className="w-5 h-5 text-indigo-400" />
              <span>Agreement Renewal Pipeline</span>
            </div>
            <Link href="/agreements" className="text-xs font-semibold text-indigo-400 hover:underline">
              Manage All
            </Link>
          </div>

          <div className="space-y-3">
            {expiringAgreements.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-slate-100">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.unit}</div>
                  <div className="text-xs font-semibold text-amber-300 mt-1">
                    Expires: {item.expiry} ({item.days > 0 ? `${item.days} days left` : "Expired"})
                  </div>
                  <div className="text-[11px] text-teal-400 font-semibold mt-0.5">
                    Suggested +{item.hike}% Hike (New Rent: {item.newRent})
                  </div>
                </div>

                <Link 
                  href="/agreements"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition-transform"
                >
                  1-Click Renew
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
