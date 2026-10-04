import Image from "next/image";
import type { SiteNotice } from "@/data/site-config";

const noticeContent = {
  "grand-opening": {
    banner: "Binnenkort geopend",
    title: "Onze deuren openen binnenkort",
    copy: "We bereiden met veel liefde onze allereerste opening voor. Binnenkort verwelkomen we u in onze trattoria.",
  },
  maintenance: {
    banner: "Website in onderhoud",
    title: "We zijn tijdelijk niet beschikbaar",
    copy: "We werken aan onze website en zijn zo snel mogelijk weer online. Intussen helpen we u graag persoonlijk.",
  },
} satisfies Record<SiteNotice, { banner: string; title: string; copy: string }>;

export default function UnderConstruction({ noticeType }: { noticeType: SiteNotice }) {
  const content = noticeContent[noticeType];

  return (
    <main className="maintenance-page" id="main">
      <div className="maintenance-banner" role="status">
        {content.banner}
      </div>
      <section className="maintenance-card" aria-labelledby="maintenance-title">
        <Image
          className="maintenance-logo"
          src="/logo.svg"
          alt=""
          width={100}
          height={100}
          priority
        />
        <p className="eyebrow">La Nonna Cucina</p>
        <h1 id="maintenance-title">{content.title}</h1>
        <p className="maintenance-copy">{content.copy}</p>
        <address className="maintenance-contact">
          <a href="tel:+32499410375">+32 499 41 03 75</a>
          <a href="mailto:info@trattorialanonna.be">info@trattorialanonna.be</a>
          <span>Opperstraat 18, 9180 Lokeren</span>
        </address>
      </section>
    </main>
  );
}
