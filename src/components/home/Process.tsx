const PASSOS = [
  { n: "01", titulo: "Você chama", texto: "Conta no WhatsApp ou por e-mail o que você quer colocar no ar." },
  {
    n: "02",
    titulo: "A gente combina",
    texto: "Definimos juntos o que entra, o prazo e o valor — sem surpresa no meio.",
  },
  { n: "03", titulo: "Você recebe", texto: "Eu faço, mostro o andamento e entrego pronto para você usar." },
];

export function Process() {
  return (
    <section id="processo">
      <div className="wrap sec-pad">
        <h2 className="sec">Como funciona</h2>
        <ol>
          {PASSOS.map((p) => (
            <li key={p.n} className="card">
              <span className="n">{p.n}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
