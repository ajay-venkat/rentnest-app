"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MessageCircle, 
  Receipt, 
  Download, 
  Search 
} from "lucide-react";

export default function RentTrackerPage() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [ledger, setLedger] = useState([
    { id: "led-101", tenant: "Ramesh Kumar", unit: "Flat 101 - Sri Lakshmi Towers", amount: 14000, dueDate: "2026-10-05", status: "Paid", paidDate: "2026-10-03", mode: "UPI (Google Pay)", ref: "UPI/6281940182", phone: "+91 98401 23456" },
    { id: "led-102", tenant: "Santhosh Raj", unit: "Flat 102 - Sri Lakshmi Towers", amount: 15000, dueDate: "2026-10-05", status: "Pending", paidDate: "-", mode: "-", ref: "-", phone: "+91 94432 10987" },
    { id: "led-103", tenant: "Karthik Subramanian", unit: "Flat 103 - Sri Lakshmi Towers", amount: 13000, dueDate: "2026-09-25", status: "Overdue", paidDate: "-", mode: "-", ref: "-", phone: "+91 98940 55123" },
    { id: "led-104", tenant: "Priya Sundaram", unit: "Flat 201 - Sri Lakshmi Towers", amount: 16000, dueDate: "2026-10-05", status: "Paid", paidDate: "2026-10-01", mode: "Bank Transfer (NEFT)", ref: "HDFC91028301", phone: "+91 97890 12345" },
    { id: "led-105", tenant: "Dr. Arvind Swamy", unit: "Villa 01 - Green Meadows", amount: 38000, dueDate: "2026-10-01", status: "Paid", paidDate: "2026-09-30", mode: "UPI (PhonePe)", ref: "UPI/330192830", phone: "+91 98410 99887" },
    { id: "led-106", tenant: "Meenakshi Nathan", unit: "Villa 02 - Green Meadows", amount: 36000, dueDate: "2026-10-05", status: "Pending", paidDate: "-", mode: "-", ref: "-", phone: "+91 91760 44332" }
  ]);

  const handleMarkPaid = (id: string) => {
    setLedger(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: "Paid",
          paidDate: new Date().toISOString().split('T')[0],
          mode: "UPI Instant",
          ref: `UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}`
        };
      }
      return item;
    }));
  };

  const filteredLedger = ledger.filter(item => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesSearch = item.tenant.toLowerCase().includes(searchTerm.toLowerCase()) || item.unit.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100">
            Rent Tracker & Ledger
          </h1>
          <p className="text-sm text-slate-400">
            Monthly collection ledger, automated WhatsApp dispatch & payment receipts
          </p>
        </div>

        <button 
          onClick={() => alert("Ledger exported to CSV!")}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 backdrop-blur-md shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            {["All", "Paid", "Pending", "Overdue"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === f
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:bg-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter tenant or flat..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200 border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="p-3.5">Tenant & Unit</th>
                <th className="p-3.5">Rent Amount</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Payment Ref</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLedger.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-slate-100">{item.tenant}</div>
                    <div className="text-slate-400 text-[11px]">{item.unit}</div>
                  </td>
                  <td className="p-3.5 font-heading font-extrabold text-sm text-slate-100">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3.5 font-medium">{item.dueDate}</td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      item.status === "Paid" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" :
                      item.status === "Pending" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" :
                      "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}>
                      {item.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                      {item.status === "Pending" && <Clock className="w-3 h-3" />}
                      {item.status === "Overdue" && <AlertTriangle className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {item.status === "Paid" ? (
                      <div>
                        <div className="font-semibold">{item.mode}</div>
                        <div className="text-[10px] text-slate-400">{item.ref}</div>
                      </div>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== "Paid" ? (
                        <>
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(item.tenant)},%20this%20is%20a%20reminder%20regarding%20monthly%20rent.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Remind</span>
                          </a>
                          <button 
                            onClick={() => handleMarkPaid(item.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
                          >
                            Mark Paid
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => alert(`Generating Digital Receipt for ${item.tenant}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 flex items-center gap-1"
                        >
                          <Receipt className="w-3 h-3" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
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
