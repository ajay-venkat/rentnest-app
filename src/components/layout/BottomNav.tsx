"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Plus, CreditCard, FileText } from "lucide-react";

interface BottomNavProps {
  onQuickAction?: () => void;
}

export default function BottomNav({ onQuickAction }: BottomNavProps) {
  const pathname = usePathname();

  const tabs = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/properties", label: "Properties", icon: Building2 },
    // Center Floating Button placeholder
    { href: "/rent", label: "Rent Ledger", icon: CreditCard },
    { href: "/agreements", label: "Agreements", icon: FileText },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2 flex items-center justify-around text-xs">
      <Link
        href="/dashboard"
        className={`flex flex-col items-center gap-1 ${
          pathname === "/dashboard" ? "text-emerald-400 font-bold" : "text-slate-400"
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        href="/properties"
        className={`flex flex-col items-center gap-1 ${
          pathname.startsWith("/properties") ? "text-emerald-400 font-bold" : "text-slate-400"
        }`}
      >
        <Building2 className="w-5 h-5" />
        <span>Properties</span>
      </Link>

      {/* Floating Action Button in Center */}
      <button
        onClick={onQuickAction}
        className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>

      <Link
        href="/rent"
        className={`flex flex-col items-center gap-1 ${
          pathname.startsWith("/rent") ? "text-emerald-400 font-bold" : "text-slate-400"
        }`}
      >
        <CreditCard className="w-5 h-5" />
        <span>Rent</span>
      </Link>

      <Link
        href="/agreements"
        className={`flex flex-col items-center gap-1 ${
          pathname.startsWith("/agreements") ? "text-emerald-400 font-bold" : "text-slate-400"
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Leases</span>
      </Link>
    </div>
  );
}
