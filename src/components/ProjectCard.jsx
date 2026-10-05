import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function ProjectCard({
  title,
  description,
  image,
  gifImage,
  techStack,
  liveUrl,
  repoUrl,
  featured,
  is_live = false,
  is_repo = false,
  index = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col rounded-2xl overflow-hidden bg-primary/5 hover:bg-primary/10 border border-primary/15 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl relative"
    >
      {/* Project Image & GIF Hover Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-primary/10 border-b border-primary/10">
        {/* Static Image */}
        <img
          src={image}
          alt={currentTitle}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/projects/project-placeholder.svg";
          }}
          className={`w-full h-full object-cover object-top transition-all duration-500 ease-out ${
            gifImage && isHovered
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100 group-hover:scale-105"
          }`}
        />

        {/* Hover GIF Preview */}
        {gifImage && (
          <img
            src={gifImage}
            alt={`${currentTitle} Animated Preview`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ease-out ${
              isHovered
                ? "opacity-100 scale-105"
                : "opacity-0 pointer-events-none scale-100"
            }`}
          />
        )}

        {/* Featured Badge */}
        {featured && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent text-background shadow-md backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            {t.featuredBadge}
          </span>
        )}

        {/* Hover GIF Badge Indicator */}
        {gifImage && (
          <div
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background/85 backdrop-blur-md border border-primary/20 text-text shadow-sm transition-all duration-300"
            title={isHovered ? t.gifBadgePlaying : t.gifBadgeHover}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isHovered
                  ? "bg-emerald-500 ring-2 ring-emerald-400/40 animate-pulse"
                  : "bg-accent"
              }`}
            />
            <span>{isHovered ? t.gifBadgePlaying : t.gifBadgeHover}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-accent transition-colors">
          {currentTitle}
        </h3>

        <p className="mt-2.5 text-sm sm:text-base text-text/75 leading-relaxed flex-1">
          {currentDescription}
        </p>

        {/* Tech Stack Pills */}
        {techStack && (
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-background/80 border border-primary/15 text-text/90 shadow-2xs hover:border-accent/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links / Actions */}
        <div className="mt-6 pt-5 border-t border-primary/10 flex items-center gap-3">
          {is_live && liveUrl && liveUrl !== "#" ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-primary text-background hover:bg-accent hover:shadow-md active:scale-95 transition-all duration-200"
            >
              <span>{t.liveDemo}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              title={t.liveDemoDisabled}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-primary/15 text-text/40 border border-primary/10 cursor-not-allowed select-none opacity-60"
            >
              <span>{t.liveDemo}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-40" />
            </button>
          )}

          {is_repo && repoUrl && repoUrl !== "#" ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-primary/25 hover:border-accent text-text hover:text-accent hover:bg-primary/5 active:scale-95 transition-all duration-200"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>{t.sourceCode}</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              title={t.sourceCodeDisabled}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-primary/10 bg-primary/5 text-text/40 cursor-not-allowed select-none opacity-60 transition-all"
            >
              <FaGithub className="w-3.5 h-3.5 opacity-40" />
              <span>{t.sourceCode}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
