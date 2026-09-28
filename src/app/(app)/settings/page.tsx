"use client";

import React, { useState } from "react";
import { Settings, Globe, Shield, Lock, Download, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-100">
          Account Settings & Privacy Vault
        </h1>
        <p className="text-sm text-slate-400">
          Configure regional language, data exports, and tenant privacy compliance
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-6">
        <div>
          <h2 className="font-heading font-bold text-lg text-slate-100 mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-400" />
            <span>Language Preference / மொழி தேர்வு</span>
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                language === "en" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-slate-950 border-slate-800 text-slate-400"
              }`}
            >
              English (Default)
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                language === "ta" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-slate-950 border-slate-800 text-slate-400"
              }`}
            >
              தமிழ் (Tamil Interface)
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <h2 className="font-heading font-bold text-lg text-slate-100 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>Tenant Data Privacy & DPDP Compliance</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tenant documents and Aadhaar/PAN metadata are encrypted at rest via private Supabase Row Level Security (RLS) buckets. Full Aadhaar numbers are never stored on the server.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4">
          <button 
            onClick={() => alert("Downloading full JSON account export...")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Export Account Data (JSON)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
