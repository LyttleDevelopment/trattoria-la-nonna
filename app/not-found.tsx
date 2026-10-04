import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-intro">
        <p className="eyebrow">Oeps</p>
        <h1>Pagina niet gevonden</h1>
        <p>De pagina die u zoekt bestaat niet of is verplaatst.</p>
        <Link className="button button-primary" href="/">Terug naar de startpagina</Link>
      </section>
    </main>
  );
}
