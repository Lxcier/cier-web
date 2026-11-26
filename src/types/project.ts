export type FrenteId = "sites" | "identidade" | "interfaces";

export interface Frente {
  id: FrenteId;
  nome: string;
}

/** "demo" = projeto navegável pronto | "dev" = em desenvolvimento */
export type ProjectStatus = "demo" | "dev";

export interface Project {
  slug: string;
  frente: FrenteId;
  segmento: string;
  titulo: string;
  status: ProjectStatus;
  /** Rota do demo dentro do site, só para status "demo" (ex.: /demos/sorriso-prime) */
  demoHref?: string;
  /** Cores do degradê da miniatura */
  c1: string;
  c2: string;
  resumo: string;
  para: string;
  entrega: string[];
}
