import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { projects } from "@/data/projects";
import { getProject } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projeto = getProject(slug);
  if (!projeto) return { title: "Projeto não encontrado" };
  return {
    title: { absolute: `${projeto.titulo} · Portfólio CIER` },
    description: projeto.resumo,
  };
}

export default async function ProjetoPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProject(slug);
  if (!projeto) notFound();
  return <ProjectDetail project={projeto} />;
}
