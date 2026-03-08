# Design-Ideen: Die Geschichte des Bewegtbildes

## Idee A – Filmstreifen-Noir (Wahrscheinlichkeit: 0.07)

**Design Movement:** Cinematic Noir meets Editorial Print
**Core Principles:** Kontrast als Aussage; Typografie als Bild; Licht und Schatten erzählen; Horizontale Bewegung wie ein Filmstreifen
**Color Philosophy:** Tiefes Schwarz (#0a0a0a) als Basis, warmes Sepia-Gelb (#e8c97a) als Akzent, Dunkelrot (#8b1a1a) für Highlights. Emotionale Wärme in kalter Dunkelheit – wie ein Kinosaal.
**Layout Paradigm:** Vertikale Scroll-Timeline mit einem zentralen Filmstreifen-Steg als roter Faden. Kapitel-Karten wechseln links/rechts ab. Perforationslöcher als dekoratives Motiv.
**Signature Elements:** Filmstreifen-Perforationen als Seitenrand; Vintage-Filmkorn-Textur über Hintergründen; Jahreszahlen in großer Slab-Serif
**Interaction Philosophy:** Scrollen = Zeit voranschreiten. Hover auf Karten öffnet Details mit Fade-In. Kein Klick nötig für Grundinfo.
**Animation:** Karten gleiten beim Scrollen von links/rechts ein (Framer Motion). Filmkorn-Overlay pulsiert subtil. Jahreszahlen zählen hoch beim Einblenden.
**Typography System:** Playfair Display (Display/Überschriften) + Source Serif 4 (Fließtext) + Courier Prime (Jahreszahlen/Technik-Details)

---

## Idee B – Bauhaus-Kino (Wahrscheinlichkeit: 0.06)

**Design Movement:** Bauhaus Constructivism meets Digital Minimalism
**Core Principles:** Geometrie als Sprache; Primärfarben als Code; Raster als Ordnung; Funktion ist Form
**Color Philosophy:** Reines Weiß (#ffffff) Hintergrund, Schwarz (#111111) Text, Rot (#cc2200) für Technik-Meilensteine, Blau (#003399) für Filmsprache-Meilensteine. Farbe als Kategorie-System.
**Layout Paradigm:** Asymmetrisches Raster. Timeline läuft diagonal durch die Seite. Karten sind Rechtecke ohne Schatten, nur Farbe und Linie.
**Signature Elements:** Diagonale Trennlinien; Kreise als Zeitpunkte auf der Timeline; Fettgedruckte Jahreszahlen als Bildmotiv
**Interaction Philosophy:** Klick auf Zeitpunkt öffnet Karte. Kein Hover-State – nur aktiv/inaktiv. Klare Zustände.
**Animation:** Karten erscheinen mit harter Transition (kein Ease). Linien zeichnen sich auf. Zahlen springen, nicht gleiten.
**Typography System:** DM Serif Display (Headlines) + IBM Plex Sans (Body) + IBM Plex Mono (Daten/Jahreszahlen)

---

## Idee C – Dunkles Lichtspiel (Gewählt) (Wahrscheinlichkeit: 0.08)

**Design Movement:** Dark Editorial Cinema – Magazin-Qualität im Kinodunkel
**Core Principles:** Dunkelheit als Bühne; Licht als Erzähler; Typografie mit Gewicht; Bewegung wie Filmschnitt
**Color Philosophy:** Fast-Schwarz (#0d0d0d) als Bühne, gebrochenes Weiß (#f0ece4) als Text, Bernstein/Gold (#c9a84c) als Akzent für Meilensteine, Dunkelrot (#7a1f1f) für Gegenreaktionen/Krisen. Wie ein Kinosaal: das Bild leuchtet, alles andere ist dunkel.
**Layout Paradigm:** Breite, vollflächige Sektionen. Jede Epoche bekommt eine eigene "Szene". Links eine schmale vertikale Zeitachse (sticky), rechts der Inhalt. Auf Mobile: Zeitachse oben als Fortschrittsbalken.
**Signature Elements:** Vertikale Lichtlinie als Timeline-Steg; Filmkorn-Textur (CSS noise) über dunklen Bereichen; Großformatige Zitate aus dem Text als visuelle Anker
**Interaction Philosophy:** Scrollen ist die primäre Interaktion. Epochen-Navigation oben für schnellen Sprung. Kein Overload – ein Thema pro Bildschirm.
**Animation:** Framer Motion: Elemente gleiten von unten ein (y: 40px → 0, opacity 0→1). Zitate erscheinen Wort für Wort. Zeitachse füllt sich beim Scrollen.
**Typography System:** Cormorant Garamond (große Überschriften, elegant und filmisch) + Lato (Fließtext, lesbar) + JetBrains Mono (Jahreszahlen, technisch)
