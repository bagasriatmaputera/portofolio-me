import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import profileData from "../data/profile.json";

function Hero() {
  const { name, title, bio, photo, availableForWork, socials } = profileData;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient gradient glow in background with gentle breathing animation */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Status Badge */}
            {availableForWork && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold mb-6 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Tersedia untuk Pekerjaan / Proyek Baru
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text tracking-tight leading-[1.15]"
            >
              Halo, Saya <span className="text-primary">{name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl sm:text-2xl font-semibold text-secondary"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-base sm:text-lg text-text/80 leading-relaxed max-w-2xl"
            >
              {bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-semibold text-sm hover:bg-accent hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Lihat Proyek
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 hover:border-accent text-text hover:text-accent font-semibold text-sm hover:bg-primary/5 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Hubungi Saya
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center justify-center md:justify-start gap-4 text-text/70"
            >
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-primary/20 hover:border-accent hover:text-accent hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-primary/20 hover:border-accent hover:text-accent hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {socials.email && (
                <a
                  href={`mailto:${socials.email}`}
                  className="p-2.5 rounded-xl border border-primary/20 hover:border-accent hover:text-accent hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label="Email Me"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Profile Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden p-2 bg-gradient-to-br from-primary via-secondary to-accent shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-background flex items-center justify-center">
                <img
                  src={photo}
                  alt={name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/profile/avatar-placeholder.svg";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Floating decorative badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-3 -right-3 sm:bottom-2 sm:-right-4 px-4 py-2 rounded-2xl bg-background/90 backdrop-blur-md border border-primary/20 shadow-lg flex items-center gap-2"
            >
              <span className="text-lg">🚀</span>
              <span className="text-xs font-bold text-text">Build something magic with code!</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
