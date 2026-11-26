import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";
import { PortfolioView } from "@/components/portfolio/PortfolioView";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Projetos da CIER em sites, identidade visual e interfaces, filtráveis por frente.",
};

export default function PortfolioPage() {
  return (
    <main className="page-top">
      {/* O fallback já traz a lista completa no HTML (bom para SEO); o filtro da URL entra após a hidratação. */}
      <Suspense fallback={<PortfolioView frente="todos" />}>
        <PortfolioExplorer />
      </Suspense>
    </main>
  );
}
