import type { Metadata } from "next";
import { drinkSections, menuSections } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: "Food and drinks menu at La Nonna Cucina.",
};

export default function MenuPage() {
  return (
    <main id="main">
      <section className="page-intro menu-intro">
        <p className="eyebrow">La cucina</p>
        <h1>Our Menu</h1>
        <p>Food, desserts and drinks at La Nonna.</p>
      </section>
      <div className="menu-page-content page-width">
      <p className="menu-price-note">
        Prices are shown for dining in. Takeaway prices are listed where available.
        Highlighted dishes are not available for takeaway.
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
                      <span>€{item.dineInPrice.toFixed(2)}</span>
                      {item.takeawayPrice !== undefined && (
                        <small>Takeaway €{item.takeawayPrice.toFixed(2)}</small>
                      )}
                      {item.takeawayRestricted && <small className="restricted-note">Dine-in only</small>}
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
        <p className="eyebrow">La carta</p>
        <h2 className="drinks-heading">Drinks</h2>
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
                      <span>€{item.price.toFixed(2)}</span>
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
