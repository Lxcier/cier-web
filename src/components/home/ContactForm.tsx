"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";

export function ContactForm() {
  const [nome, setNome] = useState("");
  const [pedido, setPedido] = useState("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = nome.trim();
    const p = pedido.trim();
    const mensagem =
      "Olá, vim pelo site da CIER." +
      (n ? ` Meu nome é ${n}.` : "") +
      "\n\n" +
      (p || "Quero conversar sobre um projeto.");
    window.open(waLink(mensagem), "_blank", "noopener");
  }

  return (
    <form className="lead-form col" id="lead-form" onSubmit={enviar}>
      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        name="nome"
        placeholder="Como posso te chamar"
        autoComplete="name"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <label className="second" htmlFor="pedido">
        O que você precisa
      </label>
      <textarea
        id="pedido"
        name="pedido"
        required
        rows={4}
        placeholder="Site, identidade visual ou as telas de um produto"
        value={pedido}
        onChange={(e) => setPedido(e.target.value)}
      />
      <button type="submit" className="btn submit">
        Enviar no WhatsApp
        <ArrowRightIcon />
      </button>
    </form>
  );
}
