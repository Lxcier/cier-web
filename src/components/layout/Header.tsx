"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { waLink } from "@/lib/whatsapp";

const MENU = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#processo", label: "Como funciona" },
  { href: "/#contato", label: "Fale comigo" },
];

function MenuButton({ variant, open, onClick }: { variant: "desk" | "mob"; open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`menu-btn ${variant}`}
      aria-expanded={open}
      aria-controls="menu-panel"
      aria-label={variant === "mob" ? (open ? "Fechar menu" : "Abrir menu") : undefined}
      onClick={onClick}
    >
      <span className="glyph" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      Menu
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Na home a navbar é transparente no topo e ganha fundo ao rolar; nas demais páginas já nasce com fundo.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled;
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const wa = waLink();

  return (
    <header className={["top", solid ? "solid" : "", open ? "menu-open" : ""].filter(Boolean).join(" ")}>
      <div className="wrap bar">
        <div className="left">
          <MenuButton variant="desk" open={open} onClick={toggle} />
        </div>
        <Link href="/" className="brand" aria-label="CIER, início">
          <Image className="logo" src="/images/logo-cier.png" alt="CIER" width={658} height={285} priority />
        </Link>
        <div className="right">
          <MenuButton variant="mob" open={open} onClick={toggle} />
          <a className="pill-top" target="_blank" rel="noreferrer" href={wa}>
            Falar no WhatsApp
          </a>
        </div>
      </div>
      <div id="menu-panel" className={open ? "open" : undefined}>
        <nav>
          <div className="wrap inner">
            {MENU.map((item) => (
              <Link key={item.href} className="item" href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
            <a className="cta-m" target="_blank" rel="noreferrer" href={wa}>
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
