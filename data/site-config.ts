export type SiteNotice = "grand-opening" | "maintenance";

// Set to null once the restaurant website is live.
export const SITE_NOTICE: SiteNotice | null = null;
// export const SITE_NOTICE: SiteNotice | null = "maintenance";
// export const SITE_NOTICE: SiteNotice | null = "grand-opening";

export const SITE_POPUP_NOTICE = {
  enabled: true,
  // Use the Brussels offset: CET (+01:00) in winter and CEST (+02:00) in summer.
  startsAt: "2026-11-01T00:00:00+01:00",
  // The end is exclusive.
  endsAt: "2026-12-04T00:00:00+01:00",
  eyebrow: "La Nonna",
  title: "Onze deuren openen op 4 december 2026",
  body: "We kijken ernaar uit je vanaf dan te verwelkomen in onze trattoria.",
  closeLabel: "Melding sluiten",
  actionText: "Begrepen",
} as const;

export const LIGHTSPEED_RESERVATION_URL =
  "https://mylightspeed.app/reservation/d7eb4362-04fd-4f54-8e82-c58fb0ecd5a5/reservation";
export const LIGHTSPEED_ORDER_URL = "https://mylightspeed.app/KFKCQTVB/C-ordering";

export const RESERVATIONS_ENABLED = true;
export const TAKEAWAY_ENABLED = false;
export const HIDE_DISABLED_ACTIONS = true;

// Set to false to hide the personal dine-in shortlist from the menu.
export const ENABLE_DINE_IN_SHORTLIST = false;
