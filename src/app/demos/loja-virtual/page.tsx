import type { Metadata } from "next";
import { StoreDemo } from "@/components/demos/store/StoreDemo";

export const metadata: Metadata = {
  title: { absolute: "Lume Ateliê · Loja virtual (projeto demonstrativo CIER)" },
  description: "Projeto demonstrativo da CIER: loja virtual em blocos de cor, com coleções, painel de produto e sacola. Marca fictícia.",
};

export default function LojaVirtualPage() {
  return <StoreDemo />;
}
