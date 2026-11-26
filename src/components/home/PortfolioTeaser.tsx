import Link from "next/link";

const ATALHOS = [
  {
    href: "/portfolio?frente=sites",
    titulo: "Sites",
    texto: "Dentistas, imobiliárias, revendas, lojas virtuais, landing pages e SaaS.",
    chamada: "Ver sites →",
  },
  {
    href: "/portfolio?frente=identidade",
    titulo: "Identidade visual",
    texto: "Marcas para cafeterias, barbearias, studios, lojas e outros comércios.",
    chamada: "Ver identidades →",
  },
  {
    href: "/portfolio?frente=interfaces",
    titulo: "Interfaces",
    texto: "Dashboards, painéis, WMS, PDV, aplicativos e sistemas de gestão.",
    chamada: "Ver interfaces →",
  },
];

export function PortfolioTeaser() {
  return (
    <section id="portfolio">
      <div className="wrap sec-pad">
        <h2 className="sec">Portfólio</h2>
        <p className="sub muted">
          Projetos pensados para quem você atende: profissionais de saúde, corretoras, lojas, comércios e sistemas de
          gestão. Escolha uma frente e veja a lista.
        </p>
        <div className="tz-grid">
          {ATALHOS.map((a) => (
            <Link key={a.href} className="tz" href={a.href}>
              <h3>{a.titulo}</h3>
              <p>{a.texto}</p>
              <span className="go">{a.chamada}</span>
            </Link>
          ))}
        </div>
        <div className="tz-cta">
          <Link className="btn ghost" href="/portfolio">
            Ver portfólio completo
          </Link>
        </div>
      </div>
    </section>
  );
}
