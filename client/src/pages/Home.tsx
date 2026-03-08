/*
  Design: "Dunkles Lichtspiel" – Dark Editorial Cinema
  - Dunkelheit als Bühne, Licht als Erzähler
  - Cormorant Garamond (Display) + Lato (Body) + JetBrains Mono (Daten)
  - Gold/Bernstein als Akzent, Dunkelrot für Gegenreaktionen
  - Vertikale Timeline mit sticky Navigation links
  - Fließtexte: #dedede (nicht-gehighlightet: opacity 0.65)
  - Zweisprachig: Deutsch / Englisch via LanguageContext
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
  meilenstein:   { label: "Meilenstein",  color: "text-white border-white/20 bg-white/6",                dot: "bg-white",       line: "border-white/25" },
};

const typeMetaEn: Record<string, { label: string; color: string; dot: string; line: string }> = {
  technik:       { label: "Technology",       color: "text-amber-400 border-amber-400/30 bg-amber-400/8",    dot: "bg-amber-400",   line: "border-amber-400/40" },
  filmsprache:   { label: "Film Language",    color: "text-yellow-100 border-yellow-100/25 bg-yellow-100/5", dot: "bg-yellow-100",  line: "border-yellow-100/30" },
  gegenreaktion: { label: "Counter-reaction", color: "text-red-400 border-red-400/30 bg-red-400/8",          dot: "bg-red-400",     line: "border-red-400/40" },
  meilenstein:   { label: "Milestone",        color: "text-white border-white/20 bg-white/6",                dot: "bg-white",       line: "border-white/25" },
};

const BODY_FONT = { fontFamily: "'Lato', sans-serif", fontWeight: 300 } as const;
const MONO_FONT = { fontFamily: "'JetBrains Mono', monospace" } as const;
const DISPLAY_FONT = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const TEXT_MUTED = { color: "#dedede", opacity: 0.85 } as const;
const TEXT_BODY  = { color: "#dedede" } as const;

// ─── Language Toggle ────────────────────────────────────────────────────────────
function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-0.5 rounded-sm border border-white/15 overflow-hidden">
      <button
        onClick={() => setLang("de")}
        className={`px-2.5 py-1 text-[10px] tracking-widest transition-all duration-200 ${
          lang === "de"
            ? "bg-amber-400/15 text-amber-400"
            : "text-white/35 hover:text-white/60"
        }`}
        style={MONO_FONT}
      >
        DE
      </button>
      <div className="w-px h-4 bg-white/10" />
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 text-[10px] tracking-widest transition-all duration-200 ${
          lang === "en"
            ? "bg-amber-400/15 text-amber-400"
            : "text-white/35 hover:text-white/60"
        }`}
        style={MONO_FONT}
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
  const [expanded, setExpanded] = useState(false);
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
        <div className={`w-2 h-2 rounded-full border ${meta.line} ${meta.dot} opacity-70 group-hover:opacity-100 transition-opacity`} />
      </div>

      <button
        className={`
          w-full text-left rounded-sm border transition-all duration-300
          ${expanded
            ? `${meta.line} bg-white/4`
            : "border-white/7 bg-white/2 hover:border-white/14 hover:bg-white/4"
          }
        `}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-4 md:p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-xs tracking-widest text-amber-400/60"
                  style={MONO_FONT}
                >
                  {entry.year}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-sm border tracking-wide ${meta.color}`}
                  style={BODY_FONT}
                >
                  {meta.label}
                </span>
              </div>
              <h3
                className="text-base md:text-[17px] text-white/88 leading-snug"
                style={{ ...DISPLAY_FONT, fontWeight: 500 }}
              >
                {entry.title}
              </h3>
            </div>
            <div
              className={`flex-shrink-0 mt-1.5 transition-transform duration-300 text-white/25 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Body */}
          <p
            className={`text-sm leading-relaxed mt-2 transition-all duration-300 ${
              expanded ? "" : "line-clamp-2"
            }`}
            style={{ ...BODY_FONT, ...TEXT_BODY }}
          >
            {entry.body}
          </p>

          {/* Quote */}
          <AnimatePresence>
            {expanded && entry.quote && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <blockquote className="mt-4 pl-4 border-l-2 border-amber-400/40">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ ...DISPLAY_FONT, fontStyle: "italic", fontSize: "15px", color: "#c9a84c", opacity: 0.85 }}
                  >
                    {entry.quote}
                  </p>
                </blockquote>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
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
            className="w-full h-full object-cover opacity-5"
            style={{ filter: "grayscale(60%) brightness(0.5)" }}
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
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-amber-400/60"
            style={MONO_FONT}
          >
            {epoch.era}
          </span>
          <span
            className="text-[10px] tracking-widest"
            style={{ ...MONO_FONT, color: "#dedede", opacity: 0.25 }}
          >
            {epoch.years}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-[2.8rem] text-white mb-2 leading-tight"
          style={{ ...DISPLAY_FONT, fontWeight: 300 }}
        >
          {epoch.subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base mb-8 max-w-xl leading-relaxed"
          style={{ ...BODY_FONT, ...TEXT_BODY }}
        >
          {epoch.description}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-px mb-10 origin-left max-w-md"
          style={{ background: "linear-gradient(90deg, oklch(0.72 0.12 75 / 0.45), transparent)" }}
        />

        {/* Entries */}
        <div className="relative pl-0 md:pl-8">
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(180deg, oklch(0.72 0.12 75 / 0.25) 0%, oklch(0.72 0.12 75 / 0.08) 100%)",
            }}
          />
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
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-amber-400/60"
            style={MONO_FONT}
          >
            {lang === "de" ? "Überblick" : "Overview"}
          </span>
        </div>
        <h2
          className="text-3xl md:text-[2.8rem] text-white mb-2"
          style={{ ...DISPLAY_FONT, fontWeight: 300 }}
        >
          {lang === "de" ? "Technik trifft Filmsprache" : "Technology Meets Film Language"}
        </h2>
        <p
          className="text-base max-w-lg leading-relaxed"
          style={{ ...BODY_FONT, ...TEXT_BODY }}
        >
          {lang === "de"
            ? "Jede neue Technik hat zunächst die Filmsprache eingeschränkt, bevor sie sie befreit hat."
            : "Every new technology first constrained film language before it liberated it."}
        </p>
      </motion.div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-white/8">
              <th
                className="text-left pb-3 pr-8 font-normal"
                style={{ ...MONO_FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.6, width: "80px" }}
              >
                {lang === "de" ? "Jahr" : "Year"}
              </th>
              <th
                className="text-left pb-3 pr-8 font-normal"
                style={{ ...MONO_FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.6 }}
              >
                {lang === "de" ? "Technik" : "Technology"}
              </th>
              <th
                className="text-left pb-3 font-normal"
                style={{ ...MONO_FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#dedede", opacity: 0.4 }}
              >
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
                <td
                  className="py-3 pr-8 whitespace-nowrap"
                  style={{ ...MONO_FONT, fontSize: "11px", color: "#c9a84c", opacity: 0.7 }}
                >
                  {row.year}
                </td>
                <td
                  className="py-3 pr-8 text-sm font-light"
                  style={{ ...BODY_FONT, ...TEXT_BODY }}
                >
                  {row.technik}
                </td>
                <td
                  className="py-3 text-sm font-light"
                  style={{ ...BODY_FONT, color: "#dedede", opacity: 0.65 }}
                >
                  {row.filmsprache}
                </td>
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
            className={`
              w-full text-left px-3 py-2.5 rounded-sm transition-all duration-200 group
              ${isActive ? "bg-amber-400/10" : "hover:bg-white/4"}
            `}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                  isActive ? "bg-amber-400 scale-125" : "bg-white/40 group-hover:bg-white/60"
                }`}
              />
              <span
                className="text-xs truncate transition-colors duration-200"
                style={{
                  ...BODY_FONT,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#c9a84c" : "#e8e8e8",
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {item.label}
              </span>
              {item.years && (
                <span
                  className="text-[10px] ml-auto flex-shrink-0"
                  style={{ ...MONO_FONT, color: "#dedede", opacity: 0.55 }}
                >
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
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, oklch(0.72 0.12 75), oklch(0.88 0.09 75 / 0.8))",
      }}
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
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/70 via-[#0d0d0d]/20 to-transparent" />

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
              <span
                className="text-[10px] tracking-[0.35em] uppercase text-amber-400/65"
                style={MONO_FONT}
              >
                {lang === "de" ? "Eine interaktive Timeline" : uiEn.heroLabel}
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white mb-5 leading-none"
              style={{ ...DISPLAY_FONT, fontWeight: 300 }}
            >
              {lang === "de" ? (
                <>
                  Die Geschichte<br />
                  <span className="text-amber-400" style={{ fontStyle: "italic" }}>
                    des Bewegtbildes
                  </span>
                </>
              ) : (
                <>
                  The History<br />
                  <span className="text-amber-400" style={{ fontStyle: "italic" }}>
                    of the Moving Image
                  </span>
                </>
              )}
            </h1>

            <p
              className="text-base md:text-lg max-w-lg leading-relaxed mb-8"
              style={{ ...BODY_FONT, ...TEXT_BODY }}
            >
              {lang === "de"
                ? "Von der Camera Obscura bis zur KI. Wie Technik und Filmsprache sich gegenseitig herausgefordert, befreit und manchmal auch gefesselt haben."
                : uiEn.heroSubtitle}
            </p>

            <button
              onClick={() => document.getElementById("epoch-vorfilm")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-sm text-amber-400/75 hover:text-amber-400 transition-colors"
              style={BODY_FONT}
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
        <div className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent" />
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ ...MONO_FONT, color: "#dedede", opacity: 0.5, writingMode: "vertical-rl" }}
        >
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
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
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
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400/60" style={MONO_FONT}>
            {lang === "de" ? "Nachschlagewerk" : uiEn.glossaryLabel}
          </span>
        </div>
        <h2
          className="text-3xl md:text-[2.8rem] text-white mb-2"
          style={{ ...DISPLAY_FONT, fontWeight: 300 }}
        >
          {lang === "de" ? "Glossar" : uiEn.glossaryTitle}
        </h2>
        <p className="text-base max-w-lg leading-relaxed" style={{ ...BODY_FONT, ...TEXT_BODY }}>
          {lang === "de"
            ? `${glossaryData.length} Fachbegriffe aus Technik, Filmsprache, Bewegungen und Formaten – alphabetisch sortiert.`
            : `${glossaryData.length} ${uiEn.glossaryDesc}`}
        </p>
      </motion.div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
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
            className="w-full pl-9 pr-4 py-2.5 rounded-sm border border-white/12 bg-white/3 text-sm outline-none focus:border-amber-400/40 transition-colors"
            style={{ ...BODY_FONT, color: "#e8e8e8" }}
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
                className={`text-[11px] px-3 py-2 rounded-sm border tracking-wide transition-all ${
                  isActive ? meta.color : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/65"
                }`}
                style={BODY_FONT}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Glossary entries */}
      {filtered.length === 0 ? (
        <p className="text-sm" style={{ ...BODY_FONT, color: "#dedede", opacity: 0.4 }}>
          {lang === "de" ? "Keine Einträge gefunden." : "No entries found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filtered.map((entry, i) => {
            const meta = categoryMeta[entry.category];
            const isExpanded = expandedTerm === entry.term;
            return (
              <motion.div
                key={entry.term}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
              >
                <button
                  className={`w-full text-left rounded-sm border transition-all duration-200 ${
                    isExpanded ? `${meta.color.split(" ")[2]} border-white/15` : "border-white/7 bg-white/2 hover:border-white/14 hover:bg-white/3"
                  }`}
                  onClick={() => setExpandedTerm(isExpanded ? null : entry.term)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-sm border tracking-wide ${meta.color}`}
                            style={BODY_FONT}
                          >
                            {meta.label}
                          </span>
                          {entry.year && (
                            <span className="text-[10px] text-amber-400/50" style={MONO_FONT}>
                              {entry.year}
                            </span>
                          )}
                        </div>
                        <h3
                          className="text-base text-white/90 leading-snug"
                          style={{ ...DISPLAY_FONT, fontWeight: 500 }}
                        >
                          {entry.term}
                        </h3>
                      </div>
                      <div
                        className={`flex-shrink-0 mt-1 transition-transform duration-300 text-white/25 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-sm leading-relaxed mt-3 overflow-hidden"
                          style={{ ...BODY_FONT, ...TEXT_BODY }}
                        >
                          {entry.definition}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
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
  wikipedia:   { label: "Wikipedia",                  color: "text-sky-300 border-sky-300/25 bg-sky-300/5" },
  buch:        { label: "Buch",                        color: "text-amber-300 border-amber-300/25 bg-amber-300/5" },
  artikel:     { label: "Artikel / Fachpresse",        color: "text-yellow-100 border-yellow-100/20 bg-yellow-100/4" },
  archiv:      { label: "Archiv / Museum",             color: "text-emerald-300 border-emerald-300/25 bg-emerald-300/5" },
  offiziell:   { label: "Offizielle Quelle",           color: "text-violet-300 border-violet-300/25 bg-violet-300/5" },
  akademisch:  { label: "Akademisch / Fachpublikation",color: "text-rose-300 border-rose-300/25 bg-rose-300/5" },
};

const sourceTypeMetaEn: Record<string, { label: string; color: string }> = {
  wikipedia:   { label: "Wikipedia",          color: "text-sky-300 border-sky-300/25 bg-sky-300/5" },
  buch:        { label: "Book",               color: "text-amber-300 border-amber-300/25 bg-amber-300/5" },
  artikel:     { label: "Article / Press",    color: "text-yellow-100 border-yellow-100/20 bg-yellow-100/4" },
  archiv:      { label: "Archive / Museum",   color: "text-emerald-300 border-emerald-300/25 bg-emerald-300/5" },
  offiziell:   { label: "Official Source",    color: "text-violet-300 border-violet-300/25 bg-violet-300/5" },
  akademisch:  { label: "Academic",           color: "text-rose-300 border-rose-300/25 bg-rose-300/5" },
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
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400/60" style={MONO_FONT}>
            {lang === "de" ? "Faktencheck & Belege" : uiEn.sourcesLabel}
          </span>
        </div>
        <h2
          className="text-3xl md:text-[2.8rem] text-white mb-2"
          style={{ ...DISPLAY_FONT, fontWeight: 300 }}
        >
          {lang === "de" ? "Quellenverzeichnis" : uiEn.sourcesTitle}
        </h2>
        <p className="text-base max-w-2xl leading-relaxed" style={{ ...BODY_FONT, ...TEXT_BODY }}>
          {lang === "de"
            ? `Alle ${sources.length} Quellen wurden im Rahmen eines systematischen Faktenchecks geprüft (März 2026). Fehler und Ungenauigkeiten wurden korrigiert. Filterbar nach Epoche und Quellentyp.`
            : `All ${sources.length} ${uiEn.sourcesDesc}`}
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] tracking-[0.2em] uppercase self-center" style={{ ...MONO_FONT, color: "#dedede", opacity: 0.45 }}>
            {lang === "de" ? "Epoche" : uiEn.sourcesFilterEpoch}
          </span>
          {epochOptions.map(ep => (
            <button
              key={ep}
              onClick={() => setActiveEpoch(activeEpoch === ep ? null : ep)}
              className={`text-[11px] px-3 py-1.5 rounded-sm border tracking-wide transition-all ${
                activeEpoch === ep
                  ? "border-amber-400/40 text-amber-400 bg-amber-400/8"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/65"
              }`}
              style={BODY_FONT}
            >
              {ep}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] tracking-[0.2em] uppercase self-center" style={{ ...MONO_FONT, color: "#dedede", opacity: 0.45 }}>
            {lang === "de" ? "Typ" : uiEn.sourcesFilterType}
          </span>
          {typeOptions.map(t => {
            const meta = sourceTypeMeta[t];
            return (
              <button
                key={t}
                onClick={() => setActiveType(activeType === t ? null : t)}
                className={`text-[11px] px-3 py-1.5 rounded-sm border tracking-wide transition-all ${
                  activeType === t ? meta.color : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/65"
                }`}
                style={BODY_FONT}
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
              className="flex items-start gap-3 p-3 rounded-sm border border-white/5 bg-white/1.5 hover:border-white/10 hover:bg-white/3 transition-all group"
            >
              {/* Index */}
              <span
                className="text-[10px] flex-shrink-0 mt-0.5 w-7 text-right"
                style={{ ...MONO_FONT, color: "#dedede", opacity: 0.3 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border tracking-wide flex-shrink-0 ${meta.color}`} style={BODY_FONT}>
                    {meta.label}
                  </span>
                  <span className="text-[10px] flex-shrink-0" style={{ ...MONO_FONT, color: "#dedede", opacity: 0.4 }}>
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
                        className="text-sm leading-snug text-white/80 hover:text-amber-400 transition-colors group-hover:underline underline-offset-2 decoration-amber-400/30"
                        style={{ ...BODY_FONT, fontWeight: 400 }}
                      >
                        {source.title}
                      </a>
                    ) : (
                      <span className="text-sm leading-snug" style={{ ...BODY_FONT, fontWeight: 400, color: "#e0e0e0" }}>
                        {source.title}
                      </span>
                    )}
                    <p className="text-[11px] mt-0.5" style={{ ...BODY_FONT, color: "#dedede", opacity: 0.5 }}>
                      {source.publisher}
                      {source.author && ` · ${source.author}`}
                    </p>
                  </div>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 mt-0.5 text-white/20 hover:text-amber-400 transition-colors"
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

      <p className="mt-8 text-xs" style={{ ...BODY_FONT, color: "#dedede", opacity: 0.35 }}>
        {lang === "de" ? "Stand: März 2026. Alle Links wurden zum Zeitpunkt der Erstellung geprüft." : uiEn.sourcesStand}
      </p>
    </section>
  );
}

// ─── Closing Quote ──────────────────────────────────────────────────────────────
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

        <blockquote
          className="text-2xl md:text-[2rem] leading-relaxed mb-6"
          style={{ ...DISPLAY_FONT, fontStyle: "italic", fontWeight: 300, color: "#dedede", opacity: 0.75 }}
        >
          {lang === "de"
            ? "\"Der Zug fährt immer noch in den Bahnhof. Wir springen immer noch auf.\""
            : "\"The train still pulls into the station. We still jump aboard.\""}
        </blockquote>

        <p
          className="text-xs tracking-widest uppercase"
          style={{ ...MONO_FONT, color: "#dedede", opacity: 0.3 }}
        >
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
    <div className="min-h-screen" style={{ backgroundColor: "#0d0d0d" }}>
      <ProgressBar />
      <Hero />

      <div className="container">
        <div className="flex gap-6 lg:gap-14 xl:gap-20">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-48 xl:w-52 flex-shrink-0">
            <div className="sticky top-8 pt-10">
              {/* Branding + Language Toggle */}
              <div className="mb-5 pb-5 border-b border-white/15">
                <p
                  className="text-[11px] leading-relaxed mb-3"
                  style={{ ...BODY_FONT, color: "#e8e8e8", opacity: 0.75, fontWeight: 400 }}
                >
                  {lang === "de"
                    ? "Von der Camera Obscura\nbis zur KI — 2026"
                    : "From the Camera Obscura\nto AI — 2026"}
                </p>
                <LanguageToggle />
              </div>

              <SideNav activeEpoch={activeEpoch} onSelect={handleNavSelect} />

              {/* Legend */}
              <div className="mt-7 pt-5 border-t border-white/15 space-y-2">
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-3"
                  style={{ ...MONO_FONT, color: "#dedede", opacity: 0.65 }}
                >
                  {lang === "de" ? "Legende" : "Legend"}
                </p>
                {Object.entries(typeMeta).map(([key, meta]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${meta.dot}`} />
                    <span
                      className="text-[11px]"
                      style={{ ...BODY_FONT, color: "#e8e8e8", opacity: 0.85, fontWeight: 400 }}
                    >
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
              style={{ backgroundColor: "oklch(0.72 0.12 75)", color: "#0d0d0d" }}
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
                  className="fixed right-0 top-0 bottom-0 w-64 z-50 p-6 overflow-y-auto lg:hidden border-l border-white/8"
                  style={{ backgroundColor: "#111111" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-base"
                      style={{ ...DISPLAY_FONT, color: "#dedede", opacity: 0.75 }}
                    >
                      {lang === "de" ? "Epochen" : "Epochs"}
                    </h3>
                    <button
                      onClick={() => setMobileNavOpen(false)}
                      className="transition-colors"
                      style={{ color: "#dedede", opacity: 0.4 }}
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
                    <span
                      className="text-xs"
                      style={{ ...BODY_FONT, ...TEXT_MUTED }}
                    >
                      {meta.label}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ ...BODY_FONT, ...TEXT_BODY }}
              >
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
    </div>
  );
}
