"use client";

import { useState } from "react";
import { waLink } from "@/lib/whatsapp";
import s from "./clinic.module.css";

const QUIZ = [
  { k: "Estou com dor ou algo me incomoda", t: "Avaliação de urgência", p: "O primeiro passo é um exame clínico para achar a causa. Pode ser uma cárie, uma inflamação ou uma restauração a refazer. Peça o horário mais próximo." },
  { k: "Quero um sorriso mais claro", t: "Clareamento", p: "Conversamos sobre sensibilidade e escolhemos entre o clareamento em consultório e o caseiro, com acompanhamento." },
  { k: "Quero alinhar os dentes", t: "Ortodontia", p: "Na avaliação vemos se o caso pede aparelho fixo ou alinhadores e montamos um plano com prazo estimado." },
  { k: "Só quero fazer a revisão", t: "Limpeza e prevenção", p: "Uma limpeza com flúor e orientação de higiene a cada seis meses evita a maior parte dos problemas." },
  { k: "É para o meu filho", t: "Odontopediatria", p: "A primeira visita é de conhecimento: a criança conhece o consultório e a dentista, no ritmo dela." },
  { k: "Perdi um dente", t: "Implantes e próteses", p: "Avaliamos a região e planejamos a reposição por etapas, explicando cada uma antes de começar." },
] as const;

/** Triagem: uma pergunta, uma sugestão de tratamento. */
export function ClinicTriage() {
  const [sel, setSel] = useState<number | null>(null);
  const q = sel === null ? null : QUIZ[sel];

  return (
    <>
      <div className={s.opts} role="group" aria-label="O que trouxe você aqui">
        {QUIZ.map((item, i) => (
          <button key={item.k} className={s.opt} type="button" aria-pressed={sel === i} onClick={() => setSel(i)}>
            {item.k}
          </button>
        ))}
      </div>
      <div className={s.answer} aria-live="polite" hidden={!q}>
        {q && (
          <>
            <h3>{q.t}</h3>
            <p className={s.muted}>{q.p}</p>
            <a
              className={`${s.btn} ${s.line}`}
              target="_blank"
              rel="noreferrer"
              href={waLink(`Olá, vi o projeto demo "Sorriso Prime" no portfólio da CIER. A triagem de exemplo sugeriu "${q.t}". Quero um site assim para o meu consultório.`)}
            >
              Conversar sobre isso no WhatsApp
            </a>
          </>
        )}
      </div>
    </>
  );
}
