import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { iniciais, nomeDaFrente, projetosRelacionados } from "@/lib/projects";
import { waLink } from "@/lib/whatsapp";
import type { Project } from "@/types/project";
import { StatusBadge, ProjectCard, thumbStyle } from "./ProjectCard";

export function ProjectDetail({ project: p }: { project: Project }) {
  const pronto = p.status === "demo" && Boolean(p.demoHref);
  const frente = nomeDaFrente(p.frente);
  const relacionados = projetosRelacionados(p);
  const mensagem = `Olá, vi o projeto "${p.titulo}" no portfólio da CIER e quero algo parecido para o meu negócio.`;

  return (
    <main className="page-top">
      <div className="wrap pg-head">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: "Portfólio", href: "/portfolio" },
            { label: frente, href: `/portfolio?frente=${p.frente}` },
          ]}
        />
        <div className="proj-hero">
          <div>
            <p className="eyebrow-l">
              {frente} · {p.segmento}
            </p>
            <h1>{p.titulo}</h1>
            <p className="lead">{p.resumo}</p>
            <div className="proj-actions">
              {pronto && p.demoHref && (
                <Link className="btn solid" href={p.demoHref}>
                  Ver o projeto
                </Link>
              )}
              <a className={`btn ${pronto ? "ghost" : "solid"}`} target="_blank" rel="noreferrer" href={waLink(mensagem)}>
                Quero um projeto assim
              </a>
            </div>
          </div>
          <div className="pc-thumb" style={thumbStyle(p)}>
            <StatusBadge status={p.status} />
            <b>{iniciais(p.titulo)}</b>
          </div>
        </div>
        <div className="proj-cols">
          <div className="card">
            <h3>Para quem é</h3>
            <p className="muted" style={{ marginTop: ".75rem" }}>
              {p.para}
            </p>
          </div>
          <div className="card">
            <h3>O que entrega</h3>
            <ul>
              {p.entrega.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {relacionados.length > 0 && (
        <section className="related">
          <div className="wrap sec-pad">
            <h2 className="sec">Mais em {frente}</h2>
            <div className="pcards">
              {relacionados.map((r) => (
                <ProjectCard key={r.slug} project={r} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
