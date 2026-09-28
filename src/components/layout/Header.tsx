"use client";

import React from "react";
import { Globe, Plus, Sparkles, User } from "lucide-react";

interface HeaderProps {
  lang: "en" | "ta";
  setLang: (lang: "en" | "ta") => void;
  onOpenUpgrade?: () => void;
  onOpenAdd?: () => void;
}

export default function Header({ lang, setLang, onOpenUpgrade, onOpenAdd }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-heading font-bold text-lg text-slate-100 hidden sm:inline">
          {lang === "ta" ? "ரென்ட்நெஸ்ட் மேலாண்மை" : "RentNest Landlord Portal"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setLang(lang === "en" ? "ta" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          title="Toggle English / Tamil Interface"
        >
          <Globe className="w-3.5 h-3.5 text-teal-400" />
          <span>{lang === "en" ? "தமிழ் (TN)" : "English"}</span>
        </button>

        <button
          onClick={onOpenAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-transform active:scale-95 shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">{lang === "ta" ? "புதிய சொத்து" : "Add Property"}</span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center">
            VK
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Vijay Kumar</span>
            <span className="text-[10px] text-emerald-400 font-bold">Landlord</span>
          </div>
        </div>
      </div>
    </header>
  );
}
