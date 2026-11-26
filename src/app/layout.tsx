import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import "@/styles/reset.css";

export const metadata: Metadata = {
  title: { default: site.titulo, template: "%s · CIER" },
  description: site.descricao,
  openGraph: {
    title: site.titulo,
    description: site.descricao,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07060d",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
