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
            An authentic celebration of Mediterranean warmth and timeless
            Italian trattoria heritage. Hand-rolled pasta, cold-pressed oils,
            harvested memories.
          </p>
        </div>
        <div className="footer-block">
          <h2>Hours</h2>
          <p>Thursday – Sunday</p>
          <p>12:00 – 15:00, 18:30 – 23:00</p>
          <p className="muted">Monday – Wednesday: Closed</p>
        </div>
        <div className="footer-block">
          <h2>Visit &amp; say hello</h2>
          <p>Opperstraat 18, 9180 Lokeren</p>
          <p><a href="tel:+32499410375">+32 499 41 03 75</a></p>
          <p><a href="mailto:info@trattorialanonna.be">info@trattorialanonna.be</a></p>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <p>© 2026 La Nonna Cucina Mediterranea. All rights reserved.</p>
        <div className="social-links" aria-label="Social media">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
