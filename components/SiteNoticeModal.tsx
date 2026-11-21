"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_POPUP_NOTICE } from "@/data/site-config";

export default function SiteNoticeModal() {
  const [isWithinWindow, setIsWithinWindow] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shouldShow = SITE_POPUP_NOTICE.enabled && isWithinWindow && !isDismissed;

  useEffect(() => {
    if (!SITE_POPUP_NOTICE.enabled) return;

    const startsAt = Date.parse(SITE_POPUP_NOTICE.startsAt);
    const endsAt = Date.parse(SITE_POPUP_NOTICE.endsAt);
    if (!Number.isFinite(startsAt) || !Number.isFinite(endsAt) || startsAt >= endsAt) {
      console.error("De pop-upmelding heeft een ongeldige datumconfiguratie.");
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
      className="site-notice-modal"
      ref={dialogRef}
      aria-labelledby="site-notice-title"
      aria-describedby="site-notice-copy"
      onClose={() => setIsDismissed(true)}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeNotice();
      }}
    >
      <button
        className="site-notice-modal-close"
        type="button"
        aria-label={SITE_POPUP_NOTICE.closeLabel}
        onClick={closeNotice}
      >
        <span aria-hidden="true">×</span>
      </button>
      <p className="eyebrow">{SITE_POPUP_NOTICE.eyebrow}</p>
      <h2 id="site-notice-title">{SITE_POPUP_NOTICE.title}</h2>
      <p id="site-notice-copy">{SITE_POPUP_NOTICE.body}</p>
      <button className="button button-primary" type="button" onClick={closeNotice}>
        {SITE_POPUP_NOTICE.actionText}
      </button>
    </dialog>
  );
}
