import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Lightbulb,
  BookOpen,
  Images,
  Maximize2,
  X,
  FolderGit2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function ProjectDetail({ project, onBack }) {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const [activeMedia, setActiveMedia] = useState(null);
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveMedia(null);
      }
    };
    if (activeMedia) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMedia]);

  if (!project) return null;

  const getLocalizedText = (value) => {
    if (!value) return "";
    if (typeof value === "object" && !Array.isArray(value)) {
      return value[language] || value.id || value.en || "";
    }
    return value;
  };

  const title = getLocalizedText(project.title);
  const description = getLocalizedText(project.description);
  const problemSolution = getLocalizedText(project.problemSolution);
  const challengesLearnings = getLocalizedText(project.challengesLearnings);
  const gallery = project.mediaGallery || [];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-primary/10"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-primary/10 hover:bg-primary/20 text-text hover:text-accent border border-primary/15 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToProjects}</span>
          </button>

          {/* Quick Action Links */}
          <div className="flex items-center gap-3">
            {project.is_live && project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-background hover:bg-accent transition-all duration-200 shadow-sm"
              >
                <span>{t.liveDemo}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.is_repo && project.repoUrl && project.repoUrl !== "#" && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-primary/25 hover:border-accent text-text hover:text-accent hover:bg-primary/5 transition-all duration-200"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>{t.sourceCode}</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{t.projectDetail}</span>
            </span>

            {project.featured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent text-background shadow-xs">
                <Star className="w-3 h-3 fill-current" />
                <span>{t.featuredBadge}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text tracking-tight">
            {title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-text/80 leading-relaxed max-w-3xl">
            {description}
          </p>

          {/* Tech Stack Pills */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 rounded-lg bg-primary/10 border border-primary/15 text-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Main Cover & GIF Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-primary/10 border border-primary/15 shadow-xl mb-12"
        >
          <img
            src={showGif && project.gifImage ? project.gifImage : project.image}
            alt={title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/projects/project-placeholder.svg";
            }}
            className="w-full h-full object-cover object-top"
          />

          {/* GIF Toggle Button if available */}
          {project.gifImage && (
            <button
              type="button"
              onClick={() => setShowGif(!showGif)}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-background/90 backdrop-blur-md border border-primary/20 text-text shadow-md hover:border-accent hover:text-accent transition-all duration-200"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  showGif ? "bg-emerald-500 animate-pulse" : "bg-accent"
                }`}
              />
              <span>{showGif ? t.gifBadgePlaying : t.gifBadgeHover}</span>
            </button>
          )}
        </motion.div>

        {/* Sector: Problem & Solution */}
        {problemSolution && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="mb-10 rounded-2xl p-6 sm:p-8 bg-primary/5 border border-primary/15 hover:border-primary/25 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text">
                {t.problemSolution}
              </h2>
            </div>
            <div className="text-text/80 text-sm sm:text-base leading-relaxed whitespace-pre-line pl-0 sm:pl-13">
              {problemSolution}
            </div>
          </motion.section>
        )}

        {/* Sector: Challenges & Learnings */}
        {challengesLearnings && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="mb-10 rounded-2xl p-6 sm:p-8 bg-primary/5 border border-primary/15 hover:border-primary/25 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text">
                {t.challengesLearnings}
              </h2>
            </div>
            <div className="text-text/80 text-sm sm:text-base leading-relaxed whitespace-pre-line pl-0 sm:pl-13">
              {challengesLearnings}
            </div>
          </motion.section>
        )}

        {/* Sector: Media Gallery */}
        {gallery && gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="mb-12 rounded-2xl p-6 sm:p-8 bg-primary/5 border border-primary/15"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/15 text-accent">
                  <Images className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text">
                  {t.mediaGallery}
                </h2>
              </div>
              <span className="text-xs text-text/60">
                {t.galleryHint} ({gallery.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gallery.map((item, idx) => {
                const captionText = getLocalizedText(item.caption);
                const itemImg = item.imageUrl || item.image;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveMedia(item)}
                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-primary/10 border border-primary/15 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={itemImg}
                        alt={captionText || `${title} screenshot ${idx + 1}`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "/images/projects/project-placeholder.svg";
                        }}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="p-2.5 rounded-full bg-background/90 text-text shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    {captionText && (
                      <div className="p-3 bg-background/95 border-t border-primary/10 text-xs font-medium text-text/85 truncate">
                        {captionText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* If no detail is provided yet */}
        {!problemSolution && !challengesLearnings && gallery.length === 0 && (
          <div className="rounded-2xl p-8 text-center border border-dashed border-primary/20 text-text/60 text-sm mb-12">
            {t.noDetailAvailable}
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="flex items-center justify-center pt-8 border-t border-primary/10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-primary text-background hover:bg-accent transition-all duration-200 shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.otherProjects}</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Gallery Preview */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            {/* Viewport Floating Close Button */}
            <button
              type="button"
              onClick={() => setActiveMedia(null)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 p-3 rounded-full bg-background/90 hover:bg-background text-text hover:text-accent border border-primary/20 shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Close image preview"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-background border border-primary/20 shadow-2xl flex flex-col"
            >
              {/* Modal Header Bar with title and in-card close button */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-primary/10 bg-primary/5">
                <span className="text-xs sm:text-sm font-semibold text-text truncate pr-4">
                  {getLocalizedText(activeMedia.caption) || title}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveMedia(null)}
                  className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-text hover:text-accent transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview Container */}
              <div className="min-h-[240px] sm:min-h-[380px] max-h-[75vh] overflow-auto flex items-center justify-center p-3 sm:p-6 bg-black/20">
                <img
                  src={activeMedia.imageUrl || activeMedia.image}
                  alt={getLocalizedText(activeMedia.caption) || title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/projects/project-placeholder.svg";
                  }}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Bottom Caption Bar */}
              {getLocalizedText(activeMedia.caption) && (
                <div className="px-5 py-3 bg-background border-t border-primary/10 text-center text-xs sm:text-sm font-medium text-text/85">
                  {getLocalizedText(activeMedia.caption)}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectDetail;

