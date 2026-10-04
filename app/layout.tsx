import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionEffects from "@/components/MotionEffects";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Nonna Cucina | Italian Restaurant in Lokeren",
    template: "%s | La Nonna Cucina",
  },
  description:
    "A warm Italian trattoria serving handmade pasta and Mediterranean dishes in Lokeren, Belgium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        <MotionEffects />
      </body>
    </html>
  );
}
