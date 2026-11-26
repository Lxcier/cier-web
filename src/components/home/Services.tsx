import type { ReactNode } from "react";
import { IdentityIcon, InterfacesIcon, SitesIcon } from "@/components/ui/Icons";

const SERVICOS: { titulo: string; texto: string; icone: ReactNode }[] = [
  {
    titulo: "Sites",
    texto: "Uma página bonita, fácil de usar e pronta para receber quem chega pelo celular ou pelo computador.",
    icone: <SitesIcon />,
  },
  {
    titulo: "Identidade visual",
    texto: "Logo, cores e um visual que deixa a sua marca reconhecível em tudo o que você publica.",
    icone: <IdentityIcon />,
  },
  {
    titulo: "Interfaces",
    texto: "Telas claras para o seu produto, com o caminho óbvio para a pessoa fazer o que você quer.",
    icone: <InterfacesIcon />,
  },
];

export function Services() {
  return (
    <section id="servicos">
      <div className="wrap sec-pad">
        <h2 className="sec">Serviços</h2>
        <p className="sub muted">
          Três jeitos de começar. Escolha o que o seu negócio precisa agora — ou os três juntos.
        </p>
        <div className="grid3">
          {SERVICOS.map((s) => (
            <article key={s.titulo} className="card">
              {s.icone}
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
