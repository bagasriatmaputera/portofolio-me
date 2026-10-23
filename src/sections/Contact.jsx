import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "../context/PortfolioDataContext";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  X,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { environment } from "../../environment/environment";

function Contact() {
  const { language } = useLanguage();
  const { profile } = usePortfolioData();
  const socials = profile?.socials ?? {};
  const t = translations[language].contact;

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success", // "success" | "error"
    title: "",
    message: "",
  });

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", formState.name.trim());
      formData.append("email", formState.email.trim());
      formData.append("message", formState.message.trim());
      formData.append("access_key", environment.web3FormsAccessKey);

      const response = await fetch(environment.web3FormsApiUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormState({ name: "", email: "", message: "" });
        setModalState({
          isOpen: true,
          type: "success",
          title: t.form.successTitle,
          message: t.form.successMessage,
        });
      } else {
        setModalState({
          isOpen: true,
          type: "error",
          title: t.form.errorTitle,
          message: result.message || t.form.errorMessage,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setModalState({
        isOpen: true,
        type: "error",
        title: t.form.errorTitle,
        message: t.form.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-primary/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text/70 max-w-lg mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-8 rounded-3xl bg-primary/5 dark:bg-primary/[0.08] border border-primary/15 dark:border-primary/20 flex flex-col justify-between shadow-sm"
          >
            <div>
              <h3 className="text-xl font-bold text-text dark:text-white mb-4">
                {t.cardTitle}
              </h3>
              <p className="text-sm text-text/80 dark:text-text/90 leading-relaxed mb-8">
                {t.cardDescription}
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${socials.email}`}
                  className="flex items-center gap-3 text-sm text-text/90 dark:text-text hover:text-accent dark:hover:text-accent transition-colors p-3.5 rounded-2xl bg-background/80 dark:bg-black/40 border border-primary/15 dark:border-primary/25 hover:border-accent/50 dark:hover:border-accent/50 shadow-inner"
                >
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span className="truncate font-medium">{socials.email}</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-text/90 dark:text-text p-3.5 rounded-2xl bg-background/80 dark:bg-black/40 border border-primary/15 dark:border-primary/25 shadow-inner">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span className="font-medium">{profile?.location ?? ""}</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 pt-6 border-t border-primary/15 dark:border-primary/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary dark:text-secondary block mb-3">
                {t.socialMedia}
              </span>
              <div className="flex items-center gap-3">
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-primary/20 dark:border-primary/30 bg-background/80 dark:bg-black/40 text-text/80 dark:text-text hover:border-accent hover:text-accent dark:hover:text-accent hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-primary/20 dark:border-primary/30 bg-background/80 dark:bg-black/40 text-text/80 dark:text-text hover:border-accent hover:text-accent dark:hover:text-accent hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 p-8 rounded-3xl bg-primary/5 dark:bg-primary/[0.08] border border-primary/15 dark:border-primary/20 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-text/90 dark:text-text uppercase tracking-wider mb-2"
                >
                  {t.form.nameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  placeholder={t.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-background/90 dark:bg-black/40 border border-primary/25 dark:border-primary/35 text-text dark:text-white placeholder-text/40 dark:placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent dark:focus:bg-black/60 text-sm transition-all shadow-inner disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-text/90 dark:text-text uppercase tracking-wider mb-2"
                >
                  {t.form.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  placeholder={t.form.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-background/90 dark:bg-black/40 border border-primary/25 dark:border-primary/35 text-text dark:text-white placeholder-text/40 dark:placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent dark:focus:bg-black/60 text-sm transition-all shadow-inner disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-text/90 dark:text-text uppercase tracking-wider mb-2"
                >
                  {t.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  placeholder={t.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-background/90 dark:bg-black/40 border border-primary/25 dark:border-primary/35 text-text dark:text-white placeholder-text/40 dark:placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent dark:focus:bg-black/60 text-sm resize-none transition-all shadow-inner disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-background dark:bg-accent dark:text-[#0c0f16] font-bold text-sm hover:bg-accent dark:hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.form.submittingBtn}</span>
                  </>
                ) : (
                  <>
                    <span>{t.form.submitBtn}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Pop-up Notification Modal */}
      <AnimatePresence>
        {modalState.isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md rounded-3xl bg-background dark:bg-[#121722] border border-primary/25 dark:border-primary/35 shadow-2xl p-6 sm:p-8 text-center overflow-hidden z-10"
            >
              {/* Decorative top colored accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  modalState.type === "success"
                    ? "bg-gradient-to-r from-emerald-500 via-accent to-emerald-400"
                    : "bg-gradient-to-r from-rose-500 via-red-500 to-amber-500"
                }`}
              />

              {/* Close Icon Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-xl text-text/60 dark:text-text/80 hover:text-text dark:hover:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Status Icon */}
              <div className="flex justify-center mb-4 mt-2">
                {modalState.type === "success" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-lg shadow-emerald-500/10"
                  >
                    <CheckCircle2 className="w-9 h-9" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 dark:text-rose-400 shadow-lg shadow-rose-500/10"
                  >
                    <AlertCircle className="w-9 h-9" />
                  </motion.div>
                )}
              </div>

              {/* Title & Message */}
              <h3 className="text-xl font-bold text-text dark:text-white mb-2">
                {modalState.title}
              </h3>
              <p className="text-sm text-text/80 dark:text-text/90 leading-relaxed mb-6">
                {modalState.message}
              </p>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeModal}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                  modalState.type === "success"
                    ? "bg-primary text-background hover:bg-accent dark:bg-accent dark:text-[#0c0f16] dark:hover:bg-accent/90"
                    : "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-900/20"
                }`}
              >
                {t.form.modalClose}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
