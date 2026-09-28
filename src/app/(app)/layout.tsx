"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"en" | "ta">("en");

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar lang={lang} onOpenUpgrade={() => alert("Opening Subscription Sheet")} />

      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        <Header 
          lang={lang} 
          setLang={setLang} 
          onOpenAdd={() => alert("Add New Property Dialog")}
          onOpenUpgrade={() => alert("Opening Upgrade Sheet")}
        />

        <main className="flex-1 p-4 sm:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <BottomNav onQuickAction={() => alert("Quick Add Action")} />
    </div>
  );
}
