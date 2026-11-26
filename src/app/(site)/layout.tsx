import { Orbitron, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "@/styles/base.css";
import "@/styles/header.css";
import "@/styles/hero.css";
import "@/styles/sections.css";
import "@/styles/pages.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`page ${outfit.variable} ${orbitron.variable}`} id="topo">
      <Header />
      {children}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
