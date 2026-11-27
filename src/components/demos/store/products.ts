export type CategoriaId = "velas" | "difusores" | "ceramica" | "kits";
export type ColecaoId = "todos" | CategoriaId;

export interface Colecao {
  id: ColecaoId;
  nome: string;
  bg: string;
}

export interface Produto {
  id: string;
  cat: CategoriaId;
  nome: string;
  preco: number;
  tag?: string;
  bg: string;
  /** Proporção da foto na grade irregular (ex.: "1/1.15") */
  ar: string;
  /** Nome do seletor de opção (tamanho, aroma, cor) */
  opl: string;
  ops: string[];
  /** Acréscimo de preço por opção, na mesma ordem de `ops` */
  add: number[];
  desc: string;
  specs: string[];
}

/** Frete grátis a partir deste valor da sacola. */
export const FRETE_GRATIS = 200;
export const LIMITE_POR_ITEM = 20;

export const CAT_NOME: Record<CategoriaId, string> = {
  velas: "Velas",
  difusores: "Difusores",
  ceramica: "Cerâmica",
  kits: "Kits de presente",
};

export const colecoes: Colecao[] = [
  { id: "todos", nome: "Tudo", bg: "#ffffff" },
  { id: "velas", nome: "Velas", bg: "#ff5a2c" },
  { id: "difusores", nome: "Difusores", bg: "#ffb8d1" },
  { id: "ceramica", nome: "Cerâmica", bg: "#cfe3ff" },
  { id: "kits", nome: "Kits de presente", bg: "#b8f0d0" },
];

const AROMAS = ["Figo & Cedro", "Chá Branco", "Lavanda do Campo"];

/* Produtos fictícios, só para demonstração. */
export const produtos: Produto[] = [
  { id: "v1", cat: "velas", nome: "Vela Figo & Cedro", preco: 59.9, tag: "Mais pedida", bg: "#ff5a2c", ar: "1/1.15", opl: "Tamanho", ops: ["Média · 180 g", "Grande · 320 g"], add: [0, 30], desc: "Notas de figo maduro e madeira de cedro. Cera de soja, pavio de algodão e vidro âmbar.", specs: ["Cera de soja", "40 h de queima", "Vidro reutilizável"] },
  { id: "v2", cat: "velas", nome: "Vela Chá Branco", preco: 54.9, bg: "#d9d2ff", ar: "1/1", opl: "Tamanho", ops: ["Média · 180 g", "Grande · 320 g"], add: [0, 30], desc: "Perfume leve e limpo, bom para quarto e escritório.", specs: ["Cera de soja", "40 h de queima", "Aroma suave"] },
  { id: "v3", cat: "velas", nome: "Vela Lavanda na lata", preco: 44.9, bg: "#b8a3ff", ar: "1/1.25", opl: "Tamanho", ops: ["Lata · 120 g"], add: [0], desc: "Lata de viagem com tampa. Lavanda do campo, pensada para relaxar antes de dormir.", specs: ["Cera de soja", "25 h de queima", "Com tampa"] },
  { id: "d1", cat: "difusores", nome: "Difusor de varetas", preco: 89.9, tag: "Novo", bg: "#ffb8d1", ar: "1/1.2", opl: "Aroma", ops: AROMAS, add: [0, 0, 0], desc: "Frasco de vidro com 250 ml de essência e varetas de rattan. Dura cerca de 60 dias.", specs: ["250 ml", "Varetas de rattan", "Cerca de 60 dias"] },
  { id: "d2", cat: "difusores", nome: "Difusor de bambu", preco: 79.9, bg: "#b8f0d0", ar: "1/1", opl: "Aroma", ops: AROMAS, add: [0, 0, 0], desc: "Frasco menor, ideal para lavabo e mesa de cabeceira.", specs: ["120 ml", "Varetas de bambu", "Cerca de 45 dias"] },
  { id: "d3", cat: "difusores", nome: "Home spray", preco: 49.9, bg: "#ffe27a", ar: "1/1.1", opl: "Aroma", ops: AROMAS, add: [0, 0, 0], desc: "Borrifador para tecidos e ambientes, com perfume de longa fixação.", specs: ["100 ml", "Sem álcool etílico"] },
  { id: "c1", cat: "ceramica", nome: "Vaso Ondas", preco: 119, tag: "Feito à mão", bg: "#f0cfa8", ar: "1/1.3", opl: "Cor", ops: ["Areia", "Grafite", "Terracota"], add: [0, 0, 0], desc: "Vaso torneado com relevo em ondas. Esmalte fosco por fora e impermeabilizado por dentro.", specs: ["22 cm de altura", "Torneado à mão", "Esmalte fosco"] },
  { id: "c2", cat: "ceramica", nome: "Tigela Sal", preco: 69, bg: "#cfe3ff", ar: "1/1", opl: "Cor", ops: ["Branco", "Azul névoa"], add: [0, 0], desc: "Tigela pequena para sal, azeite ou joias. Combina com as velas da linha.", specs: ["12 cm de diâmetro", "Vai ao micro-ondas"] },
  { id: "c3", cat: "ceramica", nome: "Porta-incenso", preco: 39.9, bg: "#ffe27a", ar: "1/1.15", opl: "Cor", ops: ["Grafite", "Areia"], add: [0, 0], desc: "Base de cerâmica com furo calibrado para varetas de incenso.", specs: ["Cabe incenso padrão", "Coleta as cinzas"] },
  { id: "k1", cat: "kits", nome: "Kit Descanso", preco: 169, tag: "Presente", bg: "#ff8a5c", ar: "1/1.25", opl: "Aroma da vela", ops: AROMAS, add: [0, 0, 0], desc: "Vela média, home spray e porta-incenso em caixa de presente com cartão.", specs: ["3 itens", "Caixa e cartão", "Embalagem sem plástico"] },
  { id: "k2", cat: "kits", nome: "Kit Casa Nova", preco: 219, bg: "#9ee3c1", ar: "1/1.05", opl: "Cor da cerâmica", ops: ["Areia", "Grafite", "Terracota"], add: [0, 0, 0], desc: "Vaso Ondas, vela grande e difusor de bambu. O presente clássico de inauguração.", specs: ["3 itens", "Caixa e cartão"] },
  { id: "k3", cat: "kits", nome: "Kit Trio de Velas", preco: 139, bg: "#ffd1e0", ar: "1/1.2", opl: "Tamanho", ops: ["Média · 3 × 180 g"], add: [0], desc: "Os três aromas da linha em tamanho médio. Uma forma fácil de descobrir o favorito.", specs: ["3 velas", "Caixa de presente"] },
];

export function getProduto(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

/** Preço da opção escolhida (preço base + acréscimo da opção). */
export function precoDaOpcao(p: Produto, opcao: number): number {
  return p.preco + (p.add[opcao] ?? 0);
}
