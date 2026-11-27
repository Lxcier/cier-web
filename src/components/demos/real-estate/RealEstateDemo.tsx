"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { waLink } from "@/lib/whatsapp";
import { cormorant, manrope } from "./fonts";
import { DESTAQUE_ID, FAIXAS, TIPOS, imoveis, type Finalidade, type Imovel, type TipoImovel } from "./listings";
import s from "./real-estate.module.css";

type Ordem = "rel" | "menor" | "maior" | "area";
type Visao = "lista" | "grade";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const MENSAGEM = 'Olá, vi o projeto demo "Vila Nova Imóveis" no portfólio da CIER e quero um site assim para a minha imobiliária.';

const BAIRROS = imoveis.reduce<Record<string, number>>((acc, i) => {
  acc[i.bairro] = (acc[i.bairro] ?? 0) + 1;
  return acc;
}, {});
const NOMES_BAIRROS = Object.keys(BAIRROS).sort((a, b) => a.localeCompare(b, "pt-BR"));

const destaque = imoveis.find((i) => i.id === DESTAQUE_ID) ?? imoveis[0]!;

const grad = (i: Imovel) => `linear-gradient(145deg,${i.cores[0]},${i.cores[1]})`;

/** Parcela da tabela Price a 10,5% ao ano (taxa mensal equivalente). */
function parcela(valorFinanciado: number, anos: number) {
  const i = Math.pow(1.105, 1 / 12) - 1;
  return (valorFinanciado * i) / (1 - Math.pow(1 + i, -anos * 12));
}

const ICONES: Record<TipoImovel, ReactNode> = {
  Casa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  ),
  Apartamento: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3" />
    </svg>
  ),
  Terreno: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18 9 9l4 6 3-4 5 7z" />
      <path d="M3 21h18" />
    </svg>
  ),
};

function Preco({ i }: { i: Imovel }) {
  return (
    <>
      {brl.format(i.preco)}
      {i.finalidade === "aluguel" && (
        <>
          {" "}
          <small>/ mês</small>
        </>
      )}
    </>
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

/** Projeto demonstrativo: site de corretora de imóveis com filtros, favoritos e simulador (marca fictícia). */
export function RealEstateDemo() {
  const [fin, setFin] = useState<"" | Finalidade>("");
  const [tipos, setTipos] = useState<TipoImovel[]>([]);
  const [quartos, setQuartos] = useState(0);
  const [max, setMax] = useState<number | null>(null);
  const [bairro, setBairro] = useState("");
  const [ordem, setOrdem] = useState<Ordem>("rel");
  const [visao, setVisao] = useState<Visao>("lista");
  const [favs, setFavs] = useState<number[]>([]);
  const [soFav, setSoFav] = useState(false);

  const [detalheId, setDetalheId] = useState<number | null>(null);
  const [entrada, setEntrada] = useState(20);
  const [anos, setAnos] = useState(30);

  const dlgRef = useRef<HTMLDialogElement>(null);
  const filtrosRef = useRef<HTMLDetailsElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);

  // No desktop o painel de filtros fica sempre aberto.
  useEffect(() => {
    const mq = window.matchMedia("(min-width:960px)");
    const sync = () => {
      if (mq.matches && filtrosRef.current) filtrosRef.current.open = true;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const d = dlgRef.current;
    if (d && detalheId !== null && !d.open) d.showModal();
  }, [detalheId]);

  const itens = useMemo(() => {
    const lista = imoveis.filter(
      (i) =>
        (!fin || i.finalidade === fin) &&
        (tipos.length === 0 || tipos.includes(i.tipo)) &&
        i.quartos >= quartos &&
        (max === null || i.preco <= max) &&
        (!bairro || i.bairro === bairro) &&
        (!soFav || favs.includes(i.id)),
    );
    if (ordem === "menor" || ordem === "maior") {
      // Com "Todos" na finalidade, venda vem antes de aluguel para não misturar escalas de preço.
      lista.sort((a, b) => {
        if (a.finalidade !== b.finalidade) return a.finalidade === "venda" ? -1 : 1;
        return ordem === "menor" ? a.preco - b.preco : b.preco - a.preco;
      });
    } else if (ordem === "area") {
      lista.sort((a, b) => b.area - a.area);
    }
    return lista;
  }, [fin, tipos, quartos, max, bairro, soFav, favs, ordem]);

  const faixa = fin ? FAIXAS[fin] : null;
  const detalhe = detalheId === null ? null : imoveis.find((i) => i.id === detalheId) ?? null;

  function escolheFinalidade(v: "" | Finalidade) {
    setFin(v);
    setMax(v ? FAIXAS[v].max : null);
  }
  function alternaTipo(t: TipoImovel) {
    setTipos((atual) => (atual.includes(t) ? atual.filter((x) => x !== t) : [...atual, t]));
  }
  function alternaFav(id: number) {
    setFavs((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));
  }
  function limpar() {
    setFin("");
    setTipos([]);
    setQuartos(0);
    setMax(null);
    setBairro("");
    setSoFav(false);
  }
  function irParaLista() {
    listaRef.current?.scrollIntoView();
  }
  function abrir(id: number) {
    setEntrada(20);
    setAnos(30);
    setDetalheId(id);
  }
  function fechar() {
    dlgRef.current?.close();
  }

  const wa = waLink(MENSAGEM);
  const valorEntrada = detalhe ? (detalhe.preco * entrada) / 100 : 0;
  const financiado = detalhe ? detalhe.preco - valorEntrada : 0;

  return (
    <div className={`${s.root} ${cormorant.variable} ${manrope.variable}`} data-demo>
      <div className={s.demoBar}>
        <div className={s.wrap}>
          <span>Projeto demonstrativo da CIER · marca e imóveis fictícios. Os botões abrem a conversa com a CIER.</span>
          <Link href="/portfolio?frente=sites">← Voltar ao portfólio</Link>
        </div>
      </div>

      <header className={s.nav}>
        <div className={s.wrap}>
          <a href="#topo" className={s.logo}>
            Vila Nova<span>IMÓVEIS</span>
          </a>
          <nav className={s.links} aria-label="Seções">
            <a href="#imoveis">Imóveis</a>
            <a href="#bairros">Bairros</a>
            <a href="#anuncie">Anuncie</a>
          </nav>
          <span className={s.spacer} />
          <button
            className={s.favbtn}
            type="button"
            aria-pressed={soFav}
            aria-label="Mostrar só os favoritos"
            onClick={() => {
              setSoFav((v) => !v);
              irParaLista();
            }}
          >
            ♥ <span className={s.hideSm}>Favoritos</span> <b>{favs.length}</b>
          </button>
          <a className={`${s.btn} ${s.sm} ${s.hideSm}`} target="_blank" rel="noreferrer" href={wa}>
            Falar com corretor
          </a>
        </div>
      </header>

      <main id="topo">
        <section className={s.feat} aria-labelledby="feat-t">
          <div className={s.wrap}>
            <div>
              <p className={s.kicker}>Destaque da semana</p>
              <h1 id="feat-t">
                Cobertura com <em>terraço</em> no coração do Centro.
              </h1>
              <p className={s.where}>
                {destaque.bairro} · {destaque.tipo} à venda
              </p>
              <p className={s.price}>{brl.format(destaque.preco)}</p>
              <div className={s.specs}>
                <Specs i={destaque} />
              </div>
              <div className={s.cta}>
                <button className={s.btn} type="button" onClick={() => abrir(destaque.id)}>
                  Ver detalhes e simular parcela
                </button>
                <a className={`${s.btn} ${s.line}`} href="#imoveis">
                  Ver todos os imóveis
                </a>
              </div>
            </div>
            <div className={s.featVisual} style={{ background: grad(destaque) }} aria-hidden="true">
              <span className={s.badge}>Destaque</span>
              <svg viewBox="0 0 400 275" preserveAspectRatio="xMidYMax slice" fill="none" stroke="#c9a35b" strokeWidth="1.2" opacity=".85">
                <path d="M0 250h400" />
                <rect x="40" y="130" width="60" height="120" />
                <rect x="110" y="90" width="70" height="160" />
                <rect x="190" y="50" width="90" height="200" />
                <rect x="290" y="110" width="70" height="140" />
                <path d="M52 150h8M72 150h8M52 175h8M72 175h8M52 200h8M72 200h8M124 110h8M144 110h8M124 135h8M144 135h8M124 160h8M144 160h8M124 185h8M144 185h8M206 70h10M230 70h10M254 70h10M206 100h10M230 100h10M254 100h10M206 130h10M230 130h10M254 130h10M206 160h10M230 160h10M254 160h10M304 130h8M324 130h8M304 155h8M324 155h8M304 180h8M324 180h8" />
                <path d="M190 50h90M196 42h78M204 34h62" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </section>

        <div className={`${s.wrap} ${s.layout}`} id="imoveis" ref={listaRef}>
          <aside>
            <details className={s.filters} ref={filtrosRef} open>
              <summary>Filtros</summary>
              <div className={s.fbody}>
                <div>
                  <p className={s.fl}>Finalidade</p>
                  <div className={s.seg} role="group" aria-label="Finalidade">
                    {(
                      [
                        ["", "Todos"],
                        ["venda", "Comprar"],
                        ["aluguel", "Alugar"],
                      ] as const
                    ).map(([v, rotulo]) => (
                      <button key={v} type="button" aria-pressed={fin === v} onClick={() => escolheFinalidade(v)}>
                        {rotulo}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={s.fl}>Tipo</p>
                  <div className={s.chips} role="group" aria-label="Tipo de imóvel">
                    {TIPOS.map((t) => (
                      <button key={t} className={s.chip} type="button" aria-pressed={tipos.includes(t)} onClick={() => alternaTipo(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={s.fl}>Quartos</p>
                  <div className={s.seg} role="group" aria-label="Quartos">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <button key={n} type="button" aria-pressed={quartos === n} onClick={() => setQuartos(n)}>
                        {n === 0 ? "Todos" : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={s.fl} htmlFor="f-preco">
                    Preço máximo
                  </label>
                  <input
                    type="range"
                    id="f-preco"
                    min={faixa?.min ?? 0}
                    max={faixa?.max ?? 100}
                    step={faixa?.step ?? 1}
                    value={max ?? faixa?.max ?? 100}
                    disabled={!faixa}
                    onChange={(e) => setMax(Number(e.target.value))}
                  />
                  <div className={s.rv}>
                    <span>{faixa ? brl.format(faixa.min) : ""}</span>
                    <output htmlFor="f-preco">{faixa && max !== null ? brl.format(max) : "Qualquer"}</output>
                  </div>
                  <p className={s.hint} hidden={Boolean(faixa)}>
                    Escolha comprar ou alugar para filtrar por preço.
                  </p>
                </div>
                <div>
                  <label className={s.fl} htmlFor="f-bairro">
                    Bairro
                  </label>
                  <select id="f-bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}>
                    <option value="">Todos os bairros</option>
                    {NOMES_BAIRROS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <button className={`${s.btn} ${s.line} ${s.sm}`} type="button" onClick={limpar}>
                  Limpar filtros
                </button>
              </div>
            </details>
          </aside>

          <section aria-labelledby="res-t">
            <div className={s.rhead}>
              <div>
                <h2 id="res-t">Imóveis</h2>
                <p className={s.count} aria-live="polite">
                  {itens.length} {itens.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
                </p>
              </div>
              <div className={s.tools}>
                <label className={s.sr} htmlFor="f-ord">
                  Ordenar por
                </label>
                <select id="f-ord" value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)}>
                  <option value="rel">Em destaque</option>
                  <option value="menor">Menor preço</option>
                  <option value="maior">Maior preço</option>
                  <option value="area">Maior área</option>
                </select>
                <div className={`${s.seg} ${s.segSm}`} role="group" aria-label="Modo de exibição">
                  <button type="button" aria-pressed={visao === "lista"} onClick={() => setVisao("lista")}>
                    Lista
                  </button>
                  <button type="button" aria-pressed={visao === "grade"} onClick={() => setVisao("grade")}>
                    Grade
                  </button>
                </div>
              </div>
            </div>

            <div className={`${s.res} ${s[visao]}`}>
              {itens.length === 0 && (
                <div className={s.empty}>
                  <p>Nenhum imóvel com esses filtros.</p>
                  <button className={`${s.btn} ${s.line} ${s.sm}`} type="button" onClick={limpar}>
                    Limpar filtros
                  </button>
                </div>
              )}
              {itens.map((i) => {
                const fav = favs.includes(i.id);
                return (
                  <article key={i.id} className={s.imv}>
                    <div className={s.foto} style={{ background: grad(i) }}>
                      <span className={s.tag}>
                        {i.finalidade === "venda" ? "Venda" : "Aluguel"} · {i.tipo}
                      </span>
                      <button
                        className={s.fav}
                        type="button"
                        aria-pressed={fav}
                        aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        onClick={() => alternaFav(i.id)}
                      >
                        ♥
                      </button>
                      {ICONES[i.tipo]}
                    </div>
                    <div className={s.info}>
                      <p className={s.p}>
                        <Preco i={i} />
                      </p>
                      <h3>{i.titulo}</h3>
                      <p className={s.w}>{i.bairro}</p>
                      <div className={s.specs}>
                        <Specs i={i} />
                      </div>
                      <div className={s.acts}>
                        <button className={`${s.btn} ${s.sm}`} type="button" onClick={() => abrir(i.id)}>
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <section className={s.bairros} id="bairros">
          <div className={s.wrap}>
            <h2>Procure por bairro</h2>
            <div className={s.bgrid}>
              {NOMES_BAIRROS.map((b) => (
                <button
                  key={b}
                  className={s.bt}
                  type="button"
                  onClick={() => {
                    setBairro(b);
                    irParaLista();
                  }}
                >
                  <b>{b}</b>
                  <span>
                    {BAIRROS[b]} {(BAIRROS[b] ?? 0) > 1 ? "imóveis" : "imóvel"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={s.anuncie} id="anuncie">
          <div className={s.wrap}>
            <div className={s.box}>
              <div>
                <h2>Quer vender ou alugar o seu imóvel?</h2>
                <p>Conte o que você tem e receba uma avaliação sem compromisso.</p>
              </div>
              <a className={s.btn} target="_blank" rel="noreferrer" href={wa}>
                Anunciar meu imóvel
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={s.wrap}>
          <div className={s.info2}>
            <span>Rua Exemplo, 456 · Centro (fictício)</span>
            <span>Seg a sex, 9h às 18h</span>
            <span>CRECI 00000-J (exemplo)</span>
          </div>
          Vila Nova Imóveis é uma marca fictícia criada pela CIER para demonstração. · <Link href="/portfolio?frente=sites">Portfólio CIER</Link>
        </div>
      </footer>
      <a className={`${s.btn} ${s.fabwa}`} target="_blank" rel="noreferrer" href={wa}>
        Falar com corretor
      </a>

      <dialog
        ref={dlgRef}
        aria-labelledby="d-t"
        onClose={() => setDetalheId(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) fechar();
        }}
      >
        {detalhe && (
          <>
            <div className={s.dfoto} style={{ background: grad(detalhe) }}>
              <button className={s.x} type="button" aria-label="Fechar" onClick={fechar}>
                ×
              </button>
              {ICONES[detalhe.tipo]}
            </div>
            <div className={s.dbody}>
              <div>
                <p className={s.kicker}>
                  {detalhe.finalidade === "venda" ? "Venda" : "Aluguel"} · {detalhe.tipo}
                </p>
                <h2 id="d-t">{detalhe.titulo}</h2>
                <p className={s.small} style={{ marginTop: ".3rem" }}>
                  {detalhe.bairro}
                </p>
              </div>
              <p className={s.pr}>
                <Preco i={detalhe} />
              </p>
              <div className={s.specs}>
                <Specs i={detalhe} />
              </div>
              <p className={s.desc}>{detalhe.descricao}</p>

              <div className={s.sim}>
                {detalhe.finalidade === "venda" ? (
                  <>
                    <h3>Simule a parcela</h3>
                    <div>
                      <div className={s.rv}>
                        <label htmlFor="s-ent">Entrada</label>
                        <output htmlFor="s-ent">
                          {entrada}% · {brl.format(valorEntrada)}
                        </output>
                      </div>
                      <input type="range" id="s-ent" min={10} max={60} step={5} value={entrada} onChange={(e) => setEntrada(Number(e.target.value))} />
                    </div>
                    <div>
                      <div className={s.rv}>
                        <label htmlFor="s-ano">Prazo</label>
                        <output htmlFor="s-ano">{anos} anos</output>
                      </div>
                      <input type="range" id="s-ano" min={5} max={35} step={1} value={anos} onChange={(e) => setAnos(Number(e.target.value))} />
                    </div>
                    <div className={s.res2}>
                      <div>
                        <span>Entrada</span>
                        <b>{brl.format(valorEntrada)}</b>
                      </div>
                      <div>
                        <span>Financiado</span>
                        <b>{brl.format(financiado)}</b>
                      </div>
                      <div className={s.big}>
                        <span>Parcela estimada por mês</span>
                        <b>{brl.format(parcela(financiado, anos))}</b>
                      </div>
                    </div>
                    <p className={s.small}>
                      Simulação de exemplo, com juros de 10,5% ao ano e sem seguros nem taxas. Os valores reais dependem do banco.
                    </p>
                  </>
                ) : (
                  <>
                    <h3>Custo mensal estimado</h3>
                    <div className={s.res2}>
                      <div>
                        <span>Aluguel</span>
                        <b>{brl.format(detalhe.preco)}</b>
                      </div>
                      <div>
                        <span>Condomínio</span>
                        <b>{brl.format(detalhe.condominio)}</b>
                      </div>
                      <div>
                        <span>IPTU (mensal)</span>
                        <b>{brl.format(detalhe.iptu)}</b>
                      </div>
                      <div className={s.big}>
                        <span>Total por mês</span>
                        <b>{brl.format(detalhe.preco + detalhe.condominio + detalhe.iptu)}</b>
                      </div>
                    </div>
                    <p className={s.small}>Valores de exemplo. Taxas e garantia locatícia não estão incluídas.</p>
                  </>
                )}
              </div>

              <a
                className={s.btn}
                target="_blank"
                rel="noreferrer"
                href={waLink(
                  `Olá, vi o imóvel "${detalhe.titulo}" (${detalhe.bairro}) no projeto demo Vila Nova Imóveis, da CIER, e quero um site assim para a minha imobiliária.`,
                )}
              >
                Agendar visita no WhatsApp
              </a>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
