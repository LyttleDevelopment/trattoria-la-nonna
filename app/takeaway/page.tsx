"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { takeawayItems } from "@/data/menu";

const categories = ["All", "Aperitiefhapjes", "Antipasti", "Pasta", "Secondi"];
const pickupSlots = ["17:15 – 17:30", "17:30 – 17:45", "17:45 – 18:00", "18:00 – 18:15", "18:15 – 18:30", "18:30 – 18:45"];

type Quantities = Record<string, number>;

function euros(value: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(value);
}

export default function TakeawayPage() {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [pickupSlot, setPickupSlot] = useState(pickupSlots[2]);
  const [confirmation, setConfirmation] = useState("");
  const filteredItems = takeawayItems.filter((item) => activeCategory === "All" || item.category === activeCategory);
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
      setConfirmation("Please add at least one dish to your order before continuing.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    setConfirmation(`Grazie, ${name}! Your order request is ready for the selected pickup slot (${pickupSlot}).`);
    setQuantities({});
    event.currentTarget.reset();
  }

  return (
    <main id="main">
      <section className="page-intro takeaway-intro">
        <p className="eyebrow">La cucina a casa</p>
        <h1>Trattoria Takeaway</h1>
        <p>
          Takeaway prices are the second prices shown on the official menu.
          Only dishes with an available takeaway price appear here.
        </p>
      </section>
      <div className="takeaway-layout page-width">
        <div className="takeaway-main">
          <div className="category-tabs" role="group" aria-label="Filter takeaway menu">
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
                      <h2>{item.name}</h2><strong>{euros(item.takeawayPrice)}</strong>
                    </div>
                    {item.description && <p>{item.description}</p>}
                    <div className="quantity-control" role="group" aria-label={`${item.name} quantity`}>
                      <button
                        type="button"
                        aria-label={`Remove one ${item.name}`}
                        disabled={!quantities[item.id]}
                        onClick={() => updateQuantity(item.id, -1)}
                      >−</button>
                      <output key={quantities[item.id] ?? 0} aria-live="polite" aria-label={`${quantities[item.id] ?? 0} selected`}>
                        {quantities[item.id] ?? 0}
                      </output>
                      <button
                        type="button"
                        aria-label={`Add one ${item.name}`}
                        onClick={() => updateQuantity(item.id, 1)}
                      >+</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="empty-category">No takeaway dishes are listed in this category.</p>}

          <form className="pickup-form panel" id="pickup-form" onSubmit={submitOrder} data-motion="reveal">
            <div className="form-heading">
              <h2>Your Details &amp; Pickup Window</h2>
              <p>Enter your details below to schedule your fresh box pickup.</p>
            </div>
            <div className="form-grid">
              <label>
                Full name
                <input name="name" autoComplete="name" placeholder="Your name" required />
              </label>
              <label>
                Phone number
                <input name="phone" type="tel" autoComplete="tel" placeholder="+32 499 41 03 75" required />
              </label>
              <label className="form-wide">
                Email address
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <fieldset className="pickup-slot-field form-wide">
                <legend>Select pickup time slot (today)</legend>
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
            <h2 id="order-heading">Your Order</h2>
            {orderedItems.length ? (
              <ul className="order-items">
                {orderedItems.map((item) => (
                  <li key={item.id}>
                    <span><strong>{quantities[item.id]} × {item.name}</strong></span>
                    <span>{euros(item.takeawayPrice * quantities[item.id])}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="cart-empty">Your basket is empty. Add a dish to begin.</p>}
            <div className="order-totals" aria-live="polite">
              <p><span>Subtotal</span><span>{euros(subtotal)}</span></p>
              <p className="order-total"><strong>Total price</strong><strong>{euros(total)}</strong></p>
            </div>
            <button className="button button-primary order-submit" type="submit" form="pickup-form" disabled={!itemCount}>
              Continue to pickup details
            </button>
            <p className="payment-note">Your total uses the official takeaway prices shown in the menu.</p>
          </section>
          <div className="dine-in-card" data-motion="reveal">
            <h2>Looking to Dine In with us?</h2>
            <p>Table reservations are accepted by phone only to ensure our hosts curate the most hospitable family dining experience for you.</p>
            <a href="tel:+32499410375">Reserve a table <span>+32 499 41 03 75</span></a>
          </div>
        </aside>

        {confirmation && <p className="order-confirmation" role="status">{confirmation}</p>}
      </div>
    </main>
  );
}
