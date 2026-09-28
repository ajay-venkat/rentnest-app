"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  LayoutDashboard, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  Users, 
  Bell, 
  BarChart3, 
  Sparkles,
  TrendingUp,
  Settings
} from "lucide-react";

interface SidebarProps {
  lang: string;
  onOpenUpgrade?: () => void;
}

export default function Sidebar({ lang, onOpenUpgrade }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: lang === "ta" ? "முகப்பு (Dashboard)" : "Executive Dashboard", icon: LayoutDashboard },
    { href: "/properties", label: lang === "ta" ? "சொத்துக்கள் (Properties)" : "Properties Portfolio", icon: Building2 },
    { href: "/tenants", label: lang === "ta" ? "வாடகைதாரர்கள் (Tenants)" : "Tenants Directory", icon: Users },
    { href: "/rent", label: lang === "ta" ? "வாடகை கணக்கு (Rent Tracker)" : "Rent Tracker & Ledger", icon: CreditCard },
    { href: "/agreements", label: lang === "ta" ? "ஒப்பந்தங்கள் (Agreements)" : "Agreement Manager", icon: FileText },
    { href: "/verification", label: lang === "ta" ? "சரிபார்ப்பு (Verification)" : "Tenant Verification", icon: ShieldCheck },
    { href: "/reminders", label: lang === "ta" ? "நினைவூட்டல் (Reminders)" : "Automated Reminders", icon: Bell },
    { href: "/reports", label: lang === "ta" ? "அறிக்கைகள் (Reports)" : "Financial Reports", icon: BarChart3 },
    { href: "/billing", label: lang === "ta" ? "சந்தா (Billing)" : "Subscription & Billing", icon: TrendingUp },
    { href: "/settings", label: lang === "ta" ? "அமைப்புகள் (Settings)" : "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 z-50 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 p-6 text-slate-100">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-heading font-extrabold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            RentNest
          </h2>
          <span className="text-[10px] font-bold tracking-widest text-emerald-400">PROPPORTFOLIO</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 mt-6 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
        <h4 className="font-bold text-xs text-emerald-300 mb-1">Starter Landlord Plan</h4>
        <p className="text-[11px] text-slate-400 mb-3">Using 2 / 2 free units quota. Upgrade for automated WhatsApp & legal e-Stamp.</p>
        <button
          onClick={onOpenUpgrade}
          className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-transform active:scale-95 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Upgrade Plan</span>
        </button>
      </div>
    </aside>
  );
}
