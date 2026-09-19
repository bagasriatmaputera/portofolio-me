import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function Navbar({ isDark, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: "#about" },
    { name: t.experience, href: "#experience" },
    { name: t.projects, href: "#projects" },
    { name: t.contact, href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/85 backdrop-blur-md shadow-sm border-b border-primary/10 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-primary transition-colors"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden flex items-center justify-center p-0.5 bg-primary/10 border border-primary/20 group-hover:border-accent/50 group-hover:shadow-sm transition-all duration-200">
              <img
                src="/images/Brp logo.png"
                alt="BRP Logo"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <span>
              BRP<span className="text-accent">&lt;/&gt;</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-text/80 hover:text-accent transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all after:duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 pl-2 border-l border-primary/15">
              {/* Language Switcher Pill */}
              <div
                className="flex items-center p-1 rounded-xl bg-primary/5 border border-primary/20 text-xs font-bold select-none"
                role="group"
                aria-label={t.switchLanguage}
              >
                <button
                  type="button"
                  onClick={() => setLanguage("id")}
                  className={`relative px-2.5 py-1 rounded-lg transition-all duration-200 ${
                    language === "id"
                      ? "text-background font-bold"
                      : "text-text/60 hover:text-text"
                  }`}
                >
                  {language === "id" && (
                    <motion.div
                      layoutId="nav-lang-active"
                      className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">ID</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`relative px-2.5 py-1 rounded-lg transition-all duration-200 ${
                    language === "en"
                      ? "text-background font-bold"
                      : "text-text/60 hover:text-text"
                  }`}
                >
                  {language === "en" && (
                    <motion.div
                      layoutId="nav-lang-active"
                      className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">EN</span>
                </button>
              </div>

              {/* Dark Mode Toggle with Icon Spin Animation */}
              <motion.button
                id="theme-toggle-btn"
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/15 text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden"
                aria-label={isDark ? t.lightMode : t.darkMode}
                title={isDark ? t.lightMode : t.darkMode}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-accent" />
                    ) : (
                      <Moon className="w-4 h-4 text-primary" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Button */}
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-primary text-xs font-bold"
              aria-label={t.switchLanguage}
            >
              <Languages className="w-3.5 h-3.5 text-accent" />
              <span>{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg border border-primary/20 bg-primary/5 text-primary"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg border border-primary/20 bg-primary/5 text-text"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-primary/15 shadow-xl"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-text hover:bg-primary/10 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Language Switcher inside menu */}
              <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between px-2">
                <span className="text-xs text-text/70 flex items-center gap-1.5 font-medium">
                  <Languages className="w-3.5 h-3.5 text-accent" />
                  {language === "id" ? "Pilihan Bahasa" : "Language"}
                </span>
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-primary/10 border border-primary/15">
                  <button
                    onClick={() => setLanguage("id")}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      language === "id"
                        ? "bg-primary text-background shadow-sm"
                        : "text-text/70 hover:text-text"
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      language === "en"
                        ? "bg-primary text-background shadow-sm"
                        : "text-text/70 hover:text-text"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;
