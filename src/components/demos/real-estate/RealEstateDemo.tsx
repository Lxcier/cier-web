"use client";

import Link from "next/link";
import { useState } from "react";
import { waLink } from "@/lib/whatsapp";
import { inter, playfair } from "./fonts";
import { imoveis, type Finalidade, type Imovel, type TipoImovel } from "./listings";
import s from "./real-estate.module.css";

const MENSAGEM_GERAL =
  'Olá, vi o projeto demo "Vila Nova Imóveis" no portfólio da CIER e quero um site assim para a minha imobiliária.';

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function HouseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

function Specs({ i }: { i: Imovel }) {
  if (i.tipo === "Terreno") {
    return (
      <span>
        <b>{i.area}</b> m²
      </span>
    );
  }
  return (
    <>
      <span>
        <b>{i.quartos}</b> quarto{i.quartos > 1 ? "s" : ""}
      </span>
      <span>
        <b>{i.banheiros}</b> banh.
      </span>
      <span>
        <b>{i.vagas}</b> vaga{i.vagas === 1 ? "" : "s"}
      </span>
      <span>
        <b>{i.area}</b> m²
      </span>
    </>
  );
}

/** Projeto demonstrativo: site de corretora de imóveis com busca e filtros (marca e imóveis fictícios). */
export function RealEstateDemo() {
  const [finalidade, setFinalidade] = useState<"" | Finalidade>("");
  const [tipo, setTipo] = useState<"" | TipoImovel>("");
  const [quartos, setQuartos] = useState(0);

  const resultado = imoveis.filter(
    (i) => (!finalidade || i.finalidade === finalidade) && (!tipo || i.tipo === tipo) && i.quartos >= quartos,
  );
  const geral = waLink(MENSAGEM_GERAL);

  return (
    <div className={`${s.root} ${playfair.variable} ${inter.variable}`} data-demo>
      <div className={s.demoBar}>
        <div className={s.wrap}>
          <span>Projeto demonstrativo da CIER · marca e imóveis fictícios. Os botões abrem a conversa com a CIER.</span>
          <span>
            <Link href="/portfolio?frente=sites">← Voltar ao portfólio</Link>
          </span>
        </div>
      </div>

      <header className={s.nav}>
        <div className={s.wrap}>
          <a href="#topo" className={s.logo}>
            Vila Nova <span>Imóveis</span>
          </a>
          <nav className={s.links} aria-label="Seções">
            <a href="#imoveis">Imóveis</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#anuncie">Anuncie</a>
          </nav>
          <a className={`${s.btn} ${s.sm}`} target="_blank" rel="noreferrer" href={geral}>
            Falar com corretor
          </a>
        </div>
      </header>

      <main id="topo">
        <div className={s.hero}>
          <div className={s.wrap}>
            <h1>Encontre o imóvel certo para a sua próxima fase.</h1>
            <p className={s.lead}>
              Casas, apartamentos e terrenos para comprar ou alugar, com atendimento direto de um corretor.
            </p>
            <form className={s.search} onSubmit={(e) => e.preventDefault()}>
              <div className={s.field}>
                <label htmlFor="f-fin">Finalidade</label>
                <select id="f-fin" value={finalidade} onChange={(e) => setFinalidade(e.target.value as "" | Finalidade)}>
                  <option value="">Comprar ou alugar</option>
                  <option value="venda">Comprar</option>
                  <option value="aluguel">Alugar</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="f-tipo">Tipo</label>
                <select id="f-tipo" value={tipo} onChange={(e) => setTipo(e.target.value as "" | TipoImovel)}>
                  <option value="">Todos os tipos</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="f-q">Quartos</label>
                <select id="f-q" value={quartos} onChange={(e) => setQuartos(Number(e.target.value))}>
                  <option value={0}>Qualquer</option>
                  <option value={1}>1 ou mais</option>
                  <option value={2}>2 ou mais</option>
                  <option value={3}>3 ou mais</option>
                </select>
              </div>
              <a className={s.btn} href="#imoveis">
                Ver imóveis
              </a>
            </form>
          </div>
        </div>

        <section id="imoveis">
          <div className={s.wrap}>
            <div className={s.head}>
              <h2>Imóveis disponíveis</h2>
              <p className={s.count} aria-live="polite">
                {resultado.length} {resultado.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
              </p>
            </div>
            <div className={s.list}>
              {resultado.length === 0 ? (
                <div className={s.empty}>
                  Nenhum imóvel com esses filtros. Tente ampliar a busca ou fale com um corretor.
                </div>
              ) : (
                resultado.map((i) => {
                  const mensagem = `Olá, vi o imóvel "${i.titulo}" (${i.bairro}) no projeto demo Vila Nova Imóveis, da CIER, e quero um site assim para a minha imobiliária.`;
                  return (
                    <article key={i.id} className={s.imv}>
                      <div className={s.foto} style={{ background: `linear-gradient(135deg,${i.cores[0]},${i.cores[1]})` }}>
                        <span className={s.tag}>
                          {i.finalidade === "venda" ? "Venda" : "Aluguel"} · {i.tipo}
                        </span>
                        <HouseIcon />
                      </div>
                      <div className={s.body}>
                        <p className={s.price}>
                          {brl.format(i.preco)}
                          {i.finalidade === "aluguel" && (
                            <>
                              {" "}
                              <small>/ mês</small>
                            </>
                          )}
                        </p>
                        <h3>{i.titulo}</h3>
                        <p className={s.where}>{i.bairro}</p>
                        <div className={s.specs}>
                          <Specs i={i} />
                        </div>
                        <a className={s.btn} target="_blank" rel="noreferrer" href={waLink(mensagem)}>
                          Tenho interesse
                        </a>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section id="diferenciais" className={s.why}>
          <div className={s.wrap}>
            <h2>Por que escolher a Vila Nova</h2>
            <div className={s.cols}>
              <div className={s.pt}>
                <b>01</b>
                <h3>Atendimento direto</h3>
                <p>Você fala com o corretor responsável, sem intermediários e sem fila.</p>
              </div>
              <div className={s.pt}>
                <b>02</b>
                <h3>Informação clara</h3>
                <p>Metragem, valores e condições explicados antes da visita.</p>
              </div>
              <div className={s.pt}>
                <b>03</b>
                <h3>Acompanhamento até a chave</h3>
                <p>Apoio com documentação e negociação em todas as etapas.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="anuncie">
          <div className={s.wrap}>
            <div className={s.anuncie}>
              <div>
                <h2>Quer vender ou alugar o seu imóvel?</h2>
                <p>Conte o que você tem e receba uma avaliação sem compromisso.</p>
              </div>
              <a className={s.btn} target="_blank" rel="noreferrer" href={geral}>
                Anunciar meu imóvel
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={s.wrap}>
          <div className={s.info}>
            <span>Rua Exemplo, 456 · Centro (fictício)</span>
            <span>Seg a sex, 9h às 18h</span>
            <span>CRECI 00000-J (exemplo)</span>
          </div>
          Vila Nova Imóveis é uma marca fictícia criada pela CIER para demonstração. ·{" "}
          <Link href="/portfolio?frente=sites" style={{ textDecoration: "underline" }}>
            Portfólio CIER
          </Link>
        </div>
      </footer>
      <a className={`${s.btn} ${s.stickyWa}`} target="_blank" rel="noreferrer" href={geral}>
        Falar com corretor
      </a>
    </div>
  );
}
