"use client";

import { useEffect, useRef, useState } from "react";
import { OPENING_NOTICE } from "@/data/site-config";

export default function OpeningNotice() {
  const [isWithinWindow, setIsWithinWindow] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shouldShow = OPENING_NOTICE.enabled && isWithinWindow && !isDismissed;

  useEffect(() => {
    if (!OPENING_NOTICE.enabled) return;

    const startsAt = Date.parse(OPENING_NOTICE.startsAt);
    const endsAt = Date.parse(OPENING_NOTICE.endsAt);
    if (!Number.isFinite(startsAt) || !Number.isFinite(endsAt) || startsAt >= endsAt) {
      console.error("De openingsmelding heeft een ongeldige datumconfiguratie.");
      return;
    }

    let timeoutId: number | undefined;
    const updateVisibility = () => {
      const now = Date.now();
      setIsWithinWindow(now >= startsAt && now < endsAt);

      if (now < endsAt) {
        const nextBoundary = now < startsAt ? startsAt : endsAt;
        timeoutId = window.setTimeout(
          updateVisibility,
          Math.min(nextBoundary - now, 2_147_000_000),
        );
      }
    };

    updateVisibility();
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (shouldShow && dialog && !dialog.open) dialog.showModal();
  }, [shouldShow]);

  if (!shouldShow) return null;

  const closeNotice = () => dialogRef.current?.close();

  return (
    <dialog
      className="opening-notice"
      ref={dialogRef}
      aria-labelledby="opening-notice-title"
      aria-describedby="opening-notice-copy"
      onClose={() => setIsDismissed(true)}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeNotice();
      }}
    >
      <button
        className="opening-notice-close"
        type="button"
        aria-label="Melding sluiten"
        onClick={closeNotice}
      >
        <span aria-hidden="true">×</span>
      </button>
      <p className="eyebrow">La Nonna Cucina</p>
      <h2 id="opening-notice-title">
        Onze deuren openen op {OPENING_NOTICE.openingDate}
      </h2>
      <p id="opening-notice-copy">
        We kijken ernaar uit je vanaf dan te verwelkomen in onze trattoria.
      </p>
      <button className="button button-primary" type="button" onClick={closeNotice}>
        Begrepen
      </button>
    </dialog>
  );
}
