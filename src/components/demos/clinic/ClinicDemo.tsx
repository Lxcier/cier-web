import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import { fraunces, inter } from "./fonts";
import s from "./clinic.module.css";

const MENSAGEM = 'Olá, vi o projeto demo "Sorriso Prime" no portfólio da CIER e quero um site assim para o meu consultório.';

const TRATAMENTOS = [
  { titulo: "Limpeza e prevenção", texto: "Profilaxia, aplicação de flúor e orientação de higiene para evitar problemas." },
  { titulo: "Clareamento", texto: "Opções em consultório ou caseiro, escolhidas conforme a sensibilidade dos seus dentes." },
  { titulo: "Ortodontia", texto: "Avaliação para aparelhos fixos ou alinhadores, com acompanhamento regular." },
  { titulo: "Restaurações", texto: "Tratamento de cáries e recuperação do formato e da cor do dente." },
  { titulo: "Implantes e próteses", texto: "Reposição de dentes com planejamento e acompanhamento." },
  { titulo: "Odontopediatria", texto: "Atendimento acolhedor para crianças, no ritmo delas." },
];

const PASSOS = [
  { titulo: "Você agenda", texto: "Escolha um horário pelo WhatsApp. Respondemos no mesmo dia útil." },
  { titulo: "Avaliação", texto: "Conversa, exame clínico e, se necessário, radiografia." },
  { titulo: "Plano de tratamento", texto: "Você recebe as opções, os prazos e os valores antes de decidir." },
];

const DUVIDAS = [
  {
    pergunta: "Como funciona a primeira consulta?",
    resposta: "É uma avaliação: conversamos sobre o que você sente e quer melhorar, examinamos e apresentamos o caminho.",
  },
  { pergunta: "Atendem crianças?", resposta: "Sim. O atendimento é feito com calma e no ritmo da criança." },
  {
    pergunta: "Quais formas de pagamento?",
    resposta: "Aqui entra a política real da clínica: Pix, cartão e parcelamento. Este texto é de exemplo.",
  },
  {
    pergunta: "Preciso levar algum exame?",
    resposta: "Se você já tem radiografias, leve. Se não, avaliamos se há necessidade.",
  },
];

/** Projeto demonstrativo: site de consultório odontológico (marca fictícia). */
export function ClinicDemo() {
  const wa = waLink(MENSAGEM);

  return (
    <div className={`${s.root} ${fraunces.variable} ${inter.variable}`} data-demo>
      <div className={s.demoBar}>
        <div className={s.wrap}>
          <span>Projeto demonstrativo da CIER · marca fictícia. Os botões abrem a conversa com a CIER.</span>
          <span>
            <Link href="/portfolio?frente=sites">← Voltar ao portfólio</Link>
          </span>
        </div>
      </div>

      <header className={s.nav}>
        <div className={s.wrap}>
          <a href="#topo" className={s.logo}>
            <i>S</i>Sorriso Prime
          </a>
          <nav className={s.links} aria-label="Seções">
            <a href="#servicos">Tratamentos</a>
            <a href="#sobre">A clínica</a>
            <a href="#atendimento">Atendimento</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className={`${s.btn} ${s.sm}`} target="_blank" rel="noreferrer" href={wa}>
            Agendar avaliação
          </a>
        </div>
      </header>

      <main id="topo">
        <div className={`${s.wrap} ${s.hero}`}>
          <div>
            <p className={s.eyebrow}>Odontologia geral e estética</p>
            <h1>Cuidar do seu sorriso começa com uma conversa.</h1>
            <p className={s.lead}>
              Atendimento com hora marcada, explicação clara de cada etapa e um plano de tratamento que cabe na sua
              rotina.
            </p>
            <div className={s.cta}>
              <a className={s.btn} target="_blank" rel="noreferrer" href={wa}>
                Agendar avaliação pelo WhatsApp
              </a>
              <a className={`${s.btn} ${s.alt}`} href="#servicos">
                Ver tratamentos
              </a>
            </div>
            <div className={s.facts}>
              <span>Hora marcada</span>
              <span>Plano explicado antes de começar</span>
              <span>Atendimento para toda a família</span>
            </div>
          </div>
          <div className={s.visual} aria-hidden="true">
            <svg className={s.tooth} viewBox="0 0 100 120" fill="none">
              <path
                d="M50 8c-10-6-30-4-36 12-5 14 2 30 6 44 3 12 3 36 12 40 8 3 9-18 18-18s10 21 18 18c9-4 9-28 12-40 4-14 11-30 6-44C80 4 60 2 50 8Z"
                fill="#fff"
                stroke="#0e7490"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path d="M32 34c4-6 10-8 16-6" stroke="#bae6f0" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className={`${s.float} ${s.f1}`}>
              <b>Avaliação</b>primeiro passo
            </div>
            <div className={`${s.float} ${s.f2}`}>
              <b>Plano claro</b>etapas e prazos
            </div>
          </div>
        </div>

        <section id="servicos">
          <div className={s.wrap}>
            <div className={s.secHead}>
              <h2>Tratamentos</h2>
              <p>Do cuidado de rotina aos procedimentos estéticos, tudo explicado antes de começar.</p>
            </div>
            <div className={`${s.grid} ${s.g3}`}>
              {TRATAMENTOS.map((t, i) => (
                <article key={t.titulo} className={s.card}>
                  <div className={s.ic}>{i + 1}</div>
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className={s.about}>
          <div className={s.wrap}>
            <div className={s.portrait} aria-hidden="true">
              HD
            </div>
            <div>
              <h2>Uma clínica pequena, com atenção de verdade.</h2>
              <p>
                Aqui você conversa com a dentista antes de qualquer procedimento. A ideia é simples: entender o que você
                precisa, explicar as opções e decidir juntos.
              </p>
              <p>Esta seção apresenta o profissional responsável, a formação e a filosofia de atendimento.</p>
              <small>Dra. Helena Duarte · CRO 00000 (dados fictícios, apenas para demonstração)</small>
            </div>
          </div>
        </section>

        <section id="atendimento">
          <div className={s.wrap}>
            <div className={s.secHead}>
              <h2>Como funciona o atendimento</h2>
              <p>Três passos, sem surpresa no meio do caminho.</p>
            </div>
            <div className={`${s.grid} ${s.g3} ${s.steps}`}>
              {PASSOS.map((p) => (
                <div key={p.titulo} className={s.step}>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="duvidas">
          <div className={s.wrap} style={{ maxWidth: "48rem" }}>
            <div className={s.secHead}>
              <h2>Dúvidas frequentes</h2>
            </div>
            {DUVIDAS.map((d) => (
              <details key={d.pergunta}>
                <summary>{d.pergunta}</summary>
                <p>{d.resposta}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <div className={s.wrap}>
            <div className={s.contact}>
              <div>
                <h2>Pronto para marcar sua avaliação?</h2>
                <p>Chame no WhatsApp e escolha o melhor horário.</p>
                <a className={s.btn} target="_blank" rel="noreferrer" href={wa}>
                  Falar no WhatsApp
                </a>
              </div>
              <div className={s.info}>
                <div>
                  <b>Endereço</b>Rua Exemplo, 123 · Centro (fictício)
                </div>
                <div>
                  <b>Horário</b>Segunda a sexta, 8h às 18h · Sábado, 8h às 12h
                </div>
                <div>
                  <b>Contato</b>(00) 00000-0000 · contato@exemplo.com
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={s.wrap}>
          Sorriso Prime é uma marca fictícia criada pela CIER para demonstração. ·{" "}
          <Link href="/portfolio?frente=sites" style={{ textDecoration: "underline" }}>
            Portfólio CIER
          </Link>
        </div>
      </footer>
      <a className={`${s.btn} ${s.stickyWa}`} target="_blank" rel="noreferrer" href={wa}>
        Agendar pelo WhatsApp
      </a>
    </div>
  );
}
