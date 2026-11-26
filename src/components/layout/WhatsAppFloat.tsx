import { WhatsAppIcon } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a className="wa-float" target="_blank" rel="noreferrer" href={waLink()} aria-label="Falar no WhatsApp">
      <WhatsAppIcon />
      WhatsApp
    </a>
  );
}
