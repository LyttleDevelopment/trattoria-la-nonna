'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import type {
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent as ReactMouseEvent,
    PointerEvent as ReactPointerEvent,
} from 'react';
import {drinkSections, formatEuro, menuSections} from '@/data/menu';
import {ENABLE_DINE_IN_SHORTLIST} from '@/data/site-config';

const STORAGE_KEY = 'la-nonna-dine-in-shortlist';
const MAX_QUANTITY = 99;

type ShortlistItem = {
    id: string;
    name: string;
    category: string;
    price: number;
    description?: string;
    takeawayRestricted?: boolean;
};

const menuItems: ShortlistItem[] = menuSections.flatMap((section) =>
    section.items.map((item) => ({
        id: item.id,
        name: item.name,
        category: section.name,
        price: item.dineInPrice,
        description: item.description,
        takeawayRestricted: item.takeawayRestricted,
    })),
);

const drinkItems: ShortlistItem[] = drinkSections.flatMap((section) =>
    section.items.map((item) => ({
        id: item.id,
        name: item.name,
        category: section.name,
        price: item.price,
    })),
);

const allItems = [...menuItems, ...drinkItems];
const itemsById = new Map(allItems.map((item) => [item.id, item]));

function MenuCard({
                      item,
                      quantity,
                      onChangeQuantity,
                      isDrink = false,
                  }: {
    item: ShortlistItem;
    quantity: number;
    onChangeQuantity: (id: string, quantity: number) => void;
    isDrink?: boolean;
}) {
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handledLongPress = useRef(false);

    function clearHoldTimer() {
        if (holdTimer.current !== null) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    }

    function cancelHold() {
        clearHoldTimer();
        handledLongPress.current = false;
    }

    function isQuantityControl(target: EventTarget | null) {
        return target instanceof Element && target.closest('.quantity-control') !== null;
    }

    function startHold(event: ReactPointerEvent<HTMLElement>) {
        if (!ENABLE_DINE_IN_SHORTLIST || event.button !== 0 || isQuantityControl(event.target)) return;
        handledLongPress.current = false;
        clearHoldTimer();
        holdTimer.current = setTimeout(() => {
            handledLongPress.current = true;
            onChangeQuantity(item.id, Math.max(0, quantity - 1));
        }, 500);
    }

    function addOne() {
        if (handledLongPress.current) {
            handledLongPress.current = false;
            return;
        }
        onChangeQuantity(item.id, quantity + 1);
    }

    function handleCardClick(event: ReactMouseEvent<HTMLElement>) {
        if (!ENABLE_DINE_IN_SHORTLIST || isQuantityControl(event.target)) return;
        addOne();
    }

    function handleCardKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
        if (!ENABLE_DINE_IN_SHORTLIST) return;
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            addOne();
        }
    }

    return (
        <article
            className={`menu-card${ENABLE_DINE_IN_SHORTLIST ? ' menu-card-interactive' : ''}${quantity > 0 ? ' menu-card-picked' : ''}${isDrink ? ' drink-card' : ''}`}
            data-motion="reveal"
            role={ENABLE_DINE_IN_SHORTLIST ? 'group' : undefined}
            tabIndex={ENABLE_DINE_IN_SHORTLIST ? 0 : undefined}
            aria-label={ENABLE_DINE_IN_SHORTLIST ? `${item.name}: ${quantity} gekozen. Tik om één toe te voegen; houd ingedrukt om één te verwijderen.` : undefined}
            onPointerDown={ENABLE_DINE_IN_SHORTLIST ? startHold : undefined}
            onPointerUp={ENABLE_DINE_IN_SHORTLIST ? clearHoldTimer : undefined}
            onPointerLeave={ENABLE_DINE_IN_SHORTLIST ? cancelHold : undefined}
            onPointerCancel={ENABLE_DINE_IN_SHORTLIST ? cancelHold : undefined}
            onContextMenu={ENABLE_DINE_IN_SHORTLIST ? (event) => event.preventDefault() : undefined}
            onClick={ENABLE_DINE_IN_SHORTLIST ? handleCardClick : undefined}
            onKeyDown={ENABLE_DINE_IN_SHORTLIST ? handleCardKeyDown : undefined}
        >
            <div className="menu-card-title">
                <h3>{item.name}</h3>
                <div className="menu-prices">
                    <span className="menu-price-line">
                        {quantity > 0 && <small className="menu-selected-quantity" aria-hidden="true">{quantity}× gekozen</small>}
                        <span>{formatEuro(item.price)}</span>
                    </span>
                    {item.takeawayRestricted &&
                      <small className="restricted-note">Niet af te
                        halen</small>}
                </div>
            </div>
            {item.description && <p>{item.description}</p>}
            {ENABLE_DINE_IN_SHORTLIST && (
                <div className="shortlist-control">
                    <div className="quantity-control" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            onClick={() => onChangeQuantity(item.id, quantity - 1)}
                            aria-label={`Een ${item.name} minder`}
                        >
                            <span aria-hidden="true">−</span>
                        </button>
                        <span className="quantity-value" aria-live="polite">{quantity}</span>
                        <button
                            type="button"
                            onClick={() => onChangeQuantity(item.id, quantity + 1)}
                            aria-label={`Een ${item.name} meer`}
                        >
                            <span aria-hidden="true">＋</span>
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}

export default function MenuExperience() {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isReady, setIsReady] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [portalReady, setPortalReady] = useState(false);
    const shortlistPanelRef = useRef<HTMLElement>(null);
    const shortlistCloseRef = useRef<HTMLButtonElement>(null);
    const shortlistToggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setPortalReady(true);
    }, []);

    useEffect(() => {
        if (!isListOpen) return;

        const scrollY = window.scrollY;
        const bodyStyle = document.body.style;
        const rootStyle = document.documentElement.style;
        const originalBodyStyles = {
            position: bodyStyle.position,
            top: bodyStyle.top,
            left: bodyStyle.left,
            right: bodyStyle.right,
            width: bodyStyle.width,
            overflow: bodyStyle.overflow,
            paddingRight: bodyStyle.paddingRight,
        };
        const originalRootOverflow = rootStyle.overflow;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        bodyStyle.position = 'fixed';
        bodyStyle.top = `-${scrollY}px`;
        bodyStyle.left = '0';
        bodyStyle.right = '0';
        bodyStyle.width = '100%';
        bodyStyle.overflow = 'hidden';
        if (scrollbarWidth > 0) bodyStyle.paddingRight = `${scrollbarWidth}px`;
        rootStyle.overflow = 'hidden';
        document.body.classList.add('shortlist-modal-open');
        shortlistCloseRef.current?.focus();

        function handleDialogKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsListOpen(false);
                return;
            }
            if (event.key !== 'Tab') return;

            const focusableElements = shortlistPanelRef.current?.querySelectorAll<HTMLElement>(
                'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
            );
            if (!focusableElements?.length) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener('keydown', handleDialogKeyDown);
        return () => {
            document.removeEventListener('keydown', handleDialogKeyDown);
            Object.assign(bodyStyle, originalBodyStyles);
            rootStyle.overflow = originalRootOverflow;
            document.body.classList.remove('shortlist-modal-open');
            window.scrollTo(0, scrollY);
            shortlistToggleRef.current?.focus();
        };
    }, [isListOpen]);

    useEffect(() => {
        try {
            const saved = window.sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed: unknown = JSON.parse(saved);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    const validQuantities = Object.fromEntries(
                        Object.entries(parsed).filter(
                            ([id, quantity]) =>
                                itemsById.has(id) &&
                                typeof quantity === 'number' &&
                                Number.isInteger(quantity) &&
                                quantity > 0 &&
                                quantity <= MAX_QUANTITY,
                        ),
                    ) as Record<string, number>;
                    setQuantities(validQuantities);
                }
            }
        } catch (error) {
            console.error('Het bewaarde lijstje kon niet worden geladen.', error);
        } finally {
            setIsReady(true);
        }
    }, []);

    useEffect(() => {
        if (!isReady) return;
        try {
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
        } catch (error) {
            console.error('Het lijstje kon niet worden bewaard voor deze sessie.', error);
        }
    }, [isReady, quantities]);

    const selectedItems = useMemo(
        () => allItems.filter((item) => quantities[item.id] > 0),
        [quantities],
    );
    const itemCount = selectedItems.reduce((sum, item) => sum + quantities[item.id], 0);
    const estimatedTotal = selectedItems.reduce(
        (sum, item) => sum + item.price * quantities[item.id],
        0,
    );

    function changeQuantity(id: string, quantity: number) {
        setQuantities((current) => {
            const next = {...current};
            if (quantity <= 0) {
                delete next[id];
            } else {
                next[id] = Math.min(quantity, MAX_QUANTITY);
            }
            return next;
        });
    }

    return (
        <>
        <main id="main">
            <section className="page-intro menu-intro">
                <p className="eyebrow">De keuken</p>
                <h1>Onze menukaart</h1>
                <p>Gerechten, desserts en dranken bij La Nonna.</p>
                {ENABLE_DINE_IN_SHORTLIST && (
                    <p className="shortlist-intro">
                        <span className="shortlist-desktop-help">
                            Klik op een gerecht om één toe te voegen. Pas het aantal aan met − en +.
                        </span>
                        <span className="shortlist-touch-help">
                            Tik op een gerecht om één toe te voegen; houd ingedrukt om één te verwijderen.
                        </span>
                    </p>
                )}
            </section>
            <div className="menu-page-content page-width">
                {menuSections.map((section) => (
                    <section className="menu-section" key={section.name}
                             aria-labelledby={`menu-${section.name}`}
                             data-motion="reveal">
                        <h2 id={`menu-${section.name}`}>{section.name}</h2>
                        <div className="menu-card-grid">
                            {section.items.map((item) => (
                                <MenuCard
                                    key={item.id}
                                    item={{
                                        id: item.id,
                                        name: item.name,
                                        description: item.description,
                                        category: section.name,
                                        price: item.dineInPrice,
                                        takeawayRestricted: item.takeawayRestricted,
                                    }}
                                    quantity={quantities[item.id] ?? 0}
                                    onChangeQuantity={changeQuantity}
                                />
                            ))}
                        </div>
                        {section.note &&
                          <p className="menu-section-note">{section.note}</p>}
                    </section>
                ))}
            </div>
            <div className="menu-page-content page-width drinks-content">
                <p className="eyebrow">De drankenkaart</p>
                <h2 className="drinks-heading">Dranken</h2>
                {drinkSections.map((section) => (
                    <section className="menu-section" key={section.name}
                             aria-labelledby={`drinks-${section.name}`}
                             data-motion="reveal">
                        <h2 id={`drinks-${section.name}`}>{section.name}</h2>
                        {section.note &&
                          <p className="menu-section-note">{section.note}</p>}
                        {section.items.length > 0 && (
                            <div className="menu-card-grid">
                                {section.items.map((item) => (
                                    <MenuCard
                                        key={item.id}
                                        item={{
                                            id: item.id,
                                            name: item.name,
                                            category: section.name,
                                            price: item.price
                                        }}
                                        quantity={quantities[item.id] ?? 0}
                                        onChangeQuantity={changeQuantity}
                                        isDrink
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </main>
        {ENABLE_DINE_IN_SHORTLIST && portalReady && createPortal(
            <>
                <aside
                    id="shortlist-panel"
                    className="shortlist-panel"
                    ref={shortlistPanelRef}
                    aria-labelledby="shortlist-title"
                    role="dialog"
                    aria-modal="true"
                    hidden={!isListOpen}
                >
                    <div className="shortlist-panel-heading">
                        <div>
                            <p className="eyebrow">Jouw keuzes</p>
                            <h2 id="shortlist-title">Mijn lijstje</h2>
                        </div>
                        <button ref={shortlistCloseRef} className="shortlist-close" type="button"
                                onClick={() => setIsListOpen(false)}
                                aria-label="Lijstje sluiten">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="shortlist-content">
                        {selectedItems.length === 0 ? (
                            <p className="shortlist-empty">Je lijstje is nog leeg. Tik op een gerecht om het toe te voegen.</p>
                        ) : (
                            <ul className="shortlist-items">
                                {selectedItems.map((item) => (
                                    <li key={item.id}>
                                        <span className="shortlist-item-name">
                                            <strong>{quantities[item.id]}×</strong> {item.name}
                                            <small>{item.category}</small>
                                        </span>
                                        <span>{formatEuro(item.price * quantities[item.id])}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {selectedItems.length > 0 && (
                        <div className="shortlist-footer">
                            <div className="shortlist-total">
                                <span>Richtprijs</span>
                                <strong>{formatEuro(estimatedTotal)}</strong>
                            </div>
                            <p className="shortlist-disclaimer">
                                Dit is nog geen bestelling. Toon dit lijstje aan de bediening om je bestelling door te geven.
                            </p>
                            <button className="shortlist-clear" type="button"
                                    onClick={() => setQuantities({})}>
                                Lijstje leegmaken
                            </button>
                        </div>
                    )}
                </aside>
                {isListOpen && (
                    <button
                        className="shortlist-backdrop"
                        type="button"
                        tabIndex={-1}
                        aria-label="Lijstje sluiten"
                        onClick={() => setIsListOpen(false)}
                    />
                )}
                {!isListOpen && (
                    <button
                        ref={shortlistToggleRef}
                        className="shortlist-toggle"
                        type="button"
                        onClick={() => setIsListOpen(true)}
                        aria-expanded={false}
                        aria-controls="shortlist-panel"
                    >
                        <span aria-hidden="true">♡</span>
                        <span>Mijn lijstje</span>
                        <span className="shortlist-count">{itemCount}</span>
                        {itemCount > 0 && <span
                          className="shortlist-toggle-total">{formatEuro(estimatedTotal)}</span>}
                    </button>
                )}
            </>,
            document.body,
        )}
        </>
    );
}
