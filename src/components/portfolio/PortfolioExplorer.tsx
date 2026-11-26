"use client";

import { useSearchParams } from "next/navigation";
import { isFrenteId } from "@/lib/projects";
import { PortfolioView, type FrenteFiltro } from "./PortfolioView";

/** Lista filtrável. O filtro vive na URL (?frente=sites), então o link filtrado e o botão voltar funcionam. */
export function PortfolioExplorer() {
  const params = useSearchParams();
  const valor = params.get("frente");
  const frente: FrenteFiltro = isFrenteId(valor) ? valor : "todos";

  function selecionar(id: FrenteFiltro) {
    if (id === frente) return;
    const url = id === "todos" ? "/portfolio" : `/portfolio?frente=${id}`;
    window.history.pushState(null, "", url);
  }

  return <PortfolioView frente={frente} onSelect={selecionar} />;
}
