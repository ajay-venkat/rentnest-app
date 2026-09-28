import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "RentNest - Landlord Property & Agreement Management",
  description: "Automated rent tracking, 1-click agreement renewals, tenant verification, and WhatsApp reminders for Indian landlords.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0b1026",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className="antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-slate-950"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
