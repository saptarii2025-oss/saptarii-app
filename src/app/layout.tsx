import type { Metadata } from "next";

import { Abril_Fatface, Labrada } from "next/font/google";

import "./globals.css";

import { ReactNode } from "react";

import { Footer } from "@/components/custom/footer/footer";
import { Header } from "@/components/custom/header";
import { Toaster } from "@/components/ui/sonner";

import AuthProvider from "../../auth-provider";

// const abril_Fatface = Abril_Fatface({
//   subsets: ["latin", "latin-ext"],
//   display: "swap",
//   variable: "--font-sancreek",
//   weight: ["400"],
// });

const labrada = Labrada({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sancreek",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Saptarii Roleplay",
    default: "Saptarii Roleplay",
  },
  description: "Saptarii Roleplay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${labrada.className} antialiased`}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.32)_60%,rgba(139,69,19,0.12)_100%)]" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden p-8">
              {[...Array(25)].map((_, i) => (
                <span
                  key={i}
                  className="dust absolute block h-1 w-1 rounded-full bg-white/60"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${6 + Math.random() * 8}s`,
                    opacity: 0.35 + Math.random() * 0.4,
                    filter: "blur(1.2px)",
                  }}
                />
              ))}
            </div>

            <Header />
            <main className="relative z-10 flex h-full flex-1 flex-col">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
