import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="hero">
      <Image className="hero-globe" src="/images/hero-globe.png" alt="" fill priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <p className="eyebrow">Sites, identidade e interfaces</p>
        <h1>
          Seu negócio com uma <span>cara que as pessoas lembram</span>.
        </h1>
        <p className="lead">
          A CIER cria o site, a identidade visual e as telas do seu projeto. Visual limpo, conversa direta e entrega no
          prazo combinado.
        </p>
        <div className="cta-row">
          <a className="btn solid" target="_blank" rel="noreferrer" href={waLink()}>
            <WhatsAppIcon />
            WhatsApp {site.whatsappExibicao}
          </a>
          <Link className="btn ghost" href="/portfolio">
            Ver portfólio
          </Link>
        </div>
      </div>
    </section>
  );
}
