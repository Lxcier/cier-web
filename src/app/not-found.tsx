import Link from "next/link";

/* Página 404 global (endereços que não pertencem a nenhuma rota). Estilo próprio, sem depender do CSS do site. */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "1.5rem",
        background: "#07060d",
        color: "#f6f3fb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div>
        <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Página não encontrada</h1>
        <p style={{ color: "#b3a8c4", margin: "0.75rem 0 1.5rem" }}>Esse endereço não existe.</p>
        <Link href="/" style={{ color: "#a78bfa" }}>
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
