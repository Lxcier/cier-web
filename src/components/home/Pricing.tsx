import { waLink } from "@/lib/whatsapp";

export function Pricing() {
  return (
    <section id="valores">
      <div className="wrap sec-pad">
        <div className="price-card">
          <div>
            <p>Valores</p>
            <h2 className="sec">
              Landing page simples a partir de <span className="price-num">R$ 600</span>
            </h2>
            <p className="sub muted">
              Identidade visual e interfaces têm orçamento sob medida: me conte o que você precisa e eu respondo com
              escopo, prazo e valor.
            </p>
          </div>
          <a className="btn solid" target="_blank" rel="noreferrer" href={waLink()}>
            Pedir orçamento
          </a>
        </div>
      </div>
    </section>
  );
}
