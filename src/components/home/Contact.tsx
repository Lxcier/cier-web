import { MailIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contato">
      <div className="wrap">
        <div className="col">
          <h2 className="sec">Vamos falar do projeto</h2>
          <p className="sub muted">
            Conte o que você precisa e a conversa abre direto no meu WhatsApp. Se preferir, escreva para o e-mail abaixo.
          </p>
          <div className="links">
            <a target="_blank" rel="noreferrer" href={waLink()}>
              <WhatsAppIcon />
              {site.whatsappExibicao}
            </a>
            <a href={`mailto:${site.email}?subject=Projeto%20%E2%80%94%20CIER`}>
              <MailIcon />
              {site.email}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
