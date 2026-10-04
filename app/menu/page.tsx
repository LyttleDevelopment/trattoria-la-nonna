import type { Metadata } from "next";
import { drinkSections, formatEuro, menuSections } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menukaart",
  description: "De menukaart met gerechten en dranken van La Nonna Cucina.",
};

export default function MenuPage() {
  return (
    <main id="main">
      <section className="page-intro menu-intro">
        <p className="eyebrow">De keuken</p>
        <h1>Onze menukaart</h1>
        <p>Gerechten, desserts en dranken bij La Nonna.</p>
      </section>
      <div className="menu-page-content page-width">
      <p className="menu-price-note">
        De prijzen gelden voor consumptie ter plaatse. Afhaalprijzen staan erbij
        waar ze beschikbaar zijn. Gemarkeerde gerechten zijn niet af te halen.
      </p>
      {menuSections.map((section) => (
        <section className="menu-section" key={section.name} aria-labelledby={`menu-${section.name}`} data-motion="reveal">
          <h2 id={`menu-${section.name}`}>{section.name}</h2>
            <div className="menu-card-grid">
              {section.items.map((item) => (
                <article className="menu-card" key={item.id} data-motion="reveal">
                  <div className="menu-card-title">
                    <h3>{item.name}</h3>
                    <div className="menu-prices">
                      <span>{formatEuro(item.dineInPrice)}</span>
                      {item.takeawayPrice !== undefined && (
                        <small>Afhalen {formatEuro(item.takeawayPrice)}</small>
                      )}
                      {item.takeawayRestricted && <small className="restricted-note">Niet af te halen</small>}
                    </div>
                  </div>
                  {item.description && <p>{item.description}</p>}
                </article>
              ))}
            </div>
            {section.note && <p className="menu-section-note">{section.note}</p>}
          </section>
        ))}
      </div>
      <div className="menu-page-content page-width drinks-content">
        <p className="eyebrow">De drankenkaart</p>
        <h2 className="drinks-heading">Dranken</h2>
        {drinkSections.map((section) => (
          <section className="menu-section" key={section.name} aria-labelledby={`drinks-${section.name}`} data-motion="reveal">
            <h2 id={`drinks-${section.name}`}>{section.name}</h2>
            {section.note && <p className="menu-section-note">{section.note}</p>}
            {section.items.length > 0 && (
              <div className="menu-card-grid">
                {section.items.map((item) => (
                  <article className="menu-card drink-card" key={item.id} data-motion="reveal">
                    <div className="menu-card-title">
                      <h3>{item.name}</h3>
                      <span>{formatEuro(item.price)}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
