import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("portfolio_lang");
    if (savedLang === "en" || savedLang === "id") {
      return savedLang;
    }
    // Check browser preference if available
    if (typeof navigator !== "undefined" && navigator.language) {
      if (navigator.language.startsWith("id")) {
        return "id";
      }
    }
    return "id"; // Default to Indonesian
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const isIndonesian = language === "id";
  const isEnglish = language === "en";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isIndonesian,
        isEnglish,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
