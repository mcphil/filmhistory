/*
  Design: "Dunkles Lichtspiel" – Dark Editorial Cinema
  - Dunkelheit als Bühne, Licht als Erzähler
  - Cormorant Garamond (Display) + Lato (Body) + JetBrains Mono (Daten)
  - Gold/Bernstein als Akzent, Dunkelrot für Gegenreaktionen
  - Vertikale Timeline mit sticky Navigation links
  - Fließtexte: #dedede (nicht-gehighlightet: opacity 0.65)
  - Zweisprachig: Deutsch / Englisch via LanguageContext
  - Alle Styles in index.css ausgelagert – keine Inline-Styles
*/

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { epochs, milestoneTable, glossary } from "@/lib/timelineData";
import { epochsEn, milestoneTableEn, glossaryEn, uiEn } from "@/lib/timelineData.en";
import type { TimelineEntry, GlossaryEntry } from "@/lib/timelineData";
import { sources } from "@/lib/sourcesData";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Type metadata ──────────────────────────────────────────────────────────────
const typeMetaDe: Record<string, { label: string; color: string; dot: string; line: string }> = {
  technik:       { label: "Technik",       color: "text-amber-400 border-amber-400/30 bg-amber-400/8",    dot: "bg-amber-400",   line: "border-amber-400/40" },
  filmsprache:   { label: "Filmsprache",   color: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", dot: "bg-yellow-100",  line: "border-yellow-100/30" },
  gegenreaktion: { label: "Gegenreaktion", color: "text-red-400 border-red-400/30 bg-red-400/8",          dot: "bg-red-400",     line: "border-red-400/40" },
  meilenstein:   { label: "Meilenstein",   color: "text-white border-white/20 bg-white/6",                dot: "bg-white",       line: "border-white/25" },
};

const typeMetaEn: Record<string, { label: string; color: string; dot: string; line: string }> = {
  technik:       { label: "Technology",       color: "text-amber-400 border-amber-400/30 bg-amber-400/8",    dot: "bg-amber-400",   line: "border-amber-400/40" },
  filmsprache:   { label: "Film Language",    color: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", dot: "bg-yellow-100",  line: "border-yellow-100/30" },
  gegenreaktion: { label: "Counter-reaction", color: "text-red-400 border-red-400/30 bg-red-400/8",          dot: "bg-red-400",     line: "border-red-400/40" },
  meilenstein:   { label: "Milestone",        color: "text-white border-white/20 bg-white/6",                dot: "bg-white",       line: "border-white/25" },
};

// ─── Language Toggle ────────────────────────────────────────────────────────────
function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-0.5 rounded-sm border border-white/15 overflow-hidden">
      <button
        onClick={() => setLang("de")}
        className={`lang-btn ${lang === "de" ? "lang-btn-active" : "lang-btn-inactive"}`}
      >
        DE
      </button>
      <div className="w-px h-4 bg-white/10" />
      <button
        onClick={() => setLang("en")}
        className={`lang-btn ${lang === "en" ? "lang-btn-active" : "lang-btn-inactive"}`}
      >
        EN
      </button>
    </div>
  );
}

// ─── Filmstreifen-Perforationen (dekorativ) ─────────────────────────────────────
function FilmPerforations({ count = 8, vertical = false }: { count?: number; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2 opacity-20`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-sm bg-white/30 border border-white/20 flex-shrink-0 ${
            vertical ? "w-3 h-5" : "w-5 h-3"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Entry Card ────────────────────────────────────────────────────────────────
function EntryCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { lang } = useLanguage();
  const typeMeta = lang === "de" ? typeMetaDe : typeMetaEn;
  const meta = typeMeta[entry.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Connector dot */}
      <div className="absolute -left-[25px] top-5 hidden md:flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${meta.dot} opacity-70`} />
      </div>

      <div className="rounded-sm border border-white/12 bg-white/4">
        <div className="p-4 md:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-mono-ui text-[12px] tracking-widest text-amber-400">
              {entry.year}
            </span>
            <span className={`font-body text-[12px] px-2 py-0.5 rounded-sm border tracking-wide ${meta.color}`}>
              {meta.label}
            </span>
          </div>
          <h3 className="heading-entry-title text-base md:text-[17px] text-[#dedede] leading-snug mb-2">
            {entry.title}
          </h3>

          {/* Body */}
          <p className="font-body text-body text-base leading-relaxed">
            {entry.body}
          </p>

          {/* Quote */}
          {entry.quote && (
            <blockquote className="mt-4 pl-4 border-l-2 border-amber-400/40">
              <p className="quote-text leading-relaxed">
                {entry.quote}
              </p>
            </blockquote>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Epoch Section ─────────────────────────────────────────────────────────────
function EpochSection({ epochDe, epochEn }: { epochDe: typeof epochs[0]; epochEn: typeof epochsEn[0] }) {
  const { lang } = useLanguage();
  const epoch = lang === "de" ? epochDe : epochEn;

  return (
    <section id={`epoch-${epochDe.id}`} className="relative py-20 md:py-28">
      {epochDe.image && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
          <img
            src={epochDe.image}
            alt=""
            className="epoch-bg-img w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]" />
        </div>
      )}

      <div className="relative z-10">
        {/* Era header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-6 h-px bg-amber-400/50" />
          <span className="label-overline">{epoch.era}</span>
          <span className="font-mono-ui text-[12px] tracking-widest text-era-years">{epoch.years}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-display text-3xl md:text-[2.8rem] text-white mb-2 leading-tight"
        >
          {epoch.subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-body text-body text-base mb-8 max-w-xl leading-relaxed"
        >
          {epoch.description}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="gold-divider-h h-px mb-10 origin-left max-w-md"
        />

        {/* Entries */}
        <div className="relative pl-0 md:pl-8">
          <div className="timeline-line-v absolute left-0 top-0 bottom-0 w-px hidden md:block" />
          <div className="space-y-3">
            {epoch.entries.map((entry, i) => (
              <EntryCard key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Milestone Table ────────────────────────────────────────────────────────────
function MilestoneTable() {
  const { lang } = useLanguage();
  const table = lang === "de" ? milestoneTable : milestoneTableEn;

  return (
    <section id="meilensteine" className="py-20 md:py-28 border-t border-white/6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px bg-amber-400/50" />
          <span className="label-overline">
            {lang === "de" ? "Überblick" : "Overview"}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-white mb-2">
          {lang === "de" ? "Technik trifft Filmsprache" : "Technology Meets Film Language"}
        </h2>
        <p className="font-body text-body text-base max-w-lg leading-relaxed">
          {lang === "de"
            ? "Jede neue Technik hat zunächst die Filmsprache eingeschränkt, bevor sie sie befreit hat."
            : "Every new technology first constrained film language before it liberated it."}
        </p>
      </motion.div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-white/8">
              <th className="table-th-gold text-left pb-3 pr-8 w-20">
                {lang === "de" ? "Jahr" : "Year"}
              </th>
              <th className="table-th-gold text-left pb-3 pr-8">
                {lang === "de" ? "Technik" : "Technology"}
              </th>
              <th className="table-th-muted text-left pb-3">
                {lang === "de" ? "Filmsprache" : "Film Language"}
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.35, delay: i * 0.025 }}
                className="border-b border-white/4 hover:bg-white/2 transition-colors"
              >
                <td className="label-year-mono py-3 pr-8 whitespace-nowrap">{row.year}</td>
                <td className="font-body text-body py-3 pr-8 text-base">{row.technik}</td>
                <td className="font-body text-body py-3 text-base">{row.filmsprache}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Sidebar Navigation ─────────────────────────────────────────────────────────
function SideNav({ activeEpoch, onSelect }: { activeEpoch: string; onSelect: (id: string) => void }) {
  const { lang } = useLanguage();
  const epochList = lang === "de" ? epochs : epochsEn;

  const allItems = [
    ...epochList.map(e => ({ id: e.id, label: e.era, years: e.years })),
    { id: "meilensteine", label: lang === "de" ? "Überblick" : "Overview", years: "" },
    { id: "glossar",      label: lang === "de" ? "Glossar"   : "Glossary",  years: "" },
    { id: "quellen",      label: lang === "de" ? "Quellen"   : "Sources",   years: "" },
  ];

  return (
    <nav className="space-y-0.5">
      {allItems.map((item) => {
        const isActive = activeEpoch === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left px-3 py-2.5 rounded-sm transition-all duration-200 group ${
              isActive ? "bg-amber-400/10" : "hover:bg-white/4"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                isActive ? "bg-amber-400 scale-125" : "bg-white/40 group-hover:bg-white/60"
              }`} />
              <span className={`text-[12px] truncate transition-colors duration-200 ${
                isActive ? "sidenav-label-active" : "sidenav-label-inactive"
              }`}>
                {item.label}
              </span>
              {item.years && (
                <span className="sidenav-year text-[12px] ml-auto flex-shrink-0">
                  {item.years.split("–")[0]}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Progress bar ───────────────────────────────────────────────────────────────
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="progress-bar-gradient fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{ scaleX }}
    />
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 140]);
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/101220242/eMM848s9vZH5Nks5dZfxni/hero_filmgeschichte-F9SUwMhE4m8eKkhEjp3pS6.webp"
          alt=""
          className="w-full h-full object-cover brightness-40"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="hero-gradient-bottom absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      {/* Film perforations – top edge */}
      <div className="absolute top-6 left-0 right-0 flex justify-center">
        <FilmPerforations count={16} />
      </div>

      {/* Language toggle – top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggle />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-amber-400/60" />
              <span className="label-overline">
                {lang === "de" ? "Eine interaktive Timeline" : uiEn.heroLabel}
              </span>
            </div>

            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white mb-5 leading-none">
              {lang === "de" ? (
                <>
                  Die Geschichte<br />
                  <span className="text-amber-400 italic">des Bewegtbildes</span>
                </>
              ) : (
                <>
                  The History<br />
                  <span className="text-amber-400 italic">of the Moving Image</span>
                </>
              )}
            </h1>

            <p className="font-body text-body text-base md:text-lg max-w-lg leading-relaxed mb-8">
              {lang === "de"
                ? "Von der Camera Obscura bis zur KI. Wie Technik und Filmsprache sich gegenseitig herausgefordert, befreit und manchmal auch gefesselt haben."
                : uiEn.heroSubtitle}
            </p>

            <button
              onClick={() => document.getElementById("epoch-vorfilm")?.scrollIntoView({ behavior: "smooth" })}
              className="font-body inline-flex items-center gap-2 text-base text-amber-400 hover:text-amber-400 transition-colors"
            >
              <span>{lang === "de" ? "Timeline erkunden" : uiEn.heroLink}</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll label */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8 }}
      >
        <div className="scroll-line-gradient w-px h-10" />
        <span className="font-mono-ui text-scroll-label text-[9px] tracking-[0.3em] uppercase">
          scroll
        </span>
      </motion.div>
    </section>
  );
}

// ─── Glossar ────────────────────────────────────────────────────────────────────
const categoryMetaDe: Record<string, { label: string; color: string; dot: string }> = {
  technik:     { label: "Technik",       color: "text-amber-400 border-amber-400/30 bg-amber-400/8",    dot: "bg-amber-400" },
  filmsprache: { label: "Filmsprache",   color: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", dot: "bg-yellow-100" },
  bewegung:    { label: "Bewegung",      color: "text-sky-300 border-sky-300/25 bg-sky-300/5",          dot: "bg-sky-300" },
  format:      { label: "Format",        color: "text-violet-300 border-violet-300/25 bg-violet-300/5", dot: "bg-violet-300" },
};

const categoryMetaEn: Record<string, { label: string; color: string; dot: string }> = {
  technik:     { label: "Technology",    color: "text-amber-400 border-amber-400/30 bg-amber-400/8",    dot: "bg-amber-400" },
  filmsprache: { label: "Film Language", color: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", dot: "bg-yellow-100" },
  bewegung:    { label: "Movement",      color: "text-sky-300 border-sky-300/25 bg-sky-300/5",          dot: "bg-sky-300" },
  format:      { label: "Format",        color: "text-violet-300 border-violet-300/25 bg-violet-300/5", dot: "bg-violet-300" },
};

function GlossarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { lang } = useLanguage();

  const glossaryData: GlossaryEntry[] = lang === "de" ? glossary : glossaryEn;
  const categoryMeta = lang === "de" ? categoryMetaDe : categoryMetaEn;

  const filtered = glossaryData
    .filter(e => !activeCategory || e.category === activeCategory)
    .filter(e =>
      !search ||
      e.term.toLowerCase().includes(search.toLowerCase()) ||
      e.definition.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term, lang === "de" ? "de" : "en"));

  const categories = ["technik", "filmsprache", "bewegung", "format"] as const;

  return (
    <section id="glossar" className="py-20 md:py-28 border-t border-white/6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px bg-amber-400/50" />
          <span className="label-overline">
            {lang === "de" ? "Nachschlagewerk" : uiEn.glossaryLabel}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-white mb-2">
          {lang === "de" ? "Glossar" : uiEn.glossaryTitle}
        </h2>
        <p className="font-body text-body text-base max-w-lg leading-relaxed">
          {lang === "de"
            ? `${glossaryData.length} Fachbegriffe aus Technik, Filmsprache, Bewegungen und Formaten – alphabetisch sortiert.`
            : `${glossaryData.length} ${uiEn.glossaryDesc}`}
        </p>
      </motion.div>

      {/* Search + Filter – sticky */}
      <div className="sticky top-0 z-20 flex flex-col sm:flex-row gap-3 mb-8 py-3 bg-[#0d0d0d] border-b border-white/8">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder={lang === "de" ? "Begriff suchen…" : uiEn.glossarySearch}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="font-body w-full pl-9 pr-4 py-2.5 rounded-sm border border-white/12 bg-white/3 text-base text-nav-inactive outline-none focus:border-amber-400/40 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => {
            const meta = categoryMeta[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className={`font-body text-[13px] px-3 py-2 rounded-sm border tracking-wide transition-all ${
                  isActive ? meta.color : "border-white/10 text-[#909090] hover:border-white/20 hover:text-[#a8a8a8]"
                }`}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Glossary entries */}
      {filtered.length === 0 ? (
        <p className="font-body text-[#909090] text-base">
          {lang === "de" ? "Keine Einträge gefunden." : "No entries found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filtered.map((entry, i) => {
            const meta = categoryMeta[entry.category];
            return (
              <motion.div
                key={entry.term}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
              >
                <div className={`rounded-sm border border-white/12 bg-white/3`}>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`font-body text-[12px] px-1.5 py-0.5 rounded-sm border tracking-wide ${meta.color}`}>
                        {meta.label}
                      </span>
                      {entry.year && (
                        <span className="font-mono-ui text-[12px] text-amber-400">
                          {entry.year}
                        </span>
                      )}
                    </div>
                    <h3 className="heading-entry-title text-base text-[#dedede] leading-snug mb-2">
                      {entry.term}
                    </h3>
                    <p className="font-body text-body text-base leading-relaxed">
                      {entry.definition}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ─── Quellenverzeichnis ──────────────────────────────────────────────────────────────
const sourceTypeMetaDe: Record<string, { label: string; color: string }> = {
  wikipedia:  { label: "Wikipedia",                   color: "text-sky-300 border-sky-300/25 bg-sky-300/5" },
  buch:       { label: "Buch",                         color: "text-amber-400 border-amber-400/25 bg-amber-400/5" },
  artikel:    { label: "Artikel / Fachpresse",         color: "text-yellow-100 border-yellow-100/20 bg-yellow-100/4" },
  archiv:     { label: "Archiv / Museum",              color: "text-emerald-300 border-emerald-300/25 bg-emerald-300/5" },
  offiziell:  { label: "Offizielle Quelle",            color: "text-violet-300 border-violet-300/25 bg-violet-300/5" },
  akademisch: { label: "Akademisch / Fachpublikation", color: "text-rose-300 border-rose-300/25 bg-rose-300/5" },
};

const sourceTypeMetaEn: Record<string, { label: string; color: string }> = {
  wikipedia:  { label: "Wikipedia",        color: "text-sky-300 border-sky-300/25 bg-sky-300/5" },
  buch:       { label: "Book",             color: "text-amber-400 border-amber-400/25 bg-amber-400/5" },
  artikel:    { label: "Article / Press",  color: "text-yellow-100 border-yellow-100/20 bg-yellow-100/4" },
  archiv:     { label: "Archive / Museum", color: "text-emerald-300 border-emerald-300/25 bg-emerald-300/5" },
  offiziell:  { label: "Official Source",  color: "text-violet-300 border-violet-300/25 bg-violet-300/5" },
  akademisch: { label: "Academic",         color: "text-rose-300 border-rose-300/25 bg-rose-300/5" },
};

function SourcesSection() {
  const [activeEpoch, setActiveEpoch] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const { lang } = useLanguage();

  const sourceTypeMeta = lang === "de" ? sourceTypeMetaDe : sourceTypeMetaEn;
  const epochOptions = Array.from(new Set(sources.flatMap(s => s.epochen))).sort();
  const typeOptions = Object.keys(sourceTypeMeta);

  const filtered = sources
    .filter(s => !activeEpoch || s.epochen.includes(activeEpoch))
    .filter(s => !activeType || s.type === activeType)
    .sort((a, b) => a.epochen[0].localeCompare(b.epochen[0], "de") || a.title.localeCompare(b.title, "de"));

  return (
    <section id="quellen" className="py-20 md:py-28 border-t border-white/6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px bg-amber-400/50" />
          <span className="label-overline">
            {lang === "de" ? "Faktencheck & Belege" : uiEn.sourcesLabel}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-white mb-2">
          {lang === "de" ? "Quellenverzeichnis" : uiEn.sourcesTitle}
        </h2>
        <p className="font-body text-body text-base max-w-2xl leading-relaxed">
          {lang === "de"
            ? `Alle ${sources.length} Quellen wurden im Rahmen eines systematischen Faktenchecks geprüft (März 2026). Fehler und Ungenauigkeiten wurden korrigiert. Filterbar nach Epoche und Quellentyp.`
            : `All ${sources.length} ${uiEn.sourcesDesc}`}
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex gap-2 flex-wrap">
          <span className="label-overline-muted self-center">
            {lang === "de" ? "Epoche" : uiEn.sourcesFilterEpoch}
          </span>
          {epochOptions.map(ep => (
            <button
              key={ep}
              onClick={() => setActiveEpoch(activeEpoch === ep ? null : ep)}
              className={`font-body text-[13px] px-3 py-1.5 rounded-sm border tracking-wide transition-all ${
                activeEpoch === ep
                  ? "border-amber-400/40 text-amber-400 bg-amber-400/8"
                  : "border-white/10 text-[#909090] hover:border-white/20 hover:text-[#a8a8a8]"
              }`}
            >
              {ep}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="label-overline-muted self-center">
            {lang === "de" ? "Typ" : uiEn.sourcesFilterType}
          </span>
          {typeOptions.map(t => {
            const meta = sourceTypeMeta[t];
            return (
              <button
                key={t}
                onClick={() => setActiveType(activeType === t ? null : t)}
                className={`font-body text-[13px] px-3 py-1.5 rounded-sm border tracking-wide transition-all ${
                  activeType === t ? meta.color : "border-white/10 text-[#909090] hover:border-white/20 hover:text-[#a8a8a8]"
                }`}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Source list */}
      <div className="space-y-1.5">
        {filtered.map((source, i) => {
          const meta = sourceTypeMeta[source.type];
          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.015, 0.4) }}
              className="flex items-start gap-3 p-3 rounded-sm border border-white/5 bg-white/[0.015] hover:border-white/10 hover:bg-white/3 transition-all group"
            >
              <span className="label-index-mono flex-shrink-0 mt-0.5 w-7 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className={`font-body text-[12px] px-1.5 py-0.5 rounded-sm border tracking-wide flex-shrink-0 ${meta.color}`}>
                    {meta.label}
                  </span>
                  <span className="label-epoch-tag font-mono-ui text-[12px] flex-shrink-0">
                    {source.epochen.join(" · ")}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-title-link text-base leading-snug text-[#d0d0d0] hover:text-amber-400 transition-colors group-hover:underline underline-offset-2 decoration-amber-400/30"
                      >
                        {source.title}
                      </a>
                    ) : (
                      <span className="source-title-plain text-base leading-snug">
                        {source.title}
                      </span>
                    )}
                    <p className="label-source-meta text-[13px] mt-0.5">
                      {source.publisher}{source.author && ` · ${source.author}`}
                    </p>
                  </div>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 mt-0.5 text-[#808080] hover:text-amber-400 transition-colors"
                      aria-label={lang === "de" ? "Quelle öffnen" : "Open source"}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        <path d="M8 1h3m0 0v3m0-3L5.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="sources-stand mt-8 text-[12px]">
        {lang === "de" ? "Stand: März 2026. Alle Links wurden zum Zeitpunkt der Erstellung geprüft." : uiEn.sourcesStand}
      </p>
    </section>
  );
}

// ─── Closing Quote ──────────────────────────────────────────────────────────────
// ─── Footer (single-line compact bar) ────────────────────────────────────────
function SiteFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-ai-badge">KI</span>
        <p className="site-footer-oneliner">
          {lang === "de" ? (
            <>
              Diese Website ist komplett KI-generiert – Recherche, Design, Umsetzung, Fact-Checking und Übersetzung – mit{" "}
              <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="site-footer-link">Manus.im</a>{" "}
              unter der Regie von{" "}
              <a href="https://philipp.huberty.de" target="_blank" rel="noopener noreferrer" className="site-footer-link">Philipp Huberty</a>{" "}
              bei{" "}
              <a href="https://smartthings.de" target="_blank" rel="noopener noreferrer" className="site-footer-link">Smart Things Internetkommunikation GmbH</a>
              {" · Wichernstr. 6 · 42653 Solingen · "}
              <a href="https://smartthings.de/impressum" target="_blank" rel="noopener noreferrer" className="site-footer-link">Impressum</a>
              {" · "}
              <a href="https://smartthings.de/datenschutzhinweise" target="_blank" rel="noopener noreferrer" className="site-footer-link">Datenschutz</a>
            </>
          ) : (
            <>
              This website was entirely AI-generated – research, design, implementation, fact-checking and translation – using{" "}
              <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="site-footer-link">Manus.im</a>,
              directed by{" "}
              <a href="https://philipp.huberty.de" target="_blank" rel="noopener noreferrer" className="site-footer-link">Philipp Huberty</a>{" "}
              at{" "}
              <a href="https://smartthings.de" target="_blank" rel="noopener noreferrer" className="site-footer-link">Smart Things Internetkommunikation GmbH</a>
              {" · Wichernstr. 6 · 42653 Solingen · "}
              <a href="https://smartthings.de/impressum" target="_blank" rel="noopener noreferrer" className="site-footer-link">Legal Notice</a>
              {" · "}
              <a href="https://smartthings.de/datenschutzhinweise" target="_blank" rel="noopener noreferrer" className="site-footer-link">Privacy Policy</a>
            </>
          )}
        </p>
      </div>
    </footer>
  );
}

function ClosingSection() {
  const { lang } = useLanguage();
  return (
    <section className="py-20 md:py-32 border-t border-white/6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <div className="mb-8 opacity-20">
          <FilmPerforations count={6} />
        </div>

        <blockquote className="closing-quote text-2xl md:text-[2rem] leading-relaxed mb-6">
          {lang === "de"
            ? "\"Der Zug fährt immer noch in den Bahnhof. Wir springen immer noch auf.\""
            : "\"The train still pulls into the station. We still jump aboard.\""}
        </blockquote>

        <p className="closing-footer">
          {lang === "de"
            ? "Geschichte des Bewegtbildes · Von den Ursprüngen bis 2026"
            : "History of the Moving Image · From the Origins to 2026"}
        </p>
      </motion.div>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeEpoch, setActiveEpoch] = useState(epochs[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { lang } = useLanguage();

  const typeMeta = lang === "de" ? typeMetaDe : typeMetaEn;

  useEffect(() => {
    const ids = [...epochs.map(e => `epoch-${e.id}`), "meilensteine"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const raw = entry.target.id;
            setActiveEpoch(raw === "meilensteine" ? "meilensteine" : raw.replace("epoch-", ""));
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavSelect = useCallback((id: string) => {
    const targetId = ["meilensteine", "glossar", "quellen"].includes(id) ? id : `epoch-${id}`;
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <ProgressBar />
      <Hero />

      <div className="container">
        <div className="flex gap-6 lg:gap-14 xl:gap-20">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-48 xl:w-52 flex-shrink-0">
            <div className="sticky top-8 pt-10">
              {/* Branding + Language Toggle */}
              <div className="mb-5 pb-5 border-b border-white/15">
                <p className="font-body text-sidebar-desc text-[13px] leading-relaxed mb-3">
                  {lang === "de"
                    ? "Von der Camera Obscura\nbis zur KI — 2026"
                    : "From the Camera Obscura\nto AI — 2026"}
                </p>
                <LanguageToggle />
              </div>

              <SideNav activeEpoch={activeEpoch} onSelect={handleNavSelect} />

              {/* Legend */}
              <div className="mt-7 pt-5 border-t border-white/15 space-y-2">
                <p className="label-label-muted font-mono-ui text-[9px] tracking-[0.25em] uppercase mb-3 text-label-muted">
                  {lang === "de" ? "Legende" : "Legend"}
                </p>
                {Object.entries(typeMeta).map(([key, meta]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${meta.dot}`} />
                    <span className="font-body text-nav-inactive text-[13px]">
                      {meta.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Film perforations decoration */}
              <div className="mt-8">
                <FilmPerforations count={4} vertical />
              </div>
            </div>
          </aside>

          {/* ── Mobile FAB ── */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-black/50 bg-amber-400 text-[#0d0d0d]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* ── Mobile Nav Drawer ── */}
          <AnimatePresence>
            {mobileNavOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/75 z-40 lg:hidden"
                  onClick={() => setMobileNavOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed right-0 top-0 bottom-0 w-64 z-50 p-6 overflow-y-auto lg:hidden border-l border-white/8 bg-[#111111]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="drawer-title text-base">
                      {lang === "de" ? "Epochen" : "Epochs"}
                    </h3>
                    <button
                      onClick={() => setMobileNavOpen(false)}
                      className="text-[#909090] hover:text-[#b3b3b3] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <LanguageToggle />
                  </div>
                  <SideNav activeEpoch={activeEpoch} onSelect={handleNavSelect} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0 pt-10">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-12 max-w-2xl"
            >
              {/* Legend – mobile only */}
              <div className="flex flex-wrap gap-3 mb-6 lg:hidden">
                {Object.entries(typeMeta).map(([key, meta]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                    <span className="font-body text-muted-body text-[12px]">{meta.label}</span>
                  </div>
                ))}
              </div>

              <p className="intro-text text-base md:text-lg leading-relaxed">
                {lang === "de"
                  ? "Was folgt, ist keine trockene Auflistung von Jahreszahlen. Es ist die Geschichte davon, wie Technik und Filmsprache sich gegenseitig herausgefordert, befreit und manchmal auch gefesselt haben. Wie eine neue Kamera eine neue Ästhetik erzwungen hat. Wie eine neue Ästhetik eine neue Kamera gefordert hat."
                  : "What follows is not a dry list of dates. It is the story of how technology and film language challenged, liberated and sometimes shackled each other. How a new camera forced a new aesthetic. How a new aesthetic demanded a new camera."}
              </p>
            </motion.div>

            {/* Epoch sections */}
            {epochs.map((epochDe, i) => (
              <EpochSection key={epochDe.id} epochDe={epochDe} epochEn={epochsEn[i]} />
            ))}

            {/* Milestone table */}
            <MilestoneTable />

            {/* Glossar */}
            <GlossarySection />

            {/* Quellen */}
            <SourcesSection />

            {/* Closing */}
            <ClosingSection />
          </main>

        </div>
      </div>

      {/* Spacer damit der Inhalt nicht hinter dem fixed Footer verschwindet */}
      <div className="footer-spacer" />

      {/* Footer – fixed am Bottom, außerhalb des Grid-Containers */}
      <SiteFooter />
    </div>
  );
}
