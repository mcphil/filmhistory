import React, { createContext, useContext, useState } from "react";

export type Language = "de" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (de: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "de",
  setLang: () => {},
  t: (de) => de,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("de");

  const t = (de: string, en: string) => (lang === "de" ? de : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
