import Link from "next/link";
import { formatEuro, menuSections } from "@/data/menu";

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
          <p className="eyebrow">Een stukje Italië in Lokeren</p>
          <h1>
            Warmte, traditie,
            <br />&amp; pure
            <br /><em>mediterrane ziel.</em>
          </h1>
          <p className="hero-description">
            Aan de Opperstraat in Lokeren brengt La Nonna de sfeer van een
            rustieke Italiaanse familietafel tot leven. We eren recepten van
            generatie op generatie met koudgeperste olijfolie, handgemaakte
            pasta en vers geoogste kruiden van de kust.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/menu">Bekijk onze menukaart</Link>
            <a className="button button-outline" href="#our-story">Ons verhaal</a>
          </div>
          <dl className="hero-details">
            <div><dt>Locatie</dt><dd>Opperstraat 18, 9180 Lokeren</dd></div>
            <div><dt>Open</dt><dd>Do–zo, 12:00–23:00</dd></div>
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

      <section className="story-section page-width" id="our-story" data-motion="reveal">
        <div className="story-images">
          <img
            src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85"
            alt="Vers pastadeeg dat met de hand wordt gekneed"
          />
          <div className="story-image-pair">
            <img
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85"
              alt="Goudgele olijfolie van de familieboomgaard"
            />
            <img
              src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=700&q=85"
              alt="Door de zon gerijpte mediterrane olijven"
            />
          </div>
        </div>
        <div className="story-copy">
          <p className="eyebrow">Ons erfgoed</p>
          <h2>Geboren uit steen, aarde en zee</h2>
          <p>
            Elk gerecht bij La Nonna draagt de erfenis van Beatrice “Nonna”
            Moretti, die in haar jeugd olijven oogstte in Puglia en haar
            kleinkinderen het ritme van de seizoenen leerde.
          </p>
          <p>
            Onze olijfolie komt uitsluitend van haar familieboerderij. We
            selecteren traditionele datterini-tomaten met de hand en halen dagelijks
            verse vis en zeevruchten bij lokale vissers.
          </p>
          <div className="story-stats">
            <div><strong>100%</strong><span>Koudgeperste olie</span></div>
            <div><strong>Geen</strong><span>Bewerkte granen</span></div>
            <div><strong>Dagelijks</strong><span>Verse pasta</span></div>
          </div>
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
            Omdat we onder onze stenen bogen een beperkt aantal plaatsen
            hebben, raden we aan om 2 à 3 weken vooraf te reserveren. Neem voor
            gezelschappen van meer dan acht personen rechtstreeks contact met ons op.
          </p>
          <p className="reservation-note">
            Reserveren kan telefonisch. Bel ons, dan houden we een plaatsje voor u vrij.
          </p>
          <a className="button button-primary" href="tel:+32499410375">Bel +32 499 41 03 75</a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85"
          alt="Een intiem gedekte dinertafel in een eetzaal met stenen muren"
        />
      </section>
    </main>
  );
}
