import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" data-motion="reveal">
      <div className="footer-main page-width">
        <div className="footer-about">
          <Link className="footer-brand" href="/">
            La Nonna <span>Cucina</span>
          </Link>
          <p>
            Een ode aan mediterrane warmte en de tijdloze traditie van de
            Italiaanse trattoria. Handgemaakte pasta, koudgeperste olijfolie
            en herinneringen om te koesteren.
          </p>
        </div>
        <div className="footer-block">
          <h2>Openingstijden</h2>
          <p>Donderdag – zondag</p>
          <p>12:00 – 15:00, 18:30 – 23:00</p>
          <p className="muted">Maandag – woensdag: gesloten</p>
        </div>
        <div className="footer-block">
          <h2>Bezoek ons</h2>
          <p>Opperstraat 18, 9180 Lokeren</p>
          <p><a href="tel:+32499410375">+32 499 41 03 75</a></p>
          <p><a href="mailto:info@trattorialanonna.be">info@trattorialanonna.be</a></p>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <p>© 2026 La Nonna Cucina Mediterranea. Alle rechten voorbehouden.</p>
        <div className="social-links" aria-label="Sociale media">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
