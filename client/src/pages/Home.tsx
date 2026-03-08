/*
  Design: "Dunkles Lichtspiel" – Dark Editorial Cinema
  Light Mode: "Helles Lichtspiel" – Warm Paper / Sepia Cinema
  - Alle Farben über CSS-Variablen in index.css gesteuert
  - ThemeToggle in Sidebar und Mobile-Drawer
  - Zweisprachig: Deutsch / Englisch via LanguageContext
  - Alle Styles in index.css ausgelagert – keine Inline-Styles
*/

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { epochs, milestoneTable, glossary } from "@/lib/timelineData";
import { epochsEn, milestoneTableEn, glossaryEn, uiEn } from "@/lib/timelineData.en";
import type { TimelineEntry, GlossaryEntry } from "@/lib/timelineData";
import { sources } from "@/lib/sourcesData";
import { faqDe, faqEn } from "@/lib/faqData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { parseGlossaryLinks } from "@/lib/parseGlossaryLinks";
import { termToSlug } from "@/components/GlossaryLink";

// ─── Type metadata ──────────────────────────────────────────────────────────────
// Dark: Amber/Yellow/Red/White – Light: Warm Brown/Sepia variants
const typeMetaDe = {
  technik:       { label: "Technik",       colorDark: "text-amber-400 border-amber-400/30 bg-amber-400/8",    colorLight: "text-amber-700 border-amber-700/30 bg-amber-700/8",    dot: "bg-amber-500",   line: "border-amber-500/40" },
  filmsprache:   { label: "Filmsprache",   colorDark: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", colorLight: "text-stone-600 border-stone-500/30 bg-stone-500/8",    dot: "bg-stone-500",   line: "border-stone-500/30" },
  gegenreaktion: { label: "Gegenreaktion", colorDark: "text-red-400 border-red-400/30 bg-red-400/8",          colorLight: "text-red-700 border-red-700/30 bg-red-700/8",          dot: "bg-red-600",     line: "border-red-600/40" },
  meilenstein:   { label: "Meilenstein",   colorDark: "text-white border-white/20 bg-white/6",                colorLight: "text-stone-800 border-stone-600/25 bg-stone-600/6",    dot: "bg-stone-700",   line: "border-stone-600/25" },
};

const typeMetaEn = {
  technik:       { label: "Technology",       colorDark: "text-amber-400 border-amber-400/30 bg-amber-400/8",    colorLight: "text-amber-700 border-amber-700/30 bg-amber-700/8",    dot: "bg-amber-500",   line: "border-amber-500/40" },
  filmsprache:   { label: "Film Language",    colorDark: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", colorLight: "text-stone-600 border-stone-500/30 bg-stone-500/8",    dot: "bg-stone-500",   line: "border-stone-500/30" },
  gegenreaktion: { label: "Counter-reaction", colorDark: "text-red-400 border-red-400/30 bg-red-400/8",          colorLight: "text-red-700 border-red-700/30 bg-red-700/8",          dot: "bg-red-600",     line: "border-red-600/40" },
  meilenstein:   { label: "Milestone",        colorDark: "text-white border-white/20 bg-white/6",                colorLight: "text-stone-800 border-stone-600/25 bg-stone-600/6",    dot: "bg-stone-700",   line: "border-stone-600/25" },
};

// ─── Theme Toggle ───────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={isDark
        ? (lang === "de" ? "Hellen Modus aktivieren" : "Switch to light mode")
        : (lang === "de" ? "Dunklen Modus aktivieren" : "Switch to dark mode")}
      title={isDark
        ? (lang === "de" ? "Heller Modus" : "Light mode")
        : (lang === "de" ? "Dunkler Modus" : "Dark mode")}
    >
      {isDark ? (
        /* Sun icon */
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3.05 3.05l1.06 1.06M10.89 10.89l1.06 1.06M3.05 11.95l1.06-1.06M10.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M7.5 1.5A6 6 0 1 0 13.5 7.5 4.5 4.5 0 0 1 7.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

// ─── Language Toggle ────────────────────────────────────────────────────────────
function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className="flex items-center gap-0.5 rounded-sm overflow-hidden"
      style={{ border: "1px solid var(--lang-btn-border)" }}
    >
      <button
        onClick={() => setLang("de")}
        className={`lang-btn ${lang === "de" ? "lang-btn-active" : "lang-btn-inactive"}`}
      >
        DE
      </button>
      <div className="w-px h-4" style={{ background: "var(--lang-btn-divider)" }} />
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
          className={`rounded-sm flex-shrink-0 ${vertical ? "w-3 h-5" : "w-5 h-3"}`}
          style={{ background: "var(--perforation-bg)", border: "1px solid var(--perforation-border)" }}
        />
      ))}
    </div>
  );
}

// ─── Entry Card ────────────────────────────────────────────────────────────────
function EntryCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const glossaryData = lang === "de" ? glossary : glossaryEn;
  const typeMeta = lang === "de" ? typeMetaDe : typeMetaEn;
  const meta = typeMeta[entry.type as keyof typeof typeMeta];
  const color = theme === "dark" ? meta.colorDark : meta.colorLight;

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

      <div
        className="rounded-sm"
        style={{ border: "1px solid var(--page-border)", background: "var(--page-bg-card)" }}
      >
        <div className="p-4 md:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-mono-ui text-[12px] tracking-widest text-gold">
              {entry.year}
            </span>
            <span className={`font-body text-[12px] px-2 py-0.5 rounded-sm border tracking-wide ${color}`}>
              {meta.label}
            </span>
          </div>
          <h3 className="heading-entry-title text-base md:text-[17px] text-gold leading-snug mb-2">
            {entry.title}
          </h3>

          {/* Body */}
          <p className="font-body text-body text-base leading-relaxed">
            {parseGlossaryLinks(entry.body, glossaryData, 3)}
          </p>

          {/* Quote */}
          {entry.quote && (
            <blockquote
              className="mt-4 pl-4"
              style={{ borderLeft: "2px solid var(--gold-border-strong)" }}
            >
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
    <section id={`epoch-${epochDe.id}`} className="epoch-section relative">
      {epochDe.image && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
          <img
            src={epochDe.image}
            alt=""
            className="epoch-bg-img w-full h-full object-cover opacity-5"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, var(--page-bg), transparent 30%, transparent 70%, var(--page-bg))" }}
          />
        </div>
      )}

      <div className="relative z-10">
        {/* Era header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="epoch-header"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="label-overline">{epoch.era}</span>
            <span className="font-mono-ui text-[12px] tracking-widest text-era-years">{epoch.years}</span>
          </div>

          <h2 className="epoch-title">
            {epoch.subtitle}
          </h2>

          <p className="epoch-desc">
            {parseGlossaryLinks(epoch.description, lang === "de" ? glossary : glossaryEn, 2)}
          </p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="gold-divider-h h-px mt-6 origin-left max-w-md"
          />
        </motion.div>

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
    <section
      id="meilensteine"
      className="py-20 md:py-28"
      style={{ borderTop: "1px solid var(--page-border)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
          <span className="label-overline">
            {lang === "de" ? "Überblick" : "Overview"}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-body mb-2">
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
            <tr style={{ borderBottom: "1px solid var(--page-border)" }}>
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
                className="transition-colors"
                style={{ borderBottom: "1px solid var(--page-border-subtle)" }}
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
    { id: "fragen",       label: lang === "de" ? "Fragen"    : "Questions", years: "" },
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
            className="w-full text-left px-3 py-2.5 rounded-sm transition-all duration-200 group"
            style={{
              background: isActive ? "var(--sidenav-active-bg)" : "transparent",
            }}
            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--sidenav-hover-bg)"; }}
            onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                style={{
                  background: isActive ? "var(--gold)" : "var(--sidenav-dot-inactive)",
                  transform: isActive ? "scale(1.25)" : "scale(1)",
                }}
              />
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
  const { theme } = useTheme();

  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/101220242/eMM848s9vZH5Nks5dZfxni/hero_filmgeschichte-F9SUwMhE4m8eKkhEjp3pS6.webp"
          alt="Filmstreifen mit historischen Filmszenen – Symbolbild für die Geschichte des Bewegtbildes von der Camera Obscura bis zur KI"
          className={`w-full h-full object-cover ${theme === "dark" ? "brightness-40" : "brightness-25 saturate-30"}`}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="hero-gradient-bottom absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      {/* Film perforations – top edge */}
      <div className="absolute top-6 left-0 right-0 flex justify-center">
        <FilmPerforations count={16} />
      </div>

      {/* Controls – top right: Language + Theme toggle */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <ThemeToggle />
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
              <div className="w-10 h-px" style={{ background: "var(--gold)" }} />
              <span className="label-overline">
                {lang === "de" ? "Eine interaktive Timeline" : uiEn.heroLabel}
              </span>
            </div>

            {/* Hero title – always white on dark hero image */}
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white mb-5 leading-none">
              {lang === "de" ? (
                <>
                  Die Geschichte<br />
                  <span className="italic" style={{ color: "var(--gold)" }}>des Bewegtbildes</span>
                </>
              ) : (
                <>
                  The History<br />
                  <span className="italic" style={{ color: "var(--gold)" }}>of the Moving Image</span>
                </>
              )}
            </h1>

            <p className="font-body text-white/85 text-base md:text-lg max-w-lg leading-relaxed mb-8">
              {lang === "de"
                ? "Von der Camera Obscura bis zur KI. Wie Technik und Filmsprache sich gegenseitig herausgefordert, befreit und manchmal auch gefesselt haben."
                : uiEn.heroSubtitle}
            </p>

            <button
              onClick={() => document.getElementById("epoch-vorfilm")?.scrollIntoView({ behavior: "smooth" })}
              className="font-body inline-flex items-center gap-2 text-base transition-colors"
              style={{ color: "var(--gold)" }}
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
const categoryMetaDe = {
  technik:     { label: "Technik",       colorDark: "text-amber-400 border-amber-400/30 bg-amber-400/8",    colorLight: "text-amber-700 border-amber-700/30 bg-amber-700/8",    dot: "bg-amber-500" },
  filmsprache: { label: "Filmsprache",   colorDark: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", colorLight: "text-stone-600 border-stone-500/30 bg-stone-500/8",    dot: "bg-stone-500" },
  bewegung:    { label: "Bewegung",      colorDark: "text-sky-300 border-sky-300/25 bg-sky-300/5",          colorLight: "text-sky-700 border-sky-700/25 bg-sky-700/5",          dot: "bg-sky-600" },
  format:      { label: "Format",        colorDark: "text-violet-300 border-violet-300/25 bg-violet-300/5", colorLight: "text-violet-700 border-violet-700/25 bg-violet-700/5", dot: "bg-violet-600" },
};

const categoryMetaEn = {
  technik:     { label: "Technology",    colorDark: "text-amber-400 border-amber-400/30 bg-amber-400/8",    colorLight: "text-amber-700 border-amber-700/30 bg-amber-700/8",    dot: "bg-amber-500" },
  filmsprache: { label: "Film Language", colorDark: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", colorLight: "text-stone-600 border-stone-500/30 bg-stone-500/8",    dot: "bg-stone-500" },
  bewegung:    { label: "Movement",      colorDark: "text-sky-300 border-sky-300/25 bg-sky-300/5",          colorLight: "text-sky-700 border-sky-700/25 bg-sky-700/5",          dot: "bg-sky-600" },
  format:      { label: "Format",        colorDark: "text-violet-300 border-violet-300/25 bg-violet-300/5", colorLight: "text-violet-700 border-violet-700/25 bg-violet-700/5", dot: "bg-violet-600" },
};

function GlossarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { lang } = useLanguage();
  const { theme } = useTheme();

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
    <section
      id="glossar"
      className="py-20 md:py-28"
      style={{ borderTop: "1px solid var(--page-border)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
          <span className="label-overline">
            {lang === "de" ? "Nachschlagewerk" : uiEn.glossaryLabel}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-body mb-2">
          {lang === "de" ? "Glossar" : uiEn.glossaryTitle}
        </h2>
        <p className="font-body text-body text-base max-w-lg leading-relaxed">
          {lang === "de"
            ? `${glossaryData.length} Fachbegriffe aus Technik, Filmsprache, Bewegungen und Formaten – alphabetisch sortiert.`
            : `${glossaryData.length} ${uiEn.glossaryDesc}`}
        </p>
      </motion.div>

      {/* Search + Filter – sticky */}
      <div
        className="sticky top-0 z-20 flex flex-col sm:flex-row gap-3 mb-8 py-3"
        style={{
          background: "var(--glossary-sticky-bg)",
          borderBottom: "1px solid var(--glossary-sticky-border)",
        }}
      >
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-ghost-color)" }}
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder={lang === "de" ? "Begriff suchen…" : uiEn.glossarySearch}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="font-body w-full pl-9 pr-4 py-2.5 rounded-sm text-base text-nav-inactive outline-none transition-colors"
            style={{
              border: "1px solid var(--page-border-strong)",
              background: "var(--page-bg-card)",
            }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => {
            const meta = categoryMeta[cat];
            const isActive = activeCategory === cat;
            const color = theme === "dark" ? meta.colorDark : meta.colorLight;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className={`font-body text-[13px] px-3 py-2 rounded-sm border tracking-wide transition-all ${
                  isActive ? color : ""
                }`}
                style={!isActive ? {
                  border: "1px solid var(--filter-btn-border)",
                  color: "var(--filter-btn-text)",
                } : {}}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--filter-btn-hover-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--filter-btn-hover-text)"; } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--filter-btn-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--filter-btn-text)"; } }}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Glossary entries */}
      {filtered.length === 0 ? (
        <p className="font-body text-label-faint text-base">
          {lang === "de" ? "Keine Einträge gefunden." : "No entries found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filtered.map((entry, i) => {
            const meta = categoryMeta[entry.category as keyof typeof categoryMeta];
            const color = theme === "dark" ? meta.colorDark : meta.colorLight;
            return (
              <motion.div
                key={entry.term}
                id={`glossar-${termToSlug(entry.term)}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
              >
                <div
                  className="rounded-sm h-full"
                  style={{ border: "1px solid var(--page-border)", background: "var(--page-bg-card)" }}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`font-body text-[12px] px-1.5 py-0.5 rounded-sm border tracking-wide ${color}`}>
                        {meta.label}
                      </span>
                      {entry.year && (
                        <span className="font-mono-ui text-[12px] text-gold">
                          {entry.year}
                        </span>
                      )}
                    </div>
                    {/* SEO-Anker: <a> als unsichtbares Anchor-Target für Google */}
                    <h3 className="heading-entry-title text-base text-gold leading-snug mb-2">
                      <a
                        href={`#glossar-${termToSlug(entry.term)}`}
                        className="hover:underline"
                        style={{ color: "inherit", textDecoration: "none" }}
                        aria-label={`Direktlink zu: ${entry.term}`}
                      >
                        {entry.term}
                      </a>
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


// ─── FAQ-Sektion ──────────────────────────────────────────────────────────────────

function FaqSection() {
  const { lang } = useLanguage();
  const faqData = lang === "de" ? faqDe : faqEn;

  return (
    <section
      id="fragen"
      className="py-20 md:py-28"
      style={{ borderTop: "1px solid var(--page-border)" }}
    >
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
          <span className="label-overline">
            {lang === "de" ? "Wissen" : "Knowledge"}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-body mb-2">
          {lang === "de" ? "Fragen" : "Questions"}
        </h2>
        <p className="font-body text-body text-base max-w-2xl leading-relaxed">
          {lang === "de"
            ? `${faqData.length} Fragen und Antworten rund um die Geschichte des Films – für Einsteiger und Filminteressierte.`
            : `${faqData.length} questions and answers about the history of film – for beginners and film enthusiasts.`}
        </p>
      </div>

      <div className="faq-list">
        {faqData.map((item) => (
          <details key={item.id} className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <summary className="faq-question" itemProp="name">
              {item.question}
              <span className="faq-chevron" aria-hidden="true">›</span>
            </summary>
            <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ─── Quellenverzeichnis ──────────────────────────────────────────────────────────────
const sourceTypeMetaDe = {
  wikipedia:  { label: "Wikipedia",                   colorDark: "text-sky-300 border-sky-300/25 bg-sky-300/5",       colorLight: "text-sky-700 border-sky-700/25 bg-sky-700/5" },
  buch:       { label: "Buch",                         colorDark: "text-amber-400 border-amber-400/25 bg-amber-400/5", colorLight: "text-amber-700 border-amber-700/25 bg-amber-700/5" },
  artikel:    { label: "Artikel / Fachpresse",         colorDark: "text-yellow-100 border-yellow-100/20 bg-yellow-100/4", colorLight: "text-stone-600 border-stone-500/25 bg-stone-500/5" },
  archiv:     { label: "Archiv / Museum",              colorDark: "text-emerald-300 border-emerald-300/25 bg-emerald-300/5", colorLight: "text-emerald-700 border-emerald-700/25 bg-emerald-700/5" },
  offiziell:  { label: "Offizielle Quelle",            colorDark: "text-violet-300 border-violet-300/25 bg-violet-300/5", colorLight: "text-violet-700 border-violet-700/25 bg-violet-700/5" },
  akademisch: { label: "Akademisch / Fachpublikation", colorDark: "text-rose-300 border-rose-300/25 bg-rose-300/5",    colorLight: "text-rose-700 border-rose-700/25 bg-rose-700/5" },
};

const sourceTypeMetaEn = {
  wikipedia:  { label: "Wikipedia",        colorDark: "text-sky-300 border-sky-300/25 bg-sky-300/5",       colorLight: "text-sky-700 border-sky-700/25 bg-sky-700/5" },
  buch:       { label: "Book",             colorDark: "text-amber-400 border-amber-400/25 bg-amber-400/5", colorLight: "text-amber-700 border-amber-700/25 bg-amber-700/5" },
  artikel:    { label: "Article / Press",  colorDark: "text-yellow-100 border-yellow-100/20 bg-yellow-100/4", colorLight: "text-stone-600 border-stone-500/25 bg-stone-500/5" },
  archiv:     { label: "Archive / Museum", colorDark: "text-emerald-300 border-emerald-300/25 bg-emerald-300/5", colorLight: "text-emerald-700 border-emerald-700/25 bg-emerald-700/5" },
  offiziell:  { label: "Official Source",  colorDark: "text-violet-300 border-violet-300/25 bg-violet-300/5", colorLight: "text-violet-700 border-violet-700/25 bg-violet-700/5" },
  akademisch: { label: "Academic",         colorDark: "text-rose-300 border-rose-300/25 bg-rose-300/5",    colorLight: "text-rose-700 border-rose-700/25 bg-rose-700/5" },
};

function SourcesSection() {
  const [activeEpoch, setActiveEpoch] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const { lang } = useLanguage();
  const { theme } = useTheme();

  const sourceTypeMeta = lang === "de" ? sourceTypeMetaDe : sourceTypeMetaEn;
  const epochOptions = Array.from(new Set(sources.flatMap(s => s.epochen))).sort();
  const typeOptions = Object.keys(sourceTypeMeta);

  const filtered = sources
    .filter(s => !activeEpoch || s.epochen.includes(activeEpoch))
    .filter(s => !activeType || s.type === activeType)
    .sort((a, b) => a.epochen[0].localeCompare(b.epochen[0], "de") || a.title.localeCompare(b.title, "de"));

  return (
    <section
      id="quellen"
      className="py-20 md:py-28"
      style={{ borderTop: "1px solid var(--page-border)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
          <span className="label-overline">
            {lang === "de" ? "Faktencheck & Belege" : uiEn.sourcesLabel}
          </span>
        </div>
        <h2 className="heading-display text-3xl md:text-[2.8rem] text-body mb-2">
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
                activeEpoch === ep ? "border-amber-400/40 text-gold" : ""
              }`}
              style={activeEpoch === ep
                ? { background: "var(--gold-subtle)" }
                : { border: "1px solid var(--filter-btn-border)", color: "var(--filter-btn-text)" }
              }
            >
              {ep}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="label-overline-muted self-center">
            {lang === "de" ? "Typ" : uiEn.sourcesFilterType}
          </span>
          {typeOptions.map(type => {
            const meta = sourceTypeMeta[type as keyof typeof sourceTypeMeta];
            const isActive = activeType === type;
            const color = theme === "dark" ? meta.colorDark : meta.colorLight;
            return (
              <button
                key={type}
                onClick={() => setActiveType(isActive ? null : type)}
                className={`font-body text-[13px] px-3 py-1.5 rounded-sm border tracking-wide transition-all ${isActive ? color : ""}`}
                style={!isActive ? { border: "1px solid var(--filter-btn-border)", color: "var(--filter-btn-text)" } : {}}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Source list */}
      <div className="space-y-1">
        {filtered.map((source, i) => {
          const meta = sourceTypeMeta[source.type as keyof typeof sourceTypeMeta];
          const color = theme === "dark" ? meta.colorDark : meta.colorLight;
          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.015, 0.4) }}
              className="flex items-start gap-3 py-3 group"
              style={{ borderBottom: "1px solid var(--page-border-subtle)" }}
            >
              <span className="label-index-mono mt-0.5 flex-shrink-0 w-6 text-right">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className={`font-body text-[12px] px-1.5 py-0.5 rounded-sm border tracking-wide flex-shrink-0 ${color}`}>
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
                        className="source-title-link text-base leading-snug transition-colors"
                        style={{ color: "var(--text-nav-inactive-color)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-nav-inactive-color)")}
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
                      className="flex-shrink-0 mt-0.5 transition-colors"
                      style={{ color: "var(--text-ghost-color)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-ghost-color)")}
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
    <section
      className="py-20 md:py-32"
      style={{ borderTop: "1px solid var(--page-border)" }}
    >
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

// ─── Back to Top Button ─────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-16 right-5 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"
      style={{ background: "var(--gold)", color: "var(--page-bg)" }}
      aria-label="Zurück nach oben"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeEpoch, setActiveEpoch] = useState(epochs[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { lang } = useLanguage();
  const { theme } = useTheme();

  const typeMeta = lang === "de" ? typeMetaDe : typeMetaEn;

  useEffect(() => {
    const ids = [...epochs.map(e => `epoch-${e.id}`), "meilensteine", "glossar", "fragen", "quellen"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const raw = entry.target.id;
            const staticIds = ["meilensteine", "glossar", "fragen", "quellen"];
            setActiveEpoch(staticIds.includes(raw) ? raw : raw.replace("epoch-", ""));
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
    const targetId = ["meilensteine", "glossar", "fragen", "quellen"].includes(id) ? id : `epoch-${id}`;
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <ProgressBar />
      <Hero />

      <div className="container">
        <div className="flex gap-6 lg:gap-14 xl:gap-20">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-48 xl:w-52 flex-shrink-0">
            <div className="sticky top-8 pt-10">
              {/* Branding + Controls */}
              <div
                className="mb-5 pb-5"
                style={{ borderBottom: "1px solid var(--page-border-strong)" }}
              >
                <p className="font-body text-sidebar-desc text-[13px] leading-relaxed mb-3">
                  {lang === "de"
                    ? "Von der Camera Obscura\nbis zur KI — 2026"
                    : "From the Camera Obscura\nto AI — 2026"}
                </p>
                {/* Language + Theme toggle in one row */}
                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>

              <SideNav activeEpoch={activeEpoch} onSelect={handleNavSelect} />

              {/* Legend */}
              <div
                className="mt-7 pt-5 space-y-2"
                style={{ borderTop: "1px solid var(--page-border-strong)" }}
              >
                <p className="font-mono-ui text-[9px] tracking-[0.25em] uppercase mb-3 text-label-muted">
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
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-black/50"
              style={{ background: "var(--gold)", color: "var(--page-bg)" }}
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
                  className="fixed inset-0 z-40 lg:hidden"
                  style={{ background: "var(--mobile-overlay-bg)" }}
                  onClick={() => setMobileNavOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed right-0 top-0 bottom-0 w-64 z-50 p-6 overflow-y-auto lg:hidden"
                  style={{
                    background: "var(--mobile-drawer-bg)",
                    borderLeft: "1px solid var(--mobile-drawer-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="drawer-title text-base">
                      {lang === "de" ? "Epochen" : "Epochs"}
                    </h3>
                    <button
                      onClick={() => setMobileNavOpen(false)}
                      className="transition-colors"
                      style={{ color: "var(--mobile-drawer-close)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--mobile-drawer-close-hover)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--mobile-drawer-close)")}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
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

            {/* Fragen / FAQ */}
            <FaqSection />

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
      <BackToTop />
      <SiteFooter />
    </div>
  );
}
