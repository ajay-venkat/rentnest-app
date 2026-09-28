# RentNest 🏢 — Landlord Property & Agreement Management SaaS

**RentNest** is a Progressive Web App (PWA) designed for Indian landlords managing multi-unit residential and commercial rental portfolios. It automates rent collection tracking, 11-month lease agreement renewals with rent escalation math, tenant verification compliance, and WhatsApp/Email payment reminders.

---

## ✨ Features

- **Executive Landlord Dashboard**: Real-time occupancy rate, gross collection progress, pending dues alerts, and 30/15/7-day agreement renewal pipeline.
- **Properties & Units Portfolio**: Manage multi-building properties (Tirunelveli, Chennai, Madurai) with occupancy status indicators and monthly yield metrics.
- **Rent Tracker & Ledger**: Filterable payment ledger (Paid/Pending/Overdue), manual mark-as-paid, and digital payment receipt generator.
- **1-Click Renewal Engine**: Calculates standard rent escalation hikes (5%–25%), generates updated 11-month lease terms, and tracks state-wise e-Stamp legal duty status.
- **Tenant Verification Vault**: Aadhaar/PAN KYC checklist, employer document uploads, and police verification status badges.
- **Automated Reminders**: Multi-channel notifications via zero-cost WhatsApp deep-links (`wa.me`) and Resend Email delivery.
- **Bilingual UI Toggle**: Instant English & Tamil (தமிழ் இடைமுகம்) interface switch.
- **Razorpay Subscription Gateway**: Tiered landlord pricing (Free, Starter ₹249/mo, Pro ₹799/mo, Business) with automated plan upgrades.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router) + TypeScript
* **Styling**: Tailwind CSS + Glassmorphism Tokens
* **Database & Auth**: Supabase (Postgres, RLS, Storage)
* **Payments**: Razorpay Subscriptions (Test Mode)
* **Email**: Resend API
* **Icons**: Lucide React

---

## 🚀 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ajay-venkat/rentnest-app.git
   cd rentnest-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials and Razorpay API key.

4. **Run Database Migrations**:
   Apply SQL scripts in `supabase/migrations/`:
   ```bash
   # Execute 0001_init.sql, 0002_rls.sql, and 0003_functions_triggers.sql in your Supabase SQL Editor
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📄 License
MIT License
