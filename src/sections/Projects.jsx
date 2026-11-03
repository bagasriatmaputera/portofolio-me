import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { FolderGit2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { translations } from "../data/translations";

function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState("all");
  const { language } = useLanguage();
  const { projects } = usePortfolioData();
  const t = translations[language].projects;

  const displayedProjects =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="projects" className="py-20 border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>{t.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text">
              {t.title}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1 rounded-xl bg-primary/10 border border-primary/15 self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                filter === "all"
                  ? "bg-primary text-background shadow-sm"
                  : "text-text/70 hover:text-text"
              }`}
            >
              {t.filterAll} ({projects.length})
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                filter === "featured"
                  ? "bg-primary text-background shadow-sm"
                  : "text-text/70 hover:text-text"
              }`}
            >
              {t.filterFeatured} ({projects.filter((p) => p.featured).length})
            </button>
          </div>
        </motion.div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={idx}
                onSelectProject={onSelectProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
