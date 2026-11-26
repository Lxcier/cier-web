import { site } from "@/data/site";

/** Monta o link do WhatsApp da CIER com a mensagem já preenchida. */
export function waLink(mensagem: string = site.mensagemPadrao): string {
  return `https://wa.me/${site.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}
