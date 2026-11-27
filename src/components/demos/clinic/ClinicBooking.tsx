"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/whatsapp";
import s from "./clinic.module.css";

const HORAS = ["09:00", "10:30", "14:00", "15:30", "17:00"];

const fDia = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const fLongo = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" });

interface Slot {
  h: string;
  ocupado: boolean;
}

/** Próximos 7 dias úteis: domingo fica de fora. */
function proximosDias(): Date[] {
  const dias: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (dias.length < 7) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) dias.push(new Date(d));
  }
  return dias;
}

/** Sábado só de manhã. A ocupação é fixa por dia, só para a demonstração. */
function horasDe(dia: Date): Slot[] {
  const lista = dia.getDay() === 6 ? HORAS.slice(0, 2) : HORAS;
  return lista.map((h, k) => ({ h, ocupado: (dia.getDate() * 7 + k * 3) % 4 === 0 }));
}

function primeiraLivre(dia: Date): string | null {
  return horasDe(dia).find((x) => !x.ocupado)?.h ?? null;
}

/** Agendamento por dia e horário. Os dias nascem no navegador para não depender do fuso do servidor. */
export function ClinicBooking() {
  const [dias, setDias] = useState<Date[]>([]);
  const [idx, setIdx] = useState(0);
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const lista = proximosDias();
    setDias(lista);
    setHora(lista[0] ? primeiraLivre(lista[0]) : null);
  }, []);

  const dia = dias[idx];
  const carregando = !dia;

  function escolheDia(i: number) {
    const d = dias[i];
    if (!d) return;
    setIdx(i);
    setHora(primeiraLivre(d));
  }

  let resumo = "Carregando horários…";
  let href = "#";
  const pode = Boolean(dia && hora);
  if (dia && !hora) {
    resumo = "Sem horário livre neste dia. Escolha outro dia.";
  } else if (dia && hora) {
    const txt = `${fLongo.format(dia)}, às ${hora}`;
    resumo = txt.charAt(0).toUpperCase() + txt.slice(1);
    href = waLink(
      `Olá, vi o projeto demo "Sorriso Prime" no portfólio da CIER. Esta é a tela de agendamento de exemplo, com o horário "${resumo}". Quero um site assim para o meu consultório.`,
    );
  }

  return (
    <section id="agendar" className={s.book} aria-labelledby="book-t">
      <div className={s.bookMain}>
        <h2 id="book-t">Escolha um horário</h2>
        <p className={s.muted}>Avaliação inicial de 40 minutos.</p>
        <div className={s.days} role="group" aria-label="Dia da consulta">
          {dias.map((d, i) => (
            <button key={d.toISOString()} className={s.day} type="button" aria-pressed={i === idx} onClick={() => escolheDia(i)}>
              <span>{fDia.format(d).replace(".", "")}</span>
              <b>{d.getDate()}</b>
            </button>
          ))}
        </div>
        <div className={s.times} role="group" aria-label="Horário da consulta">
          {dia &&
            horasDe(dia).map((x) => (
              <button key={x.h} className={s.time} type="button" disabled={x.ocupado} aria-pressed={x.h === hora} onClick={() => setHora(x.h)}>
                {x.h}
              </button>
            ))}
        </div>
      </div>
      <div className={s.bookSide}>
        <p className={s.k}>Seu pedido</p>
        <p className={s.sum}>{resumo}</p>
        <a className={s.btn} target="_blank" rel="noreferrer" href={href} aria-disabled={carregando || !pode}>
          Pedir este horário no WhatsApp
        </a>
        <p className={s.note}>Demonstração: os horários são de exemplo e o pedido abre a conversa com a CIER.</p>
      </div>
    </section>
  );
}
