import Link from "next/link";
import { menuSections } from "@/data/menu";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    alt: "Warm candlelit tables in a traditional Italian restaurant",
    className: "gallery-large",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
    alt: "Fresh seasonal antipasti prepared for sharing",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=85",
    alt: "A cook preparing fresh pasta by hand",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    alt: "A glass of Italian red wine poured at the table",
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
          <p className="eyebrow">A little piece of Italy in Lokeren</p>
          <h1>
            Warmth, tradition,
            <br />&amp; raw
            <br /><em>Mediterranean soul.</em>
          </h1>
          <p className="hero-description">
            Located on Opperstraat in Lokeren, La Nonna evokes the sensory
            magic of a rustic Italian family table. We
            honour time-tested recipes with cold-pressed olive oils, hand-rolled
            pasta, and freshly harvested coastal herbs.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/menu">Explore our menu</Link>
            <a className="button button-outline" href="#our-story">Our story</a>
          </div>
          <dl className="hero-details">
            <div><dt>Location</dt><dd>Opperstraat 18, 9180 Lokeren</dd></div>
            <div><dt>Hours</dt><dd>Thu–Sun, 12:00–23:00</dd></div>
          </dl>
        </div>
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1500&q=90"
            alt="A handmade pasta dish served at a sunlit trattoria table"
          />
          <span className="image-caption">Made slowly. Shared gladly.</span>
        </div>
      </section>

      <section className="story-section page-width" id="our-story" data-motion="reveal">
        <div className="story-images">
          <img
            src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85"
            alt="Fresh pasta dough being kneaded by hand"
          />
          <div className="story-image-pair">
            <img
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85"
              alt="Golden olive oil from the family grove"
            />
            <img
              src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=700&q=85"
              alt="Sun-ripened Mediterranean olives"
            />
          </div>
        </div>
        <div className="story-copy">
          <p className="eyebrow">Our heritage</p>
          <h2>Born of Stone, Soil, &amp; Sea</h2>
          <p>
            Every plate at La Nonna carries the legacy of Beatrice “Nonna”
            Moretti, who spent her youth harvesting olives in Puglia and
            teaching her grandchildren the sacred rhythm of the seasons.
          </p>
          <p>
            We import our olive oil exclusively from her family estate, hand-pick
            heirloom datterini tomatoes, and source fresh seafood daily from
            local fishermen.
          </p>
          <div className="story-stats">
            <div><strong>100%</strong><span>Cold-pressed oil</span></div>
            <div><strong>Zero</strong><span>Processed grains</span></div>
            <div><strong>Daily</strong><span>Fresh pasta milling</span></div>
          </div>
        </div>
      </section>

      <section className="highlights-section page-width" data-motion="reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The hearth</p>
            <h2>La Cucina Highlights</h2>
            <p>A selection from La Nonna’s official menu.</p>
          </div>
          <Link className="text-link" href="/menu">View full menu <span aria-hidden="true">→</span></Link>
        </div>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.id} data-motion="reveal">
              <div className="highlight-title">
                <h3>{item.name}</h3><span>€{item.dineInPrice.toFixed(2)}</span>
              </div>
              <p>{item.description}</p>
              <span className="course-label">{item.category}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section page-width" data-motion="reveal">
        <div className="center-heading">
          <p className="eyebrow">The trattoria</p>
          <h2>Spirits &amp; Sunlight</h2>
          <p>A look inside our rustic stone arches, candlelit corners, and wild jasmine terrace.</p>
        </div>
        <div className="photo-grid">
          {gallery.map((image) => (
            <img className={image.className} key={image.src} src={image.src} alt={image.alt} data-motion="reveal" />
          ))}
        </div>
      </section>

      <section className="quote-section" data-motion="reveal">
        <p className="quote-stars" aria-label="5 out of 5 stars">★★★★★</p>
        <blockquote>
          “At La Nonna, Rome slows down. There is always time for one more
          story, a little more warm bread, and another taste of the season.”
        </blockquote>
        <p className="quote-attribution">A note from our family</p>
      </section>

      <section className="reservation-section page-width" data-motion="reveal">
        <div>
          <p className="eyebrow">Tavola</p>
          <h2>Gather Around Our Table</h2>
          <p>
            Due to our limited seating under the stone arches, we recommend
            reserving your table 2–3 weeks in advance. For parties larger than
            eight, please contact our team directly.
          </p>
          <p className="reservation-note">
            Table reservations are accepted by phone only. Call us and we’ll
            save you a seat.
          </p>
          <a className="button button-primary" href="tel:+32499410375">Call +32 499 41 03 75</a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85"
          alt="An intimate table set for dinner in a stone-walled dining room"
        />
      </section>
    </main>
  );
}
