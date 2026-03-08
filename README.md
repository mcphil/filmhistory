# Die Geschichte des Bewegtbildes

Eine interaktive Timeline-Website zur Geschichte des Films von den Ursprüngen bis 2026.

**Live:** [filmhistory.smartthings.de](https://filmhistory.smartthings.de)

---

## Über das Projekt

Diese Website erzählt die Geschichte des Bewegtbildes – von der Camera Obscura bis zu KI-generierten Videos (Sora, 2024). Der rote Faden: Wie Technik und Filmsprache sich gegenseitig herausgefordert, befreit und manchmal auch gefesselt haben.

## Inhalte

| Bereich | Details |
|---|---|
| **Timeline** | 10 Epochen, ~70 Einträge (Vorfilm bis KI-Ära 2026) |
| **Überblickstabelle** | Technik vs. Filmsprache, epochenweise |
| **Glossar** | 55 Fachbegriffe – suchbar, filterbar nach 4 Kategorien, sticky Header |
| **FAQ** | 30 Fragen & Antworten für Filminteressierte, semantisches Accordion |
| **Quellenverzeichnis** | 70 verifizierte Quellen (Faktencheck März 2026), filterbar nach Epoche und Typ |
| **Sprachen** | Vollständig zweisprachig: Deutsch / Englisch |

## Features

- **Interaktive Navigation** – Sticky Sidebar mit Epochen-Sprunglinks; aktive Sektion wird beim Scrollen hervorgehoben
- **Scroll-Fortschrittsbalken** – Goldene Linie am oberen Rand zeigt Lesefortschritt
- **Back-to-Top-Button** – Erscheint nach 400px Scroll, animiert mit Framer Motion
- **Zweisprachigkeit** – Vollständiger DE/EN-Wechsel per Klick; alle Texte, Glossar, FAQ und UI-Labels
- **DSGVO-konform** – Alle Fonts self-hosted (kein Google Fonts CDN), kein Analytics-Tracking
- **SEO-optimiert** – Open Graph, Twitter Card, JSON-LD (WebSite + FAQPage-Schema), Sitemap, robots.txt, Google Search Console verifiziert
- **Favicon** – Goldener Filmstreifen, 16/32/48px ICO + Apple Touch Icon + Android 192px

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + globales Stylesheet (keine Inline-Styles)
- **Animationen:** Framer Motion
- **Build:** Vite
- **Fonts:** Cormorant Garamond (Display) + Lato (Body) – self-hosted via CDN

## Design

**"Dunkles Lichtspiel"** – Dark Editorial Cinema. Dunkelheit als Bühne, Licht als Erzähler. Amber-400 (`#fbbf24`) als einheitliche Akzentfarbe für Titel, Glossar-Begriffe und Navigation. Alle Textfarben WCAG AA-konform (Kontrastverhältnis ≥ 4.5:1). Vertikale sticky Timeline-Navigation links, Inhalte rechts.

## Entwicklung

```bash
pnpm install
pnpm dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

---

## Making of

Diese Website ist ein Experiment: Kann eine KI nicht nur Texte schreiben, sondern ein vollständiges redaktionelles und technisches Produkt von Anfang bis Ende liefern?

Das Ergebnis liegt vor. Hier ist, wie es entstanden ist.

### Ausgangspunkt

Philipp Huberty formulierte das Thema: Die Geschichte des Bewegtbildes – von den ersten Anfängen bis 2026, mit dem Fokus auf das Wechselspiel zwischen Technik und Filmsprache. Kein Wikipedia-Dump. Eine erzählte Geschichte, mit Haltung.

### Schreibstil

Bevor ein einziger Satz über Film geschrieben wurde, analysierte Manus Philipps Blogartikel auf [philipp.huberty.de](https://philipp.huberty.de). Kurze Sätze als Stilmittel. Konkrete Momente statt abstrakter Epochen. Haltung statt Neutralität. Das Muster wurde extrahiert und als Vorlage für den gesamten Text verwendet.

### Recherche

Manus recherchierte parallel in mehreren Quellschichten: Wikipedia (Filmtechnologie, Filmgeschichte), Fachpresse (StudioBinder, No Film School), Archivmaterial und akademische Publikationen. Rund 70 Quellen wurden erfasst, kategorisiert und verlinkt.

### Faktencheck

Jeder einzelne Fakt der Timeline wurde in einem separaten Schritt gegen die Quellen geprüft. Ergebnis: 5 Korrekturen.

- Das Phénakistiskop wurde 1832 erfunden, nicht 1833.
- Die erste Netflix-Original-Serie war *Lilyhammer* (2012), nicht *House of Cards*.
- Die Canon 5D Mark II wurde für eine Episode von *House M.D.* genutzt, nicht für *House of Cards*.
- Der Matrix Bullet-Time-Rig hatte ~99 Kameras, nicht 120.
- *Everything Everywhere All at Once* nutzte Runway als Hilfstool, nicht als primäres KI-VFX-Werkzeug.

### Design

Drei Designkonzepte wurden entwickelt. Gewählt wurde "Dunkles Lichtspiel" – ein dark-editorial-cinematisches Design mit Cormorant Garamond als Display-Schrift und Lato als Fließtext. Alle Farben wurden mit einem WCAG-Kontrastchecker geprüft und auf Mindestkontrast 4.5:1 angehoben. Alle Inline-Styles wurden in ein globales Stylesheet ausgelagert. Alle Google Fonts wurden lokal heruntergeladen und self-hosted eingebunden.

### Entwicklung

Die Website wurde iterativ entwickelt: Timeline-Daten als TypeScript-Objekte, React-Komponenten, Framer-Motion-Animationen, zweisprachige Inhalte (DE/EN), 30 FAQ mit JSON-LD-Schema, Glossar mit sticky Filter, Quellenverzeichnis, DSGVO-Compliance, SEO-Meta-Tags, Sitemap, Favicon.

Jeder Schritt wurde in einem GitHub-Repository versioniert: [github.com/mcphil/filmhistory](https://github.com/mcphil/filmhistory)

### Werkzeug

**[Manus.im](https://manus.im)** – ein autonomer KI-Agent, der nicht nur Text generiert, sondern Browser bedient, Code schreibt, Fakten prüft, Bilder generiert und Entscheidungen trifft. Unter der Regie von Philipp Huberty bei [Smart Things Internetkommunikation GmbH](https://smartthings.de), Solingen.

---

## Impressum & Datenschutz

[smartthings.de/datenschutzhinweise](https://smartthings.de/datenschutzhinweise)

**Smart Things Internetkommunikation GmbH** · Wichernstr. 6 · 42653 Solingen
