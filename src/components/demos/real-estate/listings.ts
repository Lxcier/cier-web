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
  condominio: number;
  iptu: number;
  /** Cores do degradê que substitui a foto no demo */
  cores: [string, string];
  descricao: string;
}

/** Imóvel mostrado no destaque da semana. */
export const DESTAQUE_ID = 8;

/** Faixas do filtro de preço, por finalidade. */
export const FAIXAS: Record<Finalidade, { min: number; max: number; step: number }> = {
  venda: { min: 150000, max: 1300000, step: 10000 },
  aluguel: { min: 1500, max: 5500, step: 100 },
};

export const TIPOS: TipoImovel[] = ["Casa", "Apartamento", "Terreno"];

/* Imóveis fictícios, só para demonstração. */
export const imoveis: Imovel[] = [
  { id: 1, titulo: "Apartamento amplo e iluminado", bairro: "Jardim das Flores", finalidade: "venda", tipo: "Apartamento", preco: 520000, quartos: 3, banheiros: 2, vagas: 2, area: 92, condominio: 780, iptu: 160, cores: ["#3b4a63", "#1b2430"], descricao: "Sala em L com varanda, cozinha integrada e armários nos quartos. Prédio com portaria 24 horas." },
  { id: 2, titulo: "Casa com quintal e churrasqueira", bairro: "Vila Esperança", finalidade: "venda", tipo: "Casa", preco: 780000, quartos: 4, banheiros: 3, vagas: 3, area: 210, condominio: 0, iptu: 240, cores: ["#3d5a4a", "#17251d"], descricao: "Quintal gramado, área gourmet coberta e suíte no térreo. Rua tranquila, perto de escolas." },
  { id: 3, titulo: "Apartamento compacto perto do metrô", bairro: "Centro", finalidade: "aluguel", tipo: "Apartamento", preco: 2400, quartos: 1, banheiros: 1, vagas: 0, area: 38, condominio: 420, iptu: 90, cores: ["#4a4f6a", "#1d2030"], descricao: "Ideal para quem trabalha na região. Cozinha equipada e lavanderia no prédio." },
  { id: 4, titulo: "Casa térrea em condomínio fechado", bairro: "Residencial Aurora", finalidade: "venda", tipo: "Casa", preco: 950000, quartos: 3, banheiros: 2, vagas: 2, area: 160, condominio: 590, iptu: 310, cores: ["#6a4a35", "#2a1c13"], descricao: "Condomínio com clube, quadra e segurança. Casa térrea com todos os quartos no mesmo nível." },
  { id: 5, titulo: "Apartamento com varanda gourmet", bairro: "Parque das Águas", finalidade: "aluguel", tipo: "Apartamento", preco: 3600, quartos: 2, banheiros: 2, vagas: 1, area: 68, condominio: 650, iptu: 140, cores: ["#2f5a66", "#142329"], descricao: "Varanda com churrasqueira a carvão, vista aberta e piso em porcelanato." },
  { id: 6, titulo: "Terreno plano em rua asfaltada", bairro: "Jardim Primavera", finalidade: "venda", tipo: "Terreno", preco: 210000, quartos: 0, banheiros: 0, vagas: 0, area: 300, condominio: 0, iptu: 70, cores: ["#4f6a2e", "#1c2610"], descricao: "Terreno de 10 por 30 metros, plano, com água e luz na frente. Documentação em dia." },
  { id: 7, titulo: "Casa para família grande", bairro: "Vila Esperança", finalidade: "aluguel", tipo: "Casa", preco: 4800, quartos: 4, banheiros: 3, vagas: 2, area: 180, condominio: 0, iptu: 210, cores: ["#53456e", "#1f1a2c"], descricao: "Quatro quartos, duas salas e edícula nos fundos. Aceita pets." },
  { id: 8, titulo: "Cobertura duplex com terraço", bairro: "Centro", finalidade: "venda", tipo: "Apartamento", preco: 1250000, quartos: 3, banheiros: 3, vagas: 2, area: 140, condominio: 1150, iptu: 420, cores: ["#7a5a2c", "#1e1608"], descricao: "Dois andares, terraço com jacuzzi e vista panorâmica. Cozinha gourmet e três suítes." },
  { id: 9, titulo: "Studio mobiliado", bairro: "Parque das Águas", finalidade: "aluguel", tipo: "Apartamento", preco: 2900, quartos: 1, banheiros: 1, vagas: 1, area: 32, condominio: 380, iptu: 70, cores: ["#3a5a7a", "#162230"], descricao: "Entrega com cama, armário, cooktop e geladeira. Pronto para morar." },
  { id: 10, titulo: "Sobrado geminado", bairro: "Jardim das Flores", finalidade: "venda", tipo: "Casa", preco: 640000, quartos: 3, banheiros: 2, vagas: 2, area: 125, condominio: 0, iptu: 190, cores: ["#5c4a4a", "#241a1a"], descricao: "Sobrado com sala ampla, lavabo e quintal pequeno. A cinco minutos do comércio local." },
];
