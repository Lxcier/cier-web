"use client";

import { useMemo, useState } from "react";
import { newsreader, figtree } from "./fonts";
import styles from "./clinic.module.css";
import {
  DIAS_UTEIS,
  horasDe,
  primeiraLivre,
  TRATAMENTOS,
  QUIZ,
  TIMELINE,
  FAQ,
  waLink,
  DEMO_MSG,
} from "./data";

const fDia = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const fLongo = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function ClinicDemo() {
  const [selDia, setSelDia] = useState(0);
  const [selHora, setSelHora] = useState<string | null>(() =>
    primeiraLivre(DIAS_UTEIS[0])
  );
  const [quizAtivo, setQuizAtivo] = useState<number | null>(null);

  const slotsDoDia = useMemo(() => horasDe(DIAS_UTEIS[selDia]), [selDia]);

  function escolheDia(i: number) {
    setSelDia(i);
    setSelHora(primeiraLivre(DIAS_UTEIS[i]));
  }

  function escolheHora(h: string, ocupado: boolean) {
    if (ocupado) return;
    setSelHora(h);
  }

  const resumoTxt = selHora
    ? (() => {
        const txt = `${fLongo.format(DIAS_UTEIS[selDia])}, às ${selHora}`;
        return txt.charAt(0).toUpperCase() + txt.slice(1);
      })()
    : null;

  const bookHref = selHora
    ? waLink(
        `Olá, vi o projeto demo "Sorriso Prime" no portfólio da CIER. Esta é a tela de agendamento de exemplo, com o horário "${resumoTxt}". Quero um site assim para o meu consultório.`
      )
    : "#";

  const quiz = quizAtivo !== null ? QUIZ[quizAtivo] : null;
  const quizHref = quiz
    ? waLink(
        `Olá, vi o projeto demo "Sorriso Prime" no portfólio da CIER. A triagem de exemplo sugeriu "${quiz.t}". Quero um site assim para o meu consultório.`
      )
    : "#";

  const waGeral = waLink(DEMO_MSG);

  return (
    <div
      className={`${styles.clinic} ${newsreader.variable} ${figtree.variable}`}
      data-demo="clinic"
    >
      <div className={styles["demo-bar"]}>
        <span>
          Projeto demonstrativo da CIER · marca fictícia. Os botões abrem a
          conversa com a CIER.
        </span>
        <a href="/portfolio?frente=sites">← Voltar ao portfólio</a>
      </div>

      <div className={styles.shell}>
        <aside className={styles.rail}>
          <a className={styles.logo} href="#topo">
            <i>S</i>
            <span>
              Sorriso <b>Prime</b>
            </span>
          </a>
          <nav aria-label="Seções">
            <a href="#agendar">Agendar</a>
            <a href="#tratamentos">Tratamentos</a>
            <a href="#triagem">Qual tratamento?</a>
            <a href="#dra">A dentista</a>
            <a href="#consulta">Primeira consulta</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <div className={styles.info}>
            <b>Segunda a sexta</b>
            <br />
            8h às 18h
            <br />
            <b>Sábado</b>
            <br />
            8h às 12h
            <br />
            Rua Exemplo, 123 · Centro
            <br />
            (endereço fictício)
          </div>
        </aside>

        <main className={styles.main} id="topo">
          <section className={`${styles.hero} ${styles.col}`}>
            <p className={styles.eyebrow}>Odontologia geral e estética</p>
            <h1>
              Seu sorriso, <em>sem pressa</em> e sem susto.
            </h1>
            <p className={styles.lead}>
              Hora marcada, cada etapa explicada antes de começar e um plano
              de tratamento que cabe na sua rotina. Escolha abaixo o melhor
              horário para a primeira avaliação.
            </p>
          </section>

          <section
            id="agendar"
            className={styles.book}
            aria-labelledby="book-t"
          >
            <div className={styles["book-main"]}>
              <h2 id="book-t">Escolha um horário</h2>
              <p className={styles.muted}>Avaliação inicial de 40 minutos.</p>
              <div className={styles.days} role="group" aria-label="Dia da consulta">
                {DIAS_UTEIS.map((dia, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.day}
                    aria-pressed={i === selDia}
                    onClick={() => escolheDia(i)}
                  >
                    <span>{fDia.format(dia).replace(".", "")}</span>
                    <b>{dia.getDate()}</b>
                  </button>
                ))}
              </div>
              <div className={styles.times} role="group" aria-label="Horário da consulta">
                {slotsDoDia.map((x) => (
                  <button
                    key={x.h}
                    type="button"
                    className={styles.time}
                    disabled={x.ocupado}
                    aria-pressed={x.h === selHora}
                    onClick={() => escolheHora(x.h, x.ocupado)}
                  >
                    {x.h}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles["book-side"]}>
              <p className={styles.k}>Seu pedido</p>
              <p className={styles.sum}>
                {resumoTxt ?? "Sem horário livre neste dia. Escolha outro dia."}
              </p>
              <a
                className={styles.btn}
                target="_blank"
                rel="noreferrer"
                href={bookHref}
                aria-disabled={!selHora}
              >
                Pedir este horário no WhatsApp
              </a>
              <p className={styles.note}>
                Demonstração: os horários são de exemplo e o pedido abre a
                conversa com a CIER.
              </p>
            </div>
          </section>

          <section id="tratamentos" className={styles.sec}>
            <div className={styles.col}>
              <h2>Tratamentos</h2>
              <p className={styles.sub}>
                Do cuidado de rotina aos procedimentos estéticos. Tudo
                explicado antes de começar.
              </p>
            </div>
            <ul className={`${styles.lista} ${styles.col}`}>
              {TRATAMENTOS.map((t) => (
                <li className={styles.trat} key={t.titulo}>
                  <h3>{t.titulo}</h3>
                  <p>{t.desc}</p>
                  <span className={styles.dur}>{t.dur}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="triagem" className={styles.sec}>
            <div className={styles.col}>
              <h2>Qual tratamento combina com você?</h2>
              <p className={styles.sub}>
                Uma pergunta, uma sugestão. Não substitui a avaliação com a
                dentista.
              </p>
              <div
                className={styles.opts}
                role="group"
                aria-label="O que trouxe você aqui"
              >
                {QUIZ.map((q, i) => (
                  <button
                    key={q.k}
                    type="button"
                    className={styles.opt}
                    aria-pressed={quizAtivo === i}
                    onClick={() => setQuizAtivo(i)}
                  >
                    {q.k}
                  </button>
                ))}
              </div>
              {quiz && (
                <div className={styles.answer} aria-live="polite">
                  <h3>{quiz.t}</h3>
                  <p className={styles.muted}>{quiz.p}</p>
                  <a
                    className={`${styles.btn} ${styles.line}`}
                    target="_blank"
                    rel="noreferrer"
                    href={quizHref}
                  >
                    Conversar sobre isso no WhatsApp
                  </a>
                </div>
              )}
            </div>
          </section>

          <section id="dra" className={styles.sec}>
            <div className={`${styles.dra} ${styles.col}`}>
              <div className={styles.portrait} aria-hidden="true">
                HD
              </div>
              <div>
                <h2>Uma clínica pequena, com atenção de verdade.</h2>
                <p>
                  Aqui você conversa com a dentista antes de qualquer
                  procedimento. Entendemos o que você precisa, explicamos as
                  opções e decidimos juntos.
                </p>
                <dl className={styles.facts}>
                  <div>
                    <dt>Responsável</dt>
                    <dd>Dra. Helena Duarte</dd>
                  </div>
                  <div>
                    <dt>Registro</dt>
                    <dd>CRO 00000</dd>
                  </div>
                  <div>
                    <dt>Atuação</dt>
                    <dd>12 anos</dd>
                  </div>
                </dl>
                <p className={styles.ex}>
                  Nome, registro e tempo de atuação são fictícios, apenas
                  para demonstração.
                </p>
              </div>
            </div>
          </section>

          <section id="consulta" className={styles.sec}>
            <div className={styles.col}>
              <h2>Como é a primeira consulta</h2>
              <p className={styles.sub}>
                Quarenta minutos, sem surpresa no meio do caminho.
              </p>
              <ol className={styles.tl}>
                {TIMELINE.map((item) => (
                  <li key={item.t}>
                    <span className={styles.t}>{item.t}</span>
                    <h3>{item.titulo}</h3>
                    <p>{item.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="duvidas" className={styles.sec}>
            <div className={styles.col}>
              <h2>Dúvidas frequentes</h2>
              <div className={styles.faq}>
                {FAQ.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.sec}>
            <div className={styles.col}>
              <h2>Onde estamos</h2>
              <div className={styles.hours}>
                <dl>
                  <dt>Endereço</dt>
                  <dd>Rua Exemplo, 123 · Centro (fictício)</dd>
                  <dt>Contato</dt>
                  <dd>(00) 00000-0000 · contato@exemplo.com</dd>
                </dl>
                <dl>
                  <dt>Segunda a sexta</dt>
                  <dd>8h às 18h</dd>
                  <dt>Sábado</dt>
                  <dd>8h às 12h</dd>
                </dl>
              </div>
              <div className={styles["cta-end"]}>
                <a
                  className={styles.btn}
                  target="_blank"
                  rel="noreferrer"
                  href={waGeral}
                >
                  Falar no WhatsApp
                </a>
                <a className={`${styles.btn} ${styles.line}`} href="#agendar">
                  Voltar aos horários
                </a>
              </div>
            </div>
          </section>

          <footer className={styles.foot}>
            Sorriso Prime é uma marca fictícia criada pela CIER para
            demonstração. ·{" "}
            <a href="/portfolio?frente=sites" style={{ textDecoration: "underline" }}>
              Portfólio CIER
            </a>
          </footer>
        </main>
      </div>
      <a className={`${styles.btn} ${styles.fab}`} href="#agendar">
        Agendar avaliação
      </a>
    </div>
  );
}
