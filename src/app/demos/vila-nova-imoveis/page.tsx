import type { Metadata } from "next";
import { RealEstateDemo } from "@/components/demos/real-estate/RealEstateDemo";

export const metadata: Metadata = {
  title: { absolute: "Vila Nova Imóveis (projeto demonstrativo CIER)" },
  description: "Projeto demonstrativo da CIER: site de corretora com filtros laterais, favoritos e simulador de parcela. Marca fictícia.",
};

export default function VilaNovaImoveisPage() {
  return <RealEstateDemo />;
}
