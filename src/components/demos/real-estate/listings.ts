export type Finalidade = "venda" | "aluguel";
export type TipoImovel = "Casa" | "Apartamento" | "Terreno";

export interface Imovel {
  id: number;
  titulo: string;
  bairro: string;
  finalidade: Finalidade;
  tipo: TipoImovel;
  preco: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  /** Cores do degradê que substitui a foto no demo */
  cores: [string, string];
}

/* Imóveis fictícios, só para demonstração. */
export const imoveis: Imovel[] = [
  { id: 1, titulo: "Apartamento amplo e iluminado", bairro: "Jardim das Flores", finalidade: "venda", tipo: "Apartamento", preco: 520000, quartos: 3, banheiros: 2, vagas: 2, area: 92, cores: ["#9a6b2f", "#e8c27a"] },
  { id: 2, titulo: "Casa com quintal e churrasqueira", bairro: "Vila Esperança", finalidade: "venda", tipo: "Casa", preco: 780000, quartos: 4, banheiros: 3, vagas: 3, area: 210, cores: ["#3f5d4a", "#a3c9a8"] },
  { id: 3, titulo: "Apartamento compacto perto do metrô", bairro: "Centro", finalidade: "aluguel", tipo: "Apartamento", preco: 2400, quartos: 1, banheiros: 1, vagas: 0, area: 38, cores: ["#1f2a37", "#64748b"] },
  { id: 4, titulo: "Casa térrea em condomínio fechado", bairro: "Residencial Aurora", finalidade: "venda", tipo: "Casa", preco: 950000, quartos: 3, banheiros: 2, vagas: 2, area: 160, cores: ["#7c2d12", "#fb923c"] },
  { id: 5, titulo: "Apartamento com varanda gourmet", bairro: "Parque das Águas", finalidade: "aluguel", tipo: "Apartamento", preco: 3600, quartos: 2, banheiros: 2, vagas: 1, area: 68, cores: ["#0e7490", "#7dd3fc"] },
  { id: 6, titulo: "Terreno plano em rua asfaltada", bairro: "Jardim Primavera", finalidade: "venda", tipo: "Terreno", preco: 210000, quartos: 0, banheiros: 0, vagas: 0, area: 300, cores: ["#4d7c0f", "#bef264"] },
  { id: 7, titulo: "Casa para família grande", bairro: "Vila Esperança", finalidade: "aluguel", tipo: "Casa", preco: 4800, quartos: 4, banheiros: 3, vagas: 2, area: 180, cores: ["#6d28d9", "#c4b5fd"] },
  { id: 8, titulo: "Cobertura duplex com terraço", bairro: "Centro", finalidade: "venda", tipo: "Apartamento", preco: 1250000, quartos: 3, banheiros: 3, vagas: 2, area: 140, cores: ["#be123c", "#fda4af"] },
];
