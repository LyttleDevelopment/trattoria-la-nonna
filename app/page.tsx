import Link from "next/link";
import { formatEuro, menuSections } from "@/data/menu";
import { LIGHTSPEED_RESERVATION_URL } from "@/data/site-config";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    alt: "Warme, sfeervol verlichte tafels in een traditionele Italiaanse trattoria",
    className: "gallery-large",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
    alt: "Verse antipasti om samen van te genieten",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=85",
    alt: "Een kok die met de hand verse pasta bereidt",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    alt: "Een glas Italiaanse rode wijn dat aan tafel wordt ingeschonken",
    className: "gallery-wide",
  },
];

export default function HomePage() {
  const featuredIds = new Set(["burrata-pugliese", "spaghetti-carbonara", "ossocuco-alla-milanese", "tiramisu-della-nonna"]);
  const highlights = menuSections.flatMap((section) => section.items).filter((item) => featuredIds.has(item.id));

  return (
    <main id="main">
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow">Een stukje Italië in Moerbeke (Lokeren)</p>
          <h1>
            Welkom bij La Nonna
          </h1>
          <div className="hero-description">
            <p>
              La Nonna is de verwezenlijking van een grote droom en vooral van een
              passie die al lange tijd in ons leeft: de liefde voor lekker eten,
              gezellig samen zijn en tafelen met tijd voor elkaar.
            </p>
            <p>
              De naam La Nonna draagt voor mij ook een heel bijzondere betekenis.
              Het is een liefdevolle herinnering aan mijn grootmoeder Marcella.
              Niet omdat zij bekendstond om haar kookkunsten, maar om wie ze was:
              een ontzettend zorgzame vrouw, bij wie je je altijd welkom en
              geborgen voelde. ❤️
            </p>
            <p>
              Dat gevoel willen we meenemen naar La Nonna. Een plek waar je niet
              zomaar komt eten, maar waar je je welkom voelt, waar aandacht is
              voor elkaar en waar gezelligheid minstens zo belangrijk is als wat
              er op je bord ligt.
            </p>
            <p>
              Met La Nonna willen we een klein stukje van dat warme oma-gevoel
              doorgeven aan iedereen die bij ons binnenstapt.
            </p>
            <p>Liefs Jolein &amp; Geoffry</p>
          </div>
          <div className="button-row">
            <Link className="button button-primary" href="/menu">Bekijk onze menukaart</Link>
          </div>
          <dl className="hero-details">
            <div><dt>Locatie</dt><dd>Opperstraat 18A, 9180 Moerbeke (Lokeren)</dd></div>
            <div><dt>Open</dt><dd>Donderdag en zondag: 11:00–21:00; vrijdag en zaterdag: 11:00–22:00</dd></div>
          </dl>
        </div>
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1500&q=90"
            alt="Een pastagerecht aan een zonnige tafel in de trattoria"
          />
          <span className="image-caption">Met aandacht bereid. Met liefde gedeeld.</span>
        </div>
      </section>

      <section className="highlights-section page-width" data-motion="reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Uit de keuken</p>
            <h2>Favorieten van La Nonna</h2>
            <p>Een selectie uit onze officiële menukaart.</p>
          </div>
          <Link className="text-link" href="/menu">Bekijk de volledige menukaart <span aria-hidden="true">→</span></Link>
        </div>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.id} data-motion="reveal">
              <div className="highlight-title">
                <h3>{item.name}</h3><span>{formatEuro(item.dineInPrice)}</span>
              </div>
              <p>{item.description}</p>
              <span className="course-label">{item.category}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section page-width" data-motion="reveal">
        <div className="center-heading">
          <p className="eyebrow">De trattoria</p>
          <h2>Sfeer &amp; zonlicht</h2>
          <p>Een blik op onze rustieke stenen bogen, intieme hoekjes bij kaarslicht en het terras met wilde jasmijn.</p>
        </div>
        <div className="photo-grid">
          {gallery.map((image) => (
            <img className={image.className} key={image.src} src={image.src} alt={image.alt} data-motion="reveal" />
          ))}
        </div>
      </section>

      <section className="quote-section" data-motion="reveal">
        <p className="quote-stars" aria-label="5 van de 5 sterren">★★★★★</p>
        <blockquote>
          “Bij La Nonna vertraagt de tijd. Er is altijd ruimte voor nog een
          verhaal, wat extra warm brood en een nieuwe smaak van het seizoen.”
        </blockquote>
        <p className="quote-attribution">Een boodschap van onze familie</p>
      </section>

      <section className="reservation-section page-width" data-motion="reveal">
        <div>
          <p className="eyebrow">Aan tafel</p>
          <h2>Schuif aan onze tafel</h2>
          <p>
            Online reserveren is binnenkort beschikbaar.
          </p>
          <p className="reservation-note">
            Zodra de reserveringsmodule actief is, kunt u hier rechtstreeks uw tafel reserveren.
          </p>
          {LIGHTSPEED_RESERVATION_URL ? (
            <a className="button button-primary" href={LIGHTSPEED_RESERVATION_URL} target="_blank" rel="noreferrer">
              Reserveer een tafel <span className="external-link-icon" aria-hidden="true">↗</span>
            </a>
          ) : (
            <button className="button button-primary" type="button" disabled>
              Reserveer een tafel <span className="external-link-icon" aria-hidden="true">↗</span>
            </button>
          )}
        </div>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85"
          alt="Een intiem gedekte dinertafel in een eetzaal met stenen muren"
        />
      </section>
    </main>
  );
}
