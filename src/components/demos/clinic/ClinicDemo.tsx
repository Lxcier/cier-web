import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import { ClinicBooking } from "./ClinicBooking";
import { ClinicTriage } from "./ClinicTriage";
import { figtree, newsreader } from "./fonts";
import s from "./clinic.module.css";

const MENSAGEM = 'Olá, vi o projeto demo "Sorriso Prime" no portfólio da CIER e quero um site assim para o meu consultório.';

const SECOES = [
  { href: "#agendar", label: "Agendar" },
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#triagem", label: "Qual tratamento?" },
  { href: "#dra", label: "A dentista" },
  { href: "#consulta", label: "Primeira consulta" },
  { href: "#duvidas", label: "Dúvidas" },
];

const TRATAMENTOS = [
  { titulo: "Limpeza e prevenção", texto: "Profilaxia, aplicação de flúor e orientação de higiene para evitar problemas.", duracao: "40 min" },
  { titulo: "Clareamento", texto: "Em consultório ou caseiro, escolhido conforme a sensibilidade dos seus dentes.", duracao: "60 min por sessão" },
  { titulo: "Ortodontia", texto: "Aparelho fixo ou alinhadores, com revisão regular.", duracao: "30 min por revisão" },
  { titulo: "Restaurações", texto: "Cáries tratadas e dente recuperado em cor e formato.", duracao: "45 min" },
  { titulo: "Implantes e próteses", texto: "Reposição de dentes com planejamento por etapas.", duracao: "Plano individual" },
  { titulo: "Odontopediatria", texto: "Atendimento no ritmo da criança, a partir dos 2 anos.", duracao: "30 min" },
];

const PASSOS = [
  { tempo: "0 a 10 min", titulo: "Conversa", texto: "Você conta o que sente e o que quer melhorar. Ninguém começa nada antes disso." },
  { tempo: "10 a 30 min", titulo: "Exame", texto: "Avaliação clínica e, se for preciso, radiografia." },
  { tempo: "30 a 40 min", titulo: "Plano de tratamento", texto: "Você sai com as opções, os prazos e os valores antes de decidir." },
];

const DUVIDAS = [
  { pergunta: "Atendem crianças?", resposta: "Sim, a partir dos 2 anos. O atendimento é feito com calma e no ritmo da criança." },
  { pergunta: "Quais formas de pagamento?", resposta: "Aceitamos Pix, cartão de crédito e débito. Tratamentos mais longos podem ser parcelados, e o valor aparece no plano de tratamento antes de você decidir." },
  { pergunta: "Preciso levar algum exame?", resposta: "Se você já tem radiografias, leve. Se não, avaliamos se há necessidade." },
  { pergunta: "E se eu precisar remarcar?", resposta: "É só avisar pelo WhatsApp com um dia de antecedência e escolhemos outro horário." },
];

/** Projeto demonstrativo: site de consultório odontológico (marca fictícia). */
export function ClinicDemo() {
  const wa = waLink(MENSAGEM);

  return (
    <div className={`${s.root} ${newsreader.variable} ${figtree.variable}`} data-demo>
      <div className={s.demoBar}>
        <span>Projeto demonstrativo da CIER · marca fictícia. Os botões abrem a conversa com a CIER.</span>
        <Link href="/portfolio?frente=sites">← Voltar ao portfólio</Link>
      </div>

      <div className={s.shell}>
        <aside className={s.rail}>
          <a className={s.logo} href="#topo">
            <i>S</i>
            <span>
              Sorriso <b>Prime</b>
            </span>
          </a>
          <nav aria-label="Seções">
            {SECOES.map((x) => (
              <a key={x.href} href={x.href}>
                {x.label}
              </a>
            ))}
          </nav>
          <div className={s.info}>
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

        <main className={s.main} id="topo">
          <section className={`${s.hero} ${s.col}`}>
            <p className={s.eyebrow}>Odontologia geral e estética</p>
            <h1>
              Seu sorriso, <em>sem pressa</em> e sem susto.
            </h1>
            <p className={s.lead}>
              Hora marcada, cada etapa explicada antes de começar e um plano de tratamento que cabe na sua rotina. Escolha abaixo o melhor
              horário para a primeira avaliação.
            </p>
          </section>

          <ClinicBooking />

          <section id="tratamentos" className={s.sec}>
            <div className={s.col}>
              <h2>Tratamentos</h2>
              <p className={s.sub}>Do cuidado de rotina aos procedimentos estéticos. Tudo explicado antes de começar.</p>
            </div>
            <ul className={`${s.lista} ${s.col}`}>
              {TRATAMENTOS.map((t) => (
                <li key={t.titulo} className={s.trat}>
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                  <span className={s.dur}>{t.duracao}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="triagem" className={s.sec}>
            <div className={s.col}>
              <h2>Qual tratamento combina com você?</h2>
              <p className={s.sub}>Uma pergunta, uma sugestão. Não substitui a avaliação com a dentista.</p>
              <ClinicTriage />
            </div>
          </section>

          <section id="dra" className={s.sec}>
            <div className={`${s.dra} ${s.col}`}>
              <div className={s.portrait} aria-hidden="true">
                HD
              </div>
              <div>
                <h2>Uma clínica pequena, com atenção de verdade.</h2>
                <p>
                  Aqui você conversa com a dentista antes de qualquer procedimento. Entendemos o que você precisa, explicamos as opções e
                  decidimos juntos.
                </p>
                <dl className={s.facts}>
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
                <p className={s.ex}>Nome, registro e tempo de atuação são fictícios, apenas para demonstração.</p>
              </div>
            </div>
          </section>

          <section id="consulta" className={s.sec}>
            <div className={s.col}>
              <h2>Como é a primeira consulta</h2>
              <p className={s.sub}>Quarenta minutos, sem surpresa no meio do caminho.</p>
              <ol className={s.tl}>
                {PASSOS.map((p) => (
                  <li key={p.titulo}>
                    <span className={s.t}>{p.tempo}</span>
                    <h3>{p.titulo}</h3>
                    <p>{p.texto}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="duvidas" className={s.sec}>
            <div className={s.col}>
              <h2>Dúvidas frequentes</h2>
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

          <section className={s.sec}>
            <div className={s.col}>
              <h2>Onde estamos</h2>
              <div className={s.hours}>
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
              <div className={s.ctaEnd}>
                <a className={s.btn} target="_blank" rel="noreferrer" href={wa}>
                  Falar no WhatsApp
                </a>
                <a className={`${s.btn} ${s.line}`} href="#agendar">
                  Voltar aos horários
                </a>
              </div>
            </div>
          </section>

          <footer>
            Sorriso Prime é uma marca fictícia criada pela CIER para demonstração. · <Link href="/portfolio?frente=sites">Portfólio CIER</Link>
          </footer>
        </main>
      </div>
      <a className={`${s.btn} ${s.fab}`} href="#agendar">
        Agendar avaliação
      </a>
    </div>
  );
}
