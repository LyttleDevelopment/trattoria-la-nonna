"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { formatEuro, takeawayItems } from "@/data/menu";

const categories = ["Alles", "Aperitiefhapjes", "Voorgerechten", "Pasta", "Hoofdgerechten"];
const pickupSlots = ["17:15 – 17:30", "17:30 – 17:45", "17:45 – 18:00", "18:00 – 18:15", "18:15 – 18:30", "18:30 – 18:45"];

type Quantities = Record<string, number>;

export default function TakeawayPage() {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [activeCategory, setActiveCategory] = useState("Alles");
  const [pickupSlot, setPickupSlot] = useState(pickupSlots[2]);
  const [confirmation, setConfirmation] = useState("");
  const filteredItems = takeawayItems.filter((item) => activeCategory === "Alles" || item.category === activeCategory);
  const orderedItems = useMemo(
    () => takeawayItems.filter((item) => (quantities[item.id] ?? 0) > 0),
    [quantities],
  );
  const subtotal = orderedItems.reduce((sum, item) => sum + item.takeawayPrice * quantities[item.id], 0);
  const itemCount = orderedItems.reduce((sum, item) => sum + quantities[item.id], 0);
  const total = subtotal;

  function updateQuantity(id: string, change: number) {
    setConfirmation("");
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + change);
      return { ...current, [id]: nextQuantity };
    });
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!itemCount) {
      setConfirmation("Voeg minstens één gerecht toe voordat u verdergaat.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    setConfirmation(`Bedankt, ${name}! Uw bestelverzoek staat klaar voor het gekozen afhaalmoment (${pickupSlot}).`);
    setQuantities({});
    event.currentTarget.reset();
  }

  return (
    <main id="main">
      <section className="page-intro takeaway-intro">
        <p className="eyebrow">De keuken bij u thuis</p>
        <h1>Bestellen om af te halen</h1>
        <p>
          De afhaalprijzen zijn de tweede prijzen op de officiële menukaart.
          Hier staan alleen gerechten met een beschikbare afhaalprijs.
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
                    <div className="quantity-control" role="group" aria-label={`Aantal ${item.name}`}>
                      <button
                        type="button"
                        aria-label={`Eén ${item.name} verwijderen`}
                        disabled={!quantities[item.id]}
                        onClick={() => updateQuantity(item.id, -1)}
                      >−</button>
                      <output key={quantities[item.id] ?? 0} aria-live="polite" aria-label={`${quantities[item.id] ?? 0} geselecteerd`}>
                        {quantities[item.id] ?? 0}
                      </output>
                      <button
                        type="button"
                        aria-label={`Eén ${item.name} toevoegen`}
                        onClick={() => updateQuantity(item.id, 1)}
                      >+</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="empty-category">Er staan geen afhaalgerechten in deze categorie.</p>}

          <form className="pickup-form panel" id="pickup-form" onSubmit={submitOrder} data-motion="reveal">
            <div className="form-heading">
              <h2>Uw gegevens &amp; afhaaltijd</h2>
              <p>Vul uw gegevens in om uw afhaalmoment te kiezen.</p>
            </div>
            <div className="form-grid">
              <label>
                Volledige naam
                <input name="name" autoComplete="name" placeholder="Uw naam" required />
              </label>
              <label>
                Telefoonnummer
                <input name="phone" type="tel" autoComplete="tel" placeholder="+32 499 41 03 75" required />
              </label>
              <label className="form-wide">
                E-mailadres
                <input name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.be" required />
              </label>
              <fieldset className="pickup-slot-field form-wide">
                <legend>Kies een afhaalmoment (vandaag)</legend>
                <div className="pickup-slots">
                  {pickupSlots.map((slot) => (
                    <button
                      className={pickupSlot === slot ? "selected" : ""}
                      key={slot}
                      type="button"
                      aria-pressed={pickupSlot === slot}
                      onClick={() => setPickupSlot(slot)}
                    >{slot}</button>
                  ))}
                </div>
              </fieldset>
            </div>
          </form>
        </div>

        <aside className="takeaway-aside">
          <section className="order-summary panel" aria-labelledby="order-heading" data-motion="reveal">
            <h2 id="order-heading">Uw bestelling</h2>
            {orderedItems.length ? (
              <ul className="order-items">
                {orderedItems.map((item) => (
                  <li key={item.id}>
                    <span><strong>{quantities[item.id]} × {item.name}</strong></span>
                    <span>{formatEuro(item.takeawayPrice * quantities[item.id])}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="cart-empty">Uw mandje is leeg. Voeg een gerecht toe om te beginnen.</p>}
            <div className="order-totals" aria-live="polite">
              <p><span>Subtotaal</span><span>{formatEuro(subtotal)}</span></p>
              <p className="order-total"><strong>Totaal</strong><strong>{formatEuro(total)}</strong></p>
            </div>
            <button className="button button-primary order-submit" type="submit" form="pickup-form" disabled={!itemCount}>
              Verder naar uw afhaaltijd
            </button>
            <p className="payment-note">Het totaal is berekend met de officiële afhaalprijzen op de menukaart.</p>
          </section>
          <div className="dine-in-card" data-motion="reveal">
            <h2>Liever bij ons dineren?</h2>
            <p>Reserveren kan telefonisch. We helpen u graag bij het plannen van uw bezoek.</p>
            <a href="tel:+32499410375">Reserveer een tafel <span>+32 499 41 03 75</span></a>
          </div>
        </aside>

        {confirmation && <p className="order-confirmation" role="status">{confirmation}</p>}
      </div>
    </main>
  );
}
