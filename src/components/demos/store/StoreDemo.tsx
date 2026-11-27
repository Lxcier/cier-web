"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { waLink } from "@/lib/whatsapp";
import { bricolage, dmSans } from "./fonts";
import { StoreIcon } from "./icons";
import {
  CAT_NOME,
  FRETE_GRATIS,
  LIMITE_POR_ITEM,
  colecoes,
  precoDaOpcao,
  produtos,
  type ColecaoId,
  type Produto,
} from "./products";
import s from "./store.module.css";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const MARQUEE = ["Frete grátis acima de R$ 200", "Lote 14 saiu do forno", "Postamos em 24 horas", "Feito à mão em lote pequeno"];

const DICAS = [
  { n: "2 h", titulo: "Primeira queima", texto: "Deixe a vela acesa até a cera derreter de borda a borda. Isso evita o buraco no centro." },
  { n: "5 mm", titulo: "Pavio sempre aparado", texto: "Corte o pavio antes de acender de novo. A chama fica baixa e sem fumaça." },
  { n: "4 h", titulo: "Limite por vez", texto: "Apague depois de quatro horas e use o abafador, sem soprar. O vidro agradece." },
];

const PASSOS = [
  { titulo: "Escolha", texto: "Abra o produto e veja tamanho, aroma ou cor." },
  { titulo: "Monte a sacola", texto: "Ajuste as quantidades e veja o frete grátis chegar." },
  { titulo: "Feche no WhatsApp", texto: "O pedido vai pronto na conversa. Combinamos entrega e pagamento ali." },
];

const DUVIDAS = [
  { pergunta: "Em quanto tempo meu pedido chega?", resposta: "Postamos em até 24 horas depois da confirmação do pagamento. A entrega leva de 3 a 7 dias úteis, conforme a sua região." },
  { pergunta: "Posso trocar ou devolver?", resposta: "Pode. Você tem 7 dias depois de receber para pedir a troca, com o produto lacrado e na embalagem original. É só chamar a gente no WhatsApp." },
  { pergunta: "Como posso pagar?", resposta: "Pix com 5% de desconto, cartão de crédito em até 3x sem juros ou link de pagamento. Combinamos tudo na conversa do WhatsApp." },
  { pergunta: "Vocês embalam para presente?", resposta: "Os kits já vão em caixa de presente com cartão. Para os outros produtos, é só pedir a embalagem na conversa." },
];

interface Linha {
  key: string;
  produto: Produto;
  opcao: number;
  qtd: number;
}

/** Projeto demonstrativo: loja virtual com coleções, painel de produto e sacola (marca fictícia). */
export function StoreDemo() {
  const [filtro, setFiltro] = useState<ColecaoId>("todos");
  const [carrinho, setCarrinho] = useState<Linha[]>([]);
  const [atual, setAtual] = useState<Produto | null>(null);
  const [opcao, setOpcao] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [nome, setNome] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);

  const prodRef = useRef<HTMLDialogElement>(null);
  const cartRef = useRef<HTMLDialogElement>(null);
  const produtosRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const d = prodRef.current;
    if (d && atual && !d.open) d.showModal();
  }, [atual]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const itens = produtos.filter((p) => filtro === "todos" || p.cat === filtro);
  const nItens = carrinho.reduce((n, l) => n + l.qtd, 0);
  const subtotal = carrinho.reduce((t, l) => t + precoDaOpcao(l.produto, l.opcao) * l.qtd, 0);
  const falta = FRETE_GRATIS - subtotal;
  const freteOk = nItens > 0 && falta <= 0;

  const frete = !nItens
    ? `Frete grátis a partir de ${brl.format(FRETE_GRATIS)}.`
    : falta > 0
      ? `Faltam ${brl.format(falta)} para o frete grátis.`
      : "Você ganhou frete grátis.";

  function mostraAviso(texto: string) {
    clearTimeout(timer.current);
    setAviso(texto);
    timer.current = setTimeout(() => setAviso(null), 2200);
  }

  function adicionar(produto: Produto, op: number, n: number) {
    const key = `${produto.id}:${op}`;
    setCarrinho((atualLista) => {
      const ja = atualLista.find((l) => l.key === key);
      if (ja) return atualLista.map((l) => (l.key === key ? { ...l, qtd: Math.min(LIMITE_POR_ITEM, l.qtd + n) } : l));
      return [...atualLista, { key, produto, opcao: op, qtd: n }];
    });
  }

  function muda(key: string, delta: number) {
    setCarrinho((lista) =>
      lista.flatMap((l) => {
        if (l.key !== key) return [l];
        const q = Math.min(LIMITE_POR_ITEM, l.qtd + delta);
        return q < 1 ? [] : [{ ...l, qtd: q }];
      }),
    );
  }

  function remover(key: string) {
    setCarrinho((lista) => lista.filter((l) => l.key !== key));
  }

  function abrirProduto(p: Produto) {
    setOpcao(0);
    setQtd(1);
    setAtual(p);
  }

  function irParaProdutos() {
    produtosRef.current?.scrollIntoView();
  }

  const nomeLimpo = nome.trim();
  const mensagem =
    'Olá, vi a loja demo "Lume Ateliê" no portfólio da CIER e quero uma loja virtual assim para o meu negócio.' +
    (carrinho.length
      ? `\n\nPedido de exemplo${nomeLimpo ? ` de ${nomeLimpo}` : ""}:\n` +
        carrinho.map((l) => `- ${l.qtd}x ${l.produto.nome} (${l.produto.ops[l.opcao]}): ${brl.format(precoDaOpcao(l.produto, l.opcao) * l.qtd)}`).join("\n") +
        `\nTotal: ${brl.format(subtotal)}`
      : "");

  const abreSacola = () => cartRef.current?.showModal();
  const fecha = (d: RefObject<HTMLDialogElement | null>) => d.current?.close();

  return (
    <div className={`${s.root} ${bricolage.variable} ${dmSans.variable}`} data-demo>
      <div className={s.demoBar}>
        <div className={s.wrap}>
          <span>Projeto demonstrativo da CIER · marca e produtos fictícios. O pedido final abre a conversa com a CIER.</span>
          <Link href="/portfolio?frente=sites">← Voltar ao portfólio</Link>
        </div>
      </div>

      <div className={s.mq} aria-hidden="true">
        <div>
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <header className={s.nav}>
        <div className={s.wrap}>
          <a href="#topo" className={s.logo}>
            LUME<small>ATELIÊ</small>
          </a>
          <nav className={s.links} aria-label="Seções">
            <a href="#colecoes">Coleções</a>
            <a href="#produtos">Produtos</a>
            <a href="#cuidados">Cuidados</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <span className={s.spacer} />
          <button className={`${s.btn} ${s.ink} ${s.sm}`} type="button" aria-label="Abrir sacola" onClick={abreSacola}>
            Sacola <span className={s.countPill}>{nItens}</span>
          </button>
        </div>
      </header>

      <main id="topo">
        <section className={s.hero}>
          <div className={s.wrap}>
            <div>
              <h1>
                Luz de <span>lote</span> pequeno.
              </h1>
              <p className={s.lead}>
                Velas de cera de soja, difusores e cerâmica torneada à mão. Monte a sacola e feche o pedido pelo WhatsApp.
              </p>
              <div className={s.cta}>
                <a className={s.btn} href="#produtos">
                  Ver produtos
                </a>
                <a className={`${s.btn} ${s.alt}`} href="#colecoes">
                  Escolher coleção
                </a>
              </div>
            </div>
            <div className={s.cluster} aria-hidden="true">
              <div className={`${s.t} ${s.t1}`}>
                <StoreIcon id="velas" />
              </div>
              <div className={`${s.t} ${s.t2}`}>
                <StoreIcon id="difusores" />
              </div>
              <div className={`${s.t} ${s.t3}`}>
                <StoreIcon id="ceramica" />
              </div>
              <div className={s.sticker}>
                <div>
                  <b>40 h</b>de queima
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={s.blk} id="colecoes">
          <div className={s.wrap}>
            <div className={s.sh}>
              <h2>Coleções</h2>
              <p>Toque em uma para filtrar o catálogo.</p>
            </div>
            <div className={s.rail}>
              {colecoes.map((c) => {
                const n = c.id === "todos" ? produtos.length : produtos.filter((p) => p.cat === c.id).length;
                return (
                  <button
                    key={c.id}
                    className={s.col}
                    type="button"
                    aria-pressed={c.id === filtro}
                    style={{ background: c.bg }}
                    onClick={() => {
                      setFiltro(c.id);
                      irParaProdutos();
                    }}
                  >
                    <StoreIcon id={c.id} />
                    <div>
                      <h3>{c.nome}</h3>
                      <span>{n} produtos</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className={s.blk} id="produtos" ref={produtosRef} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <div className={s.sh}>
              <h2>{filtro === "todos" ? "Tudo" : CAT_NOME[filtro]}</h2>
              <p aria-live="polite">{itens.length} produtos</p>
            </div>
            <div className={s.masonry}>
              {itens.map((p) => {
                const aPartirDe = p.add.some((x) => x > 0);
                return (
                  <article key={p.id} className={s.tile}>
                    <button
                      className={s.foto}
                      type="button"
                      aria-label={`Ver ${p.nome}`}
                      style={{ background: p.bg, aspectRatio: p.ar }}
                      onClick={() => abrirProduto(p)}
                    >
                      {p.tag && <span className={s.tag}>{p.tag}</span>}
                      <StoreIcon id={p.cat} />
                    </button>
                    <div className={s.meta}>
                      <div>
                        <h3>{p.nome}</h3>
                        <p className={s.cat}>{CAT_NOME[p.cat]}</p>
                        <p className={s.pr}>
                          {aPartirDe ? "a partir de " : ""}
                          {brl.format(p.preco)}
                        </p>
                      </div>
                      <button
                        className={s.add}
                        type="button"
                        aria-label={`Adicionar ${p.nome} à sacola`}
                        onClick={() => {
                          adicionar(p, 0, 1);
                          mostraAviso(`${p.nome} na sacola`);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${s.blk} ${s.care}`} id="cuidados">
          <div className={s.wrap}>
            <div className={s.sh}>
              <h2>Como cuidar da sua vela</h2>
              <p>Três hábitos que dobram a vida dela.</p>
            </div>
            <div className={s.tips}>
              {DICAS.map((d) => (
                <div key={d.titulo} className={s.tip}>
                  <b>{d.n}</b>
                  <h3>{d.titulo}</h3>
                  <p>{d.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.blk} ${s.how}`}>
          <div className={s.wrap}>
            <div className={s.sh}>
              <h2>Como comprar</h2>
            </div>
            <ol>
              {PASSOS.map((p) => (
                <li key={p.titulo}>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.blk} id="duvidas">
          <div className={s.wrap}>
            <div className={s.sh}>
              <h2>Dúvidas</h2>
            </div>
            <div className={s.faq}>
              {DUVIDAS.map((d) => (
                <details key={d.pergunta}>
                  <summary>{d.pergunta}</summary>
                  <p>{d.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={s.wrap}>
          <div className={s.fgrid}>
            <span>Rua Exemplo, 789 · Pinheiros (fictício)</span>
            <span>Seg a sex, 9h às 17h</span>
            <span>contato@exemplo.com</span>
          </div>
          <div className={s.mark} aria-hidden="true">
            LUME
          </div>
          <p className={s.legal}>
            Lume Ateliê é uma marca fictícia criada pela CIER para demonstração. · <Link href="/portfolio?frente=sites">Portfólio CIER</Link>
          </p>
        </div>
      </footer>

      <button className={`${s.btn} ${s.ink} ${s.fab}`} type="button" aria-label="Abrir sacola" onClick={abreSacola}>
        Sacola <span className={s.countPill}>{nItens}</span>
      </button>

      <dialog
        ref={prodRef}
        className={s.panel}
        aria-labelledby="p-titulo"
        onClose={() => setAtual(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) fecha(prodRef);
        }}
      >
        {atual && (
          <>
            <button className={s.xbtn} type="button" aria-label="Fechar" onClick={() => fecha(prodRef)}>
              ×
            </button>
            <div className={s.pfoto} style={{ background: atual.bg }}>
              <StoreIcon id={atual.cat} />
            </div>
            <div className={s.pbody}>
              <div>
                <p className={s.fl}>{CAT_NOME[atual.cat]}</p>
                <h2 id="p-titulo">{atual.nome}</h2>
              </div>
              <p className={s.pdesc}>{atual.desc}</p>
              <div className={s.specs}>
                {atual.specs.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <div>
                <p className={s.fl} id="p-opl">
                  {atual.opl}
                </p>
                <div className={s.pills} role="group" aria-labelledby="p-opl">
                  {atual.ops.map((o, i) => (
                    <button key={o} className={s.pill} type="button" aria-pressed={i === opcao} onClick={() => setOpcao(i)}>
                      {o}
                      {atual.add[i] ? ` (+ ${brl.format(atual.add[i] ?? 0)})` : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className={s.row}>
                <div>
                  <p className={s.fl}>Quantidade</p>
                  <div className={s.qty}>
                    <button type="button" aria-label="Diminuir" onClick={() => setQtd((q) => Math.max(1, q - 1))}>
                      −
                    </button>
                    <output>{qtd}</output>
                    <button type="button" aria-label="Aumentar" onClick={() => setQtd((q) => Math.min(LIMITE_POR_ITEM, q + 1))}>
                      +
                    </button>
                  </div>
                </div>
                <p className={s.big}>{brl.format(precoDaOpcao(atual, opcao) * qtd)}</p>
              </div>
              <button
                className={`${s.btn} ${s.block}`}
                type="button"
                onClick={() => {
                  adicionar(atual, opcao, qtd);
                  fecha(prodRef);
                  mostraAviso(`${atual.nome} na sacola`);
                }}
              >
                Adicionar à sacola
              </button>
            </div>
          </>
        )}
      </dialog>

      <dialog
        ref={cartRef}
        className={s.sheet}
        aria-labelledby="c-titulo"
        onClick={(e) => {
          if (e.target === e.currentTarget) fecha(cartRef);
        }}
      >
        <div className={s.shead}>
          <h2 id="c-titulo">Sua sacola</h2>
          <button className={s.xbtn} type="button" aria-label="Fechar sacola" onClick={() => fecha(cartRef)}>
            ×
          </button>
        </div>
        <div className={s.sbody}>
          {carrinho.length === 0 ? (
            <div className={s.empty}>
              <p className={s.disp} style={{ fontSize: "1.6rem" }}>
                Sacola vazia.
              </p>
              <button
                className={`${s.btn} ${s.alt} ${s.sm}`}
                type="button"
                onClick={() => {
                  fecha(cartRef);
                  irParaProdutos();
                }}
              >
                Ver produtos
              </button>
            </div>
          ) : (
            carrinho.map((l) => (
              <div key={l.key} className={s.item}>
                <div className={s.mini} style={{ background: l.produto.bg }}>
                  <StoreIcon id={l.produto.cat} />
                </div>
                <div>
                  <h3>{l.produto.nome}</h3>
                  <p className={s.opt}>{l.produto.ops[l.opcao]}</p>
                  <div>
                    <span className={s.qty}>
                      <button type="button" aria-label="Diminuir" onClick={() => muda(l.key, -1)}>
                        −
                      </button>
                      <output>{l.qtd}</output>
                      <button type="button" aria-label="Aumentar" onClick={() => muda(l.key, 1)}>
                        +
                      </button>
                    </span>
                    <button className={s.rm} type="button" onClick={() => remover(l.key)}>
                      Remover
                    </button>
                  </div>
                </div>
                <p className={s.sum}>{brl.format(precoDaOpcao(l.produto, l.opcao) * l.qtd)}</p>
              </div>
            ))
          )}
        </div>
        <div className={s.sfoot}>
          <div>
            <p className={s.ship}>{frete}</p>
            <div className={`${s.bar} ${freteOk ? s.done : ""}`}>
              <i style={{ width: `${Math.min(100, Math.round((subtotal / FRETE_GRATIS) * 100))}%` }} />
            </div>
          </div>
          <div className={s.total}>
            <span>Total</span>
            <span className={s.disp}>{brl.format(subtotal)}</span>
          </div>
          <div>
            <label className={s.fl} htmlFor="c-nome">
              Seu nome (opcional)
            </label>
            <input
              type="text"
              id="c-nome"
              autoComplete="name"
              placeholder="Como devemos te chamar"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <a
            className={`${s.btn} ${s.block}`}
            target="_blank"
            rel="noreferrer"
            href={nItens ? waLink(mensagem) : "#"}
            aria-disabled={!nItens}
          >
            Finalizar pelo WhatsApp
          </a>
          <p className={s.note}>Demonstração: o pedido vai para a conversa com a CIER, não para uma loja real.</p>
        </div>
      </dialog>

      <div className={s.toast} role="status" hidden={!aviso}>
        {aviso}
      </div>
    </div>
  );
}
