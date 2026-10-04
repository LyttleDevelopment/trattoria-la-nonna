import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Takeaway Order",
  description: "Order handmade pasta and regional Italian dishes for pickup at La Nonna Cucina.",
};

export default function TakeawayLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
