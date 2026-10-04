import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bestellen om af te halen",
  description: "Bestel gerechten van La Nonna om af te halen.",
};

export default function TakeawayLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
