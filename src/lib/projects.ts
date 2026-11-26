import { frentes, projects } from "@/data/projects";
import type { Frente, FrenteId, Project } from "@/types/project";

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFrente(id: FrenteId): Frente | undefined {
  return frentes.find((f) => f.id === id);
}

export function nomeDaFrente(id: FrenteId): string {
  return getFrente(id)?.nome ?? id;
}

export function isFrenteId(valor: string | null | undefined): valor is FrenteId {
  return frentes.some((f) => f.id === valor);
}

export function projetosDaFrente(id: FrenteId | "todos"): Project[] {
  return id === "todos" ? projects : projects.filter((p) => p.frente === id);
}

/** Projetos com demo disponível aparecem primeiro; a ordem original é mantida dentro de cada grupo. */
export function ordenarProntosPrimeiro(lista: Project[]): Project[] {
  return [...lista].sort((a, b) => Number(b.status === "demo") - Number(a.status === "demo"));
}

export function projetosRelacionados(projeto: Project, limite = 3): Project[] {
  return projects.filter((p) => p.frente === projeto.frente && p.slug !== projeto.slug).slice(0, limite);
}

/** Iniciais para a miniatura, ignorando palavras de ligação. */
export function iniciais(titulo: string): string {
  const palavras = titulo
    .replace(/[^A-Za-zÀ-ú ]/g, "")
    .trim()
    .split(/\s+/)
    .filter((w) => !/^(de|da|do|das|dos|e|para|com|a|o)$/i.test(w));
  const [a = "", b = ""] = palavras;
  return (a.charAt(0) + b.charAt(0)).toUpperCase();
}
