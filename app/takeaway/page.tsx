"use client";

import { useState } from "react";
import { formatEuro, takeawayItems } from "@/data/menu";
import { LIGHTSPEED_ORDER_URL, LIGHTSPEED_RESERVATION_URL } from "@/data/site-config";

const categories = ["Alles", "Aperitiefhapjes", "Voorgerechten", "Pasta", "Hoofdgerechten"];

export default function TakeawayPage() {
  const [activeCategory, setActiveCategory] = useState("Alles");
  const filteredItems = takeawayItems.filter((item) => activeCategory === "Alles" || item.category === activeCategory);

  return (
    <main id="main">
      <section className="page-intro takeaway-intro">
        <p className="eyebrow">De keuken bij u thuis</p>
        <h1>Bestellen om af te halen</h1>
        <p>
          Hier vindt u gerechten die beschikbaar zijn om af te halen, met hun
          afhaalprijzen.
        </p>
      </section>
      <div className="takeaway-layout page-width">
        <div className="takeaway-main">
          <div className="category-tabs" role="group" aria-label="Filter de afhaalmenukaart">
            {categories.map((category) => (
              <button
                className={`category-tab${activeCategory === category ? " active" : ""}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredItems.length > 0 ? (
            <div className="takeaway-products">
              {filteredItems.map((item) => (
                <article className="takeaway-card" key={item.id} data-motion="reveal">
                  {item.image && <img src={item.image} alt="" />}
                  <div className="takeaway-card-copy">
                    <div className="takeaway-card-heading">
                      <h2>{item.name}</h2><strong>{formatEuro(item.takeawayPrice)}</strong>
                    </div>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="empty-category">Er staan geen afhaalgerechten in deze categorie.</p>}
        </div>

        <aside className="takeaway-aside">
          <section className="order-summary panel" aria-labelledby="order-heading" data-motion="reveal">
            <h2 id="order-heading">Bestellen via Lightspeed</h2>
            <p>
              Uw afhaalbestelling wordt binnenkort volledig via Lightspeed
              verwerkt.
            </p>
            {LIGHTSPEED_ORDER_URL ? (
              <a className="button button-primary order-submit" href={LIGHTSPEED_ORDER_URL} target="_blank" rel="noreferrer">
                Open de Lightspeed-bestelpagina
              </a>
            ) : (
              <button className="button button-primary order-submit" type="button" disabled>
                Bestellen via Lightspeed binnenkort beschikbaar
              </button>
            )}
          </section>
          <div className="dine-in-card" data-motion="reveal">
            <h2>Liever bij ons dineren?</h2>
            <p>Reserveren verloopt binnenkort via de Lightspeed-reservatiemodule.</p>
            {LIGHTSPEED_RESERVATION_URL ? (
              <a href={LIGHTSPEED_RESERVATION_URL} target="_blank" rel="noreferrer">
                Reserveer via Lightspeed
              </a>
            ) : (
              <span className="reservation-disabled" aria-disabled="true">Reserveren binnenkort beschikbaar</span>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
