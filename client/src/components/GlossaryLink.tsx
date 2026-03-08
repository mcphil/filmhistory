/**
 * GlossaryLink – Inline-Tooltip für Glossar-Begriffe in Timeline-Texten
 *
 * Design: "Dunkles Lichtspiel" – Dark Editorial Cinema
 * Zweck:
 *   1. USABILITY: Hover-Tooltip zeigt Kurzdefinition direkt im Kontext
 *   2. SEO: Rendert als <a href="#glossar-{slug}"> – echter interner dofollow-Link
 *      Google crawlt diese Links und wertet sie als thematische Vernetzung
 */

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface GlossaryLinkProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

/** Slug-Funktion: "Camera Obscura" → "camera-obscura" */
export function termToSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function GlossaryLink({ term, definition, children }: GlossaryLinkProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, above: false });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slug = termToSlug(term);
  const href = `#glossar-${slug}`;

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
  };

  const hide = () => {
    timerRef.current = setTimeout(() => setVisible(false), 120);
  };

  const keepOpen = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (!visible || !linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const tooltipWidth = 280;
    const tooltipHeight = 120; // approx
    const spaceBelow = window.innerHeight - rect.bottom;
    const above = spaceBelow < tooltipHeight + 16;

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    // clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));

    setPos({
      top: above
        ? rect.top + window.scrollY - tooltipHeight - 8
        : rect.bottom + window.scrollY + 8,
      left,
      above,
    });
  }, [visible]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const tooltip = visible ? (
    <div
      ref={tooltipRef}
      onMouseEnter={keepOpen}
      onMouseLeave={hide}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: 280,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
      role="tooltip"
      aria-label={`Definition: ${term}`}
    >
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          ...(pos.above
            ? { bottom: -6, borderTop: "6px solid var(--gold)", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", width: 0, height: 0 }
            : { top: -6, borderBottom: "6px solid var(--gold)", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", width: 0, height: 0 }),
        }}
      />
      <div
        style={{
          background: "var(--page-bg-card)",
          border: "1px solid var(--gold-border-strong)",
          borderRadius: "4px",
          padding: "10px 14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Term header */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              opacity: 0.7,
            }}
          >
            Glossar
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--gold)",
            }}
          >
            {term}
          </span>
        </div>
        {/* Definition */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--text-body-color)",
            margin: 0,
          }}
        >
          {definition.length > 180 ? definition.slice(0, 177) + "…" : definition}
        </p>
        {/* "Im Glossar lesen" link */}
        <a
          href={href}
          style={{
            display: "inline-block",
            marginTop: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--gold)",
            textDecoration: "underline",
            textDecorationColor: "var(--gold-border)",
            opacity: 0.8,
          }}
          onClick={() => setVisible(false)}
        >
          Im Glossar lesen →
        </a>
      </div>
    </div>
  ) : null;

  return (
    <>
      <a
        ref={linkRef}
        href={href}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={visible ? `tooltip-${slug}` : undefined}
        style={{
          color: "var(--gold)",
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          textDecorationColor: "var(--gold-border-strong)",
          textUnderlineOffset: "3px",
          cursor: "help",
          transition: "color 0.15s, text-decoration-color 0.15s",
        }}
      >
        {children}
      </a>
      {typeof document !== "undefined" && tooltip
        ? createPortal(tooltip, document.body)
        : null}
    </>
  );
}
