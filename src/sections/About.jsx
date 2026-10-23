import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechStackBadge from "../components/TechStackBadge";
import techStackData from "../data/techstack.json";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { UserCheck, Terminal, HeartHandshake, Users, FileText, Boxes, ShoppingCart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function About() {
  const { language } = useLanguage();
  const { profile } = usePortfolioData();
  const t = translations[language].about;

  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");

  const categoryKeys = ["all", "backend", "frontend", "mobile", "styling", "tools"];

  const filteredTech =
    selectedCategoryKey === "all"
      ? techStackData
      : techStackData.filter(
          (item) =>
            item.category.toLowerCase() ===
            t.categories[selectedCategoryKey].toLowerCase() ||
            item.category.toLowerCase() === selectedCategoryKey.toLowerCase()
        );

  const domainIcons = [HeartHandshake, Users, FileText, Boxes, ShoppingCart];
  const domains = t.domains.map((d, index) => ({
    ...d,
    icon: domainIcons[index] || FileText,
  }));

  return (
    <section id="about" className="py-20 border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
            <UserCheck className="w-4 h-4" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text">
            {t.title}
          </h2>
        </motion.div>

        {/* Grid content: Bio & Domains */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-4 text-base sm:text-lg text-text/80 leading-relaxed"
          >
            <p>
              {t.p1_prefix}{" "}
              <strong className="text-primary font-semibold">{profile?.name}</strong>,{" "}
              {t.p1_body}
            </p>
            <p>
              {t.p2_prefix}{" "}
              <strong className="text-primary font-semibold">The One Retail</strong>,{" "}
              {t.p2_body}
            </p>
            <p className="text-sm sm:text-base text-secondary font-medium">
              {t.locationText.replace("{location}", profile?.location ?? "")}
            </p>
          </motion.div>

          {/* Domain cards */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {t.domainsTitle}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {domains.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`p-5 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/15 hover:border-accent/40 transition-colors shadow-sm hover:shadow-md ${
                      idx === domains.length - 1 ? "col-span-2" : ""
                    }`}
                  >
                    <Icon className="w-6 h-6 text-accent mb-3" />
                    <span className="block text-base font-bold text-primary">{item.title}</span>
                    <span className="text-xs sm:text-sm text-text/70 mt-0.5 block">{item.desc}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 pt-10 border-t border-primary/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent" />
              <h3 className="text-xl sm:text-2xl font-bold text-text">{t.skillsTitle}</h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categoryKeys.map((key) => {
                const label = t.categories[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategoryKey(key)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
                      selectedCategoryKey === key
                        ? "bg-primary text-background shadow-sm"
                        : "bg-primary/5 text-text/70 hover:bg-primary/15 hover:text-text"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Badges Grid with Layout Animation */}
          <motion.div layout className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => (
                <TechStackBadge
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  category={tech.category}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
