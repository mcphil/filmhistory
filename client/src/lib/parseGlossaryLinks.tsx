/**
 * parseGlossaryLinks – Text-Parser für Glossar-Verlinkung
 *
 * Scannt einen Text-String nach bekannten Glossar-Begriffen und ersetzt
 * sie durch <GlossaryLink>-Komponenten mit Tooltip + Anker-Link.
 *
 * SEO-Strategie:
 *   - Jeder Begriff wird als <a href="#glossar-{slug}"> gerendert
 *   - Google crawlt diese Links als interne dofollow-Links
 *   - Thematische Vernetzung zwischen Timeline-Texten und Glossar
 *   - Jeder Begriff wird pro Text-Abschnitt nur EINMAL verlinkt (kein Spam)
 */

import React from "react";
import type { GlossaryEntry } from "./timelineData";
import { GlossaryLink } from "@/components/GlossaryLink";

/**
 * Wandelt einen Text-String in React-Nodes um, wobei Glossar-Begriffe
 * als GlossaryLink-Komponenten gerendert werden.
 *
 * @param text       Der zu parsende Text
 * @param glossary   Alle Glossar-Einträge
 * @param maxLinks   Maximale Anzahl Links pro Text (Standard: 3, verhindert Überladung)
 */
export function parseGlossaryLinks(
  text: string,
  glossary: GlossaryEntry[],
  maxLinks = 3
): React.ReactNode {
  if (!text || !glossary.length) return text;

  // Sortiere nach Länge (längste zuerst), damit "Nouvelle Vague" vor "Vague" matcht
  const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length);

  // Baue ein Regex-Pattern aus allen Begriffen
  // Wort-Grenzen (\b) für präzises Matching, case-insensitive
  const escaped = sorted.map(e =>
    e.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");

  // Splitte den Text an den Fundstellen
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let linkCount = 0;
  const usedTerms = new Set<string>();

  let match: RegExpExecArray | null;
  // Reset lastIndex
  pattern.lastIndex = 0;

  while ((match = pattern.exec(text)) !== null && linkCount < maxLinks) {
    const matchedText = match[0];
    const normalizedMatch = matchedText.toLowerCase();

    // Finde den passenden Glossar-Eintrag (case-insensitive)
    const entry = sorted.find(
      e => e.term.toLowerCase() === normalizedMatch
    );
    if (!entry) continue;

    // Jeden Begriff nur einmal verlinken
    const termKey = entry.term.toLowerCase();
    if (usedTerms.has(termKey)) continue;
    usedTerms.add(termKey);

    // Text vor dem Match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // GlossaryLink
    parts.push(
      <GlossaryLink
        key={`gl-${termKey}-${match.index}`}
        term={entry.term}
        definition={entry.definition}
      >
        {matchedText}
      </GlossaryLink>
    );

    lastIndex = match.index + matchedText.length;
    linkCount++;
  }

  // Restlicher Text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
