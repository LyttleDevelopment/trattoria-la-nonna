import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionEffects from "@/components/MotionEffects";
import UnderConstruction from "@/components/UnderConstruction";
import { SITE_NOTICE } from "@/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Nonna Cucina | Italiaans restaurant in Lokeren",
    template: "%s | La Nonna Cucina",
  },
  description:
    "Een warme Italiaanse trattoria met handgemaakte pasta en mediterrane gerechten in Lokeren, België.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body>
        <a className="skip-link" href="#main">
          Ga naar de hoofdinhoud
        </a>
        {SITE_NOTICE ? (
          <UnderConstruction noticeType={SITE_NOTICE} />
        ) : (
          <>
            <Header />
            {children}
            <Footer />
            <MotionEffects />
          </>
        )}
      </body>
    </html>
  );
}
