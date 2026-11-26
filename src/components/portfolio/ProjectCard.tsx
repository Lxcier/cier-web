import Link from "next/link";
import type { CSSProperties } from "react";
import { iniciais, nomeDaFrente } from "@/lib/projects";
import type { Project } from "@/types/project";

export function thumbStyle(p: Project): CSSProperties {
  return { "--c1": p.c1, "--c2": p.c2 } as CSSProperties;
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  const pronto = status === "demo";
  return <span className={pronto ? "badge live" : "badge"}>{pronto ? "Demo disponível" : "Em desenvolvimento"}</span>;
}

/** compact = versão enxuta usada em "Mais em ..." (sem a frente no rótulo e sem descrição). */
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Link className="pc" href={`/portfolio/${project.slug}`}>
      <div className="pc-thumb" style={thumbStyle(project)}>
        <StatusBadge status={project.status} />
        <b>{iniciais(project.titulo)}</b>
      </div>
      <div className="pc-body">
        <p className="pc-seg">{compact ? project.segmento : `${nomeDaFrente(project.frente)} · ${project.segmento}`}</p>
        <h3>{project.titulo}</h3>
        {!compact && <p className="d">{project.resumo}</p>}
        <span className="pc-more">Ver projeto →</span>
      </div>
    </Link>
  );
}
