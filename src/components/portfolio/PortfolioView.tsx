import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { frentes, projects } from "@/data/projects";
import { nomeDaFrente, ordenarProntosPrimeiro, projetosDaFrente } from "@/lib/projects";
import type { FrenteId } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export type FrenteFiltro = FrenteId | "todos";

interface Props {
  frente: FrenteFiltro;
  /** Quando ausente (renderização no servidor), os botões só aparecem; o clique passa a funcionar após a hidratação. */
  onSelect?: (frente: FrenteFiltro) => void;
}

const FILTROS: { id: FrenteFiltro; nome: string }[] = [{ id: "todos", nome: "Todos" }, ...frentes];

function total(id: FrenteFiltro): number {
  return id === "todos" ? projects.length : projetosDaFrente(id).length;
}

export function PortfolioView({ frente, onSelect }: Props) {
  const itens = ordenarProntosPrimeiro(projetosDaFrente(frente));
  const contagem = `${itens.length} ${itens.length === 1 ? "projeto" : "projetos"}${
    frente === "todos" ? "" : ` em ${nomeDaFrente(frente)}`
  }`;

  return (
    <>
      <div className="wrap pg-head">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Portfólio" }]} />
        <h1 className="sec" style={{ fontSize: "clamp(1.75rem,5vw,2.5rem)", lineHeight: 1.2 }}>
          Portfólio
        </h1>
        <p className="sub muted">
          Projetos pensados para o público que a CIER atende. Filtre por frente para ver só o que interessa.
        </p>
        <div className="filters" role="group" aria-label="Filtrar por frente">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={f.id === frente}
              onClick={onSelect ? () => onSelect(f.id) : undefined}
            >
              {f.nome}
              <small>{total(f.id)}</small>
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {contagem}
        </p>
      </div>
      <div className="wrap">
        <div className="pcards">
          {itens.length ? (
            itens.map((p) => <ProjectCard key={p.slug} project={p} />)
          ) : (
            <div className="empty">Nenhum projeto nesta frente ainda.</div>
          )}
        </div>
      </div>
    </>
  );
}
