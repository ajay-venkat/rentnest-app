"use client";

import React, { useState } from "react";
import { Building2, MapPin, Plus, CheckCircle, AlertCircle, Home, Users } from "lucide-react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([
    {
      id: "prop-1",
      name: "Sri Lakshmi Towers",
      address: "14/A South Bazaar, Palayamkottai, Tirunelveli",
      type: "Apartment Building",
      totalUnits: 6,
      occupiedUnits: 5,
      monthlyYield: "₹82,000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      units: [
        { number: "Flat 101", rent: 14000, tenant: "Ramesh Kumar", status: "Occupied" },
        { number: "Flat 102", rent: 15000, tenant: "Santhosh Raj", status: "Occupied" },
        { number: "Flat 103", rent: 13000, tenant: "Karthik Subramanian", status: "Occupied" },
        { number: "Flat 201", rent: 16000, tenant: "Priya Sundaram", status: "Occupied" },
        { number: "Flat 202", rent: 24000, tenant: "Vacant", status: "Vacant" },
        { number: "Flat 203", rent: 24000, tenant: "Anand Narayanan", status: "Occupied" }
      ]
    },
    {
      id: "prop-2",
      name: "Green Meadows Villa",
      address: "42 Canal Bank Road, Adyar, Chennai",
      type: "Gated Villas",
      totalUnits: 4,
      occupiedUnits: 4,
      monthlyYield: "₹1,45,000",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
      units: [
        { number: "Villa 01", rent: 38000, tenant: "Dr. Arvind Swamy", status: "Occupied" },
        { number: "Villa 02", rent: 36000, tenant: "Meenakshi Nathan", status: "Occupied" },
        { number: "Villa 03", rent: 36000, tenant: "Vijay Ramachandran", status: "Occupied" },
        { number: "Villa 04", rent: 35000, tenant: "Deepak Sharma", status: "Occupied" }
      ]
    },
    {
      id: "prop-3",
      name: "Vasanth Commercial Plaza",
      address: "108 Bypass Road, Madurai",
      type: "Commercial & Retail",
      totalUnits: 5,
      occupiedUnits: 3,
      monthlyYield: "₹95,000",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      units: [
        { number: "Shop 1A", rent: 30000, tenant: "Lakshmi Garments", status: "Occupied" },
        { number: "Shop 1B", rent: 35000, tenant: "Apex Pharmacy", status: "Occupied" },
        { number: "Office 201", rent: 30000, tenant: "Cognitive Tech Lab", status: "Occupied" },
        { number: "Office 202", rent: 28000, tenant: "Vacant", status: "Vacant" },
        { number: "Office 203", rent: 28000, tenant: "Vacant", status: "Vacant" }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100">
            Properties Portfolio ({properties.length} Properties)
          </h1>
          <p className="text-sm text-slate-400">
            Manage properties, units, tenant occupancy, and monthly financial yields
          </p>
        </div>

        <button 
          onClick={() => alert("Open Add Property Dialog")}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-transform flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="rounded-2xl bg-slate-900/75 border border-slate-800 overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col">
            <div 
              className="h-44 w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${property.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-slate-800">
                {property.type}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-100">{property.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">{property.address}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">Occupancy</span>
                  <span className="font-bold text-sm text-slate-100">{property.occupiedUnits} / {property.totalUnits} Units</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 font-medium block">Est. Yield</span>
                  <span className="font-bold text-sm text-emerald-400">{property.monthlyYield}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Units & Occupants
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {property.units.map((unit, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                        unit.status === "Occupied" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {unit.number}: {unit.tenant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
