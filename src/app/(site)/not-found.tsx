import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function SiteNotFound() {
  return (
    <main className="page-top">
      <div className="wrap pg-head">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Portfólio", href: "/portfolio" }]} />
        <h1 className="sec">Projeto não encontrado</h1>
        <p className="sub muted">Esse endereço não existe mais ou foi digitado errado.</p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link className="btn solid" href="/portfolio">
            Ver o portfólio
          </Link>
        </p>
      </div>
    </main>
  );
}
