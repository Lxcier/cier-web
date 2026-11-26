import type { Metadata } from "next";
import { RealEstateDemo } from "@/components/demos/real-estate/RealEstateDemo";

export const metadata: Metadata = {
  title: { absolute: "Vila Nova Imóveis (projeto demonstrativo CIER)" },
  description: "Projeto demonstrativo da CIER: site para corretora de imóveis, com busca e filtros. Marca fictícia.",
};

export default function VilaNovaImoveisPage() {
  return <RealEstateDemo />;
}
