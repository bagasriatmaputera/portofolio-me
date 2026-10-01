import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function ProjectCard({
  title,
  description,
  image,
  techStack,
  liveUrl,
  repoUrl,
  featured,
  is_live = false,
  index = 0,
}) {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const getLocalizedText = (value) => {
    if (!value) return "";
    if (typeof value === "object" && !Array.isArray(value)) {
      return value[language] || value.id || value.en || "";
    }
    return value;
  };

  const currentTitle = getLocalizedText(title);
  const currentDescription = getLocalizedText(description);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-primary/5 hover:bg-primary/10 border border-primary/15 hover:border-accent/40 transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Project Image Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-primary/10 border-b border-primary/10">
        <img
          src={image}
          alt={currentTitle}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/projects/project-placeholder.svg";
          }}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Featured Tag */}
        {featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-accent text-background shadow-md">
            <Star className="w-3 h-3 fill-current" />
            {t.featuredBadge}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
          {currentTitle}
        </h3>

        <p className="mt-2 text-sm text-text/75 leading-relaxed flex-1">
          {currentDescription}
        </p>

        {/* Tech Stack Pills */}
        {techStack && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-background/80 border border-primary/15 text-text/90"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links / Actions */}
        <div className="mt-6 pt-4 border-t border-primary/10 flex items-center gap-3">
          {is_live && liveUrl && liveUrl !== "#" ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-background hover:bg-accent hover:shadow-sm active:scale-95 transition-all duration-200"
            >
              <span>{t.liveDemo}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              title={t.liveDemoDisabled}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-primary/15 text-text/40 border border-primary/10 cursor-not-allowed select-none opacity-60"
            >
              <span>{t.liveDemo}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-40" />
            </button>
          )}

          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border border-primary/25 hover:border-accent text-text hover:text-accent hover:bg-primary/5 active:scale-95 transition-all duration-200"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>{t.sourceCode}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
