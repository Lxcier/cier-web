import type { Metadata } from "next";
import { ClinicDemo } from "@/components/demos/clinic/ClinicDemo";

export const metadata: Metadata = {
  title: { absolute: "Sorriso Prime · Odontologia (projeto demonstrativo CIER)" },
  description: "Projeto demonstrativo da CIER: site para consultório odontológico com agendamento por horário. Marca fictícia.",
};

export default function SorrisoPrimePage() {
  return <ClinicDemo />;
}
